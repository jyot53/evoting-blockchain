import React, {useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "react-avatar";
import ReactToPrint from 'react-to-print';
import VotingCard from './VotingCard';
import "./styles/UserProfile.css";
const UserProfile = () => {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState("");
  const componentRef = useRef();
  const init = async () => {
    const response = await fetch("/all_users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json(); 
    data.users.map((user,index) => {
      if(user.name == localStorage.getItem("username")){
        setUser(user);
        setAddress(user.usermapping[0].accountaddress);
      }
    });

  };

useEffect(() => {
    if (
      !localStorage.getItem("username") ||
      !localStorage.getItem("useremail")
    ) {
      history.replace("/login");
    }

    init();
  }, []);


  return (
    <>
      <div className="container1 d-flex justify-content-center">
        <div className="card">
          <div className="upper"> </div>
          <div className="user text-center">
            <div className="profile">
              {" "}
              <Avatar
                color="#7e3794"
                round={true}
                size="80px"
                name={localStorage.getItem("username")}
              />{" "}
            </div>
          </div>
          <div className="mt-5 text-center">
            <h4 className="mb-0">
              {localStorage.getItem("username")
                ? localStorage.getItem("username")
                : ""}
            </h4>
          </div>
          <div className="user_profile_details">
            <div className="">
              <p>ID : </p>
              <h5>{user?._id}</h5>
            </div>
            <div className="">
              <p>Account Address : </p>         
                <small>Make sure to use this account address for voting purposes</small> :
              <h5>{address}</h5>
            </div>
            <div className="">
              <p>Email Address : </p>
              <h5>{user?.email}</h5>
            </div>
            <div className="">
              <p>Aadhar Number : </p>
              <h5>{user.aadhar}</h5>
            </div>
            <div className="">
              <p>Registered : </p>
              <h5>{user.isregister ?  "Yes" : "No"}</h5>
            </div>
            <div className="">
              <p>Voting Status : </p>
              <h5>{user.status ? "Yes" : "No"}</h5>
            </div>
            <div>
              <div style={{ display: 'none' }}>
                <VotingCard id="card" ref={componentRef} name={localStorage.getItem('username')} email={localStorage.getItem('useremail')} address={address}/>
              </div>
              <ReactToPrint
                trigger={() => <div className="vote_card_btn"> <button>Download Voting Card</button> </div>}
                content={() => componentRef.current}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
