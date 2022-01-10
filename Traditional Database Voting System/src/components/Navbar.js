import React from 'react'

import { Link } from 'react-router-dom';



const Navbar = props => {

  function Example() 
  { 
      if(props.loginStatus){
    
      return(

        <a onClick={props.handleLogout} class="item">Logout</a>
      );
      }
      else{return(<div></div>);}
  } 
  
    return (
    <div class="ui secondary menu">
        <Link class="active item"  to="/">Home</Link><Link class="item" to="/Results">Poll</Link ><Link class="item" to="/VerifyBallot">Verify Ballot</Link >
        <div class="right menu">
        <div class="item">
          <Example/>
          </div>
        </div>
    </div>
      )
};

export default Navbar;