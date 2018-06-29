import { TopicModel, ReplyModel, UserModel, GroupModel } from '../model/index';
import ResponseResult from '../common/ResponseResult';
import topicService from '../service/topic';

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
    let topic = await topicService.getTopicById(tid);

    const rst = {
      id: topic._id,
      title: topic.title,
      t_content: topic.t_content,
      visit_count: topic.visit_count,
      create_at: topic.create_at,
      author: {
        id: topic.author.loginid,
        avatar_url: topic.author.avatar_url
      },
      category: {
        code: topic.group.code,
        name: topic.group.name
      }
    };

    if (topic.last_reply) {
      const last_reply = topic.last_reply;
      rst.last_reply = {
        id: last_reply._id,
        author_id: last_reply.author.loginid,
        author_avatar_url: last_reply.author.avatar_url,
        reply_at: topic.last_reply_at
      };
    }

    console.log(rst);


    if (!rst) {
      ctx.throw(404);
    }

    ctx.body = ResponseResult.ok(rst);
  }
}

export default Topic;
