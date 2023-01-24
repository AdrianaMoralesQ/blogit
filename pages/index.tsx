import supabase from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type IFormInput = {
	title: string;
	author: string;
	body: string;
};

export default function Home() {
	// React Form Hook, prevents use of useState for each input:
	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => addNewArticle(data);

	const addNewArticle = async ({ title, author, body }: IFormInput) => {
		try {
			if (title && author && body) {
				const { data, error } = await supabase
					.from("articles")
					.insert({
						title: title,
						author: author,
						body: body,
					})
					.select();
				if (error) throw error;
				console.log("data:", data);
			}
		} catch (error) {
			console.log("error:", error);
		}
	};
	return (
		<div className="relative bg-blue-200 m-8 rounded-md border-transparent p-4">
			<div className="mx-auto max-w-7xl px-6 ">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="block text-sm text-grey-700 mt-4 ">
						<h1 className="block text-lg font-extrabold text-grey-700 mt-4">
							Blog It
						</h1>
						<h2 className="mt-4 font-medium">Create a new post:</h2>
						<p className="mt-4 font-medium">Title</p>
						<input
							className="text-base font-medium text-gray-900 rounded-md border-transparent p-1 w-full"
							{...register("title", { required: true, maxLength: 50 })}
						/>
						<p className="mt-4 font-medium">Author</p>
						<input
							className="text-base font-medium text-gray-900 rounded-md border-transparent p-1 w-full"
							{...register("author", {
								required: true,
								pattern: /^[A-Za-z]+$/i,
							})}
						/>
						<p className="mt-4 font-medium">Type your article below</p>
						<input
							className="text-base font-medium text-gray-900 rounded-md border-transparent p-1 w-full h-96"
							{...register("body", { maxLength: 1000, required: true })}
						/>
						<div>
							<button
								className="text-blue-400 group inline-flex items-center rounded-md bg-blue-900 text-base font-medium hover:text-gray-900 p-1 mt-4"
								type="submit"
							>
								{" "}
								Submit{" "}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

// return (
// 	<div>
// 		<h1>Blog It</h1>
// 		<p>Create a new post:</p>
// 		<div className="block text-sm font-medium text-grey-700 mt-4">Title: </div>
// 		<div className="mt-1">
// 			<input
// 				type="text"
// 				name="title"
// 				id="title"
// 				className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm color:black"
// 				placeholder="10 Reasons to learn Next.js"
// 				onChange={(e) => setTitle(e.target.value)}
// 			/>
// 		</div>
// 		<button
// 			type="button"
// 			className="inline-flex items-center rounded-md border-transparent bg-pink-700 px-4 py-2 text-sm mt-4"
// 			onClick={addNewArticle}
// 		>
// 			Add new article
// 		</button>
// 	</div>
// );
