import { TopicModel } from '../model/index';
import userService from './user';
import groupService from './group';

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

    const [user, group] = await Promise.all(promises);

    topic.avatar_url = user.avatar_url;

    return {
      topic,
      group
    };
  }
}

const topicService = new TopicService();

export default topicService;
