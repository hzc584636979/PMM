'use strict';
//永动机服务
const Service = require('egg').Service;
const  InvitationCodeTools = require('../common/invitationCode');
const contract = require("../common/myContract");
const ContractParamType = require('../common/contractParamType');

class PMMService extends Service {
  async invitationCode(body) {
    const ctx = this.ctx;
    const walletAddress = body.walletAddress;
    const coverInvitationCode = body.coverInvitationCode;

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
          user_address: walletAddress,
          invitation_code: invitationCode,
          cover_invitation_code: coverInvitationCode
        });
        isRepeat = false;
      }
    }while (isRepeat === true);

    return {invitationCode:invitationCode};
  }

  async betSuccess(body) {
    const ctx = this.ctx;
    // const transactionHash = body.transactionHash;
    // const transactionAmount = body.transactionAmount;
    const walletAddress = body.walletAddress;
    const userDetailData = await contract.getUserByAddress(walletAddress);

    // //更新用户信息
    const userModel = await ctx.model.User.findOne({user_address: walletAddress});
    userModel.available_balance = userDetailData[ContractParamType.UserDetailType.available_balance];
    userModel.blocked_balances = userDetailData[ContractParamType.UserDetailType.blocked_balances];
    userModel.total_recharge = userDetailData[ContractParamType.UserDetailType.total_recharge];
    userModel.total_cash_out = userDetailData[ContractParamType.UserDetailType.total_cash_out];
    userModel.today_wish_reward = userDetailData[ContractParamType.UserDetailType.today_wish_reward];
    userModel.user_status = userDetailData[ContractParamType.UserDetailType.user_status];
    userModel.total_static_profit = userDetailData[ContractParamType.UserDetailType.total_static_profit];
    userModel.total_team_profit = userDetailData[ContractParamType.UserDetailType.total_team_profit];
    userModel.total_wish_profit = userDetailData[ContractParamType.UserDetailType.total_wish_profit];
    userModel.total_teacher_profit = userDetailData[ContractParamType.UserDetailType.total_teacher_profit];

    await ctx.model.User.update({user_address:walletAddress}, userModel).exec();
  }

  async dataStatistics(body) {
    const ctx  = this.ctx;
    const walletAddress = body.walletAddress;
    return  await ctx.model.User.findOne({user_address:walletAddress});
  }

  async betRecord(body) {
    const ctx = this.ctx;
    console.log(body);
    const walletAddress = body.walletAddress;

    //不区分大小写表达式
    let regex = new RegExp(["^", walletAddress, "$"].join(""), "i");
    const orderRecordModels = await ctx.model.Order.find({user_address:regex});
    return orderRecordModels;
  }
};

module.exports = PMMService;
