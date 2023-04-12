import { useState } from "react";
import { ImageListType } from "react-images-uploading";
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
	articleID: string,
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

export async function deleteArticles({ id }: { id: string }) {
	try {
		const { error } = await supabase.from("articles").delete().eq("id", id);
		if (error) throw error;
	} catch (error) {
		console.log("error:", error);
	}
}

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
