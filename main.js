const express = require('express');
const puppeteer = require('puppeteer')
const app = express();

const port = 3000;

app.get('/crawl',  async (req, res) =>{
    if(!req.query.website) {
        const err = new Error("required query website missing")
        err.status = 400;
        next(err);
    }

    try{
        const browser = await puppeteer.launch()
        const page = await browser.newPage();

        await page.goto(req.query.website)
        const html = await page.content()

        await page.close();

        return res.status(200).send(html)
        
    }catch(e) {
        console.log(e)
        res.status(500).send('something went wrong')
    }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})