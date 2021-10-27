import React from 'react'
import Home from './components/Home';
import Login from './components/Login';
// import AdminLogin from './components/AdminLogin';
import AdminAddCandidate  from './components/AdminAddCandidate';
import AdminState  from './components/AdminState';
import AdminDetails from './components/AdminDetails';
import AdminRegister from './components/AdminRegister';
import UserHome from './components/UserHome';
import UserRegister from './components/UserRegister';
import UserVote from './components/UserVote';
import UserResult from './components/UserResult';
import NavbarUser from './components/NavbarUser';
import Registration from './components/Registration';
import Error from './components/Error';
import NavbarAdmin from './components/NavbarAdmin';
// import Faq from './components/Faq';
// import Vote from './components/Vote';
// import Sentmail from './components/Sentmail';
import Testeth from './components/Testeth';
import {Route ,Switch} from 'react-router-dom';
import './App.css';

const App = () => {

  const isAdmin = localStorage.getItem('isAdmin');

  return (
    <>     
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Registration/>
        </Route>
        <Route path="/user/home">
          <NavbarUser/>
          <UserHome/>
        </Route>
        <Route path="/user/register">
          <NavbarUser/>
          <UserRegister/>
        </Route>
        <Route path="/user/vote">
          <NavbarUser/>
          <UserVote/>
        </Route>
        <Route path="/user/showResult">
          <NavbarUser/>
          <UserResult/>
        </Route>
        <Route exact path="/admin/addcandidate" >
        {/* render={() =>
        isAdmin ? <>  <Navbar/>
        <AdminAddCandidate/></> : <Redirect to="/login" />
      } */}
          <NavbarAdmin/>
          <AdminAddCandidate/>
        </Route>
        <Route exact path="/admin/changestate">
          <NavbarAdmin/>
          <AdminState/>
        </Route>
        <Route exact path="/admin/candidatedetails">
          <NavbarAdmin/>
          <AdminDetails/>
        </Route>
        <Route exact path="/admin/register">
          <NavbarAdmin/>
          <AdminRegister/>
        </Route>
        {/* <Route path="/vote">
          <Vote/>
        </Route> */}
        <Route path="/testeth">
          <Testeth/>
        </Route>
        {/* <Route path="/sendmail">
          <Sentmail/>
        </Route> */}
        {/* <Route path="/faqs">
          <Faq/>
        </Route> */}
        <Route>
          <Error/>
        </Route>
      </Switch> 
      
    </>
  )
}

export default App
