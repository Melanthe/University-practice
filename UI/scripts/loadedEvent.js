class LoadedEvents {

	static addButton(user) {

		let addButton = document.getElementById('add-photo-button');
		if (user.userName === '')
		{
			addButton.hidden = true;
		} else {
			addButton.hidden = false;
		}
	}

	static userBar(user) {

		if (user.userName === '')
		{
			ViewHeader.guest();
		} else {
			ViewHeader.activeUser(user);
		}
	}

	static loadMoreButton(number) {	
		ViewElements.loadMoreButton(number);
	}
}