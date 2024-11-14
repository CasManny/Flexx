import mongoose from "mongoose";

const connectDb = async () => {
    try {
      console.log(process.env.MONGODB_URL)
        const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`connect Db at host ${conn.connection.host}`);
  } catch (error) {
    console.log(`Failed to connect to database ${error.message}`);
    process.exit(1);
  }
};

export default connectDb
