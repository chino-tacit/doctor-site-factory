/**
 * Shadow tokens for the Doctor Site Factory
 * Elevation scale for depth perception
 */

export const shadows = {
  // Raw shadow values (Tailwind-compatible)
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Semantic shadows (elevation scale)
  elevation: {
    flat: 'none',
    raised: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    popover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    tooltip: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },

  // Colored shadows (for primary actions, etc.)
  colored: {
    primary: '0 10px 15px -3px rgba(46, 139, 87, 0.3), 0 4px 6px -4px rgba(46, 139, 87, 0.2)',
    primaryHover: '0 20px 25px -5px rgba(46, 139, 87, 0.4), 0 8px 10px -6px rgba(46, 139, 87, 0.3)',
  },

  // Inner shadows (for pressed states, inputs)
  inner: {
    none: 'none',
    sm: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    md: 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },

  // CSS Variable mappings
  cssVariables: {
    '--shadow-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '--shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '--shadow-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '--shadow-primary': '0 10px 15px -3px rgba(46, 139, 87, 0.3), 0 4px 6px -4px rgba(46, 139, 87, 0.2)',
  },
};

export type ShadowSize = keyof typeof shadows;
export type ElevationLevel = keyof typeof shadows.elevation;