module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'@vue/standard'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'space-before-function-paren': 0,
    // indent: [2, 'tab'],
    indent: ["off", 2],
    'semi': ["error", "always"],
    'semi': 0,
    "prefer-const": "off",
    "no-unused-vars": "off",
    'no-tabs': 'off',
		'no-console': 'off',
		'no-debugger': 'off',
		'no-mixed-spaces-and-tabs': 'off'

	}
}
