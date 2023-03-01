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
			<div>
				<div className="bg-sky-100 m-8 rounded-md border-transparent p-4">
					<h1>{title}</h1>
					<h2>{description}</h2>
					<h3 className="m-auto">By {author}</h3>
				</div>
				<div className="m-8 relative bg-sky-100 rounded-md border-transparent p-4">
					<div>
						<Image
							src={image}
							alt={`Image for ${title}`}
							height={400}
							width={400}
							className="m-auto rounded-md border-transparent"
						/>
					</div>
				</div>
				<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4 whitespace-pre-line">
					{body}
				</div>
			</div>
			<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4">
				<p>{tags}</p>
			</div>
		</>
	);
}
