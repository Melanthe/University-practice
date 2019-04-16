/* eslint-disable no-undef */

(function () {

	function photoLike(event) {

		if (event.target.tagName === 'path') {
			if (user.userName !== '') {
				const post = event.target.closest('.photo');
				const id = +post.id;
				let item = gallery.getPhotoPost(id);
				OnClick.photoLike(event.target.closest('.like'), item);
				item.likedPost(user.userName);
				Storage.updatePostsList(gallery.getPhotoPosts(0, gallery.numOfPosts, currentFilter));
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
				item.likedPost(user.userName);
				Storage.updatePostsList(gallery.getPhotoPosts(0, gallery.numOfPosts, currentFilter));
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

	function showPosts(skip = 0, amount = gallery.numOfPosts) {

		const postList = gallery.getPhotoPosts(skip, amount, currentFilter);
		galleryViewer.showPhotoPosts(postList, user.userName);
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
			document.getElementById('search').dataset.status = (parent.id === 'author-filter') ? '0' : '1';
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
			Storage.setUser(new User());
			location.reload();
			return;
		}

		const form = document.getElementById('sign');
		const titleNode = form.querySelector('#sign-title');

		if (event.target.id === 'sign-up') {
			titleNode.textContent = 'REGISTRATION';
			form.querySelector('#sign-form').dataset.status = '0';
			OnClick.displayForm(form, false);
		}

		if (event.target.id === 'sign-in') {
			titleNode.textContent = 'SIGN IN';
			form.querySelector('#sign-form').dataset.status = '1';
			OnClick.displayForm(form, false);
		}
	}

	function signFormsEvents(event) {

		const status = document.getElementById('sign-form').dataset.status;
		const loginForm = document.getElementById('input-login');
		const passwordForm = document.getElementById('input-password');
		let login = loginForm.value;
		let password = passwordForm.value;
		let user;

		if (status === '0') {
			if (!usersBase.checkUser(login)) {
				user = new User(login, password);
				usersBase.addUser(user);
				Storage.updateUsersBase(usersBase.userList);
				Storage.setUser(user);
				location.reload();
			} else {
				event.preventDefault();
				document.getElementById('sign-error').textContent = 'We have the such guy already :)';
			}

		} else if (status === '1') {
			user = usersBase.getUser(login);
			if (user && user.userPassword === password) {
				Storage.setUser(user);
				location.reload();
			}
			else {
				event.preventDefault();
				document.getElementById('sign-error').textContent = 'Incorrect login or password!';
			}
		}
	}

	function closeSearchForm() {
		document.getElementById('search').hidden = true;
		document.getElementById('search').dataset.status = '';
		document.getElementById('search-input-box').value = '';
		document.getElementById('search-error').textContent = '';
	}

	function closeFormsEvents(event) {

		const targetNode = event.target;
		const parent = targetNode.parentNode;

		if (targetNode.id === 'close-add-form' || parent.id === 'close-add-form') {
			OnClick.displayForm(addPhotoForm, true);
		}

		if (targetNode.id === 'close-search' || parent.id === 'close-search') {
			closeSearchForm();
		}

		if (targetNode.id === 'close-sign-form' || parent.id === 'close-sign-form') {
			document.getElementById('sign-form').dataset.status = '';
			document.getElementById('input-login').value = '';
			document.getElementById('input-password').value = '';
			document.getElementById('sign-error').textContent = '';
			OnClick.displayForm(document.getElementById('sign'), true);
		}
	}

	function searchFormsEvents(event) {

		const searchBox = document.getElementById('search');
		const inputBox = document.getElementById('search-input-box');
		const searchStatus = searchBox.dataset.status;
		let data = '';

		event.preventDefault();
		data = inputBox.value.trim();
		if (data.includes(' ')) {
			document.getElementById('search-error').textContent = 'Incorrect input!';
			return false;
		}

		if (searchStatus === '0') {
			currentFilter.f_author = data;	
		} else {
			currentFilter.f_hashtags.push(data);
		}

		galleryViewer.setFilter(currentFilter);
		galleryViewer.refreshShown();
		photoContainer.innerHTML = '';
		popupContainer.innerHTML = '';
		showPosts(0, 15);

		closeSearchForm();
	}

	function loadMoreButton(event) {

		if (event.target.id === 'load-more') {
			OnClick.loadMore(gallery, galleryViewer);
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
		document.getElementById('sign').addEventListener('submit', signFormsEvents);
		document.getElementById('search').addEventListener('submit', searchFormsEvents);
	}

	const photoContainer = document.getElementById('photos');
	const popupContainer = document.getElementById('popup-photos');
	const addPhotoForm = document.getElementById('add-photo');
	const gallery = new PostList(Storage.getPostsList());
	const currentFilter = new Filter();
	const galleryViewer = new ViewGallery(currentFilter);
	const usersBase = new UsersBase(Storage.getUsersBase());
	const user = Storage.getUser();

	if (gallery.numOfPosts === 0) {
		gallery.addPhotoPost(new Post(new Photo('img/1.jpg', 'yana'), 'Look! Omg! He is licking thi water so cool! I just can\'t! Ahhhhhhh', ['animals', 'cute'], new Date(), undefined, 54));
		gallery.addPhotoPost(new Post(new Photo('img/2.jpg', 'vova'), '', [], new Date(), ['yana']));
		gallery.addPhotoPost(new Post(new Photo('img/3.jpg', 'kolya'), 'sea', [], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/4.jpg', 'masha'), 'dragon', ['magic', 'cute'], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/5.jpg', 'misha'), '', [], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/6.jpg', 'katty'), '', ['animals', 'cute', 'cat'], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/7.jpg', 'alex'), '', [], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/8.jpg', 'vladimir'), '', [], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/9.jpg', 'angel'), 'flowers', [], new Date(), ['vova', 'sasha'], 64));
		gallery.addPhotoPost(new Post(new Photo('img/10.jpg', 'yana'), '', [], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/11.jpg', 'dasha'), 'tree', [], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/12.jpg', 'yana'), '', [], new Date()));
		gallery.addPhotoPost(new Post(new Photo('img/13.jpg', 'kirill'), '', [], new Date()));
	}

	bind();
	showPosts(0, 15);
})();