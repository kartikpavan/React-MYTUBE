import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { getSpecificVideo, getUserInfo } from "../utils/fetchData";
import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";
import Spinner from "./Spinner";
import ReactPlayer from "react-player";
import HTMLReactParser from "html-react-parser";
import moment from "moment";

const avatar = `https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=165619599`;

const VideoDetails = () => {
	// Firestore database instance
	const firestoreDb = getFirestore(firebaseApp);
	const { videoID } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [videoInfo, setVideoInfo] = useState(null);
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		if (videoID) {
			setIsLoading(true);
			getSpecificVideo(firestoreDb, videoID).then((data) => {
				setVideoInfo(data);

				getUserInfo(firestoreDb, data.userId).then((user) => {
					setUserInfo(user);
					console.log(user);
				});
				setIsLoading(false);
			});
		}
	}, [videoID]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<main className="w-full h-[100vh]  flex  items-center flex-col p-8">
			<div className="flex items-end w-full my-4">
				<Link to="/">
					<AiFillHome size={32} />
				</Link>
				<div className=" w-[2px] h-[25px] bg-slate-500 mx-2"></div>
				<p className="text-xl md:text-2xl font-semibold">{videoInfo?.title}</p>
			</div>
			{/* main grid video */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[100%]">
				<div className="w-[100%] col-span-2">
					<div className="flex bg-black relative w-full">
						<ReactPlayer
							url={videoInfo?.videoUrl}
							width={"100%"}
							height={"100%"}
							controls
						/>
					</div>
					{/* video description  */}
					{videoInfo?.description && (
						<div className="flex mt-4 flex-col">
							<h1 className="text-lg md:text-xl font-semibold my-2 ">Description</h1>
							<p> {HTMLReactParser(videoInfo?.description)}</p>
						</div>
					)}
				</div>
				<div className="w-full  col-span-1">
					{userInfo && (
						<div className="flex flex-col w-full">
							<div className="flex items-center w-full">
								<img
									src={userInfo?.photoURL ? userInfo.photoURL : avatar}
									alt="/"
									className="rounded-full w-[40px] md:w-[50px] h-[40px] md:h-[50px] border-2 border-slate-200  "
								/>
								<div className="flex flex-col ml-2 ">
									<div className="flex items-center">
										<h1 className="text-lg md:text-xl font-semibold  mr-2 ">
											{userInfo?.displayName}
										</h1>
										<FcApproval color={"green"} size={20} />
									</div>
									<p className="text-sm italic font-semibold text-gray-500">
										{moment(
											new Date(parseInt(videoInfo?.id)).toISOString()
										).fromNow()}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default VideoDetails;
