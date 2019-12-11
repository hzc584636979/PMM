'use strict';
//分红记录参数设置
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    order_index : {type:Number, unique:true}, //订单索引
    order_amount: {type:String},    //交易额
    user_address :    {type: String},    //钱包地址
    order_time:   {type:String},        //交易时间
    order_status: {type:String}       //1未到期 2已到期
  });
  return mongoose.model('Order', OrderSchema, 'order_list');
};
