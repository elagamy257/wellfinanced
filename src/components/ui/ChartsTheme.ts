/**
 * Charts Theme Configuration
 * Grounded in the Dananir & Blanco design system from style.txt
 */

export const CHARTS_THEME = {
  colors: {
    purple: 'var(--color-primary-purple)',
    pink: 'var(--color-accent-pink)',
    green: 'var(--color-accent-mint)',
    cyan: 'var(--color-accent-cyan)',
    yellow: 'var(--color-accent-yellow)',
  },
  // Gradients matching the Figma aesthetics for area charts
  gradients: {
    purple: {
      stop1: 'var(--color-primary-purple)',
      stop2: 'rgba(124, 58, 237, 0)',
    },
    pink: {
      stop1: 'var(--color-accent-pink)',
      stop2: 'rgba(236, 72, 153, 0)',
    },
    green: {
      stop1: 'var(--color-accent-mint)',
      stop2: 'rgba(124, 255, 178, 0)',
    },
    cyan: {
      stop1: 'var(--color-accent-cyan)',
      stop2: 'rgba(6, 182, 212, 0)',
    },
    yellow: {
      stop1: 'var(--color-accent-yellow)',
      stop2: 'rgba(253, 224, 71, 0)',
    },
  },
  // Global defaults for grids, labels, and tooltips
  defaults: {
    gridStroke: 'rgba(255, 255, 255, 0.05)',
    tooltipBackground: 'var(--color-bg-2)',
    tooltipBorder: 'rgba(255, 255, 255, 0.08)',
    labelColor: 'rgba(255, 255, 255, 0.65)',
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
  }
};
