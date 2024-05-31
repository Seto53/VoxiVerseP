module.exports = {
    plugins: [
        // // Restore the Next.js default behavior
        // "postcss-flexbugs-fixes",
        // [
        //     "postcss-preset-env",
        //     {
        //         autoprefixer: {
        //             flexbox: "no-2009",
        //         },
        //         stage: 3,
        //         features: {
        //             "custom-properties": false,
        //         }
        //     }
        // ],
        // // Configure PurgeCSS
        // [
        //     "@fullhuman/postcss-purgecss",
        //     {
        //         content: [
        //             "./app/**/*.{js,jsx,ts,tsx}",
        //             './components/**/*.{js,jsx,ts,tsx}'
        //         ],
        //         defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        //         safelist: {
        //             standard: ["html", "body"],
        //             deep: [
        //                 // whitelist all CSS classes that start
        //                 // with "mt-" and "mb-"
        //                 /^mt-/,
        //                 /^mb-/,
        //             ],
        //         }
        //     }
        // ],
        "tailwindcss",
        "autoprefixer",
    ],
};
