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
				<h3>Click on an article to edit it:</h3>
				{articles.map(({ title, id }) => (
					<Fragment key={id}>
						<p>{title}</p>
					</Fragment>
				))}
			</div>
		);
	}

	return <div> There are no articles from user: {userName}</div>;
}
