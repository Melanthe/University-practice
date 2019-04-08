class User {

	constructor(name = '') {
		if (typeof (name) !== 'string') {
			console.log('Incorrect argument!');
			return;
		}
		this._name = name;
		this._photoPath = 'img/guest.jpg';
		this._numOfPosts = 0;
		this._likedPosts = [];
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
		if (this._name === '')
		{
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
}