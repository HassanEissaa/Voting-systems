import React, { Component } from 'react';

class signup extends Component {

    constructor() {
        super();
        this.state = {nameInput: '',emailInput:''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
      }
      handleChange(event) {
        this.setState({nameInput: event.target.value});
      }
      handleChange2(event) {
        this.setState({emailInput: event.target.value});
      }

      handleSubmit(event) {
;
        this.props.sign_up({"nameInput":this.state.nameInput,"emailInput":this.state.emailInput});
        event.preventDefault();
        
      }
    render() {   
  return (
    
    <form onSubmit={this.handleSubmit}>
    <label>
      Name:
      <input type="text" value={this.state.nameInput} onChange={this.handleChange} />
    </label>
    <label>
      email:
      <input type="text" value={this.state.emailInput} onChange={this.handleChange2} />
    </label>
    <input type="submit" value="Submit" />
  </form>
  );
}
}
export default signup;