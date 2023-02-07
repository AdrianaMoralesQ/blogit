import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Nav";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<ToastContainer
				position="top-right"
				autoClose={15000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<Nav />
			<Component {...pageProps} />
		</div>
	);
}
