import { ReplyModel } from '../model/index';
import userService from './user';

class ReplyService {
  async getRepliesByTid(tid) {
    let replies = await ReplyModel.find({ topic_id: tid })
      .lean()
      .sort('create_at')
      .exec();

    return replies;
  }

  async getReplyById(id) {
    let reply = await ReplyModel.findById(id).exec();
    if(reply){
      let author = await userService.getUserById(reply.author_id);
      reply.author = author;
    }
    return reply;
  }
  add(tid, r_content, user_id) {
    let reply = new ReplyModel();
    reply.topic_id = tid;
    reply.r_content = r_content;
    reply.author_id = user_id;

    reply.save();
  }

  async up(reply_id, user_id) {
    let reply = await ReplyModel.findById(reply_id).exec();

    reply.ups.push(user_id);

    reply.save();
  }
}

const replyService = new ReplyService();

export default replyService;
