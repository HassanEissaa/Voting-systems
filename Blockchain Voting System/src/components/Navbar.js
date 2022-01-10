
import './Navbar.css'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom';
const Navbar = props => {

  function Example() 
  { 
      if(props.loginStatus){
    
      return(

        <a onClick={props.handleLogout} className ="item">Logout</a>
      );
      }
      else{return(<div></div>);}
  } 


    return (
      <div class="ui secondary menu">
      <Link class="active item"  to="/">Home</Link><Link class="item" to="/results">Poll</Link >
      <div class="right menu">
      <div class="item">
      <Example/>
        </div>
      </div>
  </div>
      )
};

export default Navbar;