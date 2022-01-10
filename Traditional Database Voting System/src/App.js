
import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route,useHistory,Redirect } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import Results from './pages/Results';
import Vote from './pages/Vote';
import VerifyBallot from './pages/VerifyBallot'
import ProtectedRoute from './ProtectedRoute';

import Axios from "axios"


class App extends React.Component  {
  constructor(props) {
    super(props)

    this.state = {
      error: '',
      loginStatus:false,
      serial:''
    };
    Axios.defaults.withCredentials= true;
  }
  


  vote1 = e => {
    

    Axios.post("http://localhost:3001/vote",{e
  }).then((response)=>
    {

    if(response){
      console.log(`response: ${JSON.stringify(response)}`);
      
      if(response.data.error){


        this.setState({serial:'You already Voted!'});
        
      }
      else{


        this.setState({serial:`Voting Verification Code: ${response.data.serial}`});
      }

    }
  });

  }
   handleLogout = (e) =>{
    this.setState({error:''});
    console.log(`asdsadassjdaspjdaoj[q[pweqe]]`)
    e.preventDefault();
    this.setState({loginStatus:false});
    Axios.post("http://localhost:3001/logout").catch(error => console.log(`error ${error}`));
  }

   Login = (info) => {
    
    console.log(info);
    
    Axios.post("http://localhost:3001/login",{info
  }).then((response)=>
    {
    console.log(`res1 ${JSON.stringify(response)}`);
    if(!response.data.Logged){
      console.log("DIDN;T LOGIN" );
      this.setState({error:"Details are incorrect!"});
    }
    else{


      this.setState({loginStatus:true});
      

      this.setState({error:""});

    }

  });

  }



  componentDidMount() {
    Axios.get("http://localhost:3001/login").then((resp) => {



      this.setState({loginStatus:resp.data.Logged});

    }).catch(error => console.log(`error ${error}`));
  }

  render() {

  return (
    <div>     
      <Navbar handleLogout={this.handleLogout} loginStatus={this.state.loginStatus} />
        <Route path='/' exact render={(props) => this.state.loginStatus ? <Redirect to="/Vote" /> : <LoginForm {...props} Login={this.Login} error={this.state.error}/>} />
        <Route path='/Results' component={Results} />
        <Route path='/VerifyBallot' component={VerifyBallot} />
        <ProtectedRoute exact path='/Vote' handleLogout={this.handleLogout} vote1={this.vote1} component={Vote} auth={this.state.loginStatus}  error={this.state.error} serial={this.state.serial}/>
    </div>
  );
  }
}

export default App;
