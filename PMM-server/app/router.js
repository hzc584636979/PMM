'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const contract = require("./common/myContract");
module.exports = app => {
  const { router, controller } = app;
  //初始化合约环境
  contract.myContract('https://kovan.infura.io/v3/58f018284cce4c9599a447f698df4496');
  //同步链上订单
  app.runSchedule('order');

  router.post("/api/v1/game/pmm/invitationCode",controller.pmm.invitationCode);
  router.post("/api/v1/game/pmm/betSuccess",controller.pmm.betSuccess);
  router.post("/api/v1/game/pmm/dataStatistics",controller.pmm.dataStatistics);
  router.post("/api/v1/game/pmm/betRecord",controller.pmm.betRecord);
};
