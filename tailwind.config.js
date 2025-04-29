/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,js}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': 'rgba(13, 32, 78, 1)',
        'teal-green': 'rgba(36, 138, 136, 1)',
        'orange': 'rgba(242, 119, 75, 1)',
        'yellow': 'rgba(247, 183, 30, 1)',
        'light-green': 'rgba(105, 216, 161, 1)',
        'blue': 'rgba(44, 82, 245, 1)',
        'purple': 'rgba(130, 93, 191, 1)',
        'gray-dark': 'rgba(71, 85, 105, 1)',
        'light-gray': '#F7F7F7',
        'lighter-gray': '#F2F2F2',
        'strong-blue': '#2C52F5',
        'red': '#FF3B30',
        'green': '#5DBF96',
      },
    },
  },
  plugins: [],
}

