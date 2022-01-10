require('dotenv').config()
const express=require("express");
const cors=require("cors");
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app=express();
const session=require("express-session");
const { Pool, Client } = require("pg");
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials:true,
}

));

//Postgres config
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "voting_system",
    password: "",
    port: "5432"
  });


app.use(express.urlencoded()); //Parse URL-encoded bodies
const saltRounds=10;

app.use(session({
    secret: "zs@/9(UhN!46bWF+",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 *24,
    },
}));


app.post("/vote",(req,res)=>{

    console.log(`server side vote  ${JSON.stringify(req.session.userId)}`);
    console.log(`server side vote  ${JSON.stringify(req.body)}`);
    const user=req.session.userId;
    const vote=req.body.e.vote;
    console.log(`user ${user}  vote ${vote}`);
    pool.query(`Select voted from voters where user_id=$1`,[user],(err,results)=>{
  
        if (err) {
            throw err
        }
        if(results.rows[0]) {
 
            console.log(` aleardy voted`);
            res.send({'error':'User already voted'});
 
        }
        else{
            var serial=Math.random().toString(36).slice(2)
            pool.query(`INSERT INTO voters(voted,voter_choice,user_id,serial) values($1,$2,$3,$4)`,[true,vote,user,serial],(err,ress)=>{
                if (err) {
                    throw err
                }
                //res.status(200).json(serial)
                res.send({"serial":serial});
            console.log('vote submitted');
 
            })
        }

        
    }) 

})
app.post("/logout",(req,res)=>{

    console.log(`ress1 ${JSON.stringify(req.session)}`);
    req.session.destroy(err => {
  
        // user won't be able to authenticate with that same cookie again.

      })

})
app.get("/charts",(req,res)=>{
    var votes={};
    pool.query(` Select COUNT(*) from voters where voter_choice=$1`,['Helen'],(err,results)=>{
        if (err) {
          throw err
      }
      else{
        console.log(`RESULT vote_1 ${JSON.stringify(results.rows[0].count)}`);
     

        votes['Helen']=parseInt(results.rows[0].count);
        console.log(`Helensss ${JSON.stringify(votes)}`);
      }
   
      
      pool.query(` Select COUNT(*) from voters where voter_choice=$1`,['John'],(err,results)=>{
        if (err) {
          throw err
      }
      else{
        console.log(`RESULT RESULT ${JSON.stringify(results.rows[0].count)}`);
 
        votes['John']=parseInt(results.rows[0].count);
 
        console.log(`aasdasda55 ${JSON.stringify(votes)}`);

      }
      
          
      pool.query(` Select COUNT(*) from voters where voter_choice=$1`,['Marry'],(err,results)=>{
        if (err) {
          throw err
      }
      else{
        console.log(`RESULT RESULT ${JSON.stringify(results.rows[0].count)}`);

        votes['Marry']=parseInt(results.rows[0].count);
        console.log(`RESULTing ${JSON.stringify(votes)}`);

      }
      console.log(`res.send ${JSON.stringify(votes)}`);
      res.send(votes);
      });
    });     
});  
})
app.get("/login",(req,res)=>{

    console.log(`ress1222 ${JSON.stringify(req.session)}`);
    console.log(`ress1 ${req.headers['authorization']}`);
    if(req.session.userId){
    res.send({"Logged":true});

    }
    else{
        res.send({"Logged":false});
    }
})

app.post("/login",(req,res)=>{

    console.log(`server ${JSON.stringify(req.body.info)}`);

    const user_id=req.body.info.name;
    const security=req.body.info.password;
    //const hash = bcrypt.hashSync(password, saltRounds);
    pool.query(`Select * from users where user_id=$1`,[user_id],(err,results)=>{
        console.log(`resukts ${results.rows}`);
        if (err) {
            throw err
        }
        if(results.rows.length > 0) {
            const user = results.rows[0];
            console.log(`user ${JSON.stringify(user.security_id)}  ${user_id}`);
            if(user.security_id==security){

                console.log("ADMIN ENTERED");
                const access_token=jwt.sign('adas', process.env.ACCESS_TOKEN_SECRET);
                req.session.userId = user.user_id
           
                res.send({accessToken: access_token,
                            "Logged":true});
            }

        }
        else{

            res.send({"Logged":false});
        }

        
    })    


});
app.get("/verifyballot",(req,res)=>{

    pool.query(`Select serial,voter_choice from voters`,(err,results)=>{
 
        console.log(results);
        res.send(results);
    })


})


function authenticateToken(req,res,nex){
    authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split('')[1];
    if (token==null) return res.sendStatus(401);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next();

    }) 

}


app.listen(3001,()=>{

    console.log("server running");
});