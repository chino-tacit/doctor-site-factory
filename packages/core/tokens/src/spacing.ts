/**
 * Spacing tokens for the Doctor Site Factory
 * Linear scale: 4, 8, 16, 24, 32, 48, 64, 96, 128
 */

export const spacing = {
  // Base unit: 4px
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  11: '2.75rem',  // 44px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  28: '7rem',     // 112px
  32: '8rem',     // 128px

  // Semantic spacing
  space: {
    none: '0',
    xs: '0.25rem',    // 4px - tight coupling (icon + label)
    sm: '0.5rem',     // 8px - related elements (input + label)
    md: '1rem',       // 16px - form fields, card padding
    lg: '1.5rem',     // 24px - card sections
    xl: '2rem',       // 32px - section separation
    '2xl': '3rem',    // 48px - major page sections
    '3xl': '4rem',    // 64px - hero sections
    '4xl': '6rem',    // 96px - large gaps
  },

  // Container widths
  containers: {
    prose: '65ch',        // Text readability
    sm: '24rem',          // 384px - small forms
    md: '28rem',          // 448px - medium forms
    lg: '32rem',          // 512px - large forms
    xl: '36rem',          // 576px
    '2xl': '42rem',       // 672px
    '3xl': '48rem',       // 768px
    '4xl': '56rem',       // 896px
    '5xl': '64rem',       // 1024px
    '6xl': '72rem',       // 1152px
    '7xl': '80rem',       // 1280px
    full: '100%',
  },

  // CSS Variable mappings
  cssVariables: {
    '--space-0': '0',
    '--space-1': '0.25rem',
    '--space-2': '0.5rem',
    '--space-3': '0.75rem',
    '--space-4': '1rem',
    '--space-5': '1.25rem',
    '--space-6': '1.5rem',
    '--space-8': '2rem',
    '--space-10': '2.5rem',
    '--space-12': '3rem',
    '--space-16': '4rem',
    '--space-20': '5rem',
    '--space-24': '6rem',
    '--space-32': '8rem',
  },
};

export type SpacingScale = keyof typeof spacing;
export type SemanticSpace = keyof typeof spacing.space;
export type ContainerSize = keyof typeof spacing.containers;