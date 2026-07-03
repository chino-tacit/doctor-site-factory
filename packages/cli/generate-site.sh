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

if [ ! -d "$SPECIALTY_DIR" ]; then
    echo "❌ Specialty '$SPECIALTY' not found at $SPECIALTY_DIR"
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

# Inject config
CONFIG_PATH="$SPECIALTY_DIR/config.json"
CONFIG=$(cat "$CONFIG_PATH")

# Update site URL if domain provided
if [ -n "$DOMAIN" ]; then
    CONFIG=$(echo "$CONFIG" | jq --arg domain "$DOMAIN" '.site = "https://\($domain)"')
fi

# Write specialty config to content collection
mkdir -p "$OUTPUT_DIR/src/content/specialtyConfig"
echo "$CONFIG" | jq . > "$OUTPUT_DIR/src/content/specialtyConfig/specialtyConfig.json"
echo "✅ Config injected"

# Update astro.config.mjs with site URL
ASTRO_CONFIG_PATH="$OUTPUT_DIR/astro.config.mjs"
SITE_URL=$(echo "$CONFIG" | jq -r '.site // "https://\($NAME).github.io"')
sed -i "s|site: 'https://example.com'|site: '$SITE_URL'|" "$ASTRO_CONFIG_PATH"
echo "✅ Astro config updated"

# Create CNAME if domain provided
if [ -n "$DOMAIN" ]; then
    echo "$DOMAIN" > "$OUTPUT_DIR/public/CNAME"
    echo "✅ CNAME created for $DOMAIN"
fi

echo ""
echo "🎉 Site created at $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "  cd $OUTPUT_DIR"
echo "  npm install"
echo "  npm run dev     # Preview locally"
echo "  npm run build   # Build for production"
echo "  npm run preview # Preview production build"