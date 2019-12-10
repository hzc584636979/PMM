'use strict';

const Controller = require('egg').Controller;

class PMMController extends Controller {
  async invitationCode() {
    const { ctx } = this;
    // const body = ctx.request.body;
    // const walletAddress = body.walletAddress;
    // const coverInvitatonCode = body.coverInvitatonCode;
    ctx.body = {
      status: 1,
      data: {
        invitationCode:"MEDDFDSFDSFSF"
      },
      msg: 'success'
    };
  }

  async betSuccess() {
    const { ctx } = this;
    const body = ctx.request.body;
    const transactionHash = body.transactionHash;
    const transactionAmount = body.transactionAmount;
    const walletAddress = body.walletAddress;
    ctx.body = {
      status: 1,
      msg: 'success'
    };
  }

  async dataStatistics() {
    const { ctx } = this;
    const body = ctx.request.body;
    const walletAddress = body.walletAddress;
    const data = {md:0, value:1};
    ctx.body = {
      status: 1,
      data:data,
      msg: 'success'
    };
  }

  async betRecord() {
    const { ctx } = this;
    ctx.body = "betRecord";
  }
}

module.exports = PMMController;
