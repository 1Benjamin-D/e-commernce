import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                Luciole_Regular: [`var(--font-Luciole_Regular)`],
            },
            colors: {
                firstStepGradient: "#FF5863",
                secondStepGradient: "#FD8F50",
                thirdStepGradient: "#FFC53E",
            },
            textColor: {
                "custom_red": "#FF0000",
                "custom_orange": "#FD8F50"
            },
            backgroundColor: {
                "custom_orange": "#FD8F50"
            },
            screens: {
                "mobile": {max: '390px'}
            }
        },
    },
    plugins: [],
};
export default config;
