const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy middleware
const proxyMiddleware = async (req, res, next) => {
  const endpoint = req.params[0];
  const targetUrl = `http://51.178.42.126/${endpoint}`;
  
  try {
    const response = await axios.get(targetUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
};

// Routes that use the proxy middleware
app.get('/*', proxyMiddleware);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
