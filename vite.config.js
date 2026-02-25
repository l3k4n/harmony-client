import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import path from 'path'

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('samsung >= 4'))
    }
  }
})
