/**
 * Color tokens for the Doctor Site Factory
 * Following Refactoring UI principles: 5-9 shades per color, saturated grays
 */

export const colors = {
  // Primary - Dermatology teal (default specialty)
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Specialty-specific primary colors (CSS variables for theming)
  specialty: {
    dermatology: {
      primary: '#2E8B57',      // SeaGreen
      secondary: '#3CB371',    // MediumSeaGreen
      accent: '#98FB98',       // PaleGreen
    },
    ophthalmology: {
      primary: '#1E3A8A',      // Deep blue
      secondary: '#3B82F6',    // Blue-500
      accent: '#93C5FD',       // Blue-300
    },
    cardiology: {
      primary: '#991B1B',      // Deep red
      secondary: '#EF4444',    // Red-500
      accent: '#FCA5A5',       // Red-300
    },
    orthopedics: {
      primary: '#7C2D12',      // Deep amber/brown
      secondary: '#EA580C',    // Orange-600
      accent: '#FDBA74',       // Orange-300
    },
    neurology: {
      primary: '#581C87',      // Deep purple
      secondary: '#A855F7',    // Purple-500
      accent: '#D8B4FE',       // Purple-300
    },
    pediatrics: {
      primary: '#0F766E',      // Teal-700
      secondary: '#14B8A6',    // Teal-500
      accent: '#5EEAD4',       // Teal-300
    },
  },

  // Semantic colors with full shade ranges
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },

  // Saturated grays (cool tint for medical/clinical feel)
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // CSS Variable mappings for runtime theming
  cssVariables: {
    // These will be set per-site via theme generator
    '--color-primary': 'var(--primary-500, #2E8B57)',
    '--color-primary-foreground': 'var(--primary-foreground, #ffffff)',
    '--color-secondary': 'var(--secondary-500, #3CB371)',
    '--color-secondary-foreground': 'var(--secondary-foreground, #ffffff)',
    '--color-accent': 'var(--accent-500, #98FB98)',
    '--color-accent-foreground': 'var(--accent-foreground, #1e293b)',
    '--color-background': '#ffffff',
    '--color-foreground': '#0f172a',
    '--color-muted': '#f1f5f9',
    '--color-muted-foreground': '#64748b',
    '--color-border': '#e2e8f0',
    '--color-ring': '#2E8B57',
  },
};

export type ColorScale = typeof colors.primary;
export type SpecialtyColors = typeof colors.specialty.dermatology;