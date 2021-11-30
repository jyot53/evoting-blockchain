import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {useHistory} from 'react-router-dom';
import OtpInput from "react-otp-input";
import "react-toastify/dist/ReactToastify.css";
import emailjs from 'emailjs-com';

const UserOTP = () => {

  const history = useHistory();
  const [data,setData] = useState({
    otp : "",
    serverotp : ""
  });

  const changeRegister = async () => {
    const response = await fetch('/change_register',{
      method : "POST",
      headers: { 'Content-type' : 'application/json'},
      body: JSON.stringify({
        email : localStorage.getItem('useremail')
      })
    })

    const data = await response.json();
    console.log("Change status: " + data);
  }

  const generateOtp = () => {
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 4; i++ ) {
          OTP += digits[Math.floor(Math.random() * 10)];
      }
    setData({...data,serverotp:OTP});

    emailjs.send("service_3j49tqg", "template_mry13ca", {
        name : localStorage.getItem('username'),
        // to_email : "jyotsoni0053@gmail.com",
        to_email : localStorage.getItem('useremail'),
        otp : OTP
    },'user_5PoQPN6QmL1CKfIDumeD6')
    .then(() => {
        console.log("mail sent");   
    }, (err) => {
        console.log("mail failed "+ JSON.stringify(err));
    });
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if(data.otp == data.serverotp) {
        toast.success("OTP Verified", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        
        if(localStorage.getItem('currentindex') == null){
          localStorage.setItem('currentindex',0);
        }

       await changeRegister();

        setTimeout(() => {history.replace('/user/home')} , 2000);
        
        // setTimeout(() => {const win = window.open('/print',"_blank");
        // win.focus();}, 2500);



    }else{
        toast.error("Wrong OTP" ,{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });

        setData({...data , otp:""});
    }
  };

  useEffect(() => {
    generateOtp();
  }, []);

  return (
    <>
      <div className="user_home">
      <h1 className="user_home_title">OTP has been sent to your registered email address</h1>
        <div className="user_home_box">
          <div className="user_otp_content">
          <form onSubmit={verifyOTP}>
            <div className="form-group">
              <OtpInput
                value={data.otp}
                name="otp"
                onChange={(e) => {
                  setData({...data,otp:e});
                }}
                numInputs={4}
                separator={
                  <span>
                    <strong>.</strong>
                  </span>
                }
                isInputNum={true}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  padding: "0.2rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "2px solid rgba(0,0,0,0.3)"
                }}
                errorStyle={{
                  border: "2px solid red"
                }}
              />
              {/* <h1>{data.serverotp}</h1> */}
            </div>
            <div className="otp_btn">
            <button type="submit">
              Verify
            </button>
            </div>
          </form>
          </div>
        </div>
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

export default UserOTP;
