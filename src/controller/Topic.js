import {TopicModel} from '../model/index';
import ResponseResult from "../common/ResponseResult";

class Topic {

  async list(ctx, next) {

    let topics = await TopicModel.find({'deleted': false})
                                .sort('-last_reply_at -create_at')
                                .exec();

    ctx.body = ResponseResult.ok(topics);
  }

  async put(ctx, next){

    let topicObj = new TopicModel();
    user.loginid = loginid;
    user.passwd = hash;
    user.email = email;


TopicModel.save();
  }

}

export default Topic;
