"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const node_cache_1 = __importDefault(require("node-cache"));
const app = (0, express_1.default)();
const port = 3000;
// Set up a cache with a TTL of 1 hour (3600 seconds)
const cache = new node_cache_1.default({ stdTTL: 3600 });
// WordPress API URL (adjust the URL to your WordPress setup)
const WORDPRESS_API_URL = 'http://localhost:8000/wp-json/wp/v2/posts';
// Python Service API URL
const PYTHON_SERVICE_URL = 'http://localhost:5000/process-data';
// Fetch and process data from WordPress
const fetchAndProcessData = async () => {
    try {
        // Check if data is in the cache
        const cachedData = cache.get('processedData');
        if (cachedData) {
            return cachedData;
        }
        // Fetch data from the WordPress REST API
        const response = await axios_1.default.get(WORDPRESS_API_URL);
        const rawData = response.data;
        // Send the raw data to the Python service for processing
        const processedResponse = await axios_1.default.post(PYTHON_SERVICE_URL, rawData);
        const processedData = processedResponse.data;
        // Store processed data in cache
        cache.set('processedData', processedData);
        return processedData;
    }
    catch (error) {
        console.error('Error fetching or processing data:', error);
        throw new Error('Data processing failed');
    }
};
// API Endpoint to serve processed data
app.get('/api/processed-data', async (req, res) => {
    try {
        const data = await fetchAndProcessData();
        res.json(data);
    }
    catch (error) {
        res.status(500).send('Error processing data');
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
