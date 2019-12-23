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
    const coverInvitationCode = body.coverInvitatonCode;

    let invitationCode = "";
    let isRepeat = true;

    do{
      //生成邀请码
      const codeLength = 6;
      invitationCode = InvitationCodeTools.getInvitationCode(codeLength);
      console.log("邀请码" + invitationCode);
      const userModel = await ctx.model.User.find({invitation_code:invitationCode});
      if (userModel.length === 0) {
        //判断数据库里面有没有这个钱包地址，有钱包地址更新邀请码和被邀请码，没有则创建。
        let regex = new RegExp(["^", walletAddress, "$"].join(""), "i");
        const userModelByAddress = await ctx.model.User.findOne({user_address:regex});
        if (userModelByAddress === null) {
          await ctx.model.User.create({
            user_address: walletAddress,
            invitation_code: invitationCode,
            cover_invitation_code: coverInvitationCode
          });
        } else {
          userModelByAddress.invitation_code = invitationCode;
          userModelByAddress.cover_invitation_code = coverInvitationCode;
          await ctx.model.User.updateOne({user_address:walletAddress}, userModelByAddress).exec();
        }
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
    let regex = new RegExp(["^", walletAddress, "$"].join(""), "i");
    const userModel = await ctx.model.User.findOne({user_address: regex});
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
    userModel.first_transaction = true;
    await ctx.model.User.updateOne({user_address:walletAddress}, userModel).exec();
  }

  async dataStatistics(body) {
    const ctx  = this.ctx;
    const walletAddress = body.walletAddress;
    let regex = new RegExp(["^", walletAddress, "$"].join(""), "i");
    let userModel = await ctx.model.User.findOne({user_address:regex});
    if (userModel === null) {
      return {};
    }
    let teamPeoples = await this.recursionTeamPeoples(userModel.invitation_code, 1);
    userModel.team_peoples  = teamPeoples + 1;
    let directPeopleModels = await ctx.model.User.find({cover_invitation_code:userModel.invitation_code, first_transaction:true});
    userModel.direct_push_peoples = directPeopleModels.length;
    return userModel;
  }

  async betRecord(body) {
    const ctx = this.ctx;
    console.log(body);
    const walletAddress = body.walletAddress;
    const pageNo = body.page;
    const pageSize = body.pageSize;

    //不区分大小写表达式
    let regex = new RegExp(["^", walletAddress, "$"].join(""), "i");
    //分页查询
    const orderRecordModels = await ctx.model.Order.find({user_address:regex}).
    skip(pageNo * pageSize).
    limit(parseInt(pageSize)||20).
    sort({"order_index": -1});

    for (let index = 0; index < orderRecordModels.length; index++) {
      if (orderRecordModels[index].order_status === "1") {
        let order_index = orderRecordModels[index].order_index;
        const orderModel = await contract.getBetByIndex(orderRecordModels[index].order_index);
        orderRecordModels[index].order_status = orderModel[ContractParamType.OrderDetailType.order_status];
        ctx.model.Order.updateOne({order_index:order_index}, orderRecordModels[index]).exec();
      }
    }
    return orderRecordModels;
  }

  async teamDetail(body) {
    const ctx  = this.ctx;
    const walletAddress = body.walletAddress;
    let regex = new RegExp(["^", walletAddress, "$"].join(""), "i");
    let userModel = await ctx.model.User.findOne({user_address:regex});
    let directPeopleModels = await ctx.model.User.find({cover_invitation_code:userModel.invitation_code, first_transaction:true});
    return {user_self:userModel, user_next_level:directPeopleModels};
  }

  /*递归统计团队人数
  invitationCode : 邀请码
  teamLevel ：团队级别
  */
  async recursionTeamPeoples(invitationCode, teamLevel) {
    const ctx = this.ctx;

    let peopleNumber = 0;
    //最多统计到10级
    if (teamLevel > 10) {
      return peopleNumber;
    }
    teamLevel++;

    //查询这个邀请码下面的团队人数
    const directPeoples = await ctx.model.User.find({cover_invitation_code:invitationCode});
    peopleNumber += directPeoples.length;
    for (let index = 0; index < directPeoples.length; index++) {
      let localPeopleNumber = await this.recursionTeamPeoples(directPeoples[index].invitation_code, teamLevel);
      peopleNumber += localPeopleNumber;
    }
    return peopleNumber;
  }
};

module.exports = PMMService;
