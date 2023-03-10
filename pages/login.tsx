import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import supabase from "../utils/supabaseClient";

type IFormInput = {
	email: string;
	password: string;
};

export default function Login() {
	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => loginWithEmail(data);
	const router = useRouter();

	const loginWithEmail = async ({ email, password }: IFormInput) => {
		try {
			if (email && password) {
				const resp = await supabase.auth.signInWithPassword({
					email: email,
					password: password,
				});
				router.push(`/`);
				if (resp.error) throw resp.error;
			}
		} catch (error) {
			console.log("error:", error);
		}
	};

	return (
		<div className="m-auto">
			<div className=" m-auto mt-8 relative w-1/2 bg-sky-100  rounded-md border-transparent p-4">
				<div className="m-auto">
					<h2>Welcome back!</h2>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
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
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
