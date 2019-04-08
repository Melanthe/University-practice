/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

class ViewGallery {

	constructor() {
		this._shown = 0;
		this._curFilter = new Filter();
	}

	incrementShown() {
		this._shown++;
	}

	decrementShown() {
		this._shown--;
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
		popupBox.classList.add('popup-box');
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
			<i class="fas fa-pen edit"></i>
			<i class="far fa-times-circle close"></i>
			</div>
			<div class='description'>
				<span class='text'>${item.description}</span>
			</div>
			<div class='hashtags'></div>
			<div class='comments'></div>
			<form id='add-comment'><textarea placeholder='Comment this photo...' maxlength='200' rows='2'></textarea></form>
			<div class='like' data-status='0'>
				<span class='numOfLikes'>${item.likes}</span>
				<button class='heart'>
					<i class='fas fa-heart like-button'></i>
				</button>
			</div>
			<i class="fas fa-trash-alt delete"></i>
			</div>`;
		this._fillHashtags(item, popupBox);
		container.appendChild(popupBox);
	}

	showPost(post) {

		if (!(post instanceof Post) || !(post.validatePhotoPost())) {
			console.log('Incorrect argument!');
			return;
		}

		let photos = document.getElementById('photos');
		this._createPost(post, photos);

		let popup = document.getElementById('popup-photos');
		this._createPopupBox(post, popup);
		popup.hidden = true;
	}

	showPhotoPosts(gallery, skip = 0, amount = 15) {

		if (!(gallery instanceof PostList)) {
			console.log('Incorrect argument!');
			return;
		}

		gallery.getPhotoPosts(skip, amount, this._curFilter).forEach((post) => {
			this.showPost(post);
		});

		this._shown += (amount - skip);
	}

	removePost(id = 0) {

		let post = document.getElementById(id);
		let index = Array.prototype.indexOf.call(post.parentNode.children, post);
		post && post.remove();

		let popup = document.getElementById('popup-photos').children[index];
		popup && popup.remove();
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

	redrawPost(id, new_post) {

		if (typeof (id) !== 'number' || !(new_post instanceof Post) || !(new_post.validatePhotoPost())) {
			console.log('Incorrect argument!');
			return;
		}
		let old_photo = document.getElementById(id);
		let index = Array.prototype.indexOf.call(old_photo.parentNode.children, old_photo);
		let old_popup = document.getElementById('popup-photos').children[index];

		old_photo.firstElementChild.setAttribute('src', new_post.photo.path);
		old_popup.querySelector('.pic').setAttribute('src', new_post.photo.path);
		this._fillHashtags(new_post, old_popup);
		old_popup.querySelector('.text').textContent = new_post.description;
	}
}