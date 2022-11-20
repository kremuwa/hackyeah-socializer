import React, { useEffect, useState, useRef } from "react";
import firebase from "@/firebase-client";
import { useCollection } from 'react-firebase-hooks/firestore';
import EmojiPicker, { Emoji } from "emoji-picker-react";
import {useRouter} from "next/router";

const ChatComponent = ({pairId, userId}) => {


	const [value, loading, error] = useCollection(
		firebase.firestore().collection(`chat${pairId}`),
	);

	const [messages, setMessages] = useState([]);
	const chatBottom = useRef(null);

	const createMessage = (text) => {
		firebase.firestore().collection(`chat${pairId}`).doc().set({
			created: Date.now(),
			user: userId,
			message: text
		}).then(() => {
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
			{loading && <span>Loading...</span>}
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
			suggestedEmojisMode="recent"
			width={"100%"}
			onEmojiClick={emoji => createMessage(emoji.unified)} />
	</>;
}

export default ChatComponent;