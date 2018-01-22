import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/oc');

import "./user";
import "./topic";

var UserModel = mongoose.model('User');
var TopicModel = mongoose.model('Topic');

export {UserModel, TopicModel};
