'use strict';
//订单同步定时器

const contract = require("../common/myContract");
const ContractParamType = require('../common/contractParamType');

const Subscription = require('egg').Subscription;// const DateFormat = require('dateformat-util');
class order extends Subscription {
  constructor(props) {
    super(props);
  }

  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1m',
      type: 'worker',
      immediate: false,
    };
  }

  async subscribe() {
    const ctx = this.ctx;
    console.log("定时");

    //获取订单总数
    let startIndex = await this.app.redis.get('order_number');
    startIndex = (startIndex === null ? 0 : startIndex);
    startIndex = parseInt(startIndex);
    console.log("startIndex" + startIndex);

    const orderModel = await contract.getBetByIndex(0);
    const endIndex = parseInt(orderModel[ContractParamType.OrderDetailType.order_number]);
    if (endIndex > startIndex) {
      await this.app.redis.set("order_number", endIndex);
      for (let index = startIndex; index < endIndex; index++) {
        const orderModel = await contract.getBetByIndex(index);
        const walletAddress = orderModel[ContractParamType.OrderDetailType.user_address];
        await this.ctx.model.Order.create({
          order_index: index,
          order_amount: orderModel[ContractParamType.OrderDetailType.order_amount],
          user_address: walletAddress,
          order_time: orderModel[ContractParamType.OrderDetailType.order_time],
          order_status: orderModel[ContractParamType.OrderDetailType.order_status]
        });

        //同步用户账户
        let regex = new RegExp(["^", walletAddress, "$"].join(""), "i");
        let userModel = await ctx.model.User.findOne({user_address:regex});
        if (userModel == null) {
          //合约获取账户信息插入数据库
          const userDetailData = await contract.getUserByAddress(walletAddress);
          userModel = {};
          userModel.user_address = walletAddress;
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
          userModel.invitation_code = userDetailData[ContractParamType.UserDetailType.invitation_code];
          userModel.cover_invitation_code = userDetailData[ContractParamType.UserDetailType.cover_invitation_code];
          userModel.first_transaction = true;
          await ctx.model.User.create(userModel);
        }
      }
    }
  }
}

module.exports = order;
