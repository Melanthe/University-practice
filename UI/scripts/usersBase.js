class UsersBase {

	constructor(users = []) {
		this._users = users;
	}
    
	checkUser(name) {
		return (this._users.some((user) => {
			return user.userName === name;
		}));
	}
    
	getUser(name) {
		return (this._users.find((user) => {
			return user.userName === name;
		}));
	}
    
	addUser(user) {
		if (!(user instanceof User)) {
			console.log('Incorrect argument!');
			return false;
		}
		this._users.push(user);
		return true;
	}
    
	get userList() {
		return this._users;
	}
}