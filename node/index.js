const express = require("express");
const axios = require("axios"); // Import axios
const app = express();
const port = process.env.PORT || 3000;

app.get("/services", async (req, res) => {
    try {
        const response = await axios.get("https://api.render.com/v1/services", {
            headers: {
                'accept': 'application/json',
                'authorization': "Bearer rnd_hStWSBxAoyTjEfOv9dpOMzLblxHl",
            },
            params: {
                includePreviews: true,
                limit: 20
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching data");
    }
});

console.log('hello node');
app.listen(port, () => {
    console.log('running port', port);
});
