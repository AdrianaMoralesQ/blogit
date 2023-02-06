import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import Link from "next/link";
import { Post } from "../Common/types";
import { Popover } from "@headlessui/react";

type Article = {
	title: string;
	author: string;
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
			<div className="relative bg-blue-200 m-8 rounded-md border-transparent p-4">
				<h1 className="block text-lg font-extrabold text-grey-700 mt-4">
					Blog It!
				</h1>
			</div>
			<div className="relative bg-blue-200 m-8 rounded-md border-transparent p-4">
				<h2>Featured Posts</h2>

				<ul>
					{articles?.map((article: Article, id) => (
						<li key={id}>
							<Link as={`/blogit/${id}`} href={`/blogit/[slug]`}>
								{article.title} by {article.author}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
