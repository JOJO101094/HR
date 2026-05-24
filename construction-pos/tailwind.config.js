/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#F7931E',
        success: '#28A745',
        danger: '#DC3545',
        warning: '#FFC107',
        dark: '#1A1A1A',
        light: '#F5F5F5',
      },
      backgroundColor: {
        'card': '#FFFFFF',
        'hover': '#F9F9F9',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.1)',
        'hover': '0 4px 12px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
};
