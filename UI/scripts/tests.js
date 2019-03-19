/* eslint-disable no-console */

//test of functions
const posts = new PostList();
console.log('Check add: \n');
console.log(posts.addPhotoPost(new Post(new Photo('img/1.jpg', 'yana'), 'lick', ['animals', 'cute'], new Date(), undefined, 54)));
console.log(posts.addPhotoPost(new Post(new Photo('img/2.jpg', 'vova'), '', [], new Date(), ['yana'])));
console.log(posts.addPhotoPost(new Post(new Photo('img/3.jpg', 'kolya'), 'sea', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/4.jpg', 'masha'), 'dragon', ['magic', 'cute'], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/5.jpg', 'misha'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/6.jpg', 'katty'), '', ['animals', 'cute', 'cat'], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/7.jpg', 'alex'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/8.jpg', 'vladimir'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/9.jpg', 'angel'), 'flowers', [], new Date(), ['vova', 'sasha'], 64)));
console.log(posts.addPhotoPost(new Post(new Photo('img/10.jpg', 'maxime'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/11.jpg', 'dasha'), 'tree', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/12.jpg', 'alina'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/13.jpg', 'kirill'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/14.jpg', 'oleg'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/15.jpg', 'artem'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/16.jpg', 'sasha'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/17.jpg', 'vlad'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/18.jpg', 'yana'), 'magic', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/19.jpg', 'yana'), 'doggy', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/20.jpg', 'yana'), '', ['animals', 'cute'], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/20.jpg', ''), '', [], new Date()))); //not author
console.log(posts.addPhotoPost(new Post(new Photo('img/20.jpg', 'tmp'), '', [], new Date(), undefined, 54))); //id already exists
console.log(posts.addPhotoPost(new Post(new Photo('img/20.jpg', ''), '', [], 123))); //invalid Date
console.log(posts.addPhotoPost(new Post(new Photo('img/20.jpg', ''), '', 123, new Date()))); //invalid hashTags
console.log(posts.addPhotoPost(new Post(new Photo(123, 'tmp'), '', [], new Date()))); //invalid path
console.log(posts.addPhotoPost(new Post(new Photo('img/20.jpg', 'tmp'), '', undefined, undefined, ['hello!'])));

console.log('\n');

console.log('default getter');
console.log(posts.getPhotoPosts());
console.log('\n');

console.log('getter with incorrect argument');
console.log(posts.getPhotoPosts('5'));
console.log('\n');

console.log('getter with skip 5 and top 3');
console.log(posts.getPhotoPosts(5, 3));
console.log('\n');

console.log('getter with author filter');
console.log(posts.getPhotoPosts(undefined, 20, new Filter('yana')));
console.log('\n');

console.log('getter with author filter skip 1 and top 2');
console.log(posts.getPhotoPosts(1, 2, new Filter('yana')));
console.log('\n');

console.log('getter with hashtag filter');
console.log(posts.getPhotoPosts(undefined, 20, new Filter(undefined, ['animals', 'cute'])));
console.log('\n');

console.log('getter with hashtag and author filter');
console.log(posts.getPhotoPosts(undefined, 20, new Filter('yana', ['animals', 'cute'])));
console.log('\n');

let tmp5 = new Post(new Photo('img/5.jpg', 'misha'), '', [], new Date()); //copy of post with id 54
tmp5.photo.path = 'img/2.jpg';
tmp5.id = 6; //try to change id
tmp5.description = 'The best flowers ever!';

console.log('edit id 54');
console.log('1: in the future this function will be based with a copy of edited photo.');
console.log('2: even if you try to change \'readonly\' fields, they will stay like they were');
console.log(posts.editPhotoPost(54, tmp5));
console.log('\n');

console.log('let take 5 first photos');
console.log(posts.getPhotoPosts(0, 5));
console.log('\n');

console.log('end remove 1th one');
console.log(posts.removePhotoPost(54));
console.log('new first 5 photos');
console.log(posts.getPhotoPosts(0, 5));
console.log('\n');

let testPosts = [];

testPosts.push(new Post(new Photo('img/20.jpg', ''), '', [], new Date())); //not author
testPosts.push(new Post(new Photo('img/20.jpg', 'tmp'), '', [], new Date(), undefined, 64)); //id already exists
testPosts.push(new Post(new Photo('img/20.jpg', 'tmp'), 'tmpPhoto', [], new Date()));
testPosts.push(new Post(new Photo('img/20.jpg', 'tmp'), '', undefined, undefined, ['valik']));

console.log('addAllPhotos work; Returned invalid photos:');
console.log(posts.addAllPosts(testPosts));

//end of tests

//test things
let shown = 0;

function likeOnClick(like, item) {

	like.onclick = function () {
		if (like.dataset.status === '0') {
			like.dataset.status = '1';
			like.firstElementChild.textContent = (++item.likes);
			like.lastElementChild.style.color = '#FFE066';
		} else {
			like.dataset.status = '0';
			like.firstElementChild.textContent = (--item.likes);
			like.lastElementChild.style.color = '#D0D0D0';
		}
	};
}

function createPost(item, container) {

	let photo = document.createElement('div');
	photo.classList.add('photo');
	photo.innerHTML = `
	<img class='pic' src=${item.photo.path} alt='Invalid photo'>
	<div class='overlay'>
		<span class='author'>${item.photo.author}</span>
		<div class='like' data-status='0'>
			<span class='numOfLikes'>${item.likes}</span>
			<button class='heart'><i class='fas fa-heart'></i></button>
		</div>
	</div>`;
	container.appendChild(photo);
	likeOnClick(container.lastChild.querySelector('.like'), item);
}

function reformDate(date) {
	let dateOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};
	let timeOptions = {
		hour: 'numeric',
		minute: '2-digit',
		hour12: false
	};
	return (date.toLocaleDateString('en-US', dateOptions) + ' ' + date.toLocaleTimeString('en-US', timeOptions));
}

function fillHashtags(item, box) {

	let hashtags = box.querySelector('.hashtags');
	let span;
	item.hashtags.forEach(function (tag) {
		span = document.createElement('span');
		span.classList.add('tag');
		span.textContent = '#' + tag;
		hashtags.appendChild(span);
	});
}

function exitOnClick(button, popup, shadow) {
	button.onclick = function() {
		shadow.hidden = true;
		popup.style.display = 'none';	
	};
}

function createPopupBox(item, container) {

	let popupBox = document.createElement('div');
	popupBox.className = 'popup-box';
	popupBox.style.display = 'none';
	popupBox.innerHTML = `
	<div class='pic-box'>
		<img class='pic' src=${item.photo.path} alt='Invalid photo'>
	</div>
	<div class='info-box'>
		<div class='info-header'>
			<div class='author'>${item.photo.author}</div>
			<div class='date'>${reformDate(item.date)}</div>
		</div>
		<div class='header-buttons'>
			<button class='edit'></button>
			<button class='close'></button>
		</div>
		<div class='description'>
			<span class='text'>${item.description}</span>
		</div>
		<div class='hashtags'></div>
		<div class='comments'></div>
		<textarea id='add-comment' placeholder='Comment this photo...' maxlength='200' rows='2'></textarea>
		<div class='like' data-status='0'>
			<span class='numOfLikes'>${item.likes}</span>
			<button class='heart'>
				<i class='fas fa-heart'></i>
			</button>
		</div>
	</div>`;
	fillHashtags(item, popupBox);
	container.appendChild(popupBox);
	likeOnClick(container.lastChild.querySelector('.like'), item);
	exitOnClick(popupBox.querySelector('.close'), popupBox, container);
}

function photoOnClick(photo, popup, shadow) {

	photo.onclick = function () {
		shadow.hidden = false;
		popup.style.display = '';
	};
}

function loadMore() {

	posts.getPhotoPosts(shown).forEach(function (item) {

		let photos = document.getElementById('photos');
		createPost(item, photos);

		let popup = document.getElementById('popup-photos');
		createPopupBox(item, popup);
		popup.hidden = true;

		photoOnClick(photos.lastChild, popup.lastChild, popup);
	});

	shown += 15;
}
let loadMoreButton = document.getElementById('load-more');
loadMoreButton.onclick = loadMore;
loadMore();