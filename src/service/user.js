import { UserModel } from '../model/index';

class UserService {
  async getUserById(loginid) {
    const user = await UserModel.findOne({
      loginid: loginid
    }).exec();
    return user;
  }

}

const userService = new UserService();

export default userService;
