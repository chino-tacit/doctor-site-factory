#!/usr/bin/env bash
set -e

SPECIALTY="${1:-dermatology}"
NAME="${2:-dr-smith-derm}"
DOMAIN="${3:-}"
CLINIC_NAME="${4:-}"

echo "🏗️  Generating site: $NAME from specialty: $SPECIALTY"

# Resolve paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
SPECIALTY_DIR="$WORKSPACE_ROOT/specialties/$SPECIALTY"
TEMPLATE_DIR="$WORKSPACE_ROOT/packages/astro-doctor-template"
OUTPUT_DIR="$WORKSPACE_ROOT/sites/$NAME"

echo "DEBUG: WORKSPACE_ROOT=$WORKSPACE_ROOT"
echo "DEBUG: SPECIALTY_DIR=$SPECIALTY_DIR"
echo "DEBUG: TEMPLATE_DIR=$TEMPLATE_DIR"
echo "DEBUG: OUTPUT_DIR=$OUTPUT_DIR"

ls -la "$WORKSPACE_ROOT"
ls -la "$WORKSPACE_ROOT/specialties"
ls -la "$WORKSPACE_ROOT/packages"

if [ ! -d "$SPECIALTY_DIR" ]; then
    echo "❌ Specialty '$SPECIALTY' not found at $SPECIALTY_DIR"
    ls -la "$WORKSPACE_ROOT/specialties/"
    exit 1
fi

if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "❌ Template dir not found at $TEMPLATE_DIR"
    ls -la "$WORKSPACE_ROOT/packages/"
    exit 1
fi

echo "📦 Creating site '$NAME' from '$SPECIALTY' template..."

# Copy template
cp -r "$TEMPLATE_DIR" "$OUTPUT_DIR"
echo "✅ Template copied"

# Copy specialty content
cp -r "$SPECIALTY_DIR/services" "$OUTPUT_DIR/src/content/services"
cp -r "$SPECIALTY_DIR/team" "$OUTPUT_DIR/src/content/team"
cp -r "$SPECIALTY_DIR/assets" "$OUTPUT_DIR/public/assets" 2>/dev/null || true
echo "✅ Specialty content copied"

# Inject config - just copy the config.json directly
mkdir -p "$OUTPUT_DIR/src/content/specialtyConfig"
cp "$SPECIALTY_DIR/config.json" "$OUTPUT_DIR/src/content/specialtyConfig/specialtyConfig.json"
echo "✅ Config copied"

# Update astro.config.mjs with site URL using node (cross-platform)
if [ -n "$DOMAIN" ]; then
    SITE_URL="https://$DOMAIN"
    echo "$DOMAIN" > "$OUTPUT_DIR/public/CNAME"
    echo "✅ CNAME created for $DOMAIN"
else
    SITE_URL="https://$NAME.github.io"
fi

# Use node to update the astro config file (most reliable cross-platform)
node -e "
const fs = require('fs');
const path = require('path');
const configPath = path.join('$OUTPUT_DIR', 'astro.config.mjs');
let content = fs.readFileSync(configPath, 'utf8');
content = content.replace(\"site: 'https://example.com'\", \"site: '$SITE_URL'\");
fs.writeFileSync(configPath, content);
console.log('✅ Astro config updated with site:', '$SITE_URL');
"

echo ""
echo "🎉 Site created at $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "  cd $OUTPUT_DIR"
echo "  npm install"
echo "  npm run dev     # Preview locally"
echo "  npm run build   # Build for production"
echo "  npm run preview # Preview production build"