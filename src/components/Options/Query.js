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
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Alert from "@mui/material/Alert";

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

export default function Query({ user }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	    document.getElementById("confirm").style.display="none";
		document.getElementById("form").style.display="block";
	}
	const options = [
		{ value: "teacher1", label: "Teacher 1" },
		{ value: "teacher2", label: "Teacher 2" },
		{ value: "teacher3", label: "Teacher 3" },
	];
	const priority = [
		{ value: "high", label: "High" },
		{ value: "medium", label: "Medium" },
		{ value: "low", label: "Low" },
	];

	const [subject, setSubject] = React.useState("");
	const [teacher, setTeacher] = React.useState("");
	const [priorities, setPriority] = React.useState("");
	const [description, setDescription] = React.useState("");
	console.log(subject);
	console.log(teacher);
	console.log(priorities);
	console.log(description);
	console.log(user);
	//Post Collection

	const handleSubmit = async (e) => {
		e.preventDefault();

		/*let url;
    if(img){
      const imgRef = ref(
        storage,
        `postImages/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
*/
		await addDoc(collection(db, "Query"), {
			by: user.name,
			to: teacher,
			priority: priorities,
			createdAt: Timestamp.fromDate(new Date()),
			subject: subject,
			description: description,
		});

		setSubject("");
		setDescription("");
		setPriority("");
		setTeacher("");
		document.getElementById("form").style.display="none";
		document.getElementById("confirm").style.display="block";
	};

	return (
		<div>
			<button className="raise btn" onClick={handleOpen}>
				Raise a Query
			</button>
			<Modal
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className="modal" style={{ width: "700px" }} sx={style}>
					
					<Typography id="modal-modal-description" sx={{ mt: 0 }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<h4>Query Form</h4>
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
						<form onSubmit={handleSubmit} id="form">
							<div>
								<label>Subject</label>
								<br />
								<TextField
									style={{ width: "700px" }}
									id="outlined-basic"
									onChange={(e) => {
										setSubject(e.target.value);
									}}
									value={subject}
									required
									label="Subject"
									variant="outlined"
								/>
							</div>
							<br />
							<div>
								<label>To</label>

								<select
									label="select"
									required
									className="select"
									name="select"
									value={teacher}
									onChange={(e) => {
										setTeacher(e.target.value);
									}}
								>
									<option value="" disabled selected>
										Select your option
									</option>
									{options.map((option) => (
										<option className="options" value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>
							<br />
							<div>
								<label>Priority</label>
								<select
									className="select"
									required
									value={priorities}
									onChange={(e) => {
										setPriority(e.target.value);
									}}
								>
									<option value="" disabled selected>
										Select your option
									</option>
									{priority.map((option) => (
										<option className="options" value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>
							<br />
							<div>
								<label>Description</label>
								<br />
								<textarea
									required
									style={{
										width: "700px",
										height: "100px",
										border: "1px solid lightgrey",
									}}
									value={description}
									onChange={(e) => {
										setDescription(e.target.value);
									}}
								></textarea>
							</div>

							<div>
								<label>Attachment</label>
								<br />
								<input type="file" />
							</div>
							<br />
							<div style={{ textAlign: "center" }}>
								<input className="submitbutton" type="submit" />
							</div>
						</form>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
