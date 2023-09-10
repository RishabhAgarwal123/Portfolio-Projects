/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import { useContext, useEffect, useRef, useState } from "react"
import Logo from "./Logo";
import { uniqBy } from 'lodash';
import { UserContext } from "../ context/UserContext";
import axios from "axios";
import Person from "./Person";

const Chat = () => {
    // eslint-disable-next-line no-unused-vars
    const [ws, setWs] = useState(null);
    const [peopleOnline, setPeopleOnline] = useState({});
    const [peopleOffline, setPeopleOffline] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessageText, setNewMessageText] = useState('');
    const messageBoxRef = useRef('');
    const [messages, setMessages] = useState([]);
    const { username, id, setId, setUsername } = useContext(UserContext);

    const showOnlinePeople = (onlinePeoples) => {
        const people = {};
        onlinePeoples?.forEach(({ userId, username }) => {
            people[userId] = username;
        });
        setPeopleOnline(people);
    }

    const handleMessage = (event) => {
        const message = JSON.parse(event.data);
        if ('online' in message) {
            showOnlinePeople(message.online);
        } else if ('text' in message) {
            setMessages((prev) => [...prev, { ...message, isOur: false }])
        }
    }

    const makingWSSConnection = () => {
        const ws = new WebSocket('ws://localhost:4000');
        setWs(ws);
        ws.addEventListener('message', handleMessage);
        ws.addEventListener('close', () => setTimeout(() => { makingWSSConnection() }, 1000));
    }

    const sendMessage = (e) => {
        e.preventDefault();
        ws.send(JSON.stringify({
            recipient: selectedUserId,
            text: newMessageText
        }));
        setNewMessageText('');
        setMessages((prev) => [...prev, { text: newMessageText, sender: id, recipient: selectedUserId, _id: Date.now() }]);
    }

    const selectPerson = (userId) => setSelectedUserId(userId);

    const getMessages = async () => {
        const { data } = await axios.get(`/messages/${selectedUserId}`);
        setMessages(data);
    }

    const getPeople = async () => {
        const { data } = await axios.get('/people');
        const offlinePeopleArr = data
            ?.filter(person => person._id !== id)
            ?.filter(person => !Object.keys(peopleOnline).includes(person._id));

        const offlinePeople = {};
        offlinePeopleArr?.forEach((person) => {
            offlinePeople[person._id] = person
        })
        setPeopleOffline(offlinePeople);
    }

    const logout = async () => {
        await axios.post('/logout');
        setWs(null);
        setId(null);
        setUsername(null);
    }

    const excludeSelfFromOnlinePeople = { ...peopleOnline };
    delete excludeSelfFromOnlinePeople[id];

    const removeDuplicateMessages = uniqBy(messages, '_id');

    useEffect(() => {
        if (selectedUserId) getMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUserId]);

    useEffect(() => {
        const scrollTo = messageBoxRef.current;
        if (scrollTo) scrollTo.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    useEffect(() => {
        makingWSSConnection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getPeople();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [peopleOnline]);

    return (
        <>
            <div className="flex h-screen">
                <div className="bg-white w-1/4 pt-4 flex flex-col">
                    <div className="flex-grow">
                        <Logo />
                        {Object.keys(excludeSelfFromOnlinePeople).map(userId => (
                            <Person
                                key={userId}
                                id={userId}
                                onClick={() => selectPerson(userId)}
                                selected={userId === selectedUserId}
                                username={peopleOnline[userId]}
                                online={true} />
                        ))}
                        {Object.keys(peopleOffline).map(userId => (
                            <Person
                                key={userId}
                                id={userId}
                                onClick={() => selectPerson(userId)}
                                selected={userId === selectedUserId}
                                username={peopleOffline[userId]?.username}
                                online={false} />
                        ))}
                    </div>
                    <div className="p-2 text-center flex items-center justify-center">
                        <span className="mr-2 text-sm text-gray-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                            </svg>
                            {username}</span>
                        <button
                            onClick={logout}
                            className="text-sm text-gray-500 bg-blue-50 py-1 px-2 border rounded-sm">Log Out</button>
                    </div>
                </div>

                <div className="flex flex-col bg-blue-50 w-3/4 p-2">
                    <div className="flex-grow">
                        {!selectedUserId && (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-gray-400">&larr; Select a Person</div>
                            </div>
                        )}
                        {!!selectedUserId && (
                            <div className="relative h-full">
                                <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                                    {
                                        removeDuplicateMessages?.map((message) => (
                                            <div key={message._id} className={`${message.sender === id ? 'text-right' : ''}`}>
                                                <div
                                                    className={`text-left inline-block p-2 m-2 rounded-sm text-md ${message.sender === id ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}>
                                                    {message.text}
                                                </div>
                                            </div>
                                        ))}
                                    <div ref={messageBoxRef}></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {!!selectedUserId && (
                        <form className="flex gap-2" onSubmit={sendMessage}>
                            <input
                                type="text"
                                placeholder="Type your message"
                                className="bg-white border p-2 flex-grow rounded-sm"
                                value={newMessageText || ''}
                                onChange={(e) => setNewMessageText(e.target.value)} />
                            <button
                                type="submit"
                                className="p-2 text-white bg-blue-500 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default Chat