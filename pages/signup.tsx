import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { UserContext } from "../context";
import supabase from "../utils/supabaseClient";

type IFormInput = {
	username: string;
	email: string;
	password: string;
};
export default function Signup() {
	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => signUpWithEmail(data);

	const { setUserName } = useContext(UserContext);

	const signUpWithEmail = async ({ username, email, password }: IFormInput) => {
		try {
			if (email && password && username) {
				toast(
					"You've created an account! Please check your inbox. We've sent you an authentication email",
					{
						hideProgressBar: true,
						autoClose: 2000,
						type: "success",
					}
				);
				const resp = await supabase.auth.signUp({
					email: email,
					password: password,
				});
				if (resp.error) throw resp.error;
				const userId = resp.data.user?.id;
				if (userId) {
					await createUser(userId, username);
					// console.log("userId:", userId, username);
				}
			}
		} catch (error) {
			console.log("error:", error);
		}
	};
	async function createUser(userId: string, username: string) {
		try {
			const { error } = await supabase
				.from("users")
				.insert({ user_id: userId, username: username });
			// instead of set username here, move to context
			setUserName(username);
			if (error) throw error;
		} catch (error) {
			console.log("error:", error);
		}
	}
	return (
		<div className="m-auto">
			<div className=" m-auto mt-8 relative w-1/2 bg-sky-100  rounded-md border-transparent p-4">
				<div className="m-auto">
					<h2>Create an account to start blogging!</h2>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<p className="mt-4 mb-2 font-medium">Username</p>
					<input
						className="text-base font-medium text-gray-900  bg-white rounded-md border-transparent p-1 w-full"
						placeholder="Please create your username"
						{...register("username", {
							required: true,
						})}
					/>{" "}
					<p className="mt-4 mb-2 font-medium">Email</p>
					<input
						type="email"
						className="text-base font-medium text-gray-900  bg-white rounded-md border-transparent p-1 w-full"
						placeholder="Please enter your email"
						{...register("email", {
							required: true,
						})}
					/>
					<p className="mt-4 mb-2 font-medium">Password</p>
					<input
						type="password"
						className="text-base font-medium text-gray-900  bg-white rounded-md border-transparent p-1 w-full"
						placeholder="Please enter your password"
						{...register("password", {
							required: true,
						})}
					/>
					<div>
						<button
							className="text-sky-100 group inline-flex items-center rounded-md bg-sky-900 text-base font-medium hover:text-indigo-300 p-1 mt-4 m-auto"
							type="submit"
						>
							Sign up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
