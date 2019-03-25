class ViewHeader {

	static activeUser(user) {

		if (!(user instanceof User)) {
			console.log('Incorrect argument!');
			return;
		}

		let parent = document.getElementsByClassName('user-bar')[0];
		parent.innerHTML = `
		<div id="sign">
		<a id="sign-out">sign out</a>
		</div>
		<div class="user">
			<img id="user-photo" src = "${user.userPhoto}" alt="Invalid photo">
			<div id="user-nickname">${user.userName}</div>
		</div>`;
	}

	static guest() {

		let parent = document.getElementsByClassName('user-bar')[0];
		parent.innerHTML = `
		<div id="sign">
		<a id="sign-in">sign in</a>
		<a id="sign-up">sign up</a>
		</div>
		<div class="user">
			<img id="user-photo" src = "img/guest.jpg" alt="Invalid photo">
			<div id="user-nickname">guest</div>
		</div>`;
	}
}