import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import multiEntry from "@rollup/plugin-multi-entry";

export default {
    input: "dist/**/*.js",
    output: [
        {
            file: "dist/duice-pagination.js",
            format: "iife",
            name: "duicePagination",
            sourcemap: true,
        },
        {
            file: "dist/duice-pagination.min.js",
            format: "iife",
            name: "duicePagination",
            plugins: [terser()],
            sourcemap: true,
        }
    ],
    plugins: [
        multiEntry(),
        visualizer({
            filename: "./dist/bundle-analysis.html"
        })
    ],
};