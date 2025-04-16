const { MongoClient } = require("mongodb");
const connectDB = require("../connectDB");

// Process RFID: Move ID from STOCK to SOLD or TEMP
const processRfid = async (id) => {
    const client = await connectDB();
    const db = client.db("iot");
    const stockCollection = db.collection("STOCK");
    const soldCollection = db.collection("SOLD");
    const tempCollection = db.collection("TEMP");

    // Check if ID exists in STOCK
    const item = await stockCollection.findOne({ id });

    if (item) {
        // Move data to SOLD and remove from STOCK
        await soldCollection.insertOne(item);
        await stockCollection.deleteOne({ id });
        return { status: "Moved to SOLD", data: item };
    } else {
        // Store only the ID in TEMP (TEMP should always have one value)
        await tempCollection.deleteMany({}); // Clear previous TEMP data
        await tempCollection.insertOne({ id });
        return { status: "Stored in TEMP", id };
    }
};

// Move ID from TEMP to STOCK with a name
const processTempToStock = async (name) => {
    const client = await connectDB();
    const db = client.db("iot");
    const stockCollection = db.collection("STOCK");
    const tempCollection = db.collection("TEMP");

    // Fetch the ID from TEMP
    const tempData = await tempCollection.findOne();
    if (!tempData) return { status: "No ID in TEMP" };

    const { id } = tempData;

    // Add to STOCK with the given name
    await stockCollection.insertOne({ id, name });

    // Remove ID from TEMP (it should be empty after use)
    await tempCollection.deleteMany({});
    
    return { status: "Moved to STOCK", id, name };
};
// 📌 Add this at the end of requestModel.js
const getStockItems = async () => {
    const client = await connectDB();
    const db = client.db("iot");
    const stockCollection = db.collection("STOCK");
    const items = await stockCollection.find().toArray();
    return items;
};

const getSoldItems = async () => {
    const client = await connectDB();
    const db = client.db("iot");
    const soldCollection = db.collection("SOLD");
    const items = await soldCollection.find().toArray();
    return items;
};

module.exports = {
    processRfid,
    processTempToStock,
    getStockItems,
    getSoldItems
};

