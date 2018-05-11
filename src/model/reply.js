import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let ReplySchema = new Schema({
  r_content: { type: String },
  topic_id: { type: ObjectId },
  author_id: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  ups: [Schema.Types.ObjectId]
});

mongoose.model('Reply', ReplySchema);
