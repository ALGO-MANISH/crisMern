import express from "express";
import mysql from "mysql"
import cors from 'cors'
import cookieParser  from "cookie-parser";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'; 
dotenv.config();


const port =process.env.port || 8088;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.static('build'))
//   app.use(cors())


const db=mysql.createConnection({    
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database 
})



db.connect((err) => { 
    if (err) { 
      console.log("Database Connection Failed !!!", err); 
    } else { 
      console.log("connected to Database"); 
    } 
}); 


app.get('/api/data',(req,res)=>{
    const sql="select * from userTab";
    db.query(sql, (err, result)=>{
        if(err)res.json("Error");
        return res.json(result);
    })
})




const verifyUser=(req, res, next)=>{
    const token=req.cookies.token;
    if(!token){
            //return res.json({Message : "we need token please provide it."})
            return res.json({Message : "Session Expired !! "})
    }else {
        jwt.verify(token , "our-jsonwebtoken-secret-key",(err, decoded)=>{
            if(err){
                return res.json({Message : "Authentication Error"})
            }else {
                req.username=decoded.username;                
                req.displayName=decoded.displayName;
                req.email=decoded.email;
                req.role=decoded.role;               
                
                next();
            }
        } )
    }
}


app.get('/api',verifyUser,(req,res)=>{
    return res.json({Status : "Success", username: req.username, displayname :req.displayName,email :req.email,role :req.role})
})


app.post('/api/login',(req,res)=>{
    const sql="SELECT * FROM userTab WHERE username=? AND passwords=?";
    db.query(sql,[req.body.email, req.body.password],(err, data)=>{
       
        if(err)return res.json({Message:"server Side Error "+err})
        if(data.length>0){
            const username =data[0].username;
            const displayName =data[0].name;               
            const email=data[0].email;
            const role=data[0].role;
            
            const token=jwt.sign({username,displayName,email,role},"our-jsonwebtoken-secret-key",{expiresIn :'1d'});
            res.cookie('token',token);
            return res.json({Status :"Success"})
        }else {
            return res.json({Message:"No Records Existed"});
        }
    })
})




app.get('/api/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"})
})

app.listen(port, ()=>{
    console.log(`Running ${port}`)
})
