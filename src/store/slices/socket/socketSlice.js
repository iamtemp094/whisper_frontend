import { createSlice } from '@reduxjs/toolkit';

const url = "ws://localhost:8000/ws/socket-server/";

const initialState = {
  socket: null,
  isConnected: false,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket: (state, action) => {
      if (!state.socket || state.socket.readyState !== WebSocket.OPEN) {
        const newSocket = new WebSocket(url);

        newSocket.onopen = () => {
          const message = { type: "join", user_id: action.payload.user_id };
          try {
            newSocket.send(JSON.stringify(message));
          } catch (error) {
            console.error("Error sending join message:", error);
          }
        };

        newSocket.onclose = () => {
          console.log("WebSocket disconnected");
          state.isConnected = false;
        };
        state.socket = newSocket;
      }
    },
  },
});

export const { connectSocket, sendMessage, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
