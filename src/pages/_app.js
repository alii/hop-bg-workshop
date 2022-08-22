import "../styles/globals.css";

import { useEffect } from "react";
import { project } from "../config";
import { hop } from "@onehop/client";

export default function MyIRCApp({ Component, pageProps }) {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		hop.init({
			projectId: project,
		});
	}, []);

	return <Component {...pageProps} />;
}
