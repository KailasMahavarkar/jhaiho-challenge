module.exports = {
	env: {
		node: true,
		commonjs: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 13,
	},
	rules: {
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};