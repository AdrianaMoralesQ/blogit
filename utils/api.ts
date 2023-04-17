import { useContext, useState } from "react";
import { ImageListType } from "react-images-uploading";
import supabase from "./supabaseClient";
import { UserContext } from "../context";

/* Get articles filtered by ID from Supabase */
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
/* Get articles filtered by user from Supabase */
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

/* Update existing single article on Supabase, takes article ID */
export async function updateArticles(
	articleID: string,
	body: string,
	title: string,
	description: string,
	tags: string
) {
	const updateSingleArticle = async () => {
		try {
			const { data, error } = await supabase
				.from("articles")
				.update({ body, title, tags, description })
				.eq("id", articleID)
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
/* Create article in Supabase */
export async function addArticles(
	body: string,
	title: string,
	description: string,
	tags: string,
	author: string,
	picture_url: string
) {
	try {
		const { data, error } = await supabase
			.from("articles")
			.insert({
				title: title,
				author: author,
				description: description,
				body: body,
				picture_url: picture_url,
				tags: tags,
			})
			.select();
		if (error) throw error;
	} catch (error) {
		console.log("error:", error);
	}
}

/* Delete articles on Supabase */
export async function deleteArticles({ id }: { id: string }) {
	try {
		const { error } = await supabase.from("articles").delete().eq("id", id);
		if (error) throw error;
	} catch (error) {
		console.log("error:", error);
	}
}

/* Upload a picture to Supabase, creates public url for it */
export async function uploadSinglePicture() {
	const [images, setImages] = useState<ImageListType>([]);
	const [picture_url, setPicture_url] = useState<string>();
	try {
		const image = images[0];
		const { data, error } = await supabase.storage
			.from("public")
			.upload(`${image.file.name}`, image.file, {
				upsert: true,
			});
		if (error) throw error;
		const resp = supabase.storage.from("public").getPublicUrl(data.path);
		const publicUrl = resp.data.publicUrl;
		setPicture_url(publicUrl);
	} catch (error) {
		console.log("error:", error);
	}
}

export async function loginWithUserEmail(email: string, password: string) {
	try {
		if (email && password) {
			const resp = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});
			if (resp.error) throw resp.error;
		}
	} catch (error) {
		console.log("error:", error);
	}
}

// export async function signUpWithUserEmail(
// 	username: string,
// 	email: string,
// 	password: string
// ) {
// 	try {
// 		if (email && password && username) {
// 			const resp = await supabase.auth.signUp({
// 				email: email,
// 				password: password,
// 			});
// 			if (resp.error) throw resp.error;
// 			const userId = resp.data.user?.id;
// 			if (userId) {
// 				await createSingleUser(userId, username);
// 			}
// 		}
// 	} catch (error) {
// 		console.log("error:", error);
// 	}
// }

// async function createSingleUser(userId: string, username: string) {
// 	const { setUserName } = useContext(UserContext);
// 	try {
// 		const { error } = await supabase
// 			.from("users")
// 			.insert({ user_id: userId, username: username });
// 		// instead of set username here, move to context
// 		setUserName(username);
// 		if (error) throw error;
// 	} catch (error) {
// 		console.log("error:", error);
// 	}
// }
