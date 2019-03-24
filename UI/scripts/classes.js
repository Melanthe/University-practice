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

class OnClick {

	static like(node, post) {

		node.onclick = function () {
			if (node.dataset.status === '0') {
				node.dataset.status = '1';
				node.firstElementChild.textContent = (++post.likes);
				node.lastElementChild.style.color = '#FFE066';
			} else {
				node.dataset.status = '0';
				node.firstElementChild.textContent = (--post.likes);
				node.lastElementChild.style.color = '#D0D0D0';
			}
		};
	}

	static openPopup(clickPlace, popup, shadow) {
		clickPlace.onclick = function () {
			shadow.hidden = false;
			popup.style.display = '';
		};
	}

	static exitPopup(button, popup, shadow) {
		button.onclick = function () {
			shadow.hidden = true;
			popup.style.display = 'none';
		};
	}

	static loadMore(gallery, viewer) {

		let loadMoreButton = document.getElementById('load-more');
		loadMoreButton.onclick = function () {
			gallery.getPhotoPosts(this._shown, undefined, this._curFilter).forEach((post) => {
				viewer.showPost(post);
			});	
		};
	}
}

class ViewGallery {

	constructor(gallery = new PostList()) {
		this._shown = 0;
		this._gallery = gallery;
		this._curFilter = new Filter();
	}

	incrementShown(number = 0) {

		if ((typeof (number) !== 'number')) {
			console.log('Incorrect arguments!');
			return;
		}
		this._shown += number;
	}

	_createPost(item, container) {

		let photo = document.createElement('div');
		photo.classList.add('photo');
		photo.id = item.id;
		photo.innerHTML = `
		<img class='pic' src=${item.photo.path} alt='Invalid photo'>
		<div class='clickPlace'></div>
		<div class='overlay'>
			<span class='author'>${item.photo.author}</span>
			<div class='like' data-status='0'>
				<span class='numOfLikes'>${item.likes}</span>
				<button class='heart'><i class='fas fa-heart'></i></button>
			</div>
		</div>`;
		container.appendChild(photo);
		OnClick.like(container.lastChild.querySelector('.like'), item);
	}

	_reformDate(date) {
		let dateOptions = {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		};
		let timeOptions = {
			hour: 'numeric',
			minute: '2-digit',
			hour12: false
		};
		return (date.toLocaleDateString('en-US', dateOptions) + ' ' + date.toLocaleTimeString('en-US', timeOptions));
	}

	_fillHashtags(item, box) {

		let hashtags = box.querySelector('.hashtags');
		let span;
		item.hashtags.forEach(function (tag) {
			span = document.createElement('span');
			span.classList.add('tag');
			span.textContent = '#' + tag;
			hashtags.appendChild(span);
		});
	}

	_createPopupBox(item, container) {

		let popupBox = document.createElement('div');
		popupBox.className = 'popup-box';
		popupBox.id = item.id;
		popupBox.style.display = 'none';
		popupBox.innerHTML = `
		<div class='pic-box'>
			<img class='pic' src=${item.photo.path} alt='Invalid photo'>
		</div>
		<div class='info-box'>
			<div class='info-header'>
				<div class='author'>${item.photo.author}</div>
				<div class='date'>${this._reformDate(item.date)}</div>
			</div>
			<div class='header-buttons'>
				<button class='edit'></button>
				<button class='close'></button>
			</div>
			<div class='description'>
				<span class='text'>${item.description}</span>
			</div>
			<div class='hashtags'></div>
			<div class='comments'></div>
			<textarea id='add-comment' placeholder='Comment this photo...' maxlength='200' rows='2'></textarea>
			<div class='like' data-status='0'>
				<span class='numOfLikes'>${item.likes}</span>
				<button class='heart'>
					<i class='fas fa-heart'></i>
				</button>
			</div>
		</div>`;
		this._fillHashtags(item, popupBox);
		container.appendChild(popupBox);
		OnClick.like(container.lastChild.querySelector('.like'), item);
		OnClick.exitPopup(popupBox.querySelector('.close'), popupBox, container);
	}

	showPost(post) {

		let photos = document.getElementById('photos');
		this._createPost(post, photos);

		let popup = document.getElementById('popup-photos');
		this._createPopupBox(post, popup);
		popup.hidden = true;

		OnClick.openPopup(photos.lastChild.querySelector('.clickPlace'), popup.lastChild, popup);
	}

	showPhotoPosts(skip = 0, amount = 15) {

		this._gallery.getPhotoPosts(skip, amount, this._curFilter).forEach((post) => {
			this.showPost(post);
		});

		this._shown += (amount - skip);
	}

	removePost(id = 0) {
		let post = document.getElementById(id);
		post && post.remove();
	}

	loadMore() {
		OnClick.loadMore(this._gallery, this);
		this._shown += 15;
	}

	setFilter(filter = new Filter()) {

		if (!(filter instanceof Filter) || !(filter.validateFilter())) {
			console.log('Incorrect argument!');
			return;
		}
		this._curFilter = filter;
	}
}	