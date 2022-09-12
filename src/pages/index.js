import { useState, useEffect } from "react";
import styles from "../styles/index.module.css"
import { useChannelMessage, useReadChannelState } from "@onehop/react";

export default function Home() {
	const [messages, setMessages] = useState([]);

	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");

	useChannelMessage("messages", "MESSAGE_CREATE", data => {
		setMessages(old => [data, ...old]);
	});

	const { state } = useReadChannelState("messages");

	useEffect(() => {
		if (messages.length === 0 && state && state.messages.length > 0) {
			setMessages(state.messages);
		}
	}, [state, messages]);

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
					className={styles.input}
					placeholder="Author"
					value={author}
					onChange={e => setAuthor(e.target.value)}
				/>

				<input
					type="text"
					className={styles.input}
					placeholder="Message content"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>

				<button type="submit">Submit message</button>
			</form>

			<ul className={styles.messageContainer}>
				{messages.map(message => {
					return (
						<li key={message.id} className={styles.message}>
							<b
								style={{
									color: message.isAdmin ? "red" : "black",
								}}>
								{message.author}
							</b>
							: {message.content}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
