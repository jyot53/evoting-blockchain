import React, {useState, useEffect}from 'react'
import {useHistory} from 'react-router-dom';
import {setContractPhase,getContractPhase} from '../electionContract';
const AdminState   = () => {
    const history = useHistory();
    const [cphase, setCphase] = useState("");

    const changePhase = async () => {
        await setContractPhase();
        setCphase(await getContractPhase());
    } 

    const initAdminState = async() => {
        setCphase(await getContractPhase());
    }
    
    useEffect( () => {
        if(localStorage.getItem('isadmin') == 'false'){
          history.replace('/login');
        }
        
        initAdminState();

      },[])

    return (
        <div className="admin_state">
            <div className="admin_state_title">Change Voting Phase</div>
            <div className="admin_state_box">
                {/* <p>Current Phase : <span>{phase}</span></p> */}
                <p>Current Phase : <span>{cphase}</span></p>
                <button onClick={changePhase} className="admin_state_btn">Change Phase</button>
            </div>
        </div>
    )
}

export default AdminState        
