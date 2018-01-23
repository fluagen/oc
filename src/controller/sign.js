import { UserModel } from "../model/index";

class Sign {
  signup (ctx, next) {
    let userVO = ctx.request.body;
    console.log(userVO);
    let user = new UserModel();
    user.loginid = userVO.loginid;
    user.name = userVO.name;
    user.password = userVO.password;
    user.email = userVO.email;
    user.save().then(() => {
      console.log("signup successful")
    ctx.body = "signup successful";
  } ).catch(e => console.log(e));
  }

  signin(ctx, next) {
    ctx.response.body = "signin";
  }
}

const sign = new Sign();

export default sign;
