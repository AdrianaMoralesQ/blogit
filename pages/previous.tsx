import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import ArticlesFromUser from "../components/ArticlesFromUser";
import AutoAvatar from "../components/Avatar";

export default function PreviousPosts() {
	const { userName, userId } = useContext(UserContext);

	// function to call/populate articles from user
	// const onClick = () => { }

	return (
		<>
			<div className="flex flex-row m-8">
				<AutoAvatar userId={userId} size={100} />
				<h2 className="block font-extrabold text-sky-800 m-8">
					Hi {`${userName}`}!
				</h2>
			</div>
			<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4 mt-2">
				{userName && <ArticlesFromUser userName={userName} />}
			</div>
			;
		</>
	);
}
