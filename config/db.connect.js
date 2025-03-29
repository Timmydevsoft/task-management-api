import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if (connect) {
      console.log("DB conncted successfuly");
    }
  } catch (err) {
    console.log(err);
  }
};
export { dbConnect };
