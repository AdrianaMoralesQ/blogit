import Link from "next/link";
import { DisplayPost } from "../../components/DisplayPost";
import supabase from "../../utils/supabaseClient";
import { getPostFromID } from "../../utils/api";
import { Post } from "../../Common/types";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.

export default function PostPage({ title, author, body }: Post) {
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

export const getStaticProps = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const data: Post = await getPostFromID(params.slug);
	console.log("data from staticProps:", data);
	return { props: { ...data } };
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
		console.log("error on getStaticPath:", error);
	}
};
