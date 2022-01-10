import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (auth) {
          return <Component {...rest} {...props} />
        } else {
          return  <Redirect to={{path:"/",state:{from : props.location}}} {...props}/>
        }
      }
    } />
  )
}

export default ProtectedRoute;
