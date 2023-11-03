module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'my-image': "url('https://raw.githubusercontent.com/ExzoDev/bg-img/main/bg.png')",
      },
      colors: {
        primary: "#0f1047",
        warn: "#05063a",
        error: "#0c0e8e",
        twitter: "#1DA1F2",
        telegram: "#0088cc",
        youtube: "#891727",
        discord: "#7289da"
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};