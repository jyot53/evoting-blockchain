import React, { useState, useEffect } from "react";
import {
  getContractCandidates,
  candidatesCount,
  getContractPhase,
  contractVote,
} from "../electionContract";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
const UserVote = () => {
  const [isvotingphase, setIsvotingphase] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState([]);
  const [currphase, setCurrphase] = useState("");
  const history = useHistory();

  const getCandidates = async (id) => {
    // console.log(details);
    let dummyArray = [];
    const totalCandidates = await candidatesCount();
    for (let i = 0; i < totalCandidates; i++) {
      const details = await getContractCandidates(i)
        .then(console.log())
        .catch((error) => console.error(error));
      dummyArray.push(details);
    }
    setCandidateInfo(dummyArray);
  };

  const checkPhase = async () => {
    const currentPhase = await getContractPhase();
    setCurrphase(currentPhase);
    if (currentPhase == "Voting") {
      setIsvotingphase(true);
      getCandidates();
    } else {
      setIsvotingphase(false);
    }

  };

  const changeStatus = async () => {
    const response = await fetch('/change_status',{
      method : "POST",
      headers: { 'Content-type' : 'application/json'},
      body: JSON.stringify({
        email : localStorage.getItem('useremail')
      })
    })

    const data = await response.json();
    console.log("Change status: " + data);
  }

  const isRegisteredUser = async () => {
    const response = await fetch('/get_details', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email: localStorage.getItem('useremail')})
    })

    const data = await response.json();
    console.log(data.user.isregister);
    return data.user.isregister;
  }

  const voteCandidate = async (id) => {
    const checkregister = isRegisteredUser();
    if(checkregister){
      alert("You have to register before voting");
      // history.replace("/user/home");
      return;
    }
    await contractVote(id);
    await changeStatus();
    toast.success("Your vote has been casted", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  };

  useEffect(() => {
    if (
      !localStorage.getItem("username") ||
      !localStorage.getItem("useremail")
    ) {
      history.replace("/login");
    }
    checkPhase();
  }, []);

  return (
    <>
    <div className="user_vote">
      {isvotingphase ? (
        <>
          <h1 className="user_vote_title">User Vote </h1>
          <div className="user_vote_box">
            <div className="user_vote_candidate">
             
                <div className="user_vote_cards">
                  {candidateInfo.length > 0 &&
                    candidateInfo?.map((candidate, index) => (
                      <div className="user_vote_card">
                        <h2>{candidate.name}</h2>
                        <p>{candidate.description} </p>
                        <p> Party : {candidate.party} </p>
                        <p> Age : {candidate.age} </p>
                        <p> Qualification : {candidate.qualification} </p>
                        <p>index :- {index}</p>
                        <div>
                          <button onClick={() => voteCandidate(index)}>Vote</button>
                        </div>
                      </div>
                    ))}
                </div>
              
            </div>
          </div>
        </>
      ) : currphase == "Registration" ? (
        <div className="phaseoff">
          {" "}
          <h1>Voting Will begin shortly,</h1>
          <h1>Kindly register yourself before it ends!!!</h1>{" "}
        </div>
      ) : (
        <div className="phaseoff">
          {" "}
          <h1>Voting has been finished,</h1>
          <h1>You can now check the results</h1>{" "}
        </div>
      )
                      
      }
    </div>
    <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
  );
};

export default UserVote;

