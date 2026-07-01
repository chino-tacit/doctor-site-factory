/**
 * Theme Generator CLI
 * Generates specialty-specific theme configuration from design tokens
 */

import { Command } from 'commander';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs-extra';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { specialty } from '@doctor-site-factory/core-tokens/colors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ThemeConfig {
  specialty: string;
  displayName: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontHeading: string;
    fontBody: string;
  };
  // ... rest of config schema
}

const program = new Command();

program
  .name('generate-theme')
  .description('Generate specialty theme configuration')
  .version('1.0.0')
  .requiredOption('-s, --specialty <name>', 'Specialty (dermatology, ophthalmology, etc.)')
  .option('-o, --output <dir>', 'Output directory', './specialties')
  .option('--clinic-name <name>', 'Clinic name for config')
  .parse();

const options = program.opts();

async function main() {
  const specialtyName = options.specialty.toLowerCase();
  const specialtyColors = (specialty as Record<string, any>)[specialtyName];

  if (!specialtyColors) {
    console.error(`❌ Specialty "${specialtyName}" not found`);
    console.error('Available:', Object.keys(specialty).join(', '));
    process.exit(1);
  }

  const outputDir = resolve(options.output, specialtyName);
  mkdirSync(outputDir, { recursive: true });

  // Generate config.json
  const config = {
    specialty: specialtyName,
    displayName: specialtyName.charAt(0).toUpperCase() + specialtyName.slice(1),
    theme: {
      primaryColor: specialtyColors.primary,
      secondaryColor: specialtyColors.secondary,
      accentColor: specialtyColors.accent,
      fontHeading: 'Inter',
      fontBody: 'Inter',
    },
    hero: {
      headline: `Expert ${specialtyName.charAt(0).toUpperCase() + specialtyName.slice(1)} Care`,
      subheadline: `Board-certified ${specialtyName}s providing comprehensive care`,
      ctaText: 'Book Appointment',
      ctaLink: '/contact',
      backgroundImage: `/assets/hero-${specialtyName}.jpg`,
    },
    services: [
      { slug: 'service-1', title: 'Service One', shortDescription: 'Description one' },
      { slug: 'service-2', title: 'Service Two', shortDescription: 'Description two' },
      { slug: 'service-3', title: 'Service Three', shortDescription: 'Description three' },
    ],
    team: [
      { slug: 'dr-one', name: 'Dr. One', title: 'Medical Director', bio: 'Bio here', photo: '/assets/dr-one.jpg' },
    ],
    clinic: {
      name: options.clinicName || `${specialtyName.charAt(0).toUpperCase() + specialtyName.slice(1)} Clinic`,
      address: '123 Medical Blvd, Suite 400, City, ST 10001',
      phone: '(555) 123-4567',
      email: `info@${specialtyName}clinic.com`,
      hours: [
        { day: 'Monday', open: '9:00', close: '17:00' },
        { day: 'Tuesday', open: '9:00', close: '17:00' },
        { day: 'Wednesday', open: '9:00', close: '17:00' },
        { day: 'Thursday', open: '9:00', close: '17:00' },
        { day: 'Friday', open: '9:00', close: '15:00' },
        { day: 'Saturday', closed: true },
        { day: 'Sunday', closed: true },
      ],
      mapsUrl: 'https://maps.google.com/?q=123+Medical+Blvd',
      calendlyUrl: `https://calendly.com/${specialtyName}clinic`,
      insurance: ['Aetna', 'Blue Cross', 'Cigna', 'UnitedHealthcare'],
      social: {
        instagram: `https://instagram.com/${specialtyName}clinic`,
        facebook: `https://facebook.com/${specialtyName}clinic`,
      },
    },
    seo: {
      title: `${specialtyName.charAt(0).toUpperCase() + specialtyName.slice(1)} Clinic | Expert Care`,
      description: `Board-certified ${specialtyName}s. Same-day appointments available.`,
      keywords: [`${specialtyName} clinic`, `${specialtyName} near me`],
    },
  };

  const configPath = join(outputDir, 'config.json');
  writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✅ Theme config generated: ${configPath}`);

  // Generate CSS custom properties file
  const cssVars = `
:root {
  --color-primary: ${specialtyColors.primary};
  --color-secondary: ${specialtyColors.secondary};
  --color-accent: ${specialtyColors.accent};
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
  `.trim();

  const cssPath = join(outputDir, 'theme.css');
  writeFileSync(cssPath, cssVars);
  console.log(`✅ CSS variables generated: ${cssPath}`);

  // Generate Tailwind config extension
  const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${specialtyColors.primary}',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '${specialtyColors.secondary}',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '${specialtyColors.accent}',
          foreground: '#1e293b',
        },
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
  `.trim();

  const twPath = join(outputDir, 'tailwind.config.js');
  writeFileSync(twPath, tailwindConfig);
  console.log(`✅ Tailwind config generated: ${twPath}`);

  console.log(`\n🎉 Theme for "${specialtyName}" generated in ${outputDir}`);
  console.log('\nNext steps:');
  console.log(`  1. Edit ${configPath} with clinic-specific details`);
  console.log(`  2. Add service MDX files to ${outputDir}/services/`);
  console.log(`  3. Add team JSON files to ${outputDir}/team/`);
  console.log(`  4. Add assets to ${outputDir}/assets/`);
}

main().catch(console.error);