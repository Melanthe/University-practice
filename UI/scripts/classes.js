/* eslint-disable no-console */

class Photo {

	constructor(path = '', author = '') {
		this.path = path;
		this.author = author;
	}

	validatePhoto() {

		let valid = true;

		if (!this.path || !this.author) {
			valid = false;
		} else if (typeof (this.author) !== 'string' || typeof (this.path) !== 'string') {
			valid = false;
		}

		return valid;
	}
}

class Post {
	constructor(photo = new Photo(), description = '', hashtags = [], date = new Date(), liked = [], id = -1) {
		this.photo = photo;
		this.description = description;
		this.id = id;
		this.date = date;
		this.liked = liked;
		this.hashtags = hashtags;
		this.likes = 0;
	}

	validatePhotoPost() {

		let valid = true;

		if (!this.photo.validatePhoto()) {
			valid = false;

		} else if (!(this.date instanceof Date) || !isStringArray(this.hashtags) || !isStringArray(this.liked)) {
			valid = false;
		} else if (this.id === '0') {
			valid = false;
		}

		return valid;
	}
}

function isStringArray(array) {

	if (!Array.isArray(array)) {
		return false;
	}
	if (array.length === 0) {
		return true;
	}
	return array.every(function (item) {
		return (typeof (item) === 'string');
	});
}

class Filter {

	constructor(f_author = '', f_hashtags = [], f_date = true) {
		this.f_author = f_author;
		this.f_hashtags = f_hashtags;
		this.f_date = f_date;
	}

	isEmptyFilter() {

		if (this.f_author === '' && this.f_hashtags.length === 0) {
			return true;
		} else {
			return false;
		}
	}

	validateFilter() {

		if (typeof (this.f_author) !== 'string' || !isStringArray(this.f_hashtags)) {
			return false;
		}
		return true;
	}
}

class PostList {

	constructor(postsList = []) {
		this._posts = postsList.slice();
	}

	_generateID() {
		return ((new Date()).getTime());
	}

	_filterByAuthor(num, author, posts) {

		if (typeof (author) === 'string') {

			let found = [];
			let count = 0;

			for (let i = 0; (i < posts.length) && (count < num); ++i) {
				if (posts[i].photo.author === author) {
					found.push(posts[i]);
					count++;
				}
			}
			return found;

		} else {
			console.log('Incorrect argument!');
			return undefined;
		}
	}

	_filterByHashtags(num, hashtags, posts) {

		let flag = true;
		let found = [];
		let count = 0;

		for (let i = 0; (i < posts.length) && (count < num); ++i) {
			flag = true;
			for (let j = 0; j < hashtags.length; ++j) {
				if (!posts[i].hashtags.includes(hashtags[j])) {
					flag = false;
					break;
				}
			}
			if (flag) {
				found.push(posts[i]);
				count++;
			}
		}
		return found;
	}

	_sortByDate(list) {

		list.sort(function (x, y) {
			return (x.date.getTime() - y.date.getTime());
		});
		return true;
	}

	getPhotoPosts(skip = 0, top = 15, filterConfig = new Filter()) {

		let result = [];

		if ((typeof (skip) !== 'number') || (typeof (top) !== 'number') || !(filterConfig instanceof Filter)) {
			console.log('Incorrect arguments!');
			return undefined;
		}

		result = this._posts.slice();

		if (!(filterConfig.isEmptyFilter()) && filterConfig.validateFilter()) {

			if (filterConfig.f_author !== '') {
				result = this._filterByAuthor(top + skip, filterConfig.f_author, result);
			}
			if (filterConfig.f_hashtags.length !== 0) {
				result = this._filterByHashtags(top + skip, filterConfig.f_hashtags, result);
			}
			result = result.slice(skip);

		} else {
			result = this._posts.slice(skip, skip + top);
		}

		if (filterConfig.f_date === true) {
			this._sortByDate(result);
		}

		return result;
	}

	getPhotoPost(id) {
		return this._posts.find(function (item) {
			return (item.id === id);
		});
	}

	_ifExistID(id) {
		return this._posts.some(function (item) {
			return (item.id === id);
		});
	}

	addPhotoPost(post) {

		if (!(post instanceof Post)) {
			console.log('Incorrect argument!');
			return false;
		}

		if (post.id === -1) {
			post.id = this._generateID();
		} else if (this._ifExistID(post.id)) {
			return false;
		}

		if (post.validatePhotoPost()) {
			this._posts.push(post);
			return true;
		} else {
			return false;
		}
	}

	addAllPosts(posts) {

		let invalidPhotos = [];

		for (let i = 0; i < posts.length; ++i) {
			if (!this.addPhotoPost(posts[i])) {
				invalidPhotos.push(posts[i]);
			}
		}
		return invalidPhotos;
	}

	editPhotoPost(id, new_post) {

		if (!(new_post instanceof Post)) {
			console.log('Incorrect argument!');
			return false;
		}

		if (!new_post.validatePhotoPost()) {
			return false;

		} else {

			let post = this.getPhotoPost(id);

			if (post === undefined) {
				return false;
			}

			post.photo.path = new_post.photo.path;
			post.description = new_post.description;
			post.hashtags = new_post.hashtags.slice();
		}

		return true;
	}

	removePhotoPost(id) {

		let index = -1;

		for (let i = 0; i < this._posts.length; ++i) {
			if (this._posts[i].id === id) {
				index = i;
			}
		}

		if (index == -1) {
			return false;
		}

		this._posts.splice(index, 1);
		return true;
	}
}