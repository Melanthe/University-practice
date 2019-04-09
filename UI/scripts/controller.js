/* eslint-disable no-undef */

(function () {

	function photoLike(event) {

		if (event.target.tagName === 'path') {
			if (user.userName !== '') {
				const post = event.target.closest('.photo');
				const id = +post.id;
				let item = gallery.getPhotoPost(id);
				OnClick.photoLike(event.target.closest('.like'), item);
			}
		}
	}

	function popupLike(event) {

		if (event.target.classList.contains('like-button') || event.target.parentNode.classList.contains('like-button')) {
			if (user.userName !== '') {
				const popup = event.target.closest('.popup-box');
				const index = Array.prototype.indexOf.call(popup.parentNode.children, popup);
				let photo = document.getElementById('photos').children[index];
				const id = +(photo.id);
				let item = gallery.getPhotoPost(id);
				OnClick.popupLike(event.target.closest('.like'), item, photo.querySelector('.like'));
			}
		}
	}

	function openPopup(event) {

		if (event.target.className === 'clickPlace') {

			let post = event.target.parentNode;
			let popup = document.getElementById('popup-photos');
			let index = Array.prototype.indexOf.call(post.parentNode.children, post);
			OnClick.openPopup(popup.children[index], popup);
		}
	}

	function exitPopup(event) {

		if (event.target.classList.contains('close') || event.target.parentNode.classList.contains('close')) {
			OnClick.exitPopup(event.target.closest('.popup-box'), event.target.closest('#popup-photos'));
		}
	}

	function showPosts(posts, galleryViewer, skip, amount) {
		galleryViewer.showPhotoPosts(posts, skip, amount);
	}

	function displayUserButtons(event) {
		if (event.target.className === 'clickPlace') {
			let post = event.target.parentNode;
			OnClick.displayUserButtons(user, post);
		}
	}

	function userEvents() {
		LoadedEvents.addButton(user);
		LoadedEvents.userBar(user);
	}

	function openFormsEvents(event) {

		if (event.target.id === 'add-photo-button') {
			OnClick.displayForm(addPhotoForm, false);
			return;
		}

		const parent = event.target.parentNode;

		if (parent.id === 'author-filter' || parent.id === 'hashtag-filter') {

			const box = document.getElementById('search');
			const titleNode = box.querySelector('#search-title');

			titleNode.textContent = (parent.id === 'author-filter') ? 'Type an author' : 'Type a hashtag';
			OnClick.displayForm(box, false);
		}
	}

	function sideBarEvents(event) {

		if (event.target.id === 'filter-button') {
			if (event.target.dataset.status === '0') {
				document.getElementById('filter-fields').style.display = '';
				event.target.dataset.status = '1';
			}
			else {
				document.getElementById('filter-fields').style.display = 'none';
				event.target.dataset.status = '0';
			}
		}
	}

	function signButtonsEvents(event) {


		if (event.target.id === 'sign-out') {
			ViewHeader.guest();
			return;
		}

		const form = document.getElementById('sign');
		const titleNode = form.querySelector('#sign-title');

		if (event.target.id === 'sign-up') {
			titleNode.textContent = 'REGISTRATION';
			OnClick.displayForm(form, false);
		}

		if (event.target.id === 'sign-in') {
			titleNode.textContent = 'SIGN IN';
			OnClick.displayForm(form, false);
		}
	}

	function closeFormsEvents(event) {

		const targetNode = event.target;
		const parent = targetNode.parentNode;

		if (targetNode.id === 'close-add-form' || parent.id === 'close-add-form') {
			OnClick.displayForm(addPhotoForm, true);
		}

		if (targetNode.id === 'close-search' || parent.id === 'close-search') {
			OnClick.displayForm(document.getElementById('search'), true);
		}

		if (targetNode.id === 'close-sign-form' || parent.id === 'close-sign-form') {
			OnClick.displayForm(document.getElementById('sign'), true);
		}
	}

	function loadMoreButton(event) {
		
		if (event.target.id === 'load-more')
		{
			OnClick.loadMore(event.target, gallery, galleryViewer);
		}
	}

	function bind() {

		photoContainer.addEventListener('click', photoLike);
		photoContainer.addEventListener('click', openPopup);
		photoContainer.addEventListener('click', displayUserButtons);

		popupContainer.addEventListener('click', popupLike);
		popupContainer.addEventListener('click', exitPopup);

		document.addEventListener('DOMContentLoaded', userEvents);
		document.addEventListener('click', closeFormsEvents);
		document.addEventListener('click', sideBarEvents);
		document.addEventListener('click', openFormsEvents);
		document.addEventListener('click', signButtonsEvents);
		document.addEventListener('click', loadMoreButton);
	}

	const photoContainer = document.getElementById('photos');
	const popupContainer = document.getElementById('popup-photos');
	const addPhotoForm = document.getElementById('add-photo');
	const gallery = new PostList();
	const galleryViewer = new ViewGallery();
	const user = new User('yana');
	user.userPhoto = 'https://pp.userapi.com/c845221/v845221313/10fe34/q1LKzkYbEpM.jpg';

	gallery.addPhotoPost(new Post(new Photo('img/1.jpg', 'yana'), 'Look! Omg! He is licking thi water so cool! I just can\'t! Ahhhhhhh', ['animals', 'cute'], new Date(), undefined, 54));
	gallery.addPhotoPost(new Post(new Photo('img/2.jpg', 'vova'), '', [], new Date(), ['yana']));
	gallery.addPhotoPost(new Post(new Photo('img/3.jpg', 'kolya'), 'sea', [], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/4.jpg', 'masha'), 'dragon', ['magic', 'cute'], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/5.jpg', 'misha'), '', [], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/6.jpg', 'katty'), '', ['animals', 'cute', 'cat'], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/7.jpg', 'alex'), '', [], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/8.jpg', 'vladimir'), '', [], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/9.jpg', 'angel'), 'flowers', [], new Date(), ['vova', 'sasha'], 64));
	gallery.addPhotoPost(new Post(new Photo('img/10.jpg', 'maxime'), '', [], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/11.jpg', 'dasha'), 'tree', [], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/12.jpg', 'alina'), '', [], new Date()));
	gallery.addPhotoPost(new Post(new Photo('img/13.jpg', 'kirill'), '', [], new Date()));

	bind();
	showPosts(gallery, galleryViewer);

})();