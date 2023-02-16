import supabase from "../utils/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment, useContext } from "react";
import { UserContext } from "../context";
import AutoAvatar from "../components/Avatar";
import IsFeatured from "../components/Carousel";

type Article = {
	title: string;
	author: string;
	id: string;
	picture_url: string | undefined;
	tags: string | undefined;
};

export async function getStaticProps() {
	const getArticles = async () => {
		try {
			const { data, error } = await supabase
				.from("articles")
				.select("id, title, author, picture_url, tags");

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
	const { isAuthenticated, userName, userId } = useContext(UserContext);
	const featuredArticles = articles.filter(
		(feature) => feature.tags === "Featured"
	);
	return (
		<>
			<div className="flex flex-row m-8">
				{isAuthenticated ? (
					<>
						<AutoAvatar userId={userId} size={100} />
						<h2 className="block font-extrabold text-sky-800 m-8">
							Hi {`${userName}`}!
						</h2>
					</>
				) : (
					<h2 className="block font-extrabold text-grey-700 mt-4"></h2>
				)}
			</div>
			<div className="flex flex-col items-center bg-sky-100 m-8 rounded-md border-transparent p-4">
				<h2 className="block font-extrabold text-grey-700 mt-4">
					Featured Posts
				</h2>
				<div className="w-1/3">
					<IsFeatured articles={featuredArticles} />
				</div>
			</div>
			<div className="  bg-sky-100 m-8 rounded-md border-transparent p-4 ">
				<h2 className="block font-extrabold text-grey-700 mt-4"> All Posts</h2>
				<div>
					<ul className="grid grid-cols-3 gap-2 items-start">
						{articles?.map(({ author, title, id, picture_url }) => (
							<li key={id}>
								<div>
									<Link as={`/articles/${id}`} href={`/articles/[slug]`}>
										<div>
											<Image
												src={picture_url}
												height={200}
												width={250}
												alt={`picture for ${title}`}
												className="rounded-md border-transparent"
											/>
										</div>
										<h3>{title}</h3>
										<p>By {author}</p>
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
