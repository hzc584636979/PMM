'use strict';

const Controller = require('egg').Controller;

class PMMController extends Controller {
  async invitationCode() {
    const { ctx } = this;
    // const body = ctx.request.body;
    // const walletAddress = body.walletAddress;
    // const invitatonCode = body.invitatonCode;
    ctx.body = {
      status: 1,
      data: "MDFEF12345",
      msg: 'success'
    };
  }

  async betSuccess() {
    const { ctx } = this;
    ctx.body = {
      status: 1,
      msg: 'success'
    };
  }

  async dataStatistics() {
    const { ctx } = this;
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
