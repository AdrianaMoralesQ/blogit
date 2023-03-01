export type Post = {
	id: string;
	title: string;
	author: string;
	created_at: string;
	body: string;
	description: string;
	tags: string;
	picture_url: string;
};
export type Article = {
	title: string;
	author: string;
	id: string;
	picture_url: string | undefined;
	tags: string | undefined;
};
