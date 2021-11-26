import React , { useEffect} from 'react'
import {useHistory} from 'react-router-dom';
// import {useStateValue} from '../StateProvider';
const UserHome = () => {
    const history = useHistory();
    // const [{user}, dispatch] = useStateValue();
    useEffect(()=>{
        if(!localStorage.getItem('username') || !localStorage.getItem('useremail')){
            history.replace('/login');
        }

    } , []);

    return (
        <div className="user_home">
            <h1 className="user_home_title">Voting Guidelines</h1>
            <div className="user_home_box">
                <div className="user_home_content">
                    <h2>Welcome , <span>{localStorage.getItem('username') ? localStorage.getItem('username') : " Guest"}</span> </h2>
                    {/* <h2>Welcome , <span>{window.localStorage.getItem('user') ? window.localStorage.getItem('user').name : ""} </span> </h2> */}
                    <p>These are few guidelines for voters :</p>
                    <div>
                        <h3>1. Voter Registration</h3>
                        <ul className="unordered_list">
                            <li>For casting the vote user needs to first register himself. For the registation purpose the user will be provided a voter registration form on this website</li>
                            <li>The voter can register themselves within the registration phase only before the admin can change the phase. After successfull registration , the voter will be able to vote.</li>
                            <li>For the registration , the user has to fill correct aadhar number and account address of metamask after tha the OTP will be send to users linked email address and after verification the registration will be accepted.</li>
                        </ul>
                    </div>
                    <div>
                        <h3>2. Voting Process</h3>
                        <ul className="unordered_list">
                            <li>The voting can be done in the voting phase only</li>
                            <li>For voting the user needs to selected same provided metamask account address to perfrom the transaction</li>
                            <li>Once the voter clicks on the vote button the metamask popup shows and then you have to confirm the transaction</li>
                            <li>After the transaction completes the vote can not be changed or re-vote cannoot be done.</li>
                        </ul>
                    </div>
                    <div>
                        <h3>3. Result Phase</h3>
                        <ul className="unordered_list">
                            <li>The result be shown after the voting phase ends.</li>
                            <li>The voter can see the results by navigating to the result tab in navigation menu</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHome

      // setUserData(user);
        // window.localStorage.setItem('user', user);
        // const init = async () => {
        //     const islogin = await fetch('/signin' , {
        //         method: 'GET',
        //         headers: { "Content-Type": "application/json" },
        //       });
        
        //       const data = await islogin.json();
        //       if(data.message){
        //         setUserData(data.user);
        //       }else{
        //         setUserData({});
        //       }
        // }

        // init();