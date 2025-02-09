const express = require("express");
const app = express();
const port = 3000;
require('api');
 //
//  curl --request GET \
//      --url 'https://api.render.com/v1/services?includePreviews=true&limit=20' \
//      --header 'accept: application/json' \
//      --header 'authorization: Bearer rnd_hStWSBxAoyTjEfOv9dpOMzLblxHl'
//  //


app.get("https://api.render.com/v1/services?includePreviews=true&limit=20/", async (req, res) => {
    sdk.auth(process.env.API_KEY)
    await sdk.getServices({limit:'20'})
    .then(({data})=>res.json(data))
    .catch(e=>console.log(e))
});

console.log('hello node')
app.listen(port, ()=>{
    console.log('running port', port)
})
