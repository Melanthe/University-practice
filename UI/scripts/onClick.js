/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

class OnClick {

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

	static openPopup(popup, shadow) {
		shadow.hidden = false;
		popup.style.display = '';
	}

	static exitPopup(popup, shadow) {
		shadow.hidden = true;
		popup.style.display = 'none';
	}

	static loadMore(button, gallery, viewer) {
		gallery.getPhotoPosts(viewer.numberOfShown, undefined, viewer.currentFilter).forEach((post) => {
			viewer.showPost(post);
			viewer.incrementShown();
		});
	}

	static displayUserButtons(user, photo) {
		let author = photo.querySelector('.author').textContent;
		let popupBox = document.getElementById('popup-photos');
		let index = Array.prototype.indexOf.call(photo.parentNode.children, photo);
		let popup = popupBox.children[index];

		if (user.userName === '' || user.userName !== author) {
			let edit = popup.querySelector('.edit');
			console.log(edit);
			let deleteButton = popup.querySelector('.delete');
			edit.hidden = true;
			deleteButton.hidden = true;
		}
		else if (user.userName === author) {
			let edit = popup.querySelector('.edit');
			let deleteButton = popup.querySelector('.delete');
			edit.hidden = false;
			deleteButton.hidden = false;
		}
	}

	static displayForm(node, status) {
		node.hidden = status;
	}
}
