import supabase from "../utils/supabaseClient";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type IFormInput = {
	title: string;
	author: string;
	body: string;
};

export default function Home() {
	// React Form Hook, prevents use of useState for each input:
	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => addNewArticle(data);
	// Function to add new article, it requires author, title and body.
	const addNewArticle = async ({ title, author, body }: IFormInput) => {
		try {
			if (title && author && body) {
				toast("Success! Thank you for submitting your article.", {
					hideProgressBar: true,
					autoClose: 2000,
					type: "success",
				});
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
						<textarea
							className="block w-full px-0 font-medium text-gray-900 rounded-md border-transparent p-1 dark:placeholder-gray-400"
							placeholder="Write an article..."
							{...register("body", { required: true })}
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
