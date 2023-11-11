const express = require('express');
const puppeteer = require('puppeteer')
const app = express();

const port = 3000;

app.get('/crawl',  async (req, res) =>{
    const website = req.query.website;
    if(!website) {
        const err = new Error("required query website missing")
        err.status = 400;
        next(err);
    }

    try{
        const browser = await puppeteer.launch()
        const registry = {};
        const queue = [!req.query.website];
        // const page = await browser.newPage();

        // await page.goto(req.query.website)
        // const html = await page.content()

        // await page.close();

        while(queue.length > 0) {
            const url = queue[queue.length -1];
            const page = await browser.newPage();
            await page.goto(url);
            registry[url] = await page.$eval("*", (el) => el.innerText)
            queue.pop();

            const href = await page.$$eval("a", (anchorEls) => anchorEls.map((a) => a.href))

            const filteredHrefs = href.filter((href) => href.startsWith(website) && registry[href] === undefined)
            const uniqueHrefs = [...new Set]
        }

        return res.status(200).send(html)
        
    }catch(e) {
        console.log(e)
        res.status(500).send('something went wrong')
    }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})