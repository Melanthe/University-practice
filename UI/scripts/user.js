class User {

	constructor(name = '') {
		if (name === '' || typeof (name) !== 'string') {
			console.log('Incorrect argument!');
			return;
		}
		this._name = name;
		this._photoPath = '';
		this._numOfPosts = 0;
		this._likedPosts = [];
	}

	set userName(name = '') {
		if (name === '' || typeof (name) !== 'string') {
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
		this._photoPath = path;
	}

	get userName() {
		return this._name;
	}

	get userPhoto() {
		return this._photoPath;
	}
}