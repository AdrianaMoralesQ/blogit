type Props = {
	title: string;
	author: string;
	body: string;
};

export function DisplayPost({ title, author, body }: Props) {
	return (
		<>
			<div>
				<h1> {title}</h1>
				<h2>{author}</h2>
			</div>
			<div>{body}</div>
		</>
	);
}
