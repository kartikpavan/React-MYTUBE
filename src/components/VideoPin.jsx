import React from "react";
import { Link } from "react-router-dom";

import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";
import { getUserInfo } from "../utils/fetchData";
import moment from "moment";

const VideoPin = ({ data }) => {
	// Firestore database instance
	const firestoreDb = getFirestore(firebaseApp);

	const [userId, setUserId] = React.useState(null);
	const [userInfo, setUserInfo] = React.useState(null);

	React.useEffect(() => {
		if (data) setUserId(data.userId);
		if (userId)
			getUserInfo(firestoreDb, userId).then((data) => {
				setUserInfo(data);
			});
	}, [userId]);

	return (
		<div className="flex justify-between items-center flex-col cursor-pointer shadow-lg  rounded-md overflow-hidden relative max-w-[400px] h-[230px] hover:scale-110 duration-200">
			<Link to={`/videoDetail/${data.id}`}>
				<video
					src={data.videoUrl}
					muted
					onMouseOver={(e) => e.target.play()}
					onMouseOut={(e) => e.target.pause()}
				/>
			</Link>
			<div className="flex absolute bottom-0 left-0 p-2 bg-base-300 w-full flex-col">
				<div className="flex w-full justify-between items-center ">
					<p>{data.title}</p>
					<Link to={`/userDetail/${userId}`}>
						<img
							src={userInfo?.photoURL}
							alt="/"
							className="rounded-full w-[50px] h-[50px] border-2 border-slate-200  "
						/>
					</Link>
				</div>
				<p className="text-sm italic font-semibold text-gray-500">{moment(new Date(parseInt(data.id)).toISOString()).fromNow()}</p>
			</div>
		</div>
	);
};

export default VideoPin;
