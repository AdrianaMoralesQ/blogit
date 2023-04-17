import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import supabase from "../utils/supabaseClient";

type UserContextData = {
	dummyData: string;
	isAuthenticated: boolean;
	userId: string | undefined;
	setIsAuthenticated: (value: boolean) => void;
	userName: string | undefined;
	setUserName: (value: string) => void;
};

export const UserContext = createContext({} as UserContextData);
type UserProviderProps = any;

const dummyData = "dummy data from context";

export function UserProvider({ children }: UserProviderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const { pathname } = useRouter();
	const [userId, setUserId] = useState<string | undefined>();
	const [userName, setUserName] = useState<string>("");
	const router = useRouter();
	const { creatorSlug } = router.query;

	// For authentication, checks if user has initiated a session
	useEffect(() => {
		const getUser = async () => {
			try {
				const { data, error } = await supabase.auth.getUser();

				if (error) throw error;

				console.log("from get user", { data });
				if (data.user) {
					const userId = data.user?.id;
					setIsAuthenticated(true);
					setUserId(userId);
				}
			} catch (error) {
				console.log("error:", error);
			}
		};
		getUser();
	}, [pathname]);

	useEffect(() => {
		const getUser = async () => {
			try {
				const { data, error } = await supabase
					.from("users")
					.select("user_id")
					.eq("username", creatorSlug);
				if (error) throw error;
				console.log("slug:", creatorSlug);
				setUserId(userId);
			} catch (error) {
				console.log("error:", error);
			}
		};
		if (creatorSlug) {
			getUser();
		}
	}, [creatorSlug]);

	useEffect(() => {
		const getUserName = async () => {
			if (!userId) return;
			const usernameResponse = await supabase
				.from("users")
				.select("username, user_id")
				.eq("user_id", userId);

			if (usernameResponse.error) throw usernameResponse.error;
			console.log("my username", userName);
			setUserName(usernameResponse.data[0].username);
		};
		getUserName();
	}, [userId]);

	return (
		<UserContext.Provider
			value={{
				dummyData,
				isAuthenticated,
				userId,
				setIsAuthenticated,
				userName,
				setUserName,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
