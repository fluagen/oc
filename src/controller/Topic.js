import { TopicModel } from '../model/index';
import ResponseResult from '../common/ResponseResult';

class Topic {
  async list(ctx, next) {
    let topics = await TopicModel.find({ deleted: false })
      .sort('-last_reply_at -create_at')
      .exec();

    ctx.body = ResponseResult.ok(topics);
  }

  async put(ctx, next) {
    let req = ctx.request.body;
    let title = req.title;
    let t_content = req.t_content;
    const user = ctx.state.user;

    let topic = new TopicModel();
    topic.title = title;
    topic.content = t_content;
    topic.author_id = user.userid;

    await topic.save();
    ctx.body = ResponseResult.ok({});
  }
}

export default Topic;
