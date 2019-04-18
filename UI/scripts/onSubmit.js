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
	}
}