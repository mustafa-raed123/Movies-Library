const express = require("express");
const app = express();
const jsondata = require('./movie-data/data.json')
// const jsdata = JSON.stringify(jsondata)
require('dotenv').config();
const port = 4047;
const Key_api = process.env.Key_api;
app.use(express.json())
const axios = require("axios");
function constructor(title,poster_path , overview){
    this.title = title;
    this.poster_path = poster_path;
    this.overview  = overview;
}
function getdata(id,title,release_date,poster_path , overview){
    this.id = id
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview  = overview;
}


app.get("/",(req,res)=>{

    res.send(new constructor(jsondata.title, jsondata.poster_path,jsondata.overview));
})
app.get("/trending",trending)
app.get("/search",search)
app.get("/popular",popular)
app.get("/newplaying",nowplaying)
app.get("/favorite",(req,res)=>{
    res.send("Welcome to Favorite Page")
})
async function trending(req,res){
    
    const url= `https://api.themoviedb.org/3/trending/all/week?api_key=${Key_api}&language=en-US`
    try{
    const axiosresult = await axios.get(url)
    const axiosname= axiosresult.data.results.map(items=>({
        id:items.id,
        title:items.title,
        release_date:items.release_date,
        poster_path:items.poster_path,
        overview:items.overview
       

    }))
    res.json(axiosname);
}catch(error){
    res.status(500).json({ message: "Unable to retrieve trending movies", error:error });
}

}
async function search(req,res){

    
    const url= `https://api.themoviedb.org/3/search/movie?query=Road+House&api_key=${Key_api}&language=en-US`
    try{

    
    const axiosresult = await axios.get(url)
    const axiosname= axiosresult.data.results.map(items=>({
        id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            overview: movie.overview

    }))
    res.json(axiosname);
}catch(error){
    res.status(500).json({ message: "Unable to retrieve searching movies", error:error });
}

}
async function popular(req,res){
    
    const url= `//api.themoviedb.org/3/movie/popular?api_key=${Key_api}&language=en-US`
    try{
    const axiosresult = await axios.get(url)
    const axiosname= axiosresult.data.results.map(items=>{

        let get = new getdata(items.id,items.title,items.release_date,items.poster_path,items.overview)
        return get;
    })
    res.json(axiosname);
}catch(error){
    res.status(500).json({ message: "Unable to retrieve popular movies", error:error });
}

}
async function nowplaying(req,res){
    
    const url= `https://api.themoviedb.org/3/movie/now_playing?api_key=${Key_api}&language=en-US&page=1`
    try{
    const axiosresult = await axios.get(url)
    const axiosname= axiosresult.data.results.map(items=>{
        let get = new getdata(items.id,items.title,items.release_date,items.poster_path,items.overview)
        return get;
    })
    res.json(axiosname);
}catch(error){
    res.status(500).json({ message: "Unable to retrieve nowplaying movies", error:error });
}

}


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
