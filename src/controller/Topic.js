import jwt from "jsonwebtoken";

import { TopicModel } from "../model/index";
import ResponseResult from "../common/ResponseResult";

class Topic {
  async list(ctx, next) {
    let topics = await TopicModel.find({ deleted: false })
      .sort("-last_reply_at -create_at")
      .exec();

    ctx.body = ResponseResult.ok(topics);
  }

  async put(ctx, next) {
    let user = ctx.state.user;
    if (!user) {
      ctx.throw(500, "非法的请求");
    }

    let req = ctx.request.body;
    let title = req.title;
    let t_content = req.t_content;

    let topic = new TopicModel();
    topic.author_id = user.userid;
    topic.title = title;
    topic.t_content = t_content;
    await topic.save();
    ctx.body = ResponseResult.ok({"tid":topic.id});
  }
}

export default Topic;
