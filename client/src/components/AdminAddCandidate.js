import React , { useState , useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {addContractCandidate} from '../electionContract';
const AdminHome = () => {

  const [candidate, setCandidate] = useState({
    name: "",
    party: "",
    age: "",
    description: "",
    qualification: ""
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
    addContractCandidate(candidate.name,candidate.party,candidate.age,candidate.description,candidate.qualification).then(console.log()).catch((error) => console.error(error));
  };

  const history = useHistory();

  useEffect(() => {
    if(localStorage.getItem('isadmin') == 'false' || !localStorage.getItem('isadmin')){
      history.replace('/login');
    }
  },[])

  return (
    <div className="admin_home">
      <div className="admin_box">
        <form method="POST">
          <div id="fancy-inputs">
            <label className="input">
              <input name="name" type="text" value={candidate.name} onChange={handleInputs}/> 
              <span>
                <span>Name</span>
              </span>
            </label>

            <label className="input">
              <input name="party" type="text" value={candidate.party} onChange={handleInputs}/>
              <span>
                <span>Party</span>
              </span>
            </label>
            <label className="input">
              <input name="age" type="text" value={candidate.age} onChange={handleInputs}/>
              <span>
                <span>Age</span>
              </span>
            </label>
            <label className="input">
              <input name="description" type="text" value={candidate.description} onChange={handleInputs}/>
              <span>
                <span>Description</span>
              </span>
            </label>
            <label className="input">
              <input name="qualification" type="text" value={candidate.qualification} onChange={handleInputs}/>
              <span>
                <span>Qualification</span>
              </span>
            </label>
            <button type="submit" onClick={addCandidate} className="button button-white">
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHome;
