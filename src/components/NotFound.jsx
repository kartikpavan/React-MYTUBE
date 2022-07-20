import React from "react";

const NotFound = () => {
	return (
		<main className=" w-full flex flex-col justify-center items-center ">
			<h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
			<div className="bg-error px-2 text-sm rounded rotate-12 absolute">
				Resource Not Found
			</div>
			<button className="mt-5">
				<a className="relative inline-block text-sm font-medium text-primary group active:text-orange-500 focus:outline-none focus:ring">
					<span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"></span>

					<span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
						<router-link to="/">Go Home</router-link>
					</span>
				</a>
			</button>
		</main>
	);
};

export default NotFound;
