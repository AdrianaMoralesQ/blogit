import Image from "next/image";
type Props = {
	title: string;
	author: string;
	body: string;
	description: string;
	tags: string;
	image: string;
};

export function DisplayPost({
	title,
	author,
	body,
	description,
	tags,
	image,
}: Props) {
	return (
		<>
			<div className="bg-sky-100 m-8 rounded-md border-transparent p-4">
				<h1>{title}</h1>
				<div>
					<Image
						src={image}
						alt={`Image for ${title}`}
						height={400}
						width={400}
						className="object-contain"
					/>
				</div>
				<h2>{description}</h2>
			</div>
			<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4">
				<h2>By {author}</h2>
				<div>{body}</div>
				<div>{tags}</div>
			</div>
		</>
	);
}
