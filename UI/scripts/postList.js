/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

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

class PostList {

	constructor(postsList = []) {
		this._posts = postsList.slice();
		this._authors = [];
	}

	_generateID() {
		return Date.now() + Math.round(Math.random() * 1000);
	}

	_filterByAuthor(num, author, posts) {

		if (!(typeof (author) === 'string')) {
			console.log('Incorrect argument!');
			return undefined;
		}

		let found = [];
		let count = 0;

		for (let i = 0; (i < posts.length) && (count < num); ++i) {
			if (posts[i].photo.author === author) {
				found.push(posts[i]);
				count++;
			}
		}
		return found;
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
			return (y.date.getTime() - x.date.getTime());
		});
		return true;
	}

	get numOfPosts() {
		return this._posts.length;
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
			if (!this._authors.some((item) => (post.photo.author === item))) {
				this._authors.push(post.photo.author);
			}
			return true;
		}
		return false;
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

		if (!this._ifExistID(id)) {
			return false;
		}

		let index = -1;
		for (let i = 0; i < this._posts.length; ++i) {
			if (this._posts[i].id === id) {
				index = i;
			}
		}

		this._posts.splice(index, 1);
		return true;
	}

	getListOfAuthors() {
		return this._authors;
	}
}