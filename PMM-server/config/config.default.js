/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1575878441916_307';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    myAppName: 'PMM',
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    }
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },

    domainWhiteList: ['http://192.168.1.15:8000']

  };

  config.cors = {
    credentials:true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.bodyParser = {
    jsonLimit:102400
  };

  exports.mongoose = {
    url: 'mongodb://127.0.0.1:27017/pmm',
    options: {},
  };

  exports.redis = {
    client: {
      "port": 6379,
      "host": "127.0.0.1",
      "password": "",
      "db": 0
    }
  };

  exports.joi = {
    options: {},
    locale: {
      'zh-cn': {}
    },
    throw: true, // when capture exception throw immediately
    throwHandle: (error) => { return error; }, // when throw is true the error message format
    errorHandle: (error) => { return error; }, // when throw is false the error message format
    resultHandle: (result) => { return result; } // fromat result
  };

  return {
    ...config,
    ...userConfig,
  };
};
