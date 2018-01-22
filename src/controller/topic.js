import {TopicModel} from '../model/index';

class Topic {

  list(ctx, next) {
    ctx.body = 'this is controller is topic object';
  }

}

let topic = new Topic();

export default topic;
