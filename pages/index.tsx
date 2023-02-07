import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import Link from "next/link";

type Article = {
	title: string;
	author: string;
	id: string;
};
export async function getStaticProps() {
	const getArticles = async () => {
		try {
			const { data, error } = await supabase
				.from("articles")
				.select("id, title, author");

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
	return (
		<div>
			<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4">
				<h2 className="block font-extrabold text-grey-700 mt-4">
					Featured Posts
				</h2>
			</div>
			<div className="relative grid-cols-2 bg-sky-100 m-8 rounded-md border-transparent p-4 ">
				<h2> All Posts</h2>
				<div>
					<ul>
						{articles?.map(({ author, title, id }) => (
							<li key={id}>
								<Link as={`/articles/${id}`} href={`/articles/[slug]`}>
									{title} by {author}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
