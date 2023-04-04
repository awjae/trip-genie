const CracoAlias = require('craco-alias');
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
  jest: {
    configure: {
      moduleNameMapper: {
        // '^@/(.*)$': '<rootDir>/src/$1',
        "^@/images/(.*)$": "<rootDir>/src/assets/images/$1",
        "^@/assets/(.*)$": "<rootDir>/src/assets/$1",
        "^@/pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@/components/(.*)$": "<rootDir>/src/components/$1",
        "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@/types/(.*)$": "<rootDir>/src/types/$1",
        "^@/store/(.*)$": "<rootDir>/src/store/$1",
      },
      transformIgnorePatterns: ["/node_modules/(?!ol)"],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
      }
    },
  },
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
