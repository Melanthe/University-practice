class OnSubmit {

	static submitSignForm(event, usersBase) {

		const status = document.getElementById('sign-form').dataset.status;
		const loginForm = document.getElementById('input-login');
		const passwordForm = document.getElementById('input-password');
		let login = loginForm.value;
		let password = passwordForm.value;
		let user = '';

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

	static submitSearchForm(event, currentFilter, galleryViewer, photoContainer, popupContainer) {

		const searchBox = document.getElementById('search');
		const inputBox = document.getElementById('search-input-box');
		const searchStatus = searchBox.dataset.status;
		let data = '';
		let container = null;
		let number = 0;

		event.preventDefault();
		data = inputBox.value.trim();
		if (!/^[0-9a-z]+$/.test(data)) {
			document.getElementById('search-error').textContent = 'Incorrect input!';
			return false;
		}

		container = (searchStatus === '0') ? document.getElementById('author-filters') : document.getElementById('hashtag-filters');

		if (searchStatus === '0') {
			currentFilter.f_author = data;
			number = 1;
		} else {
			currentFilter.f_hashtags.push(data);
			number = 5;
		}
		if ((+container.dataset.count) >= number) {
			document.getElementById('search-error').textContent = 'Too many filters!';
			return false;
		}
		ViewElements.filterBubble(data, container);
		container.dataset.count = (+container.dataset.count + 1) + '';

		galleryViewer.setFilter(currentFilter);
		galleryViewer.refreshShown();
		photoContainer.innerHTML = '';
		popupContainer.innerHTML = '';
		return true;
	}

	static submitAddForm(addPhotoForm, user, gallery) {
		
		const photoPath = document.getElementById('drop-pic-box').firstElementChild.src;
		const description = addPhotoForm.querySelector('#add-description').value;
		const hashtagsNodes = addPhotoForm.querySelector('.hashtags-container').children;
		const hashtags = Array.from(hashtagsNodes).map(function (tag) {
			return tag.firstElementChild.textContent;
		});

		let new_photo = new Photo(photoPath, user.userName);
		let new_post = new Post(new_photo, description, hashtags, new Date());
		gallery.addPhotoPost(new_post);
		Storage.updatePostsList(gallery.getPhotoPosts(0, gallery.numOfPosts));
		location.reload();
	}

	static submitPhotoEdition(box, gallery) {

		const photoPath = box.querySelector('.pic').src;
		const description = document.getElementById('edit-description').value;
		const hashtagsNodes = box.querySelector('.hashtags-container').children;
		const hashtags = Array.from(hashtagsNodes).map(function (tag) {
			return tag.firstElementChild.textContent;
		});

		let popup = box.nextElementSibling;
		const index = Array.prototype.indexOf.call(document.getElementById('popup-photos').children, popup) - 1;
		let photo = document.getElementById('photos').children[index];
		const id = +photo.id;

		let item = Post.parseToPost(JSON.parse(JSON.stringify(gallery.getPhotoPost(id))));
		item.photo.path = photoPath;
		item.description = description;
		item.hashtags = hashtags;

		gallery.editPhotoPost(id, item);
		box.remove();
		Storage.updatePostsList(gallery.getPhotoPosts(0, gallery.numOfPosts));
		location.reload();
	}
}