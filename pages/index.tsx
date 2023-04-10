import supabase from "../utils/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment, useContext } from "react";
import { UserContext } from "../context";
import IsFeatured from "../components/Carousel";

type Article = {
	title: string;
	author: string;
	id: string;
	picture_url: string | undefined;
	tags: string | undefined;
};

export async function getServerSideProps() {
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
		(feature) => feature.tags === "featured"
	);
	return (
		<>
			<div className="flex flex-col items-center bg-sky-100 m-8 rounded-md border-transparent p-4">
				<h2 className="block font-extrabold text-grey-700 mt-4">
					Featured Posts
				</h2>
				<div className="w-1/3">
					<IsFeatured articles={featuredArticles} />
				</div>
			</div>
			<div className="bg-sky-100 m-8 rounded-md border-transparent p-4">
				<h2 className="font-extrabold text-grey-700 mt-4 flex justify-center">
					{" "}
					All Posts
				</h2>
				<div className="flex justify-center p-4 m-4">
					<ul className="flex gap-5 justify-center flex-wrap">
						{articles?.map(({ author, title, id, picture_url }) => (
							<li key={id}>
								<>
									<Link as={`/articles/${id}`} href={`/articles/[slug]`}>
										<div>
											{picture_url && (
												<Image
													src={picture_url}
													height={200}
													width={250}
													alt={`picture for ${title}`}
													className="rounded-md border-transparent object-cover h-64 w-64"
												/>
											)}
										</div>
										<h3>{title}</h3>
										<p>By {author}</p>
									</Link>
								</>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
