import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import ViteYaml from "@modyfi/vite-plugin-yaml";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
    plugins: [
        /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
        // devtools(),
        ViteYaml(),
        solidPlugin(),
    ],
    server: {
        port: 3000,
    },
    build: {
        target: "esnext",
    },
});
