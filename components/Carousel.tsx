import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { Fragment } from "react";
import Link from "next/link";

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
			{articles.map(({ picture_url, title, id }) => (
				<Link as={`/articles/${id}`} href={`/articles/[slug]`}>
					<Fragment key={`pic_${id}`}>
						<Image
							src={picture_url}
							height={400}
							width={400}
							alt={`picture for ${title}`}
							className="rounded-md border-transparent object-cover h-96 w-96"
						/>
						<p className="legend">{title}</p>
					</Fragment>
				</Link>
			))}
		</Carousel>
	);
}
