const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://muj191101:N5kzrPNyFvn0oeFq@mujiot.zuf6d7l.mongodb.net/";//

const connectDB = async () => {
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    console.log("Connected to MongoDB");
    return client;//.db("formdata"); // Return the database instance
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application if connection fails
  }
};

module.exports = connectDB;
