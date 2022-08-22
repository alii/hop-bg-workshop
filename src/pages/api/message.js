import { Hop } from "@onehop/js";
import { nanoid } from "nanoid";

const hop = new Hop(process.env.HOP_PROJECT_TOKEN);

export default async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Must POST" });
	}

	const { content, author } = req.body;

	const data = {
		content,
		author,
		id: nanoid(),
	};

	await hop.channels.publishMessage("messages", "MESSAGE_CREATE", data);

	res.json({
		success: true,
	});
};
