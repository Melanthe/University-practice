/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

class User {

	constructor(name = '', password = '', photoPath = '', numOfPosts = 0) {
		if (typeof (name) !== 'string') {
			console.log('Incorrect argument!');
			return;
		}
		this._name = name;
		this._photoPath = (photoPath === '') ? 'img/guest.jpg' : photoPath;
		this._numOfPosts = numOfPosts;
		this._password = password;
	}

	static parseToUser(object) {
		if (object) {
			return (new User(
				object._name,
				object._password,
				object._photoPath,
				object._numOfPosts
			));
		}
		return undefined;
	}

	set userName(name = '') {
		if (typeof (name) !== 'string') {
			console.log('Incorrect argument!');
			return;
		}
		this._name = name;
	}

	set userPhoto(path = '') {
		if (path === '' || typeof (path) !== 'string') {
			console.log('Incorrect argument!');
			return;
		}
		if (this._name === '') {
			console.log('Invalid operation! There is no active user.');
			return;
		}
		this._photoPath = path;
	}

	get userName() {
		return this._name;
	}

	get userPhoto() {
		return this._photoPath;
	}

	get userPassword() {
		return this._password;
	}
}