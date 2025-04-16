const { processRfid, processTempToStock, getStockItems, getSoldItems } = require("../models/requestModel");

// Handle RFID Processing
const handleRfid = async (req, res) => {
    const { id } = req.body; // Extract ID from request

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    try {
        const result = await processRfid(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Handle Adding Name for TEMP ID
const handleTempToStock = async (req, res) => {
    const { name } = req.body; // Extract Name from request

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const result = await processTempToStock(name);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


const fetchStock = async (req, res) => {
    try {
        const items = await getStockItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stock items" });
    }
};

const fetchSold = async (req, res) => {
    try {
        const items = await getSoldItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sold items" });
    }
};

module.exports = {
    handleRfid,
    handleTempToStock,
    fetchStock,
    fetchSold
};

