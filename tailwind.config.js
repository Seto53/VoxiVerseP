/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "dark-blue-100": "#0037cf",
                "dark-red-100": "#cf0000",
                "light-blue-100": "#1b8ce3",
                "color-grey": "rgba(255, 255, 255, 0.08)",
                "color-dark": "rgba(26, 29, 33, 0.96)",
                "noble-black-0": "#fff",
                "noble-black-100": "#e8e9e9",
                "noble-black-200": "#cdcecf",
                "noble-black-300": "#9b9c9e",
                "noble-black-400": "#686b6e",
                "noble-black-500": "#363a3d",
                "noble-black-600": "#1a1d21",
                "noble-black-700": "#131619",
                "noble-black-800": "#0d0f10",
                "noble-black-900": "#060708",
                "day-blue-100": "#ebedfc",
                "day-blue-200": "#d2d8f9",
                "day-blue-300": "#a6b0f2",
                "day-blue-400": "#7989ec",
                "day-blue-500": "#4d62e5",
                "day-blue-600": "#3045c9",
                "day-blue-700": "#243497",
                "day-blue-800": "#182364",
                "day-blue-900": "#0c1132",
                "purple-blue-100": "#f0e8fd",
                "purple-blue-200": "#deccfb",
                "purple-blue-300": "#bd9af8",
                "purple-blue-400": "#9c67f4",
                "purple-blue-500": "#7c35f1",
                "purple-blue-600": "#5f18d4",
                "purple-blue-700": "#47129f",
                "purple-blue-800": "#300c6a",
                "purple-blue-900": "#180635",
                "sunglow-100": "#fffaea",
                "sunglow-200": "#fff3d1",
                "sunglow-300": "#ffe8a3",
                "sunglow-400": "#ffdc75",
                "sunglow-500": "#ffd147",
                "sunglow-600": "#e2b42b",
                "sunglow-700": "#aa8720",
                "sunglow-800": "#715a15",
                "sunglow-900": "#392d0b",
                "stem-green-100": "#f7fdf4",
                "stem-green-200": "#edfbe6",
                "stem-green-300": "#dbf7cd",
                "stem-green-400": "#c8f4b4",
                "stem-green-500": "#b6f09c",
                "stem-green-600": "#9ad37f",
                "stem-green-700": "#739f5f",
                "stem-green-800": "#4d6a3f",
                "stem-green-900": "#263520",
                "heisenberg-blue-100": "#f1fbfe",
                "heisenberg-blue-200": "#e0f6fd",
                "heisenberg-blue-300": "#c0edfb",
                "heisenberg-blue-400": "#a1e4f9",
                "heisenberg-blue-500": "#82dbf7",
                "heisenberg-blue-600": "#65beda",
                "heisenberg-blue-700": "#4c8fa4",
                "heisenberg-blue-800": "#335f6d",
                "heisenberg-blue-900": "#193037",
                "happy-orange-100": "#fff2e9",
                "happy-orange-600": "#e26f20",
                "happy-orange-900": "#391c08",
                "electric-green-100": "#f3fbf7",
                "electric-green-600": "#4ac97e",
                "electric-green-900": "#122b1d",
                "red-power-100": "#fbecec",
                "red-power-600": "#d0302f",
                "red-power-900": "#2f0f0e",
                "gradient-blue-green": "linear-gradient(45deg, #82dbf7, #b6f09c)",
            },
            fontFamily: {
                "plus-jakarta-sans": ["var(--font-plus-jakarta-sans)"],
            },
            fontSize: {
                "font-xxs": "8px",
                "font-xs": "10px",
                "font-s": "12px",
                "font-m": "14px",
                "font-l": "16px",
                "font-xl": "18px",
                "font-xxl": "24px",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
