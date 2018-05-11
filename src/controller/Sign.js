import { UserModel } from "../model/index";
import ResponseResult from "../common/ResponseResult";
import validator from "validator";
import bcrypt from "bcryptjs";
import _ from "lodash";
import jwt from "jsonwebtoken";

let salt = bcrypt.genSaltSync(10);

class Sign {
  async signup(ctx, next) {
    let req = ctx.request.body;
    let loginid = req.loginid;
    let passwd = req.passwd;
    let repasswd = req.repasswd;
    let email = req.email;

    let prop_err = _.some([loginid, passwd, repasswd, email], item => {
      return item === undefined;
    });

    if (prop_err) {
      ctx.throw(500, "非法的数据格式");
    }

    //1. 验证
    //1.1 验证注册id
    const loginid_exp = /^[a-zA-Z][a-zA-Z0-9_]+$/i;
    if (
      !validator.matches(loginid, loginid_exp) ||
      !validator.isLength(loginid, { min: 5, max: 15 })
    ) {
      ctx.body = ResponseResult.info(
        100110,
        "登录名需要5到15位字符，只能包含字母、数字、下划线，以字母开头。"
      );
      return;
    }

    //1.2 验证email
    if (!validator.isEmail(email)) {
      ctx.body = ResponseResult.info(100120, "email不合法");
      return;
    }

    //1.3 验证密码
    if (passwd !== repasswd) {
      ctx.body = ResponseResult.info(100130, "两次输入的密码不一致");
      return;
    }
    if (passwd.length < 6) {
      ctx.body = ResponseResult.info(100131, "密码至少需要6个字符");
      return;
    }

    let hash = bcrypt.hashSync(passwd, salt);

    //2. 保存用户
    let user = new UserModel();
    user.loginid = loginid;
    user.passwd = hash;
    user.email = email;

    await user.save();
    ctx.body = ResponseResult.ok({});
  }

  async signin(ctx, next) {
    let req = ctx.request.body;
    let loginid = req.loginid;
    let passwd = req.passwd;
    let user = await UserModel.findOne({ loginid: loginid });

    if (!user) {
      ctx.body = ResponseResult.info(100140, "用户名或密码错误");
      return;
    }

    if (await bcrypt.compare(passwd, user.passwd)) {
      let token = jwt.sign({ userid: loginid }, "occc");
      ctx.body = ResponseResult.ok({ token: token });
    } else {
      ctx.body = ResponseResult.info(100140, "用户名或密码错误");
    }
  }
}

export default Sign;
