import { ComponentProps, FC, useState } from "react";
import { UserContext } from "../context";

export const AutoAvatar: FC<
	ComponentProps<"img"> & { userId: string; size: number }
> = ({ userId, size, ...imgProps }) => {
	const [base64, setBase64] = useState(undefined as string | undefined);

	// using dynamic import to save some loading
	import("jdenticon").then(({ toSvg }) => {
		const svgString = toSvg(userId, size);
		const base64 = Buffer.from(svgString).toString("base64");
		setBase64(base64);
	});

	return base64 ? (
		<div style={{ backgroundColor: "rgb(225,225,225)", display: "flex" }}>
			<img
				{...imgProps}
				src={`data:image/svg+xml;base64,${base64}`}
				alt={"User Avatar"}
			/>
		</div>
	) : (
		<div style={{ width: size, height: size, display: "inline-block" }}>
			Loading...
		</div>
	);
};

export default AutoAvatar;
