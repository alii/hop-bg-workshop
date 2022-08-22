import { Hop } from "@onehop/js";

const hop = new Hop(process.env.HOP_PROJECT_TOKEN);

export default async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({ success: false, message: "Must POST" });
	}

	const { content } = req.body;

	const data = {
		content,
	};

	await hop.channels.publishMessage("messages", "MESSAGE_CREATE", data);

	res.json({
		success: true,
	});
};
