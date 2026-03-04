import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import path from 'path'

export default defineConfig({
  base: "/",
  plugins: [solid()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@resources': path.resolve(__dirname, './src/resources'),
      '@core': path.resolve(__dirname, './src/core'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('samsung >= 4'))
    }
  }
})
