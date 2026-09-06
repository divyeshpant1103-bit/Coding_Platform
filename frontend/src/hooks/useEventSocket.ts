import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";

let socket: Socket | undefined;

export function useEventSocket(eventId: string, onLeaderboardUpdate: () => void) {
  useEffect(() => {
    if (!socket) socket = io(SOCKET_URL);

    socket.emit("event:join", eventId);
    socket.on("leaderboard:update", onLeaderboardUpdate);

    return () => {
      socket?.emit("event:leave", eventId);
      socket?.off("leaderboard:update", onLeaderboardUpdate);
    };
  }, [eventId, onLeaderboardUpdate]);
}
