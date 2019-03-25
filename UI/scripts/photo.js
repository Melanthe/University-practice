class Photo {

	constructor(path = '', author = '') {
		this.path = path;
		this.author = author;
	}

	validatePhoto() {

		if (!this.path || !this.author) {
			return false;
		} else if (typeof (this.author) !== 'string' || typeof (this.path) !== 'string') {
			return false;
		}
		return true;
	}
}