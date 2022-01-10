import _ from 'lodash';
import React, { Component } from 'react';
import 'reactjs-popup/dist/index.css';
import {Confirm } from 'semantic-ui-react'
import candidate_1 from './images/candidate_1_adobespark.jpg';
import candidate_2 from './images/candidate_2_adobespark.jpg';
import candidate_3 from './images/candidate_3.jpg';
class Reports extends Component {
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
      this.setState("");
     }
   state = { open: false, open2: false, open3: false}
   vote_option= x =>{ console.log(`xxx ${x}`); console.log(this.props.vote1({"vote":x}));}
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
        {(this.props.error !=""? (<div class="ui floating message"><p>{this.props.error}</p></div> ) : "")}
        <div class="ui doubling stackable three cards">
        <div class="ui fluid card">
      <img src={candidate_1} class="ui image" ></img>
      <div class="content">
         <div class="header">Helen</div>
      </div>
      <div class="extra content"> 
  <button class="ui primary button" onClick={this.show} >Vote</button>
  <Confirm
   open={this.state.open}
    content='Confirm you would like to Vote to Helen'
   onCancel={this.handleCancel}
   onConfirm= {() => {this.handleConfirm(); this.vote_option(1);}}
  />
  </div>
   </div>
   <div class="ui fluid card">
      <img src={candidate_2}class="ui image"></img>
      <div class="content">
         <div class="header">John</div>
      </div>
      <div class="extra content"> 
  <button class="ui primary button" onClick={this.show2} >Vote</button></div>
  <Confirm
   open={this.state.open2}
    content='Confirm you would like to Vote to John'
   onCancel={this.handleCancel2}
   onConfirm= {() => {this.handleConfirm2(); this.vote_option(2);}}
  />
   </div>
   <div class="ui fluid card">
      <img src={candidate_3} class="ui image"></img>
      <div class="content">
         <div class="header">Marry</div>
      </div>
      <div class="extra content"> 
  <button class="ui primary button" onClick={this.show3} >Vote</button>
  <Confirm
   open={this.state.open3}
    content='Confirm you would like to Vote to Mary'
   onCancel={this.handleCancel3}
   onConfirm= {() => {this.handleConfirm3(); this.vote_option(3);}}
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
  
export default Reports;
