import { TopicModel, ReplyModel, UserModel } from "../model/index";
import ResponseResult from "../common/ResponseResult";

class Topic {
  async list(ctx, next) {
    let topics = await TopicModel.find({ deleted: false })
      .lean()
      .sort("-last_reply_at -create_at")
      .exec();

    if (topics) {
      topics = await Promise.all(topics.map(async topic => {
        let reply_id = topic.last_reply_id;
        let topicAuthor = await UserModel.findOne({ loginid: topic.author_id });
        topic.author = topicAuthor;
        if (reply_id) {
          let reply = await ReplyModel.findById(reply_id).lean();
          let replyAuthor = await UserModel.findOne({
            loginid: reply.author_id
          });
          topic.lastReply = reply;
          topic.lastReply.author = replyAuthor;
        }
        return topic;
      }));
      console.log(topics);
    }

    ctx.body = ResponseResult.ok({ topics: topics });
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
    ctx.body = ResponseResult.ok({ tid: topic.id });
  }

  async get(ctx, next) {
    let tid = ctx.params.tid;
    let topic = await TopicModel.findById(tid).exec();
    if (!topic) {
      ctx.throw(404);
    }
    ctx.body = ResponseResult.ok({ topic: topic });
  }
}

export default Topic;
