import { UserModel } from "../model/index";

class Sign {
  signup(ctx, next) {
    let userVO = ctx.request.query;
    ctx.response.body = userVO.loginid;

    let user = new UserModel();
    user.loginid = userVO.loginid;
    user.save();
  }

  signin(ctx, next) {
    ctx.response.body = "signin";
  }
}

var sign = new Sign();

export default sign;
