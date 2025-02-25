import { act, useEffect, useState } from 'react';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import Sidebar from '../components/chat/Sidebar';
import ChatMessageDisplay from '../components/chat/ChatMessageDisplay';
import { sendMessage } from '../utils/chat';

import {useDispatch,useSelector} from 'react-redux'
import {setAuthData,removeAuthData} from '../store/slices/auth/authSlice'
import {connectSocket} from '../store/slices/socket/socketSlice'

import { getChatIds,getMessages } from '../utils/chat';




export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [activeUserId, setActiveUserId] = useState();
  const [users,setUsers] = useState([])
  const dispatch = useDispatch()
  const authData = useSelector(state => state.auth)
  const socket = useSelector(state => state.socket)
  
  const currentUser ={
    id: authData.user_id,
    name: authData.user_name,
  }
  useEffect(() => {
    const fetchUsers = async () => {
      if (authData.user_id) {
        try {
          const chatIds = await getChatIds(authData.user_id, authData.token);
          const userPromises = chatIds.map(async (chatId) => {
            const data = await getMessages(authData.user_id, chatId, authData.token);
            const newmessages = data.messages.map(message=>{
              return {
                id: message.id,
                senderId: message.sender,
                text: message.message_content,
                timestamp: message.timestamp,
              }
            })
            return {
              id: chatId,
              name: data.receiver_name,
              status: "Do Good Or Do Nothing",
              online: true,
              messages:newmessages
            };
          });
          const userData = await Promise.all(userPromises);
          setUsers(userData); 
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
      };
      fetchUsers();
      if(authData.user_id){
        dispatch(connectSocket(
          {
            user_id : authData.user_id,
          }
        ))
      }
    }, []);

  const handleSendMessage = async (text,activeUserId,users) => {
    const data= await sendMessage(currentUser.id,activeUserId,text,authData.token)
    const newMessage = {
      id: data.id,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
    };  
    const user =  users.find(user => user.id == activeUserId)
    const newUsers = users.filter(user => user.id != activeUserId)
    user.messages.push(newMessage)
    newUsers.push(user)
    setUsers(newUsers)
    try {
      socket.socket.send(JSON.stringify({type:"message",message:text,user_id:currentUser.id,receiver_id:activeUserId,user_name:currentUser.name,message_id:data.id}));
    } catch (error) {

    }
    
  };
  if(socket.socket){
    socket.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if(message.type === "message"){
      try {
        const newMessage = {
          id: message.message_id,
          senderId: message.user_id,
          text: message.message,
          timestamp: new Date().toISOString(),
        }
        const user = users.find((user) => user.id === Number(message.user_id));
        const newUsers = users.filter(user => user.id != message.user_id)
        user.messages.push(newMessage)
        newUsers.push(user)
        setUsers(newUsers)
      } catch (error) {
        console.error(error);
      }
      }
    }
  }
  return (
    <div className="min-h-screen bg-cyber-dark flex">
      <Sidebar
        currentUser={currentUser}
        users={users}
        activeUserId={activeUserId}
        onUserSelect={(user) => setActiveUserId(user.id)}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatHeader activeUserId={activeUserId} users={users} />
        <ChatMessageDisplay messages={messages} currentUser={currentUser} activeUserId={activeUserId} users={users}/>
        {activeUserId && <ChatInput onSendMessage={handleSendMessage} users={users} activeUserId={activeUserId}/>}
      </div>
    </div>
  );
}