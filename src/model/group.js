import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let GroupSchema = new Schema({
  code: { type: String },
  name: { type: String },
  bio: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

mongoose.model('Group', GroupSchema);
