import { DisplayPost } from "../../components/DisplayPost";
import supabase from "../../utils/supabaseClient";
import { getPostFromID } from "../../utils/api";
import { Post } from "../../Common/types";

export default function PostPage({
	title,
	author,
	body,
	description,
	tags,
	picture_url,
}: Post) {
	return (
		<div>
			<DisplayPost
				title={title}
				author={author}
				image={picture_url}
				body={body}
				description={description}
				tags={tags}
			/>
		</div>
	);
}

export const getStaticProps = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const data: Post = await getPostFromID(params.slug);
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
			fallback: "blocking",
		};
	} catch (error) {
		console.log("error on getStaticPath:", error);
	}
};
