import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { Fragment } from "react";

type Article = {
	title: string;
	author: string;
	id: string;
	picture_url: string | undefined;
	tags: string | undefined;
};

export default function IsFeatured({ articles }: { articles: Article[] }) {
	return (
		<Carousel>
			{articles.map(({ picture_url, title, author, id }) => (
				<Fragment key={`pic_${id}`}>
					<Image
						src={picture_url}
						height={200}
						width={250}
						alt={`picture for ${title}`}
						className="rounded-md border-transparent"
					/>
					<p className="legend">{title}</p>
					<h3>{title}</h3>
					<div>By {author}</div>
				</Fragment>
			))}
		</Carousel>
	);
}
