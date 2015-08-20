module.exports = {
	entry: [
		"./main.js"
	],
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, loaders: ['jsx?harmony']}
		]
	}
}