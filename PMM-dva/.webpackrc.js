const pxtorem = require('postcss-pxtorem');
const pxtorem2 = _interopRequireDefault(pxtorem).default;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
export default {
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  "extraPostCSSPlugins": [
    pxtorem2({ rootValue: 75, propWhiteList: [], })
  ],
  "theme": {
    "font-size-base": "22px",
  },
  "es5ImcompatibleVersions": true,
	"extraBabelIncludes":[
	   "node_modules/web3-core-method",
	   "node_modules/scryptsy",
	   "node_modules/ethereum-bloom-filters"
	],
  env: {
    development: {
      "proxy": {
        "/api/v1": {
          "target": "http://47.75.161.29:7001",
          "changeOrigin":true,
        }
      },
    },
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
