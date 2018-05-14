import { GroupModel } from '../model/index';
import ResponseResult from '../common/ResponseResult';

class Group {
  async put(ctx, next) {
    let user = ctx.state.user;
    if (!user) {
      ctx.throw(500, '非法的请求');
    }

    let req = ctx.request.body;
    let code = req.code;
    let name = req.name;
    let bio = req.bio;

    let group = new GroupModel();
    group.code = code;
    group.name = name;
    group.bio = bio;

    await group.save();

    ctx.body = ResponseResult.ok(group.id);
  }
}

export default Group;
