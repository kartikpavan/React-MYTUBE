import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { getAllFeeds } from "../utils/fetchData";

const Feed = () => {
	// Firestore database instance
	const firestoreDb = getFirestore(firebaseApp);
	const [feeds, setFeeds] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		getAllFeeds(firestoreDb).then((data) => {
			console.log(data);
			setFeeds(data);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return <div>Feed</div>;
};

export default Feed;
