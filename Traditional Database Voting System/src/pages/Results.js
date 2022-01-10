import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import Axios from "axios"


class Results extends Component {

   constructor(props) {
      super(props);
      this.state = {
        Data: {}
      }
    }


  componentDidMount() {
    Axios.get(`http://localhost:3001/charts`)
    .then(res => {
      console.log(`CAMARA ${JSON.stringify(res)}`);
      this.setState({ 
        Data: {
        labels: ['Helen', 'John', 'Marry'],
        datasets: [
          {
            label: 'Votes',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [res.data.Helen, res.data.John, res.data.Marry]
          }
        ]
      }
  });
    })
  }

  render(){

  return (
    <div className='results'>
      <h1>Results</h1>
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
            },
          }}
        />
      </div>
  )}
}

export default Results;