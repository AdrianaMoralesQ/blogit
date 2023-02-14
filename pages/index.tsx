import supabase from "../utils/supabaseClient";
import Link from "next/link";
import Image from "next/image";

import { useContext } from "react";
import { UserContext } from "../context";

type Article = {
	title: string;
	author: string;
	id: string;
	picture_url: string | undefined;
};

export async function getStaticProps() {
	const getArticles = async () => {
		try {
			const { data, error } = await supabase
				.from("articles")
				.select("id, title, author, picture_url");

			if (error) throw error;
			// console.log("data from index:", data);
			return data;
		} catch (error) {
			console.log("error:", error);
		}
	};
	const articles = await getArticles();
	return { props: { articles } };
}

export default function Index({ articles }: { articles: Article[] }) {
	const { isAuthenticated, userName } = useContext(UserContext);
	console.log("username", userName);
	return (
		<div>
			<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4">
				{isAuthenticated ? (
					<h2 className="block font-extrabold text-grey-700 mt-4">
						Hi {`${userName}`}!
					</h2>
				) : (
					<h2 className="block font-extrabold text-grey-700 mt-4">Hi!</h2>
				)}
			</div>
			<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4">
				<h2 className="block font-extrabold text-grey-700 mt-4">
					Featured Posts
				</h2>
			</div>
			<div className="relative grid-cols-2 bg-sky-100 m-8 rounded-md border-transparent p-4 ">
				<h2> All Posts</h2>
				<div>
					<ul>
						{articles?.map(({ author, title, id, picture_url }) => (
							<li key={id}>
								<Link as={`/articles/${id}`} href={`/articles/[slug]`}>
									{/* <Image
										src={picture_url}
										height={100}
										width={100}
										alt={`picture for ${title}`}
									/> */}
									{title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
