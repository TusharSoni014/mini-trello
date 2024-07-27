import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database using the `mongoose` library.
 * 
 * This function connects to the MongoDB database specified by the `MONGO_URI` environment variable,
 * and uses the "trello-clone" database name.
 * 
 * If the connection is successful, a message is logged to the console. If there is an error
 * connecting to the database, an error message is logged to the console.
 */
export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "trello-clone",
    });
    console.log("connection established!");
  } catch (error) {
    console.log("error connecting to database");
  }
};
