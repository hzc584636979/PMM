'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post("/api/v1/game/pmm/invitationCode",controller.pmm.invitationCode);
  router.post("/api/v1/game/pmm/betSuccess",controller.pmm.betSuccess);
  router.post("/api/v1/game/pmm/dataStatistics",controller.pmm.dataStatistics);
  router.get("/api/v1/game/pmm/betRecord",controller.pmm.betRecord);
};
