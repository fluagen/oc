import { TopicModel } from '../model/index';
import userService from './user';
import groupService from './group';
import replyService from './reply';

class TopicService {
  async getTopicById(id) {
    const topic = await TopicModel.findByIdAndUpdate(id, {
      $inc: { visit_count: 1 }
    })
      .exec();
    if (!topic) {
      return null;
    }
    const promises = [];
    promises.push(userService.getUserById(topic.author_id));
    promises.push(groupService.getGroupByCode(topic.group_id));
    promises.push(replyService.getReplyById(topic.last_reply_id));

    const [author, group, last_reply] = await Promise.all(promises);
    topic.author = author;
    topic.group = group;
    topic.last_reply = last_reply;

    return topic;
  }

  updateLastReply(tid, reply_id, reply_author_id, reply_at) {
    const topic = TopicModel.findByIdAndUpdate(tid, {
      last_reply_id: reply_id,
      last_reply_author_id: reply_author_id,
      last_reply_at: reply_at
    }).exec();
  }
}

const topicService = new TopicService();

export default topicService;
