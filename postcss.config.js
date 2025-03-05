export default {
  plugins: {
    'tailwindcss': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': false, // Disable nesting-rules in preset-env as we're using postcss-nested
      },
    },
    'autoprefixer': {},
  },
}
