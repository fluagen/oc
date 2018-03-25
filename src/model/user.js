import mongoose from "mongoose";
import utility from "utility";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  loginid: { type: String },
  name: { type: String },
  passwd: { type: String },
  email: { type: String },
  pagehome: { type: String },
  avatar: { type: String },
  signature: { type: String },

  topic_count: { type: Number, default: 0 },
  reply_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  active: { type: Boolean, default: true }
});

UserSchema.virtual("avatar_url").get(function() {
  var url =
    this.avatar ||
    "//cdn.v2ex.co/gravatar/" +
      utility.md5(this.email.toLowerCase()) +
      "?d=retro";
  return url;
});

mongoose.model("User", UserSchema);
