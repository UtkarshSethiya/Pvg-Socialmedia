
import './App.css';
import { db } from './firebase/firebase';
import {BrowserRouter,Switch,Route, Routes,Navigate} from 'react-router-dom'
import firebase from 'firebase/compat/app'
import Chatdataservice from './firebase/chatfunction'
import Signin from './signin';
import Privatepages from './Privatepages';
import Navbar from './components/Navbar';
import Register from './Register';
import Login from './Login';
import AuthProvider from './context/auth';
import Privateroute from './components/Privateroute';
import Home from './Home';
import Profile from './Profile';
import Allroute from './Allroute';
import Myusers from './components/Options/Myusers';
function App() {
  
 
  return (
    <div className="App">
  <AuthProvider>  
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/messenger' element={
 
      <Privatepages/>
    
    }  />

    <Route path='/register' element={<Register/>}  />
    <Route path='/login' element={<Login/>}  />
    <Route path='/profile' element={<Profile/>}  />
   <Route path='/home' element={<Allroute/>} />
   <Route path='/myusers' element={<Myusers/>} />
 


  </Routes>

  </BrowserRouter>
  </AuthProvider> 

    </div>
  );
}

export default App;
