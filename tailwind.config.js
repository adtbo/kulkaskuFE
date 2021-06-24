module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      blur: ['hover'],
      dropShadow: ['hover', 'focus'],
      visibility: ['hover', 'focus']
    },
  },
  plugins: [],
};
