import { firebaseApp } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

//fetch all docs from firebase
export const getAllFeeds = async (firestoreDb) => {
	//query method is used to sort data in ascending/desc order
	const feeds = await getDocs(query(collection(firestoreDb, "videos"), orderBy("id", "desc")));
	return feeds.docs.map((doc) => doc.data());
};
