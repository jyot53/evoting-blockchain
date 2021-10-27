import React, { useState,useEffect } from "react";
import {getContractCandidates,candidatesCount,getContractPhase,contractVote} from '../electionContract';
import {useHistory} from 'react-router-dom';
const UserVote = () => {
  const [isvotingphase, setIsvotingphase] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState([]);
  const history = useHistory();



  const getCandidates = async (id) => {
    
    // console.log(details);
    let dummyArray = [];
    const totalCandidates = await candidatesCount();
      for(let i=0;i<totalCandidates;i++){
        const details = await getContractCandidates(i).then(console.log()).catch((error) => console.error(error));
        dummyArray.push(details);
      }
    setCandidateInfo(dummyArray);
  }

  const checkPhase = async () => {
    const currentPhase = await getContractPhase();
    if(currentPhase == 'Voting'){
      setIsvotingphase(true);
      getCandidates();
    }else{
      setIsvotingphase(false);
    }

  }

  const voteCandidate = async (id) => {
      await contractVote(id);
  }
  
  useEffect(()=>{
 
      if(!localStorage.getItem('username') || !localStorage.getItem('useremail')){
          history.replace('/login');
      }

      checkPhase();

  },[]);

  return (
    <div className="user_vote">
      {isvotingphase ? (
        <>
          <h1 className="user_vote_title">User Vote </h1>
          <div className="user_vote_box">
            <div className="user_vote_candidate container center">
              
              {candidateInfo.length>0 && candidateInfo?.map((candidate, index) => (
                <div className="card">
                <h2>{candidate.name}</h2>
                <hr />
                <p>{candidate.description}</p>
                <p> Party : {candidate.party} </p>
                <p> Age : {candidate.age} </p>
                <p> Qualification : {candidate.qualification} </p>
                <button onClick={()=>voteCandidate(index)} >Vote</button>
              </div>
              ))}
              
            </div>

          </div>
        </>
      ) : (
        <div className="phaseoff"> <h1>Voting Will begin shortly,</h1> 
        <h1>Kindly register yourself before it ends!!!</h1> </div>
      )}
    </div>
  );
};

export default UserVote;



{/* <div className="card">
                <h2>Name</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
                <p> Age : 19 </p>
                <p> Qualification : B.Tech </p>
                <button>Vote</button>
              </div>
              <div className="card">
                <h2>Name</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
                <p> Age : 19 </p>
                <p> Qualification : B.Tech </p>
                <button>Vote</button>
              </div>
              <div className="card">
                <h2>Name</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
                <p> Age : 19 </p>
                <p> Qualification : B.Tech </p>
                <button>Vote</button>
              </div>
              <div className="card">
                <h2>Name</h2>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
                <p> Age : 19 </p>
                <p> Qualification : B.Tech </p>
                <button >Vote</button>
              </div> */}