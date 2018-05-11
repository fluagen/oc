import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let TopicSchema = new Schema({
  title: { type: String },
  t_content: { type: String },
  author_id: { type: String },
  group_id: { type: String },
  top: { type: Boolean, default: false }, // 置顶帖
  good: { type: Boolean, default: false }, // 精华帖
  lock: { type: Boolean, default: false }, // 被锁定主题
  deleted: { type: Boolean, default: false },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  reply_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },

  followers: [
    {
      id: {
        type: String
      },
      create_at: {
        type: Date,
        default: Date.now
      }
    }
  ],

  collectors: [
    {
      id: {
        type: String
      },
      create_at: {
        type: Date,
        default: Date.now
      }
    }
  ],

  last_reply_id: { type: ObjectId },
  last_reply_author_id: { type: String },
  last_reply_at: { type: Date, default: Date.now }
});

mongoose.model('Topic', TopicSchema);
