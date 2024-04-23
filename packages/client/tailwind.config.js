/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                youtube: "#cc0000", // works ⭕️ <-- I tested it for s2condYellow but it works perfectly!
                tiktok: "#fe2c55", // should work ⭕️
            },
        },
    },
    safelist: [
        {
            pattern: /(bg|text)-(tiktok|youtube)/,
        },
    ],
    plugins: [],
};
