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
        await this.ctx.model.Order.create({
          order_index: index,
          order_amount: orderModel[ContractParamType.OrderDetailType.order_amount],
          user_address: orderModel[ContractParamType.OrderDetailType.user_address],
          order_time: orderModel[ContractParamType.OrderDetailType.order_time],
          order_status: orderModel[ContractParamType.OrderDetailType.order_status]
        });
      }
    }
  }
}

module.exports = order;
