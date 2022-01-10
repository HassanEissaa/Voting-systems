import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import { ethers } from 'ethers'
import Ballot from '../artifacts/contracts/Ballot.sol/Ballot.json'
import './style.css';

class Products extends Component {
  constructor() {
    super();
      this.state = {
        Data: {}
      }
    }

componentDidMount(){
  const BallotAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(BallotAddress, Ballot.abi, provider)

  var vote_result_1 =  contract.candidates(1);
  var vote_result_2 =  contract.candidates(2);
  var vote_result_3 =  contract.candidates(3);
  Promise.all([ vote_result_1, vote_result_2,vote_result_3 ]).then((responses) => {


        this.setState({ 
      Data: {
      labels: ['Helen', 'John', 'Marry'],
      datasets: [
        {
          label: 'Votes',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [parseInt(responses[0][2]), parseInt(responses[1][2]), parseInt(responses[2][2])]
        }
      ]
    }
  });
});


}

  render(){



  return (
    <div className='results'>
      <h1>Poll</h1>
        <Bar
        data={this.state.Data}
          options={{
            title:{
              display:true,
              text:'Votes per Candidate',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
  )}
}

export default Products;