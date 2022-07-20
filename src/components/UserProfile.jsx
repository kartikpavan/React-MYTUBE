import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { getUserInfo, getUserUploadedVideos } from "../utils/fetchData";
import { FcApproval } from "react-icons/fc";
import RecommendedVideos from "./RecommendedVideos";
const randomImg = `https://source.unsplash.com/1600x900/?nature,photography,technology`;

const UserProfile = () => {
	const { userId } = useParams();

	const [userInfo, setUserInfo] = useState(null);
	const [feeds, setFeeds] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	// Firestore database instance
	const firestoreDb = getFirestore(firebaseApp);
	useEffect(() => {
		setIsLoading(true);
		if (userId) {
			getUserInfo(firestoreDb, userId).then((user) => {
				setUserInfo(user);
			});
			getUserUploadedVideos(firestoreDb, userId).then((feed) => {
				setFeeds(feed);
			});
			setIsLoading(false);
		}
	}, [userId]);

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<div className="flex items-center justify-center w-full h-auto p-2 flex-col">
			<div className="flex items-center justify-center relative flex-col w-full">
				<img
					src={randomImg}
					alt="banner img"
					className="w-full h-[320px] object-cover rounded-md "
				/>
				<img
					src={userInfo?.photoURL}
					alt="/"
					className="rounded-full w-[60px] h-[60px] border-2 border-slate-200 mt-[-20px] "
				/>
			</div>
			<div className="flex items-center mt-3">
				<h1 className="text-lg md:text-xl font-semibold  mr-2 ">{userInfo?.displayName}</h1>
				<FcApproval color={"green"} size={20} />
			</div>
			{feeds && (
				<div className="flex flex-col w-full my-4">
					<RecommendedVideos feeds={feeds} />
				</div>
			)}
		</div>
	);
};

export default UserProfile;
