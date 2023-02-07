type Props = {
	title: string;
	author: string;
	body: string;
	description: string;
	tags: string;
};

export function DisplayPost({ title, author, body, description, tags }: Props) {
	return (
		<>
			<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4">
				<h1>{title}</h1>
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
