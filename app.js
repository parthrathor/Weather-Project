const express = require("express");
const https=require("https");
const app = express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get(("/"),function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post(("/"), function(req,res){
  const city = req.body.city;
  const apiKey = "586aa41e400651ea87698571c282361a";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+apiKey;
  https.get(url, function(response)
  {
    console.log(response);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const urlIcon="http://openweathermap.org/img/wn/" + icon +"@2x.png"
      const temp = weatherData.main.temp;
      const description =weatherData.weather[0].description;
      res.write("<h1>The temperature in "+city+" is "+((temp - 273).toFixed(2))+" degrees Celsius.</h1>");
      res.write("<p>It is currently "+description+".</p>");
      res.write(" <img src="+urlIcon+">");
    });
  });
});

app.listen(3000, function(){
  console.log("Server running at port 3000.");
});
