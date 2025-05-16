const express=require('express');
const morgan=require('morgan')
const apps=express();
const userModel=require('./models/user')
const dbConnection=require('./config/db')


// apps.use(mogan('dev')) //this is an third party middle ware

apps.use(express.json())
apps.use(express.urlencoded({extended:true}))

apps.use(express.static("public"))

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

apps.get('/register', (req,res)=>{
    res.render('register')
})

apps.post('/register',async(req,res)=>{
    //destructuring
    const {username,email,password}=req.body
  const newUser= await userModel.create({
        username:username,
        email:email,
        password:password
    })
    console.log(req.body)
    res.send("user register")
})

apps.get('./get-user',(req,res)=>{
    // userModel.find({
    //     username:'b'
    // }).then((users)=>{
    //     res.send(users)
    // })
    userModel.findOne({
        username:'a'
    }).then((user)=>{
        res.send(user)
    })
})

apps.get('./update-user',async (req,res)=>{
    await userModel.findOneAndUpdate({
        username:'a'
    },{
        email:'c@c.com'
    })
    res.send("user updated")
})

apps.get('./delete-user',async (req,res)=>{
    await userModel.findOneAndDelete({
        username:"a"
    })
    res.send('user deleted')
})
// apps.get('/get-form-data',(req,res)=>{
//     console.log(req.query)
//     res.send('data received')
// }) //ye get route jab hum use ker rhe the form ke data ke liye to hume url pe password dikh rha tha jo ki hume nhi dikhana hai isliye hum post route ka use karenge

//basically post frontend se data backend tak magane ke liye use hoti hai whi get server se frontend tak data le jane ke liye use hota hai
 
//by default express post ke dwara data read nhi ker skta hai isliye hum do middle ware ka use kerte hai app.use(express.json()) and app.use(express.urlencoded({extended:true}))

apps.post('/get-form-data',(req,res)=>{
    console.log(req.body)
    res.send('data received')
})
apps.listen(3000)