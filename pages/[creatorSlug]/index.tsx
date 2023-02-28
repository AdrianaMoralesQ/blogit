import supabase from "../../utils/supabaseClient";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import Image from "next/image";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { UserContext } from "../../context";
import AutoAvatar from "../../components/Avatar";

type IFormInput = {
	title: string;
	author: string;
	description: string;
	body: string;
	tags: string;
	picture_url: string;
};

export default function Home() {
	// React Form Hook, prevents use of useState for each input:
	const { register, handleSubmit } = useForm<IFormInput>();
	const [images, setImages] = useState<ImageListType>([]);
	const [picture_url, setPicture_url] = useState<string>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => addNewArticle(data);
	const onChange = (imageList: ImageListType) => {
		setImages(imageList);
	};
	const { userName, userId } = useContext(UserContext);

	// Function to add new article, it requires author, title and body.
	const addNewArticle = async ({
		title,
		author,
		body,
		description,
		tags,
	}: IFormInput) => {
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
						description: description,
						body: body,
						picture_url: picture_url,
						tags: tags,
					})
					.select();
				if (error) throw error;
				console.log("data:", data);
			}
		} catch (error) {
			console.log("error:", error);
		}
	};
	const uploadArticlePicture = async () => {
		try {
			if (images.length > 0) {
				const image = images[0];
				if (image.file) {
					const { data, error } = await supabase.storage
						.from("public")
						.upload(`${image.file.name}`, image.file, {
							upsert: true,
						});
					if (error) throw error;
					const resp = supabase.storage.from("public").getPublicUrl(data.path);
					const publicUrl = resp.data.publicUrl;
					setPicture_url(publicUrl);
				}
			}
		} catch (error) {
			console.log("error:", error);
		}
	};

	return (
		<>
			<div className="flex flex-row m-8">
				<AutoAvatar userId={userId} size={100} />
				<h2 className="block font-extrabold text-sky-800 m-8">
					Hi {`${userName}`}!
				</h2>
			</div>
			<div className="relative bg-sky-100 m-8 rounded-md border-transparent p-4">
				<div className="mx-auto max-w-7xl px-6 ">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="block text-sm text-grey-700 mt-4 ">
							<h2 className="block text-lg font-extrabold text-grey-700 mt-4">
								Write your post below
							</h2>
							<p className="mt-4 mb-2 font-medium">Title</p>
							<input
								className="text-base font-medium text-gray-900 bg-white rounded-md border-transparent p-1 w-full"
								placeholder="Your title goes here"
								{...register("title", { required: true, maxLength: 50 })}
							/>
							<p className="mt-4 mb-2 font-medium">Description</p>
							<input
								className="text-base font-medium text-gray-900 bg-white rounded-md border-transparent p-1 w-full"
								placeholder="Write your description/subtitle here"
								{...register("description", { required: true, maxLength: 50 })}
							/>
							<p className="mt-4 mb-2 font-medium">Author</p>
							<select
								className="text-base font-medium text-gray-900  bg-white rounded-md border-transparent p-1 w-full"
								placeholder="Please select name"
								{...register("author", {
									required: true,
									pattern: /^[A-Za-z]+$/i,
								})}
							>
								<option value={`${userName}`}>{`${userName}`}</option>
							</select>
							<p className="mt-4 mb-2 font-medium">Type your article below</p>
							<textarea
								className="block w-full px-0 font-medium text-gray-900  bg-white rounded-md border-transparent p-1 dark:placeholder-gray-400"
								placeholder="Write an article..."
								{...register("body", { required: true })}
							/>
							<p className="mt-4 mb-2  font-medium">Tags</p>
							<input
								className="text-base font-medium text-gray-900  bg-white rounded-md border-transparent p-1 w-full"
								placeholder="Start typing your tags"
								{...register("tags", {
									required: true,
									pattern: /^[A-Za-z]+$/i,
								})}
							/>
							<div className="flex flex-col e-full justify-center items-center mt-8">
								<p>Add a picture for your article</p>
								{images.length > 0 && (
									<Image
										src={images[0]["data_url"]}
										height={100}
										width={100}
										alt="article picture"
									/>
								)}
								<ImageUploading
									multiple
									value={images}
									onChange={onChange}
									maxNumber={1}
									dataURLKey="data_url"
								>
									{({
										onImageUpload,
										onImageRemoveAll,
										isDragging,
										dragProps,
									}) => (
										<div className="upload__image-wrapper sm:text-sm h-24 bg-slate-400 items-center justify-center rounded-md border-transparent text-sm mt-4 p-4">
											{images.length === 0 ? (
												<button
													style={isDragging ? { color: "red" } : undefined}
													onClick={onImageUpload}
													type="button"
													{...dragProps}
													className="flex flex-col e-full justify-center items-center"
												>
													Click or drag your article pic here.
												</button>
											) : (
												<button onClick={onImageRemoveAll}>
													Remove all images
												</button>
											)}
										</div>
									)}
								</ImageUploading>
								<button
									type="button"
									className="inline-flex items-center rounded-md border-transparent text-sky-100  bg-sky-700  hover:text-indigo-300 px-4 py-2 text-sm mt-4"
									onClick={uploadArticlePicture}
								>
									Upload article picture
								</button>
							</div>
							<div>
								<button
									className="text-sky-100 group inline-flex items-center rounded-md bg-sky-900 text-base font-medium hover:text-indigo-300 p-1 mt-4"
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
		</>
	);
}
