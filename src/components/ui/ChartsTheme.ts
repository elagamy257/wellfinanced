/**
 * Charts Theme Configuration
 * Grounded in the Dananir & Blanco design system from style.txt
 */

export const CHARTS_THEME = {
  colors: {
    purple: '#8B5CF6',
    pink: '#EC4899',
    green: '#7CFFB2',
    cyan: '#22D3EE',
    yellow: '#FACC15',
  },
  // Gradients matching the Figma aesthetics for area charts
  gradients: {
    purple: {
      stop1: '#8B5CF6',
      stop2: 'rgba(139, 92, 246, 0)',
    },
    pink: {
      stop1: '#EC4899',
      stop2: 'rgba(236, 72, 153, 0)',
    },
    green: {
      stop1: '#7CFFB2',
      stop2: 'rgba(124, 255, 178, 0)',
    },
    cyan: {
      stop1: '#22D3EE',
      stop2: 'rgba(34, 211, 238, 0)',
    },
    yellow: {
      stop1: '#FACC15',
      stop2: 'rgba(250, 204, 21, 0)',
    },
  },
  // Global defaults for grids, labels, and tooltips
  defaults: {
    gridStroke: 'rgba(255, 255, 255, 0.05)',
    tooltipBackground: '#09152E',
    tooltipBorder: 'rgba(255, 255, 255, 0.08)',
    labelColor: 'rgba(255, 255, 255, 0.65)',
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
  }
};
