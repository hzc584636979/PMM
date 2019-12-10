'use strict';

const Controller = require('egg').Controller;

class PMMController extends Controller {
  async invitationCode() {
    const { ctx, app } = this;
    try {
      const body = ctx.request.body;
      const result = await ctx.service.pmm.invitationCode(body);
      ctx.body = {
        status: 1,
        data: result,
        msg: 'success'
      };
    }
    catch (e) {
      ctx.body = {
        status:0,
        data:JSON.stringify(e),
        msg:'fail'
      }
    }
  }

  async betSuccess() {
    const { ctx } = this;
    const body = ctx.request.body;
    try {
      const result = await ctx.service.pmm.betSuccess(body);
      ctx.body = {
        status: 1,
        data: result,
        msg: 'success'
      };
    }catch (e) {
      ctx.body = {
        status:0,
        data:JSON.stringify(e),
        msg:'fail'
      }
    }
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
