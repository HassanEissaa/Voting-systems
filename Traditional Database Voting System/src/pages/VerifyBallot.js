import React, {useMemo,useEffect,useState } from 'react'
import Table from "./Table";
import Axios from "axios"
function VerifyBallot() {
    const [data, setData]=useState("");
    const [isloading, setLoading] = useState(true);
    const rowss=[
        {
        Header: 'serial',
        accessor:'serial'
    },
    {
        Header:'vote',
        accessor:'voter_choice'
    }
]

  useEffect(() => {
    async function getdata()  {  const tota=await Axios.get(`http://localhost:3001/verifyballot`);

    setData(tota.data.rows);
    setLoading(false);
    }

    if (isloading) {

        getdata();
      }
  }, []);
  
    const columns= useMemo(() => rowss, [])


    return (

        isloading ? (<h1>Loading.....</h1>) : <div><Table columns={columns} data={data} /></div>

    );
}



export default VerifyBallot
