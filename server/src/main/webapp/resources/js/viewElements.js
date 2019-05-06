class ViewElements {

	static hashtagBubble(hashtag, container) {

		let bubble = document.createElement('div');

		bubble.classList.add('hashtag-bubble');
		bubble.innerHTML = `
        <span>${hashtag}</span>
        <i class="fas fa-minus tag-minus"></i>
        `;

		container.appendChild(bubble);
	}

	static editPhoto(popup, gallery, galleryViewer) {

		const index = Array.prototype.indexOf.call(popup.closest('#popup-photos').children, popup);
		const photo = document.getElementById('photos').children[index];
		const id = +photo.id;
		const item = gallery.getPhotoPost(id);

		let editNode = document.createElement('div');
		editNode.classList.add('popup-box');
		editNode.innerHTML = `
		<div class='pic-box'>
			<img class='pic' src=${item.photo.path} alt='Invalid photo'>
		</div>
		<div class='edit-pic'>
			<label for='edit-photo' id='edit-photo-label'>CHOOSE PHOTO</label>
			<input id='edit-photo' type='file'>
		</div>
		<div class='info-box'>
			<div class='info-header'>
				<div class='author'>${item.photo.author}</div>
				<div class='date'>${galleryViewer._reformDate(item.date)}</div>
			</div>
			<div class='header-buttons'>
				<i id='close-edit' class="far fa-times-circle close"></i>
			</div>
			<textarea id='edit-description' maxlength='200' rows='2'>${item.description}</textarea>
			<div class='hashtag-box' data-status='1'>
				<button class='add-hashtag-button'><i class='fas fa-plus add hashtag-button-font'></i></button>
				<input class='add-hashtag-input' placeholder='Add a hashtag' maxlength='15' autocomplete="off">
				<div class='hashtag-error'></div>
			</div>
			<div class='hashtags-container'></div>
			<button id='edit-form-ready'><i class='fas fa-check'></i></button>
		</div>`;

		const container = editNode.querySelector('.hashtags-container');
		item.hashtags.forEach((tag) => {
			ViewElements.hashtagBubble(tag, container);
		});

		popup.style.display = 'none';
		document.getElementById('popup-photos').insertBefore(editNode, popup);
	}

	static filterBubble(filter, container) {

		let bubble = document.createElement('div');

		bubble.classList.add('filter-bubble');
		bubble.innerHTML = `
        <span>${filter}</span>
        <i class="fas fa-minus filter-minus"></i>
        `;

		container.appendChild(bubble);
	}
}