/* eslint-disable no-undef */

(function () {

	function photoLike(event) {

		const targetNode = event.target;

		if (targetNode.classList.contains('like-button')) {
			if (user.userName !== '') {

				const post = targetNode.closest('.photo');
				const id = +post.id;
				let item = gallery.getPhotoPost(id);

				OnClick.photoLike(targetNode.closest('.like'), item);
				item.likedPost(user.userName);
				Storage.updatePostsList(gallery.getPhotoPosts(0, gallery.numberOfPosts, currentFilter));
			}
		}
	}

	function popupLike(event) {

		const targetNode = event.target;

		if (targetNode.classList.contains('like-button')) {
			if (user.userName !== '') {

				const popup = targetNode.closest('.popup-box');
				const index = Array.prototype.indexOf.call(popup.parentNode.children, popup);
				let photo = document.getElementById('photos').children[index];
				const id = +(photo.id);
				let item = gallery.getPhotoPost(id);

				OnClick.popupLike(event.target.closest('.like'), item, photo.querySelector('.like'));
				item.likedPost(user.userName);
				Storage.updatePostsList(gallery.getPhotoPosts(0, gallery.numberOfPosts));
			}
		}
	}

	function openPopup(event) {

		if (event.target.className === 'clickPlace') {

			const post = event.target.parentNode;
			const popup = document.getElementById('popup-photos');
			const index = Array.prototype.indexOf.call(post.parentNode.children, post);

			OnClick.openPopup(popup.children[index], popup);
		}
	}

	function exitPopup(event) {
		if (event.target.classList.contains('close')) {
			OnClick.exitPopup(event.target.closest('.popup-box'), event.target.closest('#popup-photos'));
		}
	}

	function showPosts(skip = 0, amount = gallery.numberOfPosts) {
		const postList = gallery.getPhotoPosts(skip, amount, currentFilter);
		galleryViewer.showPhotoPosts(postList, user.userName);
	}

	function userEvents() {
		LoadedEvents.addButton(user);
		LoadedEvents.userBar(user);
	}

	function openFormsEvents(event) {

		if (event.target.id === 'add-photo-button') {
			addPhotoForm.hidden = false;
		}
		if (event.target.parentNode.id === 'author-filter' || event.target.parentNode.id === 'hashtag-filter') {
			OnClick.openSearchForm(event.target.parentNode);
		}
	}

	function sideBarEvents(event) {
		if (event.target.id === 'filter-button') {
			OnClick.displaySideBar(event.target);
		}
	}

	function signButtonsEvents(event) {

		const form = document.getElementById('sign');
		const titleNode = form.querySelector('#sign-title');

		if (event.target.id === 'sign-up') {
			OnClick.signUp(titleNode, form);
		}
		if (event.target.id === 'sign-in') {
			OnClick.signIn(titleNode, form);
		}
		if (event.target.id === 'sign-out') {
			OnClick.signOut();
		}
	}

	function signFormsEvents(event) {
		OnSubmit.submitSignForm(event, usersBase);
	}

	function closeFormsEvents(event) {

		const targetNode = event.target;

		if (targetNode.id === 'close-add-form') {
			OnClick.closeAddForm(addPhotoForm);
		}
		if (targetNode.id === 'close-search') {
			OnClick.closeSearchForm();
		}
		if (targetNode.id === 'close-sign-form') {
			OnClick.closeSignForm();
		}
	}

	function searchFormsEvents(event) {
		if (OnSubmit.submitSearchForm(event, currentFilter, galleryViewer, photoContainer, popupContainer)) {
			showPosts(0, 15);
			ViewElements.loadMoreButton(gallery.getNumberOfFilter(galleryViewer.numberOfShown, currentFilter));
			OnClick.closeSearchForm();
		}
	}

	function inputHashtagEvent(event) {
		if (event.target.classList.contains('add-hashtag-input')) {
			if (event.keyCode === 13) {
				const container = (event.target.closest('.hashtag-box').dataset.status === '1') ? event.target.closest('.popup-box') : addPhotoForm;
				OnClick.addHashtag(event, container);
			}
		}
	}

	function inputCommentEvent(event) {

		if (event.target.parentNode.classList.contains('add-comment')) {
			if (event.keyCode === 13) {
				OnSubmit.submitCommentAddition(event, gallery, user.userName, event.target.value);
			}
		}
	}

	function hashtagButtonEvent(event) {

		const targetNode = event.target;

		if (targetNode.classList.contains('hashtag-button-font')) {
			const container = (event.target.closest('.hashtag-box').dataset.status === '1') ? event.target.closest('.popup-box') : addPhotoForm;
			OnClick.addHashtag(event, container);
		}
		if (targetNode.classList.contains('tag-minus')) {
			OnClick.removeTagBubble(targetNode);
		}
	}

	function removeFilter(event) {
		if (event.target.classList.contains('filter-minus')) {
			OnClick.removeFilterBubble(event.target, currentFilter);
			galleryViewer.setFilter(currentFilter);
			galleryViewer.refreshShown();
			photoContainer.innerHTML = '';
			popupContainer.innerHTML = '';
			showPosts(0, 15);
			ViewElements.loadMoreButton(gallery.getNumberOfFilter(galleryViewer.numberOfShown, currentFilter));
		}
	}

	function choosePhotoEvents(event) {
		if (event.target.id === 'input-photo' || event.target.id === 'edit-photo') {
			let selectedFile, imgBox;
			if (event.target.id === 'input-photo') {
				selectedFile = document.getElementById('input-photo').files[0];
				imgBox = document.getElementById('drop-pic-box').firstElementChild;
			}
			else {
				selectedFile = document.getElementById('edit-photo').files[0];
				imgBox = event.target.closest('.popup-box').querySelector('.pic');
			}
			let filePath = URL.createObjectURL(selectedFile);
			imgBox.src = filePath;
		}
	}

	function dragEvent(event) {
		event.stopPropagation();
		event.preventDefault();
	}

	function dropEvent(event) {

		event.stopPropagation();
		event.preventDefault();

		const imgBox = document.getElementById('drop-pic-box').firstElementChild;
		let selectedFile = event.dataTransfer.files[0];
		let filePath = URL.createObjectURL(selectedFile);
		imgBox.src = filePath;
	}

	function addSubmitClick(event) {
		if (event.target.classList.contains('fa-check')) {
			OnSubmit.submitAddForm(addPhotoForm, user, gallery);
		}
	}

	function deletePhotoEvent(event) {
		if (event.target.classList.contains('delete')) {
			OnClick.deletePhoto(event.target.closest('.popup-box'), popupContainer, gallery);
			Storage.updatePostsList(gallery.getPhotoPosts(0, gallery.numberOfPosts));
			location.reload();
		}
	}

	function viewPhotoEditing(event) {
		if (event.target.classList.contains('edit')) {
			ViewElements.editPhoto(event.target.closest('.popup-box'), gallery, galleryViewer);
		}
	}

	function closePhotoEditing(event) {
		if (event.target.id === 'close-edit') {
			OnClick.closePhotoEditing(event.target.closest('.popup-box'));
		}
	}

	function submitPhotoEditing(event) {
		if (event.target.classList.contains('fa-check')) {
			OnSubmit.submitPhotoEdition(event.target.closest('.popup-box'), gallery);
		}
	}

	function loadMoreButton(event) {
		if (event.target.id === 'load-more') {
			OnClick.loadMore(gallery, galleryViewer);
		}
	}

	function showLoadMoreButton() {
		LoadedEvents.loadMoreButton(gallery.numberOfPosts - galleryViewer.numberOfShown);
	}

	function bind() {

		const dropBox = document.getElementById('drop-pic-box');

		photoContainer.addEventListener('click', photoLike);
		photoContainer.addEventListener('click', openPopup);
		popupContainer.addEventListener('click', popupLike);
		popupContainer.addEventListener('click', exitPopup);
		popupContainer.addEventListener('click', viewPhotoEditing);
		popupContainer.addEventListener('click', deletePhotoEvent);
		popupContainer.addEventListener('click', closePhotoEditing);
		popupContainer.addEventListener('click', submitPhotoEditing);
		popupContainer.addEventListener('keydown', inputCommentEvent);

		document.addEventListener('DOMContentLoaded', userEvents);
		document.addEventListener('DOMContentLoaded', showLoadMoreButton);
		document.addEventListener('click', closeFormsEvents);
		document.addEventListener('click', sideBarEvents);
		document.addEventListener('click', openFormsEvents);
		document.getElementById('main-buttons').addEventListener('click', removeFilter);
		document.getElementById('header').addEventListener('click', signButtonsEvents);
		document.addEventListener('click', loadMoreButton);
		document.addEventListener('click', hashtagButtonEvent);
		document.getElementById('add-photo').addEventListener('click', addSubmitClick);

		document.addEventListener('keydown', inputHashtagEvent);
		document.addEventListener('change', choosePhotoEvents);
		document.getElementById('sign').addEventListener('submit', signFormsEvents);
		document.getElementById('search').addEventListener('submit', searchFormsEvents);
		document.getElementById('search-form-ready').addEventListener('click', searchFormsEvents);

		dropBox.addEventListener('dragenter', dragEvent);
		dropBox.addEventListener('dragover', dragEvent);
		dropBox.addEventListener('drop', dropEvent);
	}

	const photoContainer = document.getElementById('photos');
	const popupContainer = document.getElementById('popup-photos');
	const addPhotoForm = document.getElementById('add-photo');

	const gallery = new PostList(Storage.getPostsList());
	const currentFilter = new Filter();
	const galleryViewer = new ViewGallery(currentFilter);
	const usersBase = new UsersBase(Storage.getUsersBase());
	const user = Storage.getUser();

	if (gallery.numberOfPosts === 0) {
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