import supabase from "./supabaseClient";

export const getPostFromID = async (id: string) => {
	try {
		const { data, error } = await supabase
			.from("articles")
			.select("*")
			.eq("id", id);
		if (error) throw error;
		return data[0];
	} catch (error) {
		console.log("error:", error);
	}
};

export async function getArticlesFromUser(
	userName: string,
	resolve: (value: any) => void
) {
	const getArticles = async () => {
		try {
			const { data, error } = await supabase
				.from("articles")
				.select("id, title, author, picture_url, body, tags")
				.eq("author", `${userName}`);

			if (error) throw error;
			console.log("data from filtered:", data);
			return data;
		} catch (error) {
			console.log("error:", error);
		}
	};
	const articles = await getArticles();
	return resolve(articles);
}

export async function updateArticles(
	userName: string,
	body: string,
	title: string,
	description: string,
	tags: string

	// resolve: (value: any) => void
) {
	const updateSingleArticle = async () => {
		try {
			const { data, error } = await supabase
				.from("articles")
				.update({ body, title, tags, description })
				.eq("author", `${userName}`)
				.select("*");

			if (error) throw error;
			console.log("data from filtered:", data);
			return data;
		} catch (error) {
			console.log("error:", error);
		}
	};
	const articles = await updateSingleArticle();
	return articles;
}
