import { TopicModel, ReplyModel, UserModel, GroupModel } from '../model/index';
import ResponseResult from '../common/ResponseResult';

class Topic {
  async list(ctx, next) {
    let topics = await TopicModel.find({ deleted: false })
      .lean()
      .sort('-last_reply_at -create_at')
      .exec();

    if (topics) {
      topics = await Promise.all(
        topics.map(async topic => {

          let author = await UserModel.findOne({
            loginid: topic.author_id
          });

          // let reply_id = topic.last_reply_id;
          // if (reply_id) {
          //   let reply = await ReplyModel.findById(reply_id).lean();
          //   let replyAuthor = await UserModel.findOne({
          //     loginid: reply.author_id
          //   });
          //   topic.lastReply = reply;
          //   topic.lastReply.author = replyAuthor;
          // }
          let group_id = topic.group_id;
          let group = await GroupModel.findOne({ code: group_id });

          topic.group_name = group.name;
          topic.avatar_url = author.avatar_url;

          return topic;
        })
      );
      console.log(topics);
    }

    ctx.body = ResponseResult.ok(topics);
  }

  async put(ctx, next) {
    let user = ctx.state.user;
    if (!user) {
      ctx.throw(500, '非法的请求');
    }

    let req = ctx.request.body;
    let title = req.title;
    let t_content = req.t_content;

    //TODO 验证group_id是否存在
    let group_id = req.group_id;


    let topic = new TopicModel();
    topic.author_id = user.userid;
    topic.title = title;
    topic.t_content = t_content;
    topic.group_id = group_id;
    await topic.save();
    ctx.body = ResponseResult.ok(topic.id);
  }

  async get(ctx, next) {
    let tid = ctx.params.tid;
    let topic = await TopicModel.findById(tid).exec();
    if (!topic) {
      ctx.throw(404);
    }
    ctx.body = ResponseResult.ok(topic);
  }
}

export default Topic;
