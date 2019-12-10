'use strict';
//永动机服务
const Service = require('egg').Service;
const  InvitationCodeTools = require('../common/invitationCode');

class PMMService extends Service {
  async invitationCode(body) {
    const ctx = this.ctx;
    const walletAddress = body.walletAddress;
    const coverInvitatonCode = body.coverInvitatonCode;
    // await app.redis.set("123", "name");

    let invitationCode = "";
    let isRepeat = true;

    do{
      //生成邀请码
      const codeLength = 6;
      invitationCode = InvitationCodeTools.getInvitationCode(codeLength);
      console.log("邀请码" + invitationCode);
      const userModel = await ctx.model.User.find({invitation_code:invitationCode});
      if (userModel.length === 0) {
        //存入数据库
        await ctx.model.User.create({
          wallet_address: walletAddress,
          invitation_code: invitationCode,
          cover_invitation_code: coverInvitatonCode
        });
        isRepeat = false;
      }
    }while (isRepeat === true);

    return {invitationCode:invitationCode};
  }

  async betSuccess() {

  }

  async dataStatistics() {

  }

  async betRecord() {

  }
};

module.exports = PMMService;
