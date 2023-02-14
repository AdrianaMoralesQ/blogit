import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import logo from "public/logo.png";
import { UserContext } from "../context";

const Nav = () => {
	const { isAuthenticated, userName } = useContext(UserContext);

	return (
		<header>
			<nav className=" bg-sky-200">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<Link
							href={"/"}
							className=" text-black p-0.5 rounded-md text-lg font-medium hover:bg-grey-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							<Image
								alt={`blog it logo`}
								src={logo}
								width={100}
								height={100}
								className="bg-sky-900 p-2 rounded-md"
							/>
						</Link>
						{isAuthenticated ? (
							<Link
								href={`/${userName}`}
								className=" text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								Editor
							</Link>
						) : (
							<Link
								href={"/"}
								className=" text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							></Link>
						)}
						{isAuthenticated ? (
							<Link
								href="/logout"
								className=" text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								Log out
							</Link>
						) : (
							<Link
								href="/login"
								className=" text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								Log in
							</Link>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Nav;
