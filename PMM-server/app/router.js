'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const contract = require("./common/myContract");
module.exports = app => {
  //初始化合约环境
  contract.myContract('https://kovan.etherscan.io');

  const { router, controller } = app;
  router.post("/api/v1/game/pmm/invitationCode",controller.pmm.invitationCode);
  router.post("/api/v1/game/pmm/betSuccess",controller.pmm.betSuccess);
  router.post("/api/v1/game/pmm/dataStatistics",controller.pmm.dataStatistics);
  router.get("/api/v1/game/pmm/betRecord",controller.pmm.betRecord);
};
