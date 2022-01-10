import React, {useState} from 'react'
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';
import './style.css';

function LoginForm({Login,error}) {
    const [details, setDetails]=useState({name:"", email:"", password:""});

    const submitHandler =e =>{

        e.preventDefault();
        Login(details);
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
                <div className="field">
                    <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, name:e.target.value})} value={details.name}></input>
                    </div>
                </div>
                        <div className="field">
                <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" id="password"onChange={e => setDetails({...details, password:e.target.value})} value={details.password} ></input>
                </div>
                </div>
                <input className="ui fluid large teal submit button" type="submit" value="login"/>
            </div>
            {(error !=""? (<div className="error">{error}</div>) : "")}
        </form>
        </div>
        </div>
    )
}



export default LoginForm
