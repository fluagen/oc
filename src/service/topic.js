import { TopicModel } from '../model/index';
import userService from './user';
import groupService from './group';
import replyService from './reply';

class TopicService {
  async getTopicById(id) {
    const topic = await TopicModel.findByIdAndUpdate(id, {
      $inc: { visit_count: 1 }
    })
      .lean()
      .exec();
    if (!topic) {
      return {
        topic: null,
        group: null
      };
    }

    const promises = [];
    promises.push(userService.getUserById(topic.author_id));
    promises.push(groupService.getSimpleGroupByCode(topic.group_id));
    promises.push(replyService.getRepliesByTid(topic._id));

    const [user, group, replies] = await Promise.all(promises);

    topic.avatar_url = user.avatar_url;

    return {
      topic,
      group,
      replies
    };
  }

  updateLastReply(tid, reply_id, reply_author_id, reply_at) {
    TopicModel.findByIdAndUpdate(tid, {
      last_reply_id: reply_id,
      last_reply_author_id: reply_author_id,
      last_reply_at: reply_at
    }).exec();
  }
}

const topicService = new TopicService();

export default topicService;
