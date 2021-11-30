import React, { useState , useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Avatar from 'react-avatar';
import { Link ,useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarDataAdmin';
import { IconContext } from 'react-icons';
import {getSelectedAccount} from '../electionContract';
const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const showSidebar = () => setSidebar(!sidebar);
  const history = useHistory();
  
  const hangleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('useremail');
    localStorage.setItem('isadmin' , false);
    alert('Sign-Out Successful');
    history.replace('/login');
  }
  useEffect(() => {

    const init = async () => {
      setCurrentAccount(await getSelectedAccount());
    }

    init();

  },[]);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div id="navbar-admin-top" className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div id="navbar_address">
            <p>{
              currentAccount ? <p>Account Address :- {currentAccount}</p> : "No Account Selected"
            }</p>
            {
              localStorage.getItem('isadmin') == 'true' && <Avatar color='#fa7f28' round={true} size="45px"  name="Admin" />
            }
           </div>
        </div>
        <nav id="navbar-admin"  className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} id={window.location.pathname == item.path ? "active" : "" }>
                  <Link  to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li onClick={hangleLogout}  className="nav-text">                 
                <Link>
                  <FaIcons.FaEnvelopeOpenText />
                  <span>Logout</span>
                </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;




// import React from 'react'
// import {NavLink} from 'react-router-dom';

// const Navbar = () => {
//     return (
//         <>
//                 <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
//                     <NavLink className="navbar-brand" to="#"><img alt="vote title" src="https://img.icons8.com/flat-round/64/000000/vote-badge.png"/> <span>VoteChain</span> </NavLink>
//                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>

//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav ml-auto">
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/">Home </NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/login">Login</NavLink>
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/register">Register</NavLink>    
//                             </li>
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/vote">Vote</NavLink>    
//                             </li>
                            
//                             {/* <li className="nav-item">
//                                 <NavLink className="nav-link" to="/testeth">Test Eth </NavLink>    
//                             </li> */}
//                             {/* <li className="nav-item">
//                                 <NavLink className="nav-link" to="/faqs">FQS'S </NavLink>    
//                             </li> */}
//                         </ul>
//                     </div>
//                 </nav>

            
//         </>
//     )
// }

// export default Navbar
