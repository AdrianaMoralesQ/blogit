import { useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";
import Link from "next/link";
import { Post } from "../Common/types";

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
			<h1>Blog It!</h1>
			<h2>Posts:</h2>
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
	);
}
