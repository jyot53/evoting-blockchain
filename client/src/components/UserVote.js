import React, { useState, useEffect, useRef } from "react";
import {
  getContractCandidates,
  candidatesCount,
  getContractPhase,
  contractVote,
} from "../electionContract";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
const UserVote = () => {
  const [isvotingphase, setIsvotingphase] = useState(false);
  const [candidateInfo, setCandidateInfo] = useState([]);
  const [currphase, setCurrphase] = useState("");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const alanBtnInstance = useRef(null);
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

    const checkvote = await isVotedUser();
    if(checkvote){
      setDisabled(true);
    }

  };

  // const changeStatus = async () => {
  //   const response = await fetch("/change_status", {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify({
  //       email: localStorage.getItem("useremail"),
  //     }),
  //   });

  //   const data = await response.json();
  //   console.log("Change status: " + data);
  // };

  const isVotedUser = async () => {
    const response = await fetch("/get_details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: localStorage.getItem("useremail") }),
    });

    const data = await response.json();
    return data.user.status;
  };

  const isRegisteredUser = async () => {
    const response = await fetch("/get_details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: localStorage.getItem("useremail") }),
    });

    const data = await response.json();
    return data.user.isregister;
  };

  const voteCandidate = async (id) => {
    const checkregister = await isRegisteredUser();
    const checkvote = await isVotedUser();
    if (!checkregister) {
      toast.error("You have to register before voting", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (checkvote) {
      toast.error("You have already voted", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
     await contractVote(id);
    // await changeStatus();
    // setTimeout(() => {history.replace("/user/home")},5000);
    // toast.success("Your vote has been casted", {
    //   position: "top-center",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  };

  useEffect(() => {
    if (
      !localStorage.getItem("username") ||
      !localStorage.getItem("useremail")
    ) {
      history.replace("/login");
    }
    checkPhase();
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: "abaf0677c3af5ec12bc8b9538046234f2e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: async (commandData) => {
          if (commandData.command === "vote") {
            // let index = parseInt(commandData.id);
            // console.log(index - 1);
            // await voteCandidate(index - 1);
            alert("Vote Candidate");
          }
        },
      });
    }
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
                        <p className="user_vote_index" >{index+1}</p>
                        <span>
                          {candidate.ipfshash && (
                            <img
                              src={"https://ipfs.io/ipfs/" + candidate.ipfshash}
                            />
                          )}
                          {/* <img src="https://ipfs.io/ipfs/QmXwje9wkbxjysBY9gEEdLEkC9Ap9XzSs8TLo8br6MwseD"/> */}
                        </span>
                        <h2>{candidate.name}</h2>
                        <p>{candidate.description} </p>
                        <p> Party : {candidate.party} </p>
                        <p> Age : {candidate.age} </p>
                        <p> Qualification : {candidate.qualification} </p>
                        <div>
                          <button
                            disabled={disabled}
                            onClick={() => voteCandidate(index)}
                            id={disabled ? "btn-disable" : ""}
                          >
                            Vote
                          </button>
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
        )}
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

/*


*/
