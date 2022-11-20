import React, { useEffect, useState, useRef } from "react";
import firebase from "@/firebase-client";
import { useCollection } from 'react-firebase-hooks/firestore';
import EmojiPicker, { Emoji } from "emoji-picker-react";
import {useRouter} from "next/router";
import styled from "styled-components"

const EmojiField = styled.div`
	width: 100vw;
	display: flex;
	background-color: #3F3F3F;
`;

const EmojiFieldInput = styled.div`
	width: 90vw;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const EmojiFieldSend = styled.button`
	width: 10vw;
	height: 10vw;
	display: flex;
	border: 0;
	justify-content: center;
	align-items: center;
`;

const ChatComponent = ({pairId, userId}) => {
	const [value, loading, error] = useCollection(
		firebase.firestore().collection(`chat${pairId}`),
	);
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState([]);
	const addEmojiToCurrent = (emoji) => {
		setCurrentMessage([...currentMessage, emoji])
	}

	const chatBottom = useRef(null);
	const createMessage = () => {
		const message = currentMessage;
		firebase.firestore().collection(`chat${pairId}`).doc().set({
			created: Date.now(),
			user: userId,
			message: message
		}).then(() => {
			setCurrentMessage([])
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
			{loading && <span><br/>Loading chat...</span>}
			<>
				{messages?.map(doc =>
					<div key={doc.created} className={`message ${doc.user === userId ? "sent" : "received"}`}>
						{doc.message.map((emoji) => 
							<Emoji unified={emoji} size={30} emojiStyle="twitter" />
						)}
						
					</div>
				)}
			</>
			<div className="chatBottom" ref={chatBottom}></div>
		</div>
		<EmojiField>
			<EmojiFieldInput>
			{currentMessage.map((emoji) => <Emoji unified={emoji} size={30} emojiStyle="twitter" />)}
			</EmojiFieldInput>
			<EmojiFieldSend onClick={createMessage}>✈</EmojiFieldSend>
		</EmojiField>
		<EmojiPicker
			theme="dark"
			emojiStyle="twitter"
			skinTonesDisabled
			suggestedEmojisMode="recent"
			width={"100%"}
			onEmojiClick={emoji => addEmojiToCurrent(emoji.unified)}
			categories={[
				{
					name: "Smiles",
					category: "smileys_people"
				},
				{
					name: "animals and nature",
					category: "animals_nature"
				},
				{
					name: "food and drink",
					category: "food_drink"
				},
				{
					name: "activities",
					category: "activities"
				},
				{
					name: "objects",
					category: "objects"
				},
				{
					name: "symbols",
					category: "symbols"
				},
			]} />
	</>;
}
export default ChatComponent;