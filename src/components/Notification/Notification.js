import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Moment from "react-moment";
import "./notification.css";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot,getDoc,doc, } from "firebase/firestore";
import { db ,auth} from "../../firebase/firebase";

export default function Notification() {
	const [notification, setnotification] = useState("");
    const [user, setUser] = useState("");
    console.log(user);
	useEffect(() => {
		const q = query(
			collection(db, "Notification"),
			orderBy("createdAt", "desc")
		);
		const unsub = onSnapshot(q, (querySnapshot) => {
			setnotification(querySnapshot.docs.map((doc) => doc.data()));
		});
	}, []);


    useEffect(()=>{
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
              setUser(docSnap.data());
            }
          });
      },[])



	console.log(notification);

	return (
		<div>
			<div className="notification_cont">
            <Stack sx={{ width: "100%" }} spacing={1}>
                {notification && notification.map((doc)=>{
                    let username=doc.user;
                    if(doc.user==user.name){
                      username="You"
                    }
                    return(
                        
                        <Alert severity="info">
                            {username} {doc.description} <Moment fromNow>{doc.createdAt.toDate()}</Moment>
                        </Alert>
                   
                    )
                })}
           
           </Stack>
			</div>
		</div>
	);
}
