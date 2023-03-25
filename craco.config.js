const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
//   webpack: {
//     configure: {
//       output: {
//         filename: 'tripGenie.min.js',
//       },
//     },
//     plugins: [
//       new MiniCssExtractPlugin({
//         filename: 'tripGenie.min.css',
//         chunkFilename: 'tripGenie.min.chunk.css',
//       }),
//     ]
//   }
} 
