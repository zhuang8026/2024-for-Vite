import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

export default ({ mode }) => {

    // const env = loadEnv(mode, process.cwd()); // 加载当前环境的环境变量
    return defineConfig({
        base: `./`,
        //mkcert(),
        plugins: [vue()],
        // server: {
        //     https: env.VITE_ENV === 'HTTPS' ? true : false
        // },
        resolve: {
            alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
        },
        build: {
            rollupOptions: {
                external: new RegExp('/mock/.*')
            } // ...etc.
        }

        // async configureServer(server) {
        //   const key = await fetch("/src/assets/key/localhost-key.pem").then((res) =>
        //     res.text()
        //   );
        //   const cert = await fetch("/src/assets/key/localhost.pem").then((res) =>
        //     res.text()
        //   );
        //   server.httpsOptions = { key, cert };
        // },
    }); //end: defineConfig
}; //end: default
