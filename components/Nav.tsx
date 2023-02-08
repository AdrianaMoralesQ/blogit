import Link from "next/link";
import { useContext } from "react";
// import { UserContext } from "../context";
// import supabase from "../utils/supabaseClient";

const Nav = () => {
	// const { isAuthenticated, userName } = useContext(UserContext);

	return (
		<header>
			<nav className=" bg-sky-100">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<Link
							href={"/"}
							className=" text-black px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							Blog it!
						</Link>

						<Link
							href="/editor"
							className=" text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							Editor
						</Link>
						<Link
							href="/logout"
							className=" text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							Log out
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Nav;
