'use strict';
//分红记录参数设置
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    user_address:   {type:String},    //钱包地址
    invitation_code: {type:String},  //邀请码
    cover_invitation_code : {type: String}, //被邀请码
    available_balance: {type:Number},  //可用余额
    blocked_balances: {type:Number},   //冻结余额
    total_recharge: {type:Number},     //充值总额
    total_cash_out: {type:Number},     //提现总额
    user_status: {type:Number},        //1：游戏中，2：游戏结束，结束后才能再次投注
    team_profit: {type:Number},        //团队收益
    today_wish_reward: {type:Number},  //今日导师祝福奖励
    total_static_profit: {type:Number}, //总静态收益
    total_team_profit: {type:Number},  //总团队收益
    total_wish_profit: {type:Number},  //总祝福收益
    total_teacher_profit: {type:Number}, //总导师收益
  });
  return mongoose.model('User', UserSchema, 'user_list');
};
