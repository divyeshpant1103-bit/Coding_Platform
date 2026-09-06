import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { env } from "@/config/env";

let io: Server | undefined;

export function initSockets(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: { origin: env.corsOrigin },
  });

  io.on("connection", (socket: Socket) => {
    // Client joins a room per event to scope leaderboard/timer broadcasts
    socket.on("event:join", (eventId: string) => {
      socket.join(`event:${eventId}`);
    });

    socket.on("event:leave", (eventId: string) => {
      socket.leave(`event:${eventId}`);
    });
  });

  return io;
}

export function getIO(): Server | undefined {
  return io;
}
