import { useContext, useState } from "react";
import { ImageListType, ImageType } from "react-images-uploading";
import supabase from "./supabaseClient";
import { UserContext } from "../context";
import { type } from "os";

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
type UpdateArticleProps = {
	body: string;
	title: string;
	description: string;
	tags: string;
	author: string;
	picture_url: string;
};
export async function updateArticles(
	props: UpdateArticleProps,
	articleID: string
) {
	const { body, title, description, tags, author, picture_url } = props;
	const updateSingleArticle = async () => {
		try {
			const { data, error } = await supabase
				.from("articles")
				.update({ body, title, tags, description, picture_url })
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

type AddArticleProps = {
	body: string;
	title: string;
	description: string;
	tags: string;
	author: string;
	picture_url: string;
};

/* Create article in Supabase */
export async function addArticles(props: AddArticleProps) {
	const { body, title, description, tags, author, picture_url } = props;
	try {
		const { data, error } = await supabase
			.from("articles")
			.insert({
				title,
				author,
				description,
				body,
				picture_url,
				tags,
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
export async function uploadSinglePicture(image: ImageType) {
	try {
		const { data, error } = await supabase.storage
			.from("public")
			.upload(`${image.file.name}`, image.file, {
				upsert: true,
			});
		if (error) throw error;
		const resp = supabase.storage.from("public").getPublicUrl(data.path);
		const publicUrl = resp.data.publicUrl;
		return publicUrl;
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
