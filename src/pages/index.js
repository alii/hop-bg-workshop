import { useState } from "react";
import { useChannelMessage } from "@onehop/react";

export default function Home() {
	const [messages, setMessages] = useState([]);
	const [content, setContent] = useState("");

	useChannelMessage("messages", "MESSAGE_CREATE", data => {
		setMessages(old => [data.content, ...old]);
	});

	const submit = async e => {
		e.preventDefault();

		await fetch("/api/message", {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({ content }),
		});
	};

	return (
		<div>
			<form onSubmit={submit}>
				<input
					type="text"
					placeholder="Message content"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>

				<button type="submit">Submit message</button>
			</form>

			<ul>
				{messages.map(message => {
					return <li key={message}>{message}</li>;
				})}
			</ul>
		</div>
	);
}
