import mongoose from 'mongoose'


const SoftwareSchema = new mongoose.Schema({
  name: String,
  degree: {
    type: Number,
    default: 0
  },
  photo: {
    data: Buffer,
    contentType: String,
  }
})

export default mongoose.model('Software',SoftwareSchema)