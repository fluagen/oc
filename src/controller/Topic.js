import {TopicModel} from '../model/index';

class Topic {

  list(ctx, next) {
    ctx.body = 'this is controller is topic object';
  }

}

export default Topic;
