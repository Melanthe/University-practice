class OnClick {

	static like(node, post) {

		node.onclick = function () {
			if (node.dataset.status === '0') {
				node.dataset.status = '1';
				node.firstElementChild.textContent = (++post.likes);
				node.lastElementChild.style.color = '#FFE066';
			} else {
				node.dataset.status = '0';
				node.firstElementChild.textContent = (--post.likes);
				node.lastElementChild.style.color = '#D0D0D0';
			}
		};
	}

	static openPopup(clickPlace, popup, shadow) {
		clickPlace.onclick = function () {
			shadow.hidden = false;
			popup.style.display = '';
		};
	}

	static exitPopup(button, popup, shadow) {
		button.onclick = function () {
			shadow.hidden = true;
			popup.style.display = 'none';
		};
	}

	static loadMore(gallery, viewer) {

		let loadMoreButton = document.getElementById('load-more');
		loadMoreButton.onclick = function () {
			gallery.getPhotoPosts(this._shown, undefined, this._curFilter).forEach((post) => {
				viewer.showPost(post);
			});
		};
	}
}
