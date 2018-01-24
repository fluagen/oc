import { UserModel } from "../model/index";
import validator from 'validator';

class Sign {
  async signup (ctx, next) {
    let userVO = ctx.request.body;
    let user = new UserModel();
    user.loginid = userVO.loginid;
    user.name = userVO.name;
    user.password = userVO.password;
    user.email = userVO.email;

    //1. 验证
// 1.1 验证注册id
    const exp = /^[a-zA-Z_][a-zA-Z0-9_]+$/i;

    //2. 保存用户


    await user.save().catch((err) => {
ctx.throw(500,err);
    });
    let result = {};



ctx.body = "signup successful";


    // await user.save().then(() => {
    //   console.log("signup successful");
    //   ctx.body = "signup successful";
    // }).catch((err) => {
    //   console.log(err);
    //   ctx.status = err.status || 500;
    //   ctx.body = err.message;
    // });

    // console.log(rst);
    //
    // rst.then(() => {
    //   ctx.body = "signup successful";
    // }).catch((err) => {
    //   console.log(err);
    //   ctx.status = err.status || 500;
    //   ctx.body = err.message;
    // });
  }

  signin(ctx, next) {
    ctx.response.body = "signin";
  }
}

const sign = new Sign();

export default sign;
