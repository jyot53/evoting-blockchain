import React from 'react'
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
// import AdminLogin from './components/AdminLogin';
import AdminAddCandidate  from './components/AdminAddCandidate';
import AdminState  from './components/AdminState';
import AdminDetails from './components/AdminDetails';
import AdminRegister from './components/AdminRegister';
import AdminAnalysis from './components/AdminAnalysis';
import UserHome from './components/UserHome';
import Testnft from './components/testnft';
import UserRegister from './components/UserRegister';
import UserOTP from './components/UserOTP';
import UserVote from './components/UserVote';
import UserResult from './components/UserResult';
import UserContact from './components/UserContact';
import UserProfile from './components/UserProfile';
import NavbarUser from './components/NavbarUser';
import Registration from './components/Registration';
// import Registration1 from './components/Registration1';
import Error from './components/Error';
import NavbarAdmin from './components/NavbarAdmin';
import VotingCard from './components/VotingCard';
import PrintCard from './components/PrintCard';
import Faq from './components/Faq';
// import Vote from './components/Vote';
// import Sentmail from './components/Sentmail';
import Testeth from './components/Testeth';
import {Route ,Switch} from 'react-router-dom';;


const App = () => {

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
        {/* <Route path="/register1">
          <Registration1/>
        </Route> */}
        <Route path="/card">
          <VotingCard/>
        </Route>
        <Route path="/print">
          <PrintCard />
        </Route>
        <Route path="/nft">
          <Testnft/>
        </Route>
        <Route path="/user/home">
          <NavbarUser/>
          <UserHome/>
        </Route>
        <Route path="/user/register">
          <NavbarUser/>
          <UserRegister/>
        </Route>
        <Route path="/user/contact">
          <NavbarUser/>
          <UserContact/>
        </Route>
        <Route path="/user/verify_otp">
          <NavbarUser/>
          <UserOTP/>
        </Route>
        <Route path="/user/vote">
          <NavbarUser/>
          <UserVote/>
        </Route>
        <Route path="/user/showResult">
          <NavbarUser/>
          <UserResult/>
        </Route>
        <Route path="/user/profile">
          <NavbarUser/>
          <UserProfile/>
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
        <Route exact path="/admin/analysis">
          <NavbarAdmin/>
          <AdminAnalysis/>
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
        <Route path="/faqs">
          <Faq/>
        </Route>
        <Route>
          <Error/>
        </Route>
      </Switch> 
    </>
  )
}

export default App
