import mongoose from 'mongoose'

import app from "./app.js";

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${process.env.MONGO_URI}`);
});



app.listen(process.emit.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", process.emit.PORT);
});



