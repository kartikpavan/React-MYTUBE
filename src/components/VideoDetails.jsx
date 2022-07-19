import React, { useEffect, useState, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiFillHome, AiFillDelete, AiOutlineCloudDownload } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { getSpecificVideo, getUserInfo, deleteVideo } from "../utils/fetchData";
import { firebaseApp } from "../firebase";
import { getFirestore } from "firebase/firestore";
import Spinner from "./Spinner";
import ReactPlayer from "react-player";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import { fetchUserDetails } from "../utils/fetchUser";
// MODAL
import { Dialog, Transition } from "@headlessui/react";

const avatar = `https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=165619599`;

const VideoDetails = ({ toast }) => {
	// Firestore database instance
	const firestoreDb = getFirestore(firebaseApp);
	const { videoID } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [videoInfo, setVideoInfo] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [localUser] = fetchUserDetails();
	const navigate = useNavigate();

	// Modal State
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(!isOpen);
	}

	function openModal() {
		setIsOpen(!isOpen);
	}

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

	//deleteing the video
	const deleteSingleVideo = (videoID) => {
		setIsLoading(true);
		deleteVideo(firestoreDb, videoID);
		toast.success("video deleted successfully");
		setIsLoading(false);
		navigate("/", { replace: true });
	};

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
							{/* action buttons */}
							<div className="flex justify-around mt-4 items-center">
								{userInfo?.uid === localUser.uid && (
									<div>
										<button
											className="btn btn-error text-gray-300"
											onClick={openModal}
										>
											<AiFillDelete size={28} color={"white"} />
										</button>
										<Transition appear show={isOpen} as={Fragment}>
											<Dialog
												as="div"
												className="relative z-10"
												onClose={closeModal}
											>
												<Transition.Child
													as={Fragment}
													enter="ease-out duration-300"
													enterFrom="opacity-0"
													enterTo="opacity-100"
													leave="ease-in duration-200"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<div className="fixed inset-0 bg-black bg-opacity-25" />
												</Transition.Child>

												<div className="fixed inset-0 overflow-y-auto">
													<div className="flex min-h-full items-center justify-center p-4 text-center">
														<Transition.Child
															as={Fragment}
															enter="ease-out duration-300"
															enterFrom="opacity-0 scale-95"
															enterTo="opacity-100 scale-100"
															leave="ease-in duration-200"
															leaveFrom="opacity-100 scale-100"
															leaveTo="opacity-0 scale-95"
														>
															<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
																<Dialog.Title
																	as="h3"
																	className="text-lg font-medium leading-6 text-gray-900"
																>
																	Are you sure that you want to
																	delete this video ?
																</Dialog.Title>

																<div className="mt-4 text-right flex items-center justify-center">
																	<button
																		className="btn btn-error px-8 mr-4"
																		onClick={() =>
																			deleteSingleVideo(
																				videoID
																			)
																		}
																	>
																		Yes
																	</button>
																	<button
																		className="btn btn-info px-8"
																		onClick={closeModal}
																	>
																		No
																	</button>
																</div>
															</Dialog.Panel>
														</Transition.Child>
													</div>
												</div>
											</Dialog>
										</Transition>
									</div>
								)}

								<button className="btn btn-primary flex justify-between items-center max-w-[230px] w-full">
									<AiOutlineCloudDownload size={32} />
									<p className="text-lg font-bold"> Download Now</p>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default VideoDetails;
