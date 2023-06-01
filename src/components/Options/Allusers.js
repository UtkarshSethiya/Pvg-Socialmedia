import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import "./options.css";
import "./query.css";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, where,query,onSnapshot } from "firebase/firestore";
import { auth } from "../../firebase/firebase";
import Alert from "@mui/material/Alert";
import { useEffect ,useState} from "react";
import { getDoc,doc ,updateDoc} from "firebase/firestore";
import img from '../svg/user.png'
import { deleteUser } from "firebase/auth";



const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function Allusers() {

    useEffect(() => {
        const usersRef = collection(db, "users");
        // create query object
        const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
        // execute query
        const unsub = onSnapshot(q, (querySnapshot) => {
          let users = [];
          querySnapshot.forEach((doc) => {
            users.push({id: doc.id, ...doc.data()});
          });
          setUser(users);
         
        });
        return () => unsub();
      }, []);
      const[user,setUser]=useState([])
	  const[userID,setUserID]=useState([])


	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	    document.getElementById("confirm").style.display="none";
		document.getElementById("form").style.display="block";
	}
	
	const[currentUser,setCurrentUser]=useState("");
	useEffect(()=>{
		getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
			if (docSnap.exists) {
			  setCurrentUser(docSnap.data());
			}
		  });
	},[])
console.log(userID)
	  const terminateUser=async()=>{
		
			await updateDoc(doc(db,'users',userID),{
				block:"true"
			})
		
	  }
	return (
		<div>
			<button className="alluser btn" onClick={handleOpen}>
				My Users
			</button>
			<Modal 
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className="modal" style={{ width: "700px" }} sx={style}>
					
					<Typography id="modal-modal-description" sx={{ mt: 0 }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							
							<span
								style={{ color: "blue", cursor: "pointer" }}
								onClick={handleClose}
							>
								Close
							</span>
						</div>
						<Alert id="confirm" style={{display:"none"}} severity="success" color="info">
						Query Raised Successfully !!
					</Alert>
						<h1>Users List</h1>

                        <div style={{height:"400px",overflowY:"scroll"}}>
                           {user.map((doc)=>{
                            
                            return(
                                <div style={{background:"RGB(251 251 251)",margin:"5px",padding:"10px",boxShadow:" rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"}}>
                                    <div className='user_info'>
<div className='user_detail'>
  <div>
  <img src={doc.profile || img } className='profileimage'  />
  </div> 
    
 <div >
      <div  className='username'>{doc.name}</div> 
      <div  className='useremail'>{doc.email}</div> 

   
      </div>
     
   
</div>

{currentUser.role=="teacher" && <div  style={{textAlign:"end"}}><button onClick={()=>{terminateUser(); setUserID(doc.id)}} className="deleteuser">{doc.block=="true"?"Terminated":"Terminate User"}</button></div>}

        </div>
                                </div>
                            )

                           })} 
                        </div>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
