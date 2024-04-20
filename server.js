const express = require("express");
const app = express();
const jsondata = require('./movie-data/data.json')
// const jsdata = JSON.stringify(jsondata)
const port = 4046;
// app.use(express.json())

function constructor(title,poster_path , overview){
    this.title = title;
    this.poster_path = poster_path;
    this.overview  = overview;
}
app.get("/",(req,res)=>{

    res.send(new constructor(jsondata.title, jsondata.poster_path,jsondata.overview));

})
app.get("/favorite",(req,res)=>{
    res.send("Welcome to Favorite Page")
})
app.get("*",defulthandler)
app.listen(port,()=>{
    console.log(`listing to port ${port}`)
})
function defulthandler(req,res){
    res.status(404).json({
        "status": 404,
       "responsetext": "Page not found"
    })
}
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        "status": 500,
        "responseText": `"Sorry, something went wrong":  ${err}`
    });

})
