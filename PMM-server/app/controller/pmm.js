'use strict';

const Controller = require('egg').Controller;

class PMMController extends Controller {
  async test() {
    const ctx = this.ctx;
    
    ctx.body = "hi, egg";
  }

  async invitationCode() {
    const { ctx } = this;
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
  }

  async dataStatistics() {
    const { ctx } = this;
    const body = ctx.request.body;
    try {
      const result = await ctx.service.pmm.dataStatistics(body);
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
  }

  async betRecord() {
    const { ctx } = this;
    const body = ctx.request.body;
    try {
      const result = await ctx.service.pmm.betRecord(body);
      ctx.body = {
        status: 1,
        data: result,
        msg: 'success'
      };
    } catch (e) {
      ctx.body = {
        status: 0,
        data: JSON.stringify(e),
        msg: 'fail'
      }
    }
  }

  async teamDetail() {
    const { ctx } = this;
    const body = ctx.request.body;
    try {
      const result = await ctx.service.pmm.teamDetail(body);
      ctx.body = {
        status: 1,
        data: result,
        msg: 'success'
      };
    } catch (e) {
      ctx.body = {
        status: 0,
        data: JSON.stringify(e),
        msg: 'fail'
      }
    }
  }
}

module.exports = PMMController;
