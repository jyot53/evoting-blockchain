import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles/AdminAdd.css";
import { addContractCandidate } from "../electionContract";
const AdminHome = () => {
  const [candidate, setCandidate] = useState({
    name: "",
    party: "",
    age: "",
    description: "",
    qualification: "",
  });
  let name, value;
  const handleInputs = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    setCandidate({ ...candidate, [name]: value });
  };

  const addCandidate = (e) => {
    e.preventDefault();
    addContractCandidate(
      candidate.name,
      candidate.party,
      candidate.age,
      candidate.description,
      candidate.qualification
    )
      .then(console.log())
      .catch((error) => console.error(error));

    setCandidate({
      name: "",
      party: "",
      age: "",
      description: "",
      qualification: "",
    });
  };

  const history = useHistory();

  useEffect(() => {
    if (
      localStorage.getItem("isadmin") == "false" ||
      !localStorage.getItem("isadmin")
    ) {
      history.replace("/login");
    }
  }, []);

  return (
    <div className="admin_add">
      <div className="admin_add_title">Add Candidate</div>
      <div className="admin_add_box">
        <form method="POST">
          <div className="admin_add_content">
            <div>
              <div className="form-group3">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  value={candidate.name}
                  onChange={handleInputs}
                  autoComplete="off"
                />
                <span className="icon3">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
              </div>

              <div className="form-group3">
              <input
                name="party"
                type="text"
                placeholder="Enter Party Name"
                value={candidate.party}
                onChange={handleInputs}
                autoComplete="off"
              />
                <span className="icon3">
                <i className="fas fa-layer-group" ></i>
                </span>
              </div>

              <div className="form-group3">
              <input
                name="age"
                type="text"
                placeholder="Enter Age"
                value={candidate.age}
                onChange={handleInputs}
                autoComplete="off"
              />
                <span className="icon3">
                  <i className="fa fa-calender" aria-hidden="true"></i>
                </span>
              </div>

              <div className="form-group3">
              <input
                name="description"
                type="text"
                placeholder="Enter Description"
                value={candidate.description}
                onChange={handleInputs}
                autoComplete="off"
              />
                <span className="icon3">
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </span>
              </div>

              <div className="form-group3">
                
              <input
                name="qualification"
                type="text"
                placeholder="Enter Qualification"
                value={candidate.qualification}
                onChange={handleInputs}
                autoComplete="off"
              />
                <span className="icon3">
                  <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                </span>
              </div>
              <br/>
              <button type="submit" onClick={addCandidate}>
                Add Candidate
              </button>
            </div>
            <div className="admin_add_note">
              <ol>
                <li>
                  Add all the candidates details(all fields are required) to add
                  a candidate.
                </li>
                <li>Candidate details cannot be change afterwards.</li>
                <li>
                  Once the candidate is added it cannot be removed from the
                  candidate list.
                </li>
              </ol>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHome;
