const pxtorem = require('postcss-pxtorem');
const pxtorem2 = _interopRequireDefault(pxtorem).default;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
export default {
  "hash": true,
  "html": {
    "template": "./src/index.ejs",
  },
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
        "/api/api/v1": {
          "target": "https://www.boq.hk",
          "changeOrigin": true,
          "secure": false,
        }
      },
    },
    "production": {}
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
