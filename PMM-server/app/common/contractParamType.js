UserDetailType = {
  //可用余额
  available_balance : 0,
  //冻结余额
  blocked_balances : 1,
  //充值总额
  total_recharge : 2,
  //提现总额
  total_cash_out : 3,
  //邀请码
  invitation_code : 4,
  //被邀请码
  cover_invitation_code : 5,
  //今日导师祝福奖励
  today_wish_reward : 6,
  //状态，1：游戏中，2：游戏结束，结束后才能再次投注
  user_status : 7,
  //总静态收益
  total_static_profit : 8,
  //总团队收益
  total_team_profit : 9,
  //总导师祝福收益
  total_wish_profit : 10,
  //总导师收益
  total_teacher_profit : 11
};

OrderDetailType = {
  //投注的地址
  user_address : 0,
  //投注金额
  order_amount : 1,
  //投注时间
  order_time: 2,
  //投注的状态，1是未到期，2是已到期
  order_status: 3,
  //所有用户总投注次数
  order_number: 4
};

module.exports.UserDetailType = UserDetailType;
module.exports.OrderDetailType = OrderDetailType;
