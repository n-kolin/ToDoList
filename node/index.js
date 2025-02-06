const express = require("express");
const app = express();
const port = 3000;
const sdk = require('api')('@render-api/v1.0#dnrc1ulf088q9j')
 

app.get("/", async (req, res) => {
    sdk.auth(process.env.API_KEY)
    sdk.getServices({limit:'20'})
    .then(({data})=>res.json(data))
    .catch(e=>console.log(e))
});

console.log('hello node')
app.listen(port, ()=>{
    console.log('running port', port)
})
