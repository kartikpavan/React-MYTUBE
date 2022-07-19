import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import VideoPin from "./VideoPin";

import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { getAllFeeds } from "../utils/fetchData";

const RecommendedVideos = ({ feeds }) => {
	return (
		<div className="max-w-[100vw] w-full p-4  grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
			{feeds &&
				feeds.map((data) => {
					return <VideoPin key={data.id} data={data} />;
				})}
		</div>
	);
};

export default RecommendedVideos;
