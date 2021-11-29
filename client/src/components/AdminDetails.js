import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import { getContractCandidates, candidatesCount } from "../electionContract";
const AdminDetails = () => {
  const [account, setAccount] = useState(
    "0x5af77e8609e14c4e0eac26443e2c61ead0b6b474"
  );
  const history = useHistory();
  const [candidateInfo, setCandidateInfo] = useState([]);

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
    
    dummyArray.sort((x, y) => {
      var xcount = x.votecount;
      var ycount = y.votecount;
      if(xcount > ycount) return -1;
      if(xcount <= ycount) return 1;
    });

    console.log(dummyArray);
    setCandidateInfo(dummyArray);
  };

  useEffect(() => {
    if (localStorage.getItem("isadmin") == "false") {
      history.replace("/login");
    }

    getCandidates();
  }, []);

  return (
    <div className="admin_details">
      <p>Admin Account : {account}</p>
      <div className="admin_register_title">Candidate Details</div>
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
                  <td>{index+1}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.age}</td>
                  <td>{candidate.party}</td>
                  <td>{candidate.qualification}</td>
                  <td>{candidate.votecount}</td>
                </tr>
              ))}
              {/* <tr>
            <td>0</td>
            <td>jyot</td>
            <td>19</td>
            <td>BJP</td>
            <td>B.Tech</td>
            <td>0</td>
          </tr> */}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
