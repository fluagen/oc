import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/oc");

import "./user";
import "./topic";
import "./reply";
import "./group";

var UserModel = mongoose.model("User");
var TopicModel = mongoose.model("Topic");
var ReplyModel = mongoose.model("Reply");
var GroupModel = mongoose.model("Group");

export { UserModel, TopicModel, ReplyModel, GroupModel };
