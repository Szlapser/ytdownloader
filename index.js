const express = require('express')
const cors = require('cors')
const app = express()
const ytdl = require('ytdl-core')
const fs = require('fs')
const { format } = require('path')
require('dotenv').config('./.env')

app.set("view engine", "ejs")
app.use(cors())
app.use("/", express.static(__dirname + '/views'))

app.get("/", async (req,res)=>{
    try {
    if (req.query.url != undefined) {
            if (ytdl.validateURL(req.query.url)) {
                var options = []
                await (await ytdl.getInfo(req.query.url)).formats.forEach(format=>{
                    var option = `<option value="${format.itag}">${format.qualityLabel}, Audio:${format.hasAudio}</option>`
                    options.push(option)
                })
                
                var optionsStr = ''
            options.forEach(opt => {
                optionsStr += opt + "\n"
            })
            res.render("index", {choice: optionsStr})
            }else {
                res.send(`<script>alert("Invalid URL!"); window.location.href = "https://ytdownloader-uk3v.onrender.com/"; </script>`)
            }
            
      

        
    }else {
        res.render("index", {choice: ''})
    }
} catch(err) {
    console.log(err)
    res.sendStatus(500)
}
})

app.get("/download", async (req, res) => {
    if (req.query.url != undefined && req.query.itag != undefined) {
    const itag = req.query.itag
    const url = req.query.url
    var itags = []
    await (await ytdl.getInfo(url)).formats.forEach(format=>{
        itags.push(format.itag)
    })
    if (itags.includes(parseInt(itag))) {
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    await ytdl(url, {quality: itag}).pipe(res)
    }else {
        res.sendStatus(404)
    }
    
}
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening at port ${process.env.PORT}`)
})
