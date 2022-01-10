import _ from 'lodash';
import React, { Component } from 'react';
import 'reactjs-popup/dist/index.css';
import { Confirm } from 'semantic-ui-react'
import candidate_1 from './images/candidate_1.jpg';
import candidate_2 from './images/candidate_2.jpg';
import candidate_3 from './images/candidate_3.jpg';

class Vote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: '',
      serial:''
    };
  }
  setError = (error) => {
   this.setState({error});
   console.log(`ERRORRSDSS ${error}`)
  }
  setSerial = (serial) => {
    this.setState(`Voting Verification Code: ${serial}`);
    console.log(`serial ${serial}`)
   }
   state = { open: false, open2: false, open3: false}
   vote_option= x =>{ var serialnumber=Math.random().toString(36).slice(2); console.log(this.props.vote1({"vote":x,"serialnumber":serialnumber}));}
   show = () => this.setState({ open: true })
   show2 = () => this.setState({ open2: true })
   show3 = () => this.setState({ open3: true })
   handleConfirm = x =>{ this.setState({ open: false }); }
   handleConfirm2 = x =>{ this.setState({ open2: false });}
   handleConfirm3 = x =>{ this.setState({ open3: false });}
   handleCancel = () => this.setState({ open: false })
   handleCancel2 = () => this.setState({ open2: false })
   handleCancel3 = () => this.setState({ open3: false })
   voting_session=()=>{ console.log("WE ARE IN");}


   render() {
    
    return (
      <div>
        
        <h1>Vote</h1>
        {(this.props.serial !=""? (<div class="ui floating message"><p>{this.props.serial}</p></div>):"")}
        {(this.props.error !=""? (alert(this.props.error)) : "")}
        <div class="ui doubling stackable three cards">
        <div class="ui fluid card"  >
      <img src={candidate_1} width={400} 
     height={400} class="ui image"></img>
      <div class="content">
         <div class="header">Helen</div>
      </div>
      <div class="extra content"> 
  <button class="ui primary button" onClick={this.show} >Vote</button>
  <Confirm
    open={this.state.open}
    content='Confirm you would like to Vote to Helen'
    onCancel={this.handleCancel}
    onConfirm= {() => {this.handleConfirm(); this.vote_option("Helen");}}
  />
  </div>
   </div>
   <div class="ui fluid card">
      <img src={candidate_2} width={400} 
     height={400} class="ui image"></img>
      <div class="content">
         <div class="header">John</div>
      </div>
      <div class="extra content"> 
  <button class="ui primary button" onClick={this.show2} >Vote</button></div>
  <Confirm
    open={this.state.open2}
    content='Confirm you would like to Vote to John'
    onCancel={this.handleCancel2}
    onConfirm= {() => {this.handleConfirm2(); this.vote_option("John");}}
  />
   </div>
   <div class="ui fluid card">
      <img src={candidate_3} width={400} 
    height={400} class="ui image"></img>
      <div class="content">
         <div class="header">Marry</div>
      </div>
      <div class="extra content"> 
  <button class="ui primary button" onClick={this.show3} >Vote</button>
  <Confirm
    open={this.state.open3}
    content='Confirm you would like to Vote to Marry'
    onCancel={this.handleCancel3}
    onConfirm= {() => {this.handleConfirm3(); this.vote_option("Marry");}}
  />
  </div>
   </div>
   
   </div>
   </div>
    );
   }
  }
  <div>
</div>
  
export default Vote;
