import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import { postFilePaths, POSTS_PATH } from "../utils/mdxUtils";

export default function Index({ posts }) {
	return (
		<div>
			<h1>Blog It</h1>
			<p>
				Go to a post created by
				<code>next-mdx-remote</code>.
			</p>
			<ul>
				{posts.map((post) => (
					<li key={post.filePath}>
						<Link
							as={`/posts/${post.filePath.replace(/\.mdx?$/, "")}`}
							href={`/posts/[slug]`}
						>
							{post.data.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export function getStaticProps() {
	const posts = postFilePaths.map((filePath) => {
		const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
		const { content, data } = matter(source);

		return {
			content,
			data,
			filePath,
		};
	});

	return { props: { posts } };
}
