import React , {useEffect} from "react";
import {useHistory} from 'react-router-dom';
const UserRegister = () => {

  const history = useHistory();
  // const [{user}, dispatch] = useStateValue();
  useEffect(()=>{
      if(!localStorage.getItem('username') || !localStorage.getItem('useremail')){
          history.replace('/login');
      }

  } , []);

  return (
    <div className="user_register">
      <h1 className="user_register_title">User Registration</h1>
      <div className="user_register_box">
        <div className="user_register_content">
          <form method="POST">
            <div id="fancy-inputs">
              <label className="input">
                <input name="aadhar" type="text" />
                <span>
                  <span>Aadhar Number</span>
                </span>
              </label>

              <label className="input">
                <input name="accountaddress" type="text" />
                <span>
                  <span>Account Address</span>
                </span>
              </label>
              <a href="" className="button button-white">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
