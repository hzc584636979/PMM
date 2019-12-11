'use strict';

/** @type Egg.EggPlugin */
exports.cors = {
  enable:true,

  package:'egg-cors',

};
exports.mongoose = {
  enable:true,
  package:'egg-mongoose',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};
