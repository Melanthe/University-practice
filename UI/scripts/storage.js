/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class Storage {

	static updatePostsList(list) {
		localStorage.setItem('postList', JSON.stringify(list));
	}

	static getPostsList() {

		let storagePost = JSON.parse(localStorage.getItem('postList'));
		let postList = [];

		if (storagePost) {
			storagePost.forEach((post) => {
				postList.push(Post.parseToPost(post));
			});
		}
		return postList;
	}

	static updateUsersBase(list) {
		localStorage.setItem('usersBase', JSON.stringify(list));
	}

	static getUsersBase() {

		let storageUsers = JSON.parse(localStorage.getItem('usersBase'));
		let userList = [];

		if (storageUsers) {
			storageUsers.forEach((user) => {
				userList.push(User.parseToUser(user));
			});
		}
		return userList;
	}

	static setUser(user = new User()) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	static getUser() {
		let user = localStorage.getItem('user');
		if (user) {
			return User.parseToUser(JSON.parse(user));
		}
		return (new User());
	}
}