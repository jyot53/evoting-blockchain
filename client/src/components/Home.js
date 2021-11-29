import React , {useEffect , useRef } from "react";
import Left from "../images/vote1.png";
import alanBtn from "@alan-ai/alan-sdk-web";
import {useHistory} from "react-router-dom";
const Home = () => {

  const history = useHistory();
  const alanBtnInstance = useRef(null);
  useEffect(() => {
    if (!alanBtnInstance.current) {
        alanBtnInstance.current = alanBtn({
            key: 'abaf0677c3af5ec12bc8b9538046234f2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                    if (commandData.command === 'login') {
                      setTimeout(() => history.push('/login'), 3000);
                    }
                    if (commandData.command === 'register') {
                      setTimeout(() => history.push('/register'), 3000);
                    }
                }
        });
    }
}, []);
  return (
    <div className="home">
      <div className="home_header">
        <h1 className="home_title"><img src="https://i.imgur.com/nNgnnJ1.png" alt="logo" /></h1>
        <a href='/faqs'>FAQs</a>
      </div>
      <div className="home_main">
        <div className="home_main_left">
          {/* <img src="https://image.similarpng.com/very-thumbnail/2020/11/Vote-paper-put-in-election-box-on-transparent-background-PNG.png" alt="e-voting"/> */}
          <img src={Left} alt="e-voting" />
        </div>
        <div className="home_main_right">
          <div classsName="home_main_data">
            <p className="home_main_data1">Welcome to Vote-Chain</p>
            <p className="home_main_data2">Let your voice be heard!!!</p>
          </div>
          <div className="wrapper">
            <div className="home_main_right_1">
              <a href="/login">
                <span>Login</span>
              </a>
            </div>
            <div>
              <a href="/register">
                <span>Register</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import homepic from '../images/6383.jpg'
// // import Typed from 'react-typed';
// // import mobliepic1 from '../images/mobile-png-10843.png';
// // import mobliepic2 from '../images/mobile-png-10850.png';
// const Home = () => {
//     return (
//         <>
//          {/* <h1 className="text-primary mt-5">React Home page!!!</h1>    */}
//          <section className="home">
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-7 col-12">
//                          <figure>
//                              <img className="homeimg img-fluid" src={homepic} alt="Home Pic" />
//                          </figure>
//                     </div>

//                     <div className="col-md-5 col-12 rightside">
//                         <h1 className="headtext">Online Voting</h1>
//                         {/* <div>
//                             <Typed
//                             className="subtext"
//                             strings={['"We have the power to make a difference. But we need to VOTE." ','“There’s no such thing as a vote that doesn’t matter. It all matters.”',`"All of us may have been created equal. But we'll never actually be equal until we all vote. So don't wait." `]}
//                             typeSpeed={80}
//                             loop={true}
//                             fadeOut={true}
//                             />
//                         </div>  */}

//                          <NavLink to="#" className="btn readbtn" >Read More</NavLink>

//                     </div>

//                 </div>
//             </div>

//             <div className="services text-center">

//                 <div className="container">
//                     <div className="row d-flex align-items-center justify-content-center">
//                         <div className="col-md-3 col-12 dummy d-flex justify-content-center align-items-center">
//                             <div className="d-flex flex-column align-items-center justify-content-center">
//                                 <img alt="icons" src="https://img.icons8.com/bubbles/90/000000/man-with-a-calendar.png"/>
//                                 <p className="servicetext">Registration</p>
//                             </div>
//                         </div>
//                         <div className="col-md-3 col-12 dummy d-flex justify-content-center align-items-center">
//                             <div className="d-flex flex-column align-items-center justify-content-center">
//                                 <img alt="icons" src="https://img.icons8.com/clouds/100/000000/apple-mail.png"/>
//                                 <p className="servicetext">How to vote by mail </p>
//                             </div>
//                         </div>
//                         <div className="col-md-3 col-12 dummy d-flex justify-content-center align-items-center">
//                             <div className="d-flex flex-column align-items-center justify-content-center">
//                                 <img alt="icons" src="https://img.icons8.com/doodle/48/000000/improvement.png"/>
//                                 <p className="servicetext">Election Results</p>
//                             </div>
//                         </div>

//                     </div>
//                     <div className="row d-flex align-items-center justify-content-center">
//                     <div className="col-md-3 col-12 dummy d-flex justify-content-center align-items-center">
//                             <div className="d-flex flex-column align-items-center justify-content-center">
//                             <img alt="icons" src="https://img.icons8.com/office/60/000000/elections.png"/>
//                                 <p className="servicetext">Become a election worker</p>
//                             </div>
//                         </div>
//                         <div className="col-md-3 col-12 dummy d-flex justify-content-center align-items-center">
//                             <div className="d-flex flex-column align-items-center justify-content-center">
//                             <img alt="icons" src="https://img.icons8.com/fluency/60/000000/human-resources.png"/>
//                                 <p className="servicetext">Campaign Ressources</p>
//                             </div>
//                         </div>
//                         <div className="col-md-3 col-12 dummy d-flex justify-content-center align-items-center">
//                             <div className="d-flex flex-column align-items-center justify-content-center">
//                             <img alt="icons"  src="https://img.icons8.com/nolan/64/news.png"/>
//                                 <p className="servicetext">News Releases</p>
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//             </div>

//             {/* <div className="features">
//                 <div className="container-fluid ">
//                     <div className="row offset-1 mt-5 ">
//                         <div className="col-md-6 col-12">
//                             <figure>
//                                 <img className="img-fluid" alt="mobile1" src={mobliepic1}/>
//                                 <img className="img-fluid" alt="mobile2" src={mobliepic2}/>
//                             </figure>
//                         </div>
//                         <div className="col-md-6 col-12">
//                             <h1>Your Elections</h1>
//                             <h1>Any device . Any location.</h1>
//                         </div>
//                     </div>
//                 </div>
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,32L80,74.7C160,117,320,203,480,213.3C640,224,800,160,960,160C1120,160,1280,224,1360,256L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
//             </div> */}

//          </section>
//         </>
//     )
// }

// export default Home