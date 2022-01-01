import mongoose from 'mongoose'


const BookSchema = new mongoose.Schema({
  title: String,
  link:String,
  photo: {
    data: Buffer,
    contentType: String,
  },
  status: {
    type: String,
    default: "Reading"
  },
  description:String,
})

export default mongoose.model('Book',BookSchema)