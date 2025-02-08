import express from 'express';
import renderApi from '@api/render-api';

// const express = require("express");
const app = express();
const port = 3000;
// const sdk = require('api')('@render-api/v1.0#dnrc1ulf088q9j')
 

app.get("/", async (req, res) => {
    renderApi.auth(process.env.API_KEY)
    await renderApi.getServices({limit:'20'})
    .then(({data})=>res.json(data))
    .catch(e=>console.log(e))
});

console.log('hello node')
app.listen(port, ()=>{
    console.log('running port', port)
})
