import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        base: '1.8rem',
        sm: '1.53rem',
        xs: '1.35rem',
        '10px': '62.5%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      lineHeight: {
        relaxed: '1.618',
      },
      colors: {
        bodyText: '#4a4a4a',
      },
      spacing: {
        13: '13px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
export default config
