/* eslint-disable no-undef */

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

function buttonClickEvents(event) {
	if (event.target.id === 'add-photo-button') {
		addPhotoForm.hidden = false;
	}
	if (event.target.id === 'close-add-form' || event.target.parentNode.id === 'close-add-form') {
		addPhotoForm.hidden = true;
	}
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
	if (event.target.parentNode.id === 'author-filter') {
		const box = document.getElementById('search');
		box.querySelector('#search-title').textContent = 'Type an author';
		box.hidden = false;
	}
	if (event.target.parentNode.id === 'hashtag-filter') {
		const box = document.getElementById('search');
		box.querySelector('#search-title').textContent = 'Type a hashtag';
		box.hidden = false;
	}
	if (event.target.id === 'close-search' || event.target.parentNode.id === 'close-search') {
		document.getElementById('search').hidden = true;
	}
	if (event.target.id === 'sign-out') {
		ViewHeader.guest();
	}
	if (event.target.id === 'sign-up') {
		const form = document.getElementById('sign');
		form.querySelector('#sign-title').textContent = 'REGISTRATION';
		form.hidden = false;
	}
	if (event.target.id === 'close-sign-form' || event.target.parentNode.id === 'close-sign-form') {
		document.getElementById('sign').hidden = true;
	}
	if (event.target.id === 'sign-in') {
		const form = document.getElementById('sign');
		form.querySelector('#sign-title').textContent = 'SIGN IN';
		form.hidden = false;
	}
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

showPosts(gallery, galleryViewer);

photoContainer.addEventListener('click', photoLike);
popupContainer.addEventListener('click', popupLike);
photoContainer.addEventListener('click', openPopup);
popupContainer.addEventListener('click', exitPopup);
photoContainer.addEventListener('click', displayUserButtons);

document.addEventListener('DOMContentLoaded', userEvents);
document.addEventListener('click', buttonClickEvents);