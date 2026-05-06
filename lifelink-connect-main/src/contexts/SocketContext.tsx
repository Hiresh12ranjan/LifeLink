import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { user } = useAuth(); // Assuming you have an AuthContext

    useEffect(() => {
        // Connect only if user is logged in
        if (user) {
            // Replace with your backend URL
            const newSocket = io("http://localhost:5000");

            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);

                // Join room based on user role/ID/bloodGroup
                if (user.role === "donor" && user.bloodGroup) {
                    newSocket.emit("join_room", user.bloodGroup);
                    newSocket.emit("join_room", user.id); // Join personal room
                } else if (user.role === "receiver") {
                    newSocket.emit("join_room", user.id); // Join personal room
                }
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [user?.id]); // Re-run if user changes

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
