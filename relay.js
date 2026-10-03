const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/:zone', async (req, res) => {
  try {
    const { zone } = req.params;
    const { state } = req.body;

    if (!['ON', 'OFF'].includes(state)) {
      return res.status(400).json({ error: 'State mesti ON atau OFF' });
    }

    // Panggil Node-RED
    await axios.post(`http://127.0.0.1:1880/relay/${zone}`, { state });

    res.json({ status: 'berjaya', message: `Relay ${zone} kini ${state}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;