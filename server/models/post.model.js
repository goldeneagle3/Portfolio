import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: String,
  photo: {
    data: Buffer,
    contentType: String,
  },
  demoLink: String,
  gitLink: String,
  top: {
    type: Boolean,
    default: false
  },
  label:String
},{timestamps:true});


export default mongoose.model("Post", PostSchema);
