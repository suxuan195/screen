import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import legacy from '@vitejs/plugin-legacy'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default ({ command, mode }) => {
  // ↓加载环境变量
  const env = loadEnv(mode, process.cwd())
  const __DEV__ = mode === 'development'
  const alias = {
    '@': resolve(__dirname, 'src'),
    '@images': resolve(__dirname, 'src/images'),
    '@components': resolve(__dirname, 'src/components'),
    '@utils': resolve(__dirname, 'src/utils'),
  }
  // if (__DEV__) {
  //   // 解决警告You are running the esm-bundler build of vue-i18n.
  //   alias['vue-i18n'] = 'vue-i18n/dist/vue-i18n.cjs.js'
  // }
  return {
    // base: env['VITE_PUBLIC_PATH'],
    base: './',
    css: {
      /* CSS 预处理器 */
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/style/index.scss";'
        }
      }
    },
    // ↓插件配置
    plugins: [
      legacy({
        targets: ['defaults', 'ie >= 11', 'chrome 52'],  //需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: [
          'es.symbol',
          'es.array.filter',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.for-each',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.object.to-string',
          'web.dom-collections.for-each',
          'esnext.global-this',
          'esnext.string.match-all'
        ]
      }),

      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: false,
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // ↓解析配置
    resolve: {
      // ↓路径别名
      alias
    },
    // ↓服务端配置
    server: {
      // ↓读取环境变量中的HOST、PORT
      host: env['VITE_APP_HOST'],
      port: env['VITE_APP_PORT'],
      https: false,
      open: true,
      proxy: {
        '/api': {
          target: env['VITE_APP_DEV_URL'],
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      strictPort: false,
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) { // 分包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      },
      //生产环境时移除console.log()
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console.log()
          drop_console: true,
          drop_debugger: true,
        },
      },
    }
  }
}
