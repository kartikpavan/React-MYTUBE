import React from "react";

import VideoPin from "./VideoPin";

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
