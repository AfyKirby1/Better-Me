/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'trust-blue': '#1e3a8a',
        'growth-green': '#059669',
        'achievement-gold': '#f59e0b',
        'calm-neutral': '#6b7280',
        'success-emerald': '#10b981',
        'warning-amber': '#f59e0b',
        'error-rose': '#f43f5e',
        'adhd-high-contrast': '#000000',
        'adhd-attention-orange': '#ea580c',
        'adhd-focus-blue': '#2563eb',
        'adhd-energy-yellow': '#eab308',
        'autism-soft-blue': '#bfdbfe',
        'autism-gentle-green': '#bbf7d0',
        'autism-warm-beige': '#fef3c7',
        'autism-muted-purple': '#ddd6fe',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
