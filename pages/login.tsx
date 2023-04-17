import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import supabase from "../utils/supabaseClient";
import { loginWithUserEmail } from "../utils/api";

type IFormInput = {
	email: string;
	password: string;
};

export default function Login() {
	const { register, handleSubmit } = useForm<IFormInput>();
	const onSubmit: SubmitHandler<IFormInput> = (data) => loginWithEmail(data);
	const router = useRouter();

	const loginWithEmail = async ({ email, password }: IFormInput) => {
		if (email && password) {
			const resp = await loginWithUserEmail(email, password);
		}
		router.push(`/`);
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
				<div>
					<p className="mt-4 mb-2 font-medium">
						Is this your first time using Blog!t? You can create your own
						account with just an email.
					</p>
					<button
						className="text-sky-100 group inline-flex items-center rounded-md bg-sky-900 text-base font-medium hover:text-indigo-300 p-1 mt-4 m-auto"
						onClick={() => router.push("/signup")}
					>
						Sign up
					</button>
				</div>
			</div>
		</div>
	);
}
