import type { User } from "../types";
export const users = [] as User[];

// ユーザーを追加
export const userJoin = (user: User) => {
	users.push(user);
	return user;
};

// 現在のユーザーを取得
export const getCurrentUser = (id: string) => {
	return users.find((user) => user.id === id);
};

// ユーザーを退出させる
export const userLeave = (id: string) => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

// ルームのユーザーを取得
export const getRoomUsers = (room: string) => {
	return users.filter((user) => user.room === room);
};
