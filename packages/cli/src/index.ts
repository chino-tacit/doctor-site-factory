#!/usr/bin/env node
import { Command } from 'commander';
import { copy } from 'fs-extra';
import { join, resolve, dirname } from 'path';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .name('create-clinic-site')
  .description('Generate a doctor clinic site from specialty template')
  .version('1.0.0')
  .requiredOption('-s, --specialty <name>', 'Specialty (dermatology, ophthalmology, etc.)')
  .requiredOption('-n, --name <slug>', 'Site slug (e.g., dr-smith-derm)')
  .option('-o, --output <dir>', 'Output directory (relative to workspace root)', '../sites')
  .option('--domain <domain>', 'Custom domain (e.g., drsmithderm.com)')
  .option('--skip-install', 'Skip npm install')
  .option('--clinic-name <name>', 'Clinic name for config')
  .parse();

const options = program.opts();

async function main() {
  // Resolve workspace root (two levels up from packages/cli/src)
  const workspaceRoot = resolve(__dirname, '../../..');
  const specialtyDir = resolve(workspaceRoot, `specialties/${options.specialty}`);
  const templateDir = resolve(workspaceRoot, `packages/astro-doctor-template`);
  const outputDir = resolve(workspaceRoot, options.output, options.name);

  if (!existsSync(specialtyDir)) {
    console.error(`❌ Specialty "${options.specialty}" not found at ${specialtyDir}`);
    process.exit(1);
  }

  console.log(`🏗️  Creating site "${options.name}" from "${options.specialty}" template...`);

  // Copy template
  await copy(templateDir, outputDir);
  console.log('✅ Template copied');

  // Copy specialty content
  await copy(join(specialtyDir, 'services'), join(outputDir, 'src/content/services'), { overwrite: true });
  await copy(join(specialtyDir, 'team'), join(outputDir, 'src/content/team'), { overwrite: true });
  await copy(join(specialtyDir, 'assets'), join(outputDir, 'public/assets'), { overwrite: true });
  console.log('✅ Specialty content copied');

  // Inject config
  const configPath = join(specialtyDir, 'config.json');
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));

  // Update site URL if domain provided
  if (options.domain) {
    config.site = `https://${options.domain}`;
  }

  // Write specialty config to content collection
  const specialtyConfigDir = join(outputDir, 'src/content/specialtyConfig');
  if (!existsSync(specialtyConfigDir)) {
    mkdirSync(specialtyConfigDir, { recursive: true });
  }
  writeFileSync(
    join(specialtyConfigDir, 'specialtyConfig.json'),
    JSON.stringify(config, null, 2)
  );
  console.log('✅ Config injected');

  // Update astro.config.mjs with site URL
  const astroConfigPath = join(outputDir, 'astro.config.mjs');
  let astroConfig = readFileSync(astroConfigPath, 'utf-8');
  astroConfig = astroConfig.replace(
    "site: 'https://example.com'",
    `site: '${config.site || `https://${options.name}.github.io`}'`
  );
  writeFileSync(astroConfigPath, astroConfig);
  console.log('✅ Astro config updated');

  // Install deps
  if (!options.skipInstall) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { cwd: outputDir, stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  }

  // Create CNAME if domain provided
  if (options.domain) {
    writeFileSync(join(outputDir, 'public/CNAME'), options.domain);
    console.log(`✅ CNAME created for ${options.domain}`);
  }

  console.log(`\n🎉 Site created at ${outputDir}`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${outputDir}`);
  console.log(`  npm run dev     # Preview locally`);
  console.log(`  npm run build   # Build for production`);
  console.log(`  npm run preview # Preview production build`);
}

main().catch(console.error);