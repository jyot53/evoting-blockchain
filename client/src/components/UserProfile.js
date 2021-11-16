import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "react-avatar";
import axios from "axios";
import "./styles/UserProfile.css";
const UserProfile = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const init = async () => {
    const response = await axios.post("http://localhost:8000/get_details", {
      email: localStorage.getItem("useremail"),
    });

    /*{status: true, _id: '6172361d89338348a88e3b94', name: 'jyot', email: 'jyot@gmail.com', phone: '9429064588', …}
        cpassword: "$2a$12$E2udwFH7WwhBn0UI6KG3QuabvkzNQp0llrkDkPtcMds.KB0mRQcrm"
        date: "2021-10-22T03:55:09.034Z"
        email: "jyot@gmail.com"
        name: "jyot"
        password: "$2a$12$mk2CWa8cJsfcf0kp9ENS4upldRv2ZmvastxDK7AskC7kmtnQcdrLK"
        phone: "9429064588"
        status: true
        tokens: (3) [{…}, {…}, {…}]
        __v: 3
        _id: "6172361d89338348a88e3b94" */

    setUser(response.data.user);
    console.log(user);
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
              <p>Email Address : </p>
              <h5>{user?.email}</h5>
            </div>
            <div className="">
              <p>Registered : </p>
              <h5>{user.isregister ?  "Yes" : "No"}</h5>
            </div>
            <div className="">
              <p>Voting Status : </p>
              <h5>{user.status ? "Yes" : "No"}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
