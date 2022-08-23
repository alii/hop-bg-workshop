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

	await hop.channels.setState("messages", state => ({
		messages: [data, ...state.messages].slice(0, 20),
	}));

	res.json({
		success: true,
	});
};
