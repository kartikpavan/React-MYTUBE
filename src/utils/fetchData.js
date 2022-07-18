import { firebaseApp } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { collection, getDocs, query, orderBy } from "firebase/firestore";

//fetch all docs from firebase
export const getAllFeeds = async (firestoreDb) => {
	//query method is used to sort data in ascending/desc order
	const feeds = await getDocs(query(collection(firestoreDb, "videos"), orderBy("id", "desc")));
	return feeds.docs.map((doc) => doc.data());
};

//fetch a user information using userId
export const getUserInfo = async (firestoreDb, userId) => {
	const userRef = doc(firestoreDb, "users", userId);
	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data();
	} else {
		return "no such document exists";
	}
};

//fetch the specific video using the params
export const getSpecificVideo = async (firestoreDb, videoID) => {
	const videoRef = doc(firestoreDb, "videos", videoID);
	const videoSnap = await getDoc(videoRef);

	if (videoSnap.exists()) {
		return videoSnap.data();
	} else {
		return "no such video exists";
	}
};
