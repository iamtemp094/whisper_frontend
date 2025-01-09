import axios from 'axios';


export const getChatIds = async (userId, token) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8000/chat/get_message_receivers/",
            { sender_id: userId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
            }
        );
        return data; 
    } catch (error) {
        console.error("Error fetching chat IDs:", error);
        throw error; 
    }
};

export const getMessages = async (userId,chatId,token) => {
    try {
        const { data } = await axios.post(
            "http://localhost:8000/chat/get_user_data/",
            {   
                sender_id: userId,
                receiver_id: chatId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`
                },
            }
        );
        return data; 
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error; 
    }
};

export const sendMessage = async (userId,chatId,message,token) => {
    const newMessage = {
        sender_id: userId,
        receiver_id: chatId,
        message: message,
        timestamp: new Date().toISOString(),
    };
    try {
        const {data}=await axios.post("http://localhost:8000/chat/send_message/", newMessage, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          });
        return data; 
    } catch (error) {
        console.error("Error sending message:", error);
        throw error; 
    }
}