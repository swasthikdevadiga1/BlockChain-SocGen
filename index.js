require('dotenv').config();
const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

// Connect to blockchain
const provider = new ethers.JsonRpcProvider('http://localhost:8545');
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
    console.error("Error: PRIVATE_KEY is not set in the .env file.");
    process.exit(1);
}

const contractABI = [
    "function uploadFile(bytes32) public",
    "function verifyFile(bytes32) public view returns (bool)"
];

const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

app.post("/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });
    
    const hash = "0x" + crypto.createHash("sha256").update(file.buffer).digest("hex");
    console.log("Uploading hash:", hash);
    try {
        const tx = await contract.uploadFile(hash);
        await tx.wait();
        res.json({ message: "File uploaded successfully", hash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/verify", upload.single("file"), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });
    
    const hash = "0x" + crypto.createHash("sha256").update(file.buffer).digest("hex");
    console.log("Verifying hash:", hash);
    try {
        const isValid = await contract.verifyFile(hash);
        res.json({ valid: isValid, hash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});