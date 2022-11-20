import dynamic from "next/dynamic"

const Chat = () => {
    const DynamicComponentWithNoSSR = dynamic(() => import('../components/elements/ChatComponent'), {
        ssr: false
      })
    return (
        <div className="container mx-auto my-20 p-5 border-1">
            <h1>Chat</h1>

            <DynamicComponentWithNoSSR/>
        </div>
    );
};

export default Chat
