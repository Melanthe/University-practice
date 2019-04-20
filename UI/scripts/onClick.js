/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

class OnClick {

	static signIn(titleNode, form) {
		titleNode.textContent = 'SIGN IN';
		form.querySelector('#sign-form').dataset.status = '1';
		form.hidden = false;
	}

	static signOut() {
		ViewHeader.guest();
		Storage.setUser(new User());
		location.reload();
	}

	static signUp(titleNode, form) {
		titleNode.textContent = 'REGISTRATION';
		form.querySelector('#sign-form').dataset.status = '0';
		form.hidden = false;
	}

	static displaySideBar(filter) {

		if (filter.dataset.status === '0') {
			document.getElementById('filter-fields').style.display = '';
			document.getElementById('filters-container').style.display = '';
			filter.dataset.status = '1';
		}
		else {
			document.getElementById('filter-fields').style.display = 'none';
			document.getElementById('filters-container').style.display = 'none';
			filter.dataset.status = '0';
		}
	}

	static openSearchForm(parent) {

		const box = document.getElementById('search');
		const titleNode = box.querySelector('#search-title');

		titleNode.textContent = (parent.id === 'author-filter') ? 'Type an author' : 'Type a hashtag';
		document.getElementById('search').dataset.status = (parent.id === 'author-filter') ? '0' : '1';
		box.hidden = false;
	}

	static openPopup(popup, shadow) {
		shadow.hidden = false;
		popup.style.display = '';
	}

	static exitPopup(popup, shadow) {
		shadow.hidden = true;
		popup.style.display = 'none';
	}

	static photoLike(node, post) {

		const index = Array.prototype.indexOf.call(node.closest('#photos').children, node.closest('.photo'));
		const popup = document.getElementById('popup-photos').children[index].querySelector('.like');

		if (node.dataset.status === '0') {
			node.dataset.status = '1';
			node.firstElementChild.textContent = (++post.likes);
			node.lastElementChild.style.color = '#FFE066';

			popup.dataset.status = '1';
			popup.firstElementChild.textContent = post.likes;
			popup.lastElementChild.style.color = '#FFE066';

		} else {
			node.dataset.status = '0';
			node.firstElementChild.textContent = (--post.likes);
			node.lastElementChild.style.color = '#D0D0D0';

			popup.dataset.status = '0';
			popup.firstElementChild.textContent = post.likes;
			popup.lastElementChild.style.color = '#D0D0D0';
		}

	}

	static popupLike(node, post, photo) {

		if (node.dataset.status === '0') {
			node.dataset.status = '1';
			node.firstElementChild.textContent = (++post.likes);
			node.lastElementChild.style.color = '#FFE066';

			photo.dataset.status = '1';
			photo.firstElementChild.textContent = post.likes;
			photo.lastElementChild.style.color = '#FFE066';

		} else {
			node.dataset.status = '0';
			node.firstElementChild.textContent = (--post.likes);
			node.lastElementChild.style.color = '#D0D0D0';

			photo.dataset.status = '0';
			photo.firstElementChild.textContent = post.likes;
			photo.lastElementChild.style.color = '#D0D0D0';
		}
	}

	static addHashtag(event, form) {

		event.preventDefault();
		if (form.querySelector('.hashtags-container').childElementCount >= 10) {
			document.getElementById('hashtag-error').textContent = 'Too many hashtags!';
			return false;
		}
		let hashtag = form.querySelector('.add-hashtag-input').value.trim();
		if (!/^[0-9a-z]+$/.test(hashtag)) {
			form.querySelector('.hashtag-error').textContent = 'Incorrect input!';
			return false;
		}
		const container = form.querySelector('.hashtags-container');
		ViewElements.hashtagBubble(hashtag, container);
		form.querySelector('.add-hashtag-input').value = '';
	}

	static removeTagBubble(targetBubble) {
		let currentTag = targetBubble.closest('.hashtag-bubble');
		currentTag.remove();
	}

	static removeFilterBubble(targetBubble, currentFilter) {

		let filter = targetBubble.closest('.filter-bubble');
		let check = targetBubble.closest('#author-filters');
		let container =  check ? check :  targetBubble.closest('#hashtag-filters');
		
		filter.remove();
		container.dataset.count = (+container.dataset.count - 1) + '';
		if (check) {
			currentFilter.f_author = '';
		}
		else {
			let tag = filter.firstElementChild.textContent;
			currentFilter.f_hashtags.splice(currentFilter.f_hashtags.indexOf(tag), 1);
		}
	}

	static deletePhoto(popup, popupContainer, gallery) {

		const index = Array.prototype.indexOf.call(popupContainer.children, popup);
		const photo = document.getElementById('photos').children[index];
		const id = +photo.id;

		OnClick.exitPopup(popup, popupContainer);
		popup.remove();
		photo.remove();
		gallery.removePhotoPost(id);
	}

	static closeSearchForm() {
		document.getElementById('search').hidden = true;
		document.getElementById('search').dataset.status = '';
		document.getElementById('search-input-box').value = '';
		document.getElementById('search-error').textContent = '';
	}

	static closeSignForm() {
		document.getElementById('sign-form').dataset.status = '';
		document.getElementById('input-login').value = '';
		document.getElementById('input-password').value = '';
		document.getElementById('sign-error').textContent = '';
		document.getElementById('sign').hidden = true;
	}

	static closeAddForm(addPhotoForm) {
		addPhotoForm.hidden = true;
		document.getElementById('add-description').textContent = '';
		document.getElementById('drop-pic-box').firstElementChild.src = 'styles/icons/drag_and_drop.png';
		document.getElementById('hashtag-error').textContent = '';
		addPhotoForm.querySelector('.hashtags-container').innerHTML = '';
	}

	static closePhotoEditing(box) {
		const popup = box.nextElementSibling;
		box.remove();
		popup.hidden = false;
	}

	static loadMore(gallery, viewer) {
		gallery.getPhotoPosts(viewer.numberOfShown, undefined, viewer.currentFilter).forEach((post) => {
			viewer.showPost(post);
			viewer.incrementShown();
		});
	}
}
