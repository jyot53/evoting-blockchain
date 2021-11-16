import React , {useEffect,useState} from "react";
import Table from "react-bootstrap/Table";
import {useHistory} from 'react-router-dom';
import { getContractCandidates, candidatesCount , getContractPhase } from "../electionContract";
// import { Bar } from "react-chartjs-2";
// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 15, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)"
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)"
//       ],
//       borderWidth: 2,
//     },
//   ],
// };

// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// };

const UserResult = () => {

  const history = useHistory();
  const [candidateInfo, setCandidateInfo] = useState([]);
  const [isResultphase, setIsResultphase] = useState(false);
  const [currphase, setCurrphase] = useState("");

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
    if (currentPhase == "Ended") {
      setIsResultphase(true);
      getCandidates();
    } else {
      setIsResultphase(false);
    }
  };


  useEffect(()=>{
      if(!localStorage.getItem('username') || !localStorage.getItem('useremail')){
          history.replace('/login');
      }

      checkPhase();

  } , []);

  return (
    <div className="user_result">
      {
        isResultphase ? (
          <>
            <div className="admin_register_title">Voting Results</div>
      <div className="admin_register_box">
        <div className="admin_register_table">
          <Table responsive hover>
          <thead>
              <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Age</th>
                <th>Party</th>
                <th>Qualification</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidateInfo?.map((candidate, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.age}</td>
                  <td>{candidate.party}</td>
                  <td>{candidate.qualification}</td>
                  <td>{candidate.votecount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="voting-graph">
            {/* <Bar data={data} options={options} /> */}
        </div>
      </div>
          </> 
        ) : currphase=="Voting" ? (
          <div className="phaseoff">
            <h1>Voting is currently going on </h1>
            <h1>Results will be published after voting ends</h1>
          </div>
        ) : (
          <div className="phaseoff">
            <h1>Registration is currently going on </h1>
            <h1>Register first before it finishes</h1>
          </div>
        )
      }
    </div>
  );
};

export default UserResult;




