const express = require('express');
const axios = require('axios');
const cacheManager = require('../cache/cacheManager');
const router = express.Router();

// Endpoint to get processed data
router.get('/data', async (req, res) => {
  try {
    // Check cache
    const cacheKey = 'processedData';
    const cachedData = cacheManager.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Fetch raw data from WordPress
    const wpResponse = await axios.get('http://wordpress/wp-json/wp/v2/posts');
    const data = wpResponse.data;

    // Process data using Python service
    const pythonResponse = await axios.post('http://python-service:5000/process', { data });
    const processedData = pythonResponse.data;

    // Cache the processed data
    cacheManager.set(cacheKey, processedData);

    // Send the processed data
    res.json(processedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching or processing data');
  }
});

module.exports = router;
