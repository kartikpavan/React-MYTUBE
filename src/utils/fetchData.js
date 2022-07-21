import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

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

//delete a particular video using the params
export const deleteVideo = async (firestoreDb, videoID) => {
	await deleteDoc(doc(firestoreDb, "videos", videoID));
};

// recommended videos
export const getRecommendedFeed = async (firestoreDb, categoryId, videoId) => {
	//query method is used to sort data in ascending/desc order
	const feeds = await getDocs(
		query(
			collection(firestoreDb, "videos"),
			where("category", "==", categoryId),
			where("id", "!=", videoId),
			orderBy("id", "desc")
		)
	);
	return feeds.docs.map((doc) => doc.data());
};

//fetch user uploaded videos
export const getUserUploadedVideos = async (firestoreDb, userId) => {
	//query method is used to sort data in ascending/desc order
	const feeds = await getDocs(
		query(
			collection(firestoreDb, "videos"),
			where("userId", "==", userId),
			orderBy("id", "desc")
		)
	);
	return feeds.docs.map((doc) => doc.data());
};

// category wise feeds
export const getCategoryWiseFeeds = async (firestoreDb, categoryId) => {
	//query method is used to sort data in ascending/desc order
	const feeds = await getDocs(
		query(
			collection(firestoreDb, "videos"),
			where("category", "==", categoryId),
			orderBy("id", "desc")
		)
	);
	return feeds.docs.map((doc) => doc.data());
};
