import React, { useEffect, useState, useRef } from "react";
import firebase from "@/firebase-client";
import { useCollection } from 'react-firebase-hooks/firestore';
import EmojiPicker, { Emoji } from "emoji-picker-react";


const ChatComponent = () => {
	const chatId = 1;
	const userId = 2;

	const [value, loading, error] = useCollection(
		firebase.firestore().collection('chat'),
	);

	const [messages, setMessages] = useState([]);
	const chatBottom = useRef(null);

	const createMessage = (text, chatId, userId) => {
		firebase.firestore().collection('chat').doc().set({
			created: Date.now(),
			user: userId,
			message: text
		})
			.then(() => {
				chatBottom.current?.scrollIntoView({ behavior: "smooth" })
			})

	};

	useEffect(() => {
		if (value) {
			const data = value.docs.map(doc => doc.data())
			setMessages(data.sort((a, b) => a.created - b.created));
		}
	}, [value])

	useEffect(() => {
		chatBottom.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages])

	return <>
		<div className="chatWindow">
			{error && <strong>Error: {JSON.stringify(error)}</strong>}
			{loading && <span>Collection: Loading...</span>}
			<>
				{messages?.map(doc =>
					<div key={doc.created} className={`message ${doc.user === userId ? "sent" : "received"}`}>
						<Emoji unified={doc.message} size={100} emojiStyle="twitter" />
					</div>
				)}
			</>
			<div className="chatBottom" ref={chatBottom}></div>
		</div>
		<EmojiPicker
			theme="dark"
			emojiStyle="twitter"
			skinTonesDisabled
			width={"100%"}
			onEmojiClick={emoji => createMessage(emoji.unified, chatId, userId)} />
	</>;
}

export default ChatComponent;