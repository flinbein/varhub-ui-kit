import type { UserConfig } from 'vite';
import varhubBundlePlugin from "@flinbein/rollup-plugin-varhub-bundle";

export default {
    root: "./src/example",
    base: "./",
    build: {
        outDir: "../../dist",
        emptyOutDir: true,
    },
    plugins: [varhubBundlePlugin()],
} satisfies UserConfig