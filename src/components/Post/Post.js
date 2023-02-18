import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../../firebase/firebase";
import {
	collection,
	query,
	where,
	onSnapshot,
	addDoc,
	Timestamp,
	setDoc,
} from "firebase/firestore";
import {
	ref,
	getDownloadURL,
	uploadBytes,
	deleteObject,
} from "firebase/storage";
import Imagepost from "../svg/Imagepost";
import File from "../svg/File";
import "./post.css";
import Postmapping from "./Postmapping";

export default function Post() {
	const { curentuser } = useContext(AuthContext);
	const [user, setUser] = useState("");
	const [text, settext] = useState("");
	const [img, setImg] = useState("");
	console.log(user);

	useEffect(() => {
		getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
			if (docSnap.exists) {
				setUser(docSnap.data());
			}
		});
	}, []);

	const handlesubmit = async (e) => {
		e.preventDefault();

		let url;
		if (img) {
			const imgRef = ref(
				storage,
				`postImages/${new Date().getTime()} - ${img.name}`
			);
			const snap = await uploadBytes(imgRef, img);
			const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
			url = dlUrl;
		}

		await addDoc(collection(db, "Post"), {
			postcontent: text,
			postid: user.uid + Timestamp.fromDate(new Date()).toString(),
			postedBy: user.name,
			profile: user.profile,
			createdAt: Timestamp.fromDate(new Date()),
			media: url || " ",
			likes: 0,
		});

		await addDoc(collection(db, "Notification"), {
			user: user.name,
			description: "Posted",
			createdAt: Timestamp.fromDate(new Date()),
		});

		settext("");
		setImg("");
	};

	return (
		<div className="post_wrapper">
			<br />
			<form className="post_form" onSubmit={handlesubmit}>
				<div className="inputwrapper">
					<img src={user.profile} className="profileimage" />
					<textarea
						required
						className="writeinput"
						value={text}
						type="text"
						placeholder="Write Something"
						onChange={(e) => settext(e.target.value)}
						rows="4"
						cols="60"
						name="description"
					/>
				</div>

				<div className="uploadinputs">
					<label
						style={{ display: "flex", alignItems: "center" }}
						htmlFor="img"
					>
						<Imagepost />
						<span
							style={{ fontSize: "11px", fontWeight: "600", color: "grey" }}
						>
							{img.name}
						</span>
					</label>

					<input
						type="file"
						accept="image/*"
						style={{ display: "none" }}
						onChange={(e) => setImg(e.target.files[0])}
						id="img"
					/>

					<label htmlFor="file">
						<File />
					</label>
					<input
						name="userfile"
						id="file"
						type="file"
						style={{ display: "none" }}
						accept="application/pdf, application/vnd.ms-excel"
					/>
					<button type="submit" className="postsubmitbutton">
						Submit{" "}
					</button>
				</div>
			</form>

			<div className="postmapping_wrapper">
				<Postmapping />
			</div>
		</div>
	);
}
