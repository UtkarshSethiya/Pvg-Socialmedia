import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { addDoc, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { collection, Timestamp, query, onSnapshot } from "firebase/firestore";
import "./post.css";
import Moment from "react-moment";
import Commentimage from "../svg/Comment";
import userimg from '../svg/user.png'



export default function Comment({ postid }) {
	const [comment, setComment] = useState("");
	const [getcomments, setCommentslist] = useState("");
	const [user, setUser] = useState(" ");
	

	const submitHandler = async (e) => {
		e.preventDefault();
		await addDoc(collection(db, "Comments"), {
			postid: postid,
			comment: comment,
			by: user.name,
			profile: user.profile || " ",
			createdAt: Timestamp.fromDate(new Date()),
		});
		setComment(" ");
	};

	useEffect(() => {
		const q = query(collection(db, "Comments"));
		const unsub = onSnapshot(q, (querySnapshot) => {
			setCommentslist(querySnapshot.docs.map((doc) => doc.data()));
		});
		getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
			if (docSnap.exists) {
				setUser(docSnap.data());
			}
		});
	}, []);

	

	return (
		<div>
			<Accordion style={{ boxShadow: "none" }}>
				<AccordionSummary
					style={{width:"50px"}}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>
                        <Commentimage />
                    </Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<div>
							<form onSubmit={submitHandler}>
								<input
									className="commentinputbox"
									value={comment}
									
									onChange={(e) => setComment(e.target.value)}
									type="text"
                                    placeholder="Comment on this post..."
									required
								/>
								<button className="inputbtn" type="submit">
									{" "}
									Comment{" "}
								</button>
							</form>
							{getcomments &&
								getcomments.map((doc) => {
									if (doc.postid == postid)
										return (
											<div className="comment_wrapper">
												<div className="commentuser_wrapper"> 
                                               <div> <img className="commentimage" src={doc.profile==""? userimg:doc.profile} /> </div>
                                               <div className="content_wrapper">
                                               <div className="commentname"><div>{doc.by}</div> <div className="moment"> <Moment fromNow>{doc.createdAt.toDate()}</Moment></div></div> 
                                               <div className="content">{doc.comment}</div>
                                               </div>
                                               
                                               
                                                </div>
												
												
											</div>
										);
								})}
						</div>
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
