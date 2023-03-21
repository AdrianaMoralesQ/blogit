import { Fragment, useContext, useEffect, useState } from "react";
import { getArticlesFromUser } from "../utils/api";
import { Article } from "../Common/types";
import Link from "next/link";

export default function ArticlesFromUser({ userName }: { userName: string }) {
	const [articles, setArticles] = useState<Article[]>([]);

	useEffect(() => {
		getArticlesFromUser(userName, setArticles);
	}, []);

	if (!!articles.length) {
		return (
			<div>
				<h3>Click on an article to edit it:</h3>
				{articles.map(({ title, id, author }) => (
					<Fragment key={id}>
						<Link
							href={`/${userName}?article=${id}`}
							className="flex columns-1 p-2"
						>
							{title}
						</Link>
					</Fragment>
				))}
			</div>
		);
	}

	return <div> There are no articles from user: {userName}</div>;
}
