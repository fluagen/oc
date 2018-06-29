import { GroupModel } from '../model/index';

class GroupService {
  async getGroupByCode(code) {
    const group = await GroupModel.findOne({
      code: code
    }).exec();
    return group;
  }
}

const groupService = new GroupService();

export default groupService;
