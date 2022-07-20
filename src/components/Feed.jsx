import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import VideoPin from "./VideoPin";

import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { getAllFeeds, getCategoryWiseFeeds } from "../utils/fetchData";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const Feed = () => {
	// Firestore database instance
	const firestoreDb = getFirestore(firebaseApp);
	const [feeds, setFeeds] = useState("");
	const [loading, setLoading] = useState(false);

	const { categoryID } = useParams();

	useEffect(() => {
		setLoading(true);
		if (categoryID) {
			getCategoryWiseFeeds(firestoreDb, categoryID).then((data) => {
				setFeeds(data);
				setLoading(false);
			});
		} else {
			getAllFeeds(firestoreDb).then((data) => {
				setFeeds(data);
				setLoading(false);
			});
		}
	}, [categoryID]);

	if (loading) {
		return <Spinner />;
	}
	if (!feeds.length > 0) return <NotFound />;

	return (
		<div className="max-w-[100vw] w-full p-4  grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
			{feeds &&
				feeds.map((data) => {
					return <VideoPin key={data.id} data={data} />;
				})}
		</div>
	);
};

export default Feed;
