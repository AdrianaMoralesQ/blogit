import supabase from "../utils/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import React, { useContext, Component } from "react";

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

export default function IsFeatured({ articles }: { articles: Article[] }) {
	const Featured = articles.filter((feature) => feature.tags === "featured");
	console.log("tags", Featured);
	// <ul className="grid grid-cols-3 gap-2">
	{
		Featured?.map(({ author, title, id, picture_url }) => (
			<Carousel key={id}>
				<div>
					<Image
						src={picture_url}
						height={200}
						width={250}
						alt={`picture for ${title[0]}`}
						className="rounded-md border-transparent"
					/>
					<p className="legend">{title[0]}</p>
				</div>
				<div>
					<Image
						src={picture_url}
						height={200}
						width={250}
						alt={`picture for ${title[1]}`}
						className="rounded-md border-transparent"
					/>
					<p className="legend">{title[1]}</p>
				</div>
				<div>
					<Image
						src={picture_url}
						height={200}
						width={250}
						alt={`picture for ${title[2]}`}
						className="rounded-md border-transparent"
					/>
					<p className="legend">{title[3]}</p>
				</div>
			</Carousel>
			// <li key={id}>
			// 	<div>
			// 		<Link as={`/articles/${id}`} href={`/articles/[slug]`}>
			// 			<div>
			// 				<Image
			// 					src={picture_url}
			// 					height={200}
			// 					width={250}
			// 					alt={`picture for ${title}`}
			// 					className="rounded-md border-transparent"
			// 				/>
			// 			</div>
			// 			<h3>{title}</h3>
			// 			<div>By {author}</div>
			// 		</Link>
			// 	</div>
			// </li>
		));
	}
	// </ul>;
	return <div>hello</div>;
}
