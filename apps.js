const express=require('express');
const morgan=requre('morgan')
const apps=express();


apps.use(mogan('dev')) //this is an third party middle ware

apps.set("view engine",'ejs') // this should always be used if we want to render html

//middleware means kisi be route pe jane se pehle wo ek function se hoke jaye there are three type of middle wares which are built-in, custom,third party middleware
//to use third party middle ware here we have used morgan morgan basically tells us what ,when ,how  request has come to our server
//middleware har route ke liye chalta hai irrespective of which type of middleware is it 


apps.use((req,res,next)=>{
    console.log("this is middleware")

    return next()
})
//note middleware se control aage pass kerne ke liye hume return next() kerna compulsory hai ya phir next() ko call kerna hi kerna hai

//but to run a middlewar for a particular route ther is a way which is as follow:

apps.get('/',(req,res,next)=>{
    console.log("this is middleware for this particular route")
    next()
},(req,res)=>{
    res.render('index')
})

// apps.get('/',(req,res)=>{
//     // res.send("hello world")
//     res.render('index')
// })

apps.get('/about',(req,res)=>{
    res.send("this is about")
})

apps.listen(3000)