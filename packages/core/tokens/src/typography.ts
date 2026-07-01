/**
 * Typography tokens for the Doctor Site Factory
 * Modular scale (1.25 ratio) with constrained line heights
 */

export const typography = {
  // Font families
  fontFamilies: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, Fira Code, monospace',
  },

  // Modular type scale (1.25 ratio)
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.563rem', // 25px
    '3xl': '1.953rem', // 31px
    '4xl': '2.441rem', // 39px
    '5xl': '3.052rem', // 49px
  },

  // Font weights
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights by context
  lineHeights: {
    tight: 1.1,      // Headings
    snug: 1.25,      // Subheadings
    normal: 1.5,     // Body text
    relaxed: 1.625,  // Long-form content
    loose: 1.75,     // Very readable body
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Component-specific presets
  presets: {
    hero: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
    },
    h1: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    bodyLarge: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    small: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    label: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    code: {
      fontSize: '0.875rem',
      fontFamily: 'JetBrains Mono, Fira Code, monospace',
      lineHeight: 1.6,
    },
  },

  // CSS Variable mappings
  cssVariables: {
    '--font-heading': 'Inter, system-ui, sans-serif',
    '--font-body': 'Inter, system-ui, sans-serif',
    '--font-mono': 'JetBrains Mono, Fira Code, monospace',
    '--text-xs': '0.75rem',
    '--text-sm': '0.875rem',
    '--text-base': '1rem',
    '--text-lg': '1.125rem',
    '--text-xl': '1.25rem',
    '--text-2xl': '1.563rem',
    '--text-3xl': '1.953rem',
    '--text-4xl': '2.441rem',
    '--text-5xl': '3.052rem',
    '--leading-tight': '1.1',
    '--leading-snug': '1.25',
    '--leading-normal': '1.5',
    '--leading-relaxed': '1.625',
    '--leading-loose': '1.75',
  },
};

export type TypographyPreset = keyof typeof typography.presets;