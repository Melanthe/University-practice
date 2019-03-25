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

		if (!this.photo.validatePhoto()) {
			return false;
		} else if (!(this.date instanceof Date) || !isStringArray(this.hashtags) || !isStringArray(this.liked)) {
			return false;
		} else if (this.id === '0') {
			return false;
		}
		return true;
	}
}