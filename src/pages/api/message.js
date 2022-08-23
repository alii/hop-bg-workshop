import { Hop } from "@onehop/js";
import { nanoid } from "nanoid";
import { z } from "zod";

const schema = z.object({
	content: z.string().min(0).max(240),
	author: z.string().min(3).max(32),
});

const hop = new Hop(process.env.HOP_PROJECT_TOKEN);

export default async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Must POST" });
	}

	const result = schema.safeParse(req.body);

	if (!result.success) {
		res.status(400).json({ success: false, message: "Invalid body" });
		return;
	}

	const { content, author } = result.data;

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
