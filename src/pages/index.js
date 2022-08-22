import { useState } from "react";
import { useChannelMessage } from "@onehop/react";

export default function Home() {
	const [messages, setMessages] = useState([]);

	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");

	useChannelMessage("messages", "MESSAGE_CREATE", data => {
		setMessages(old => [data, ...old]);
	});

	const submit = async e => {
		e.preventDefault();

		await fetch("/api/message", {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({ content, author }),
		});
	};

	return (
		<div>
			<form onSubmit={submit}>
				<input
					type="text"
					placeholder="Author"
					value={author}
					onChange={e => setAuthor(e.target.value)}
				/>

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
					return (
						<li key={message.id}>
							<b>{message.author}</b>: {message.content}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
