import supabase from "../utils/supabaseClient";
import { UserContext } from "../context";
import { Fragment, useContext, useEffect, useState } from "react";
import { getArticlesFromUser } from "../utils/api";
import { Article } from "../Common/types";

export default function ArticlesFromUser({ userName }: { userName: string }) {
	const [articles, setArticles] = useState<Article[]>([]);

	useEffect(() => {
		getArticlesFromUser(userName, setArticles);
	}, []);

	if (!!articles.length) {
		return (
			<div>
				{articles.map(({ title, author, id }) => (
					<Fragment key={id}>
						<h3>{title}</h3>
						<h3>{author}</h3>
					</Fragment>
				))}
			</div>
		);
	}

	return <div> There are no articles from user: {userName}</div>;
}
