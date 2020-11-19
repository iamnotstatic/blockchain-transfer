const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Transfer Route
app.post('/api/transfer', async (req, res) => {
  try {
    const guid = process.env.GUID;
    const mainPassword = process.env.MAIN_PASSWORD;
    const secondPassword = process.env.SECOND_PASSWORD;
    const to = process.env.BITCOIN_ADDRESS;
    const amount = req.body.amount;
    const from = req.body.address;
    const fee = req.body.fee;

    const res = await axios.get(
      `https://blockchain.info/merchant/${guid}/payment?password=${mainPassword}&second_password=${secondPassword}&to=${to}&amount=${amount}&from=${from}&fee=${fee}`
    );

    return res.status(200).json({ message: res.data });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
