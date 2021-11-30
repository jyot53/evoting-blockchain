import React, { useState , useEffect} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Avatar from 'react-avatar';
import { Link ,useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarDataUser';
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
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div id="navbar_address">
            <p>{ 
              currentAccount ? <p>Account Address :- {currentAccount}</p> : "No Account Selected"
            }</p> 
            {
              localStorage.getItem('username') && <Avatar color='#7e3794' round={true} size="45px"  name={localStorage.getItem('username')} />
            }
            
           </div>
        </div>
        <nav id="navbar-user" className={sidebar ? 'nav-menu active' : 'nav-menu'}>
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
