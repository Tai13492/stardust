import mongoose from "mongoose";

export default () => {
  mongoose
    .connect(
      "mongodb+srv://Tai13492:t0880055571@stardust-v1-xogzw.mongodb.net/test?retryWrites=true",
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    )
    .then(() => console.log("mongodb connected"))
    .catch((error: any) => console.log(error));
};
