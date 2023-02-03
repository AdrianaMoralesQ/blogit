import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import CustomLink from "../../components/CustomLink";

import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";

import { DisplayPost } from "../../components/DisplayPost";
import supabase from "../../utils/supabaseClient";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
	a: CustomLink,
	// It also works with dynamically-imported components, which is especially
	// useful for conditionally loading components for certain routes.
	// See the notes in README.md for more details.
	TestComponent: dynamic(() => import("../../components/TestComponent")),
	Head,
};

export default function PostPage({ title, author, body }) {
	return (
		<div>
			<header>
				<nav>
					<Link href="/" legacyBehavior>
						<a>👈 Go back home</a>
					</Link>
				</nav>
			</header>
			<DisplayPost title={title} author={author} body={body} />
		</div>
	);
}

// export const getStaticProps = async ({ params }) => {
// 	const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
// 	const source = fs.readFileSync(postFilePath);

	// 	const { content, data } = matter(source);

	// 	const mdxSource = await serialize(content, {
	// 		// Optionally pass remark/rehype plugins
	// 		mdxOptions: {
	// 			remarkPlugins: [],
	// 			rehypePlugins: [],
	// 		},
	// 		scope: data,
	// 	});

	// 	return {
	// 		props: {
	// 			source: mdxSource,
	// 			frontMatter: data,
	// 		},
	// 	};
	// };

  export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const data: Post = await getPostFromID(params.slug);

  return { props: { ...data}, revalidate: 60 };
};

	export const getStaticPaths = async () => {
		try {
			const { data, error } = await supabase.from("articles").select("id");
			if (error) throw error;

			const slugMap = data.map(({ id }) => ({
				params: {
					slug: String(id),
				},
			}));
			return {
				paths: slugMap,
				fallback: false,
			};
		} catch (error) {
			console.log("error on getStaticPatsh:", error);
		}
	};
};
