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

    //测试代码 方便前端测试
    if (walletAddress === "0x01B16aff61D6a2f324d450e6D15EC09A768537C9".toLowerCase()) {
      //存入数据库
      invitationCode = 'a1111';
      await ctx.model.User.create({
        user_address: walletAddress,
        invitation_code: invitationCode,
        cover_invitation_code: coverInvitationCode
      });
      return {invitationCode:invitationCode};
    }

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
    let userModel = await ctx.model.User.findOne({user_address:walletAddress});
    let teamPeoples = await this.recursionTeamPeoples(userModel.invitation_code, 1);
    userModel.team_peoples  = teamPeoples + 1;
    let directPeopleModels = await ctx.model.User.find({cover_invitation_code:userModel.invitation_code, user_status:'2'});
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
        ctx.model.Order.update({order_index:order_index}, orderRecordModels[index]).exec();
      }
    }
    return orderRecordModels;
  }

  async teamDetail(body) {
    const ctx  = this.ctx;
    const walletAddress = body.walletAddress;
    let userModel = await ctx.model.User.findOne({user_address:walletAddress});
    let directPeopleModels = await ctx.model.User.find({cover_invitation_code:userModel.invitation_code, user_status:'2'});
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
    for (let index = 0; index < directPeoples.length; index++) {
      let localPeopleNumber = await this.recursionTeamPeoples(directPeoples[index].invitation_code, teamLevel);
      peopleNumber += localPeopleNumber;
    }
    return peopleNumber;
  }
};

module.exports = PMMService;
