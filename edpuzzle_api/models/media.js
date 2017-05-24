const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const mediaSchema = new Schema({
  	videoId: String, //this is an id to get the video from youtube
    title: String,
  	author: String,
    questions: [{time: Number, questionId: { type: Schema.Types.ObjectId, ref: 'Question' }}]
  },
  {

  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);


const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
