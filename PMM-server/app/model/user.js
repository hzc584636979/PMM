'use strict';
//分红记录参数设置
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    wallet_address:   {type:String},    //钱包地址
    invitation_code: {type:String},  //邀请码
    cover_invitation_code : {type: String} //被邀请码
  });
  return mongoose.model('User', UserSchema, 'user_list');
};
