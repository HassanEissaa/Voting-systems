import React, {useState} from 'react'
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';
import './style.css';

function LoginForm({Login,error}) {
    const [details, setDetails]=useState({name:"", email:"", password:""});

    const submitHandler =e =>{

        e.preventDefault();
        Login("details");
    }

    return (
        <div className="ui middle aligned center aligned grid">
              <div className="column">
    <h2 className="ui image header">
      <div className="content">
        Log-in to your account
      </div>
    </h2>
        <form onSubmit={submitHandler}  className="ui large form">
      <div className="ui stacked secondary  segment">
                <input className="ui fluid large teal submit button" type="submit" value="login with metamask"/>
            </div>
            {(error !=""? (<div className="error">{error}</div>) : "")}
        </form>
        </div>
        </div>
    )
}



export default LoginForm
