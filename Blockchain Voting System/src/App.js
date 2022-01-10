import React, {useState , useEffect} from "react";
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route,useHistory,Redirect } from 'react-router-dom';
import { ethers } from 'ethers'
import Ballot from './artifacts/contracts/Ballot.sol/Ballot.json'
import Vote from './pages/Vote';
import Results from './pages/Results';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from './pages/LoginForm';


const BallotAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
var user=''
function App() {

 
  const [loginStatus,setloginStatus] = useState(false);
  const [error,seterror] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(BallotAddress, Ballot.abi, provider)


  const Moralis = require('moralis');
  Moralis.initialize(""); // Application id from moralis.io
  Moralis.serverURL = ""; //Server url from moralis.io


  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const Login = async(info) => {

    try{
    user= await Moralis.User.current();
    const Monster = Moralis.Object.extend("User");
    }    catch(err){
      console.error(err);}
    const Monster1 = Moralis.Object.extend("User");
    const monster = new Monster1();
    const query = await new Moralis.Query("User");
    const object2 = await query.find({useMasterKey:true});



    if(!user){
      try{
    user = await Moralis.Web3.authenticate();

    if(user){

      setloginStatus(true);
    }
    else{

      setloginStatus(false);
    }
      }
    catch(err){
      // Handle errors here
      console.error(err);

    }


    }
    if(user){

      setloginStatus(true);
    }
  }

  const handleLogout = async(e) => {

    e.preventDefault();
    await Moralis.User.logOut();
    setloginStatus(false); 
  }

  useEffect(() => {
    //logining();
    async function logining(){

      user= await Moralis.User.current();

      if(user!=null){

        setloginStatus(true); 
      }
    }
    logining();
  }, []);

  const vote1 = async(e) => {
    
    try {
    if (typeof window.ethereum !== 'undefined') {
    console.log(`negative ${JSON.stringify(e.vote)}` );
    var voted=parseInt(JSON.stringify(e.vote)); 
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(BallotAddress, Ballot.abi, signer)
    const vote= await contract.vote(voted);
    await vote.wait();

     }
    }  catch (err) {
      console.log("Error: ", err)

      seterror("User already voted");
      
      
    }

  }


  return (
    <div>
      <Navbar handleLogout={handleLogout} loginStatus={loginStatus} />

      <Route path='/' exact render={(props) => loginStatus ? <Redirect to="/Vote" /> : <LoginForm {...props} Login={Login} />} />
      <ProtectedRoute exact path='/Vote' handleLogout={handleLogout}  error={error} vote1={vote1} component={Vote} auth={loginStatus}/>
      <Route path='/Results' component={Results}/>
    </div>
  );
}

 
export default App;
