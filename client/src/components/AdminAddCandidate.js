import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles/AdminAdd.css";
import { addContractCandidate } from "../electionContract";
// const { create } = require('ipfs-http-client');
// import { create } from 'ipfs-http-client';
const ipfsClient = require('ipfs-http-client')
const AdminHome = () => {

  const ipfs = ipfsClient({host:"ipfs.infura.io" , port:5001, protocol:"https"});
  // const ipfs = create();
  

  const [candidate, setCandidate] = useState({  
    name: "",
    party: "",
    age: "",
    description: "",
    qualification: ""
  });
  let name, value;
  const [buffer, setBuffer] = useState(null);
  const [ipfshash, setIpfshash] = useState("");
  const handleInputs = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    if(name == "image"){
      const file = e.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        const buf = Buffer(reader.result);
        setBuffer(buf);
      }
    }
    setCandidate({ ...candidate, [name]: value });

  };
  const addCandidate = async (e) => {
    e.preventDefault();
    console.log(buffer);

    const result = await ipfs.add(buffer);
    // setIpfshash(result);
    // Result: {"path":"QmXwje9wkbxjysBY9gEEdLEkC9Ap9XzSs8TLo8br6MwseD","cid":{"code":112,"version":0,"hash":{"0":18,"1":32,"2":142,"3":182,"4":22,"5":78,"6":147,"7":150,"8":30,"9":97,"10":128,"11":109,"12":108,"13":43,"14":195,"15":220,"16":147,"17":61,"18":188,"19":32,"20":183,"21":209,"22":167,"23":29,"24":166,"25":214,"26":193,"27":143,"28":244,"29":115,"30":179,"31":239,"32":229,"33":134}},"size":152974}
    //ipfs.io/ipfs/QmXwje9wkbxjysBY9gEEdLEkC9Ap9XzSs8TLo8br6MwseD
    console.log("Result: " + result[0].path);
    addContractCandidate(
      candidate.name,
      candidate.party,
      candidate.age,
      candidate.description,
      candidate.qualification,
      result[0].path
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
    // setBuffer(null);
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
                  <i className="fas fa-layer-group"></i>
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

              <div className="form-group3">
                <input
                  name="image"
                  type="file"
                  placeholder="Enter Qualification"
                  onChange={handleInputs}
                />
              </div>

              {/* <img style={{height:'100px' , width:'100px'}} src={'https://ipfs.io/ipfs/'+ path}/> */}
              <br />
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
