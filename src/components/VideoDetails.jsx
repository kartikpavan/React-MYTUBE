import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { getSpecificVideo } from "../utils/fetchData";
import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";
import Spinner from "./Spinner";
const VideoDetails = () => {
	// Firestore database instance
	const firestoreDb = getFirestore(firebaseApp);
	const { videoID } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [videoInfo, setVideoInfo] = useState(null);

	useEffect(() => {
		if (videoID) {
			setIsLoading(true);
			getSpecificVideo(firestoreDb, videoID).then((data) => {
				setVideoInfo(data);
				setIsLoading(false);
				console.log(data);
			});
		}
	}, [videoID]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<main className="w-full h-auto flex justify-center items-center flex-col py-2 px-4">
			<div className="flex items-end w-full my-4">
				<Link to="/">
					<AiFillHome size={32} />
				</Link>
				<div className=" w-[2px] h-[25px] bg-slate-500 mx-2"></div>
				<p className="text-xl md:text-2xl font-semibold">{videoInfo?.title}</p>
			</div>
		</main>
	);
};

export default VideoDetails;
