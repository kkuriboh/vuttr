/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			body: ["'Comic Neue'", 'cursive'],
			display: ["'Comic Neue'", 'cursive'],
			mono: ["'Comic Neue'", 'cursive'],
			sans: ["'Comic Neue'", 'cursive'],
			serif: ["'Comic Neue'", 'cursive'],
		},
		extend: {},
	},
	plugins: [],
}
