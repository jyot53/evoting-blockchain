import React, { useState , useEffect } from 'react';
import {candidatesCount,getContractOwner,addContractCandidate,getContractCandidates,getSelectedAccount} from '../electionContract';

function App() {
  // const [election, setElection] = useState(undefined);
  const [count, setCount] = useState(2);
  const [owner, setOwner] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  useEffect(async () => {
    getOwner();
    setCurrentAccount(await getSelectedAccount());
  }, []);

  const getCount =  () => {
    candidatesCount().then((data) => {setCount(data);}).catch((error) => console.error(error));
  }

  const getOwner = () => {
    getContractOwner().then((data) => {setOwner(data);}).catch((error) => console.error(error));
  }

  const addCandidate = () => {
    addContractCandidate().then(console.log()).catch((error) => console.error(error));
  }

  const getCandidates = async (id) => {
    const details = await getContractCandidates(id).then(console.log()).catch((error) => console.error(error));
    console.log(details);
  }
  const getAddress = async () => {
    console.log(await getSelectedAccount());
  }


  return (
    <div className='container'>
      <div className='row'>

        <div className='col-sm-6'>
          <p>Your count is {count}</p>
          <button onClick={() => getCount()}>Get Count</button>
          <h1>Your Contract owner is {owner}</h1>
          <h1>Your Current Address is {currentAccount}</h1>
          <button onClick={() => addCandidate()}>Add Candidate</button>
          <button onClick={() => getCandidates(1)}>get Candidate</button>
          <button onClick={() => getAddress()}>Get Address</button>
        </div>


      </div>
    </div>
  );
}

export default App;
