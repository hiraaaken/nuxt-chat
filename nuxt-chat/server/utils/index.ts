import { Server, type ServerOptions, type Socket } from "socket.io";
import dayjs from "dayjs";
import type { H3Event } from "h3";
import type { User } from "../types";
import { getRoomUsers, userJoin } from "./users";

const options: Partial<ServerOptions> = {
	path: "/api/socket.io",
	serveClient: false,
};

export const io = new Server(options);

const botName = "NuxtChat Admin";
export const initSocket = (event: H3Event) => {
	// @ts-ignore
	io.attach(event.node.res.socket?.server);

	io.on("connection", (socket: Socket) => {
		// 部屋に参加
		socket.on("joinRoom", (payload: User) => {
			const user = userJoin({ ...payload, id: socket.id });
			socket.join(user.room);

			socket.broadcast
				.to(user.room)
				.emit(
					"message",
					formatMessage(botName, `${user.username} has joined the chat`),
				);

			io.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		});

		// メッセージ送信
		socket.on("chatMessage", (payload: string) => {
			const user = getCurrentUser(socket.id);
			if (user) {
				io.to(user.room).emit("message", formatMessage(user.username, payload));
			}
		});

		// ユーザーが退出
		socket.on("disconnect", () => {
			const user = userLeave(socket.id);

			if (user) {
				io.to(user.room).emit(
					"message",
					formatMessage(botName, `${user.username} has left the chat`),
				);

				io.to(user.room).emit("roomUsers", {
					room: user.room,
					users: getRoomUsers(user.room),
				});
			}
		});
	});
};

export const formatMessage = (username: string, text: string) => {
	return {
		username,
		text,
		time: dayjs().format("h:mm a"),
	};
};
