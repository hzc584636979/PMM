
const md5 = require("md5");
module.exports  = () => {
  return async function reqCheck(ctx, next) {
    let body = ctx.request.body,
      method = ctx.request.method,
      url = ctx.request.url,
      signed = ctx.request.header["signed"];

    console.log(ctx.request.header, '------ctx.request.header---');
    let _signed = md5(JSON.stringify(body) + method + url);
    if (_signed !== signed) {
      ctx.body = {
        status:0,
        data:'header check error',
        msg:'fail'
      }
    } else {
      await next();
    }
  };
};
