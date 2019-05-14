/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

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

class Post {

	constructor(photo = new Photo(), description = '', 
		hashtags = [], date = new Date(), liked = [], id = -1, likes = liked.length, comments = []) {

		this.photo = photo;
		this.description = description;
		this.id = id;
		this.date = date;
		this.liked = liked;
		this.hashtags = hashtags;
		this.likes = likes;
		this.comments = comments;
	}

	static parseToPost(object) {

		return new Post(
			Photo.parseToPhoto(object.photo),
			object.description,
			object.hashtags,
			new Date(Date.parse(object.date)),
			object.liked,
			object.id,
			object.likes,
			object.comments
		);
	}

	validatePhotoPost() {

		if (!this.photo.validatePhoto()) {
			return false;
		} else if (!(this.date instanceof Date) || !isStringArray(this.hashtags) || !isStringArray(this.liked)) {
			return false;
		} else if (this.id === '0') {
			return false;
		}
		return true;
	}

	likedPost(userName) {

		let index = this.liked.indexOf(userName);

		if (index === -1) {
			this.liked.push(userName);
		} else {
			this.liked.splice(index, 1);
		}
	}

	ifLiked(userName) {
		return (this.liked.some(function(item) {
			return (item === userName);
		}));
	}
}