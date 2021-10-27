import React,{useState} from 'react'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sentmail = () => {

    // const [sent,setSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [serverOTP, setServerOTP] = useState(""); //get otp from server 
    const [aadhar, setAadhar] = useState("");

    const inputfield = document.getElementById('otpfield')

    const generateOtp = async (e)  => {
        e.preventDefault();
        // setSent(true);
        try {

           const response =  await axios.post("http://localhost:8000/send_mail",{
                aadhar
            })
            // const data = response.data;
            // console.log(data);
            setServerOTP(response.data.serverotp);
            if(response.data.message){
                toast.success(`${response.data.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
    
                    // setTimeout(
                    //     () => history.push('/'), 
                    //     3000
                    //   );       
            }else if(response.data.error){
                toast.error(`${response.data.error}` ,{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });
            }

            inputfield.type = "text";

        } catch (error) {
            console.log(error);
        }
    };


    const verifyOTP = (e) => {
        e.preventDefault();
        if(otp === serverOTP){
            // window.alert("OTP Verified");
            toast.success("OTP Verified", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
        }else{
            // window.alert("Wrong OTP");
            toast.error("Wrong OTP" ,{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

            setOtp("");
        }
    }


    return (
        <>
            <form onSubmit={generateOtp}> 
                <div className="form-group">
                    <input type="text" value={aadhar} onChange={(e)=>{setAadhar(e.target.value)}} className="form-control" placeholder="Enter aadhar number"/>
                </div>
                <button type="submit"  className="btn btn-primary">Generate OTP</button>
            </form>

            <form onSubmit={verifyOTP}>
            <div className="form-group">
                    <input type="hidden" id="otpfield" value={otp} onChange={(e)=>{setOtp(e.target.value)}} className="form-control" placeholder="Enter otp"/>
                </div>
                <button type="submit"  className="btn btn-success">Submit</button>
            </form>

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
    )
}

export default Sentmail
