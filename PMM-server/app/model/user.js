'use strict';
//分红记录参数设置
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    user_address:   {type:String},    //钱包地址
    invitation_code: {type:String},  //邀请码
    cover_invitation_code : {type: String}, //被邀请码
    available_balance: {type:String},  //可用余额
    blocked_balances: {type:String},   //冻结余额
    total_recharge: {type:String},     //充值总额
    total_cash_out: {type:String},     //提现总额
    today_wish_reward: {type:String},  //今日导师祝福奖励
    user_status: {type:String, default:'1'},        //1：游戏中，2：游戏结束，结束后才能再次投注
    total_static_profit: {type:String}, //总静态收益
    total_team_profit: {type:String},  //总团队收益
    total_wish_profit: {type:String},  //总祝福收益
    total_teacher_profit: {type:String}, //总导师收益
    team_peoples : {type:Number, default:1}, //团队人数
    direct_push_peoples:{type:Number, default: 0} //直推人数
  });
  return mongoose.model('User', UserSchema, 'user_list');
};
