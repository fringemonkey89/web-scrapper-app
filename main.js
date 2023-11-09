const express = require('express');
const app = express();

const port = 3000;

app.get('/crawl', (req, res) =>{
    if(!req.query.website) {
        const err = new Error("required query website missing")
        err.status = 400;
        next(err);
    }

    try{

    }catch(e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})