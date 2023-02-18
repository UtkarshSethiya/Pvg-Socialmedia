
import './App.css';
import { db } from './firebase/firebase';
import firebase from 'firebase/compat/app'


function Homei(userdetails) {
  const logout=()=>{
    localStorage.clear();
    window.location.reload()
  }
 
  return (
    <div >

<button onClick={logout}>Signout</button>
<div className="home">

</div>
  
    </div>
  );
}

export default Homei;
