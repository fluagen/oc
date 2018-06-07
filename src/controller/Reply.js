import replyService from '../service/reply';
import topicService from '../service/topic';
import ResponseResult from '../common/ResponseResult';

class Reply {
  async put(ctx, next) {
    let user = ctx.state.user;
    if (!user) {
      ctx.throw(500, '非法的请求');
    }
    let req = ctx.request.body;
    let r_content = req.r_content;
    let tid = req.tid;

    let reply = await replyService.add(tid, r_content, user.loginid);

    topicService.updateLastReply(tid, reply._id, user.loginid, reply.create_at);

    ResponseResult.ok(reply);
  }

}


export default Reply;
