//test of functions
const posts = new PostList()
console.log('Check add: \n');
console.log(posts.addPhotoPost(new Post(new Photo('img/1.jpg', 'yana'), 'lick', ['animals', 'cute'], new Date(), undefined, 54)));
console.log(posts.addPhotoPost(new Post(new Photo('img/2.jpg', 'vova'), '', [], new Date(), ['yana'])));
console.log(posts.addPhotoPost(new Post(new Photo('img/3.jpg', 'kolya'), 'sea', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/4.jpg', 'masha'), 'dragon', ['magic', 'cute'], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/5.jpg', 'misha'), '', [], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/6.jpg', 'katty'), '', ['animals', 'cute', 'cat'], new Date())));
console.log(posts.addPhotoPost(new Post(new Photo('img/7.jpg', 'alex'), '',  [], new Date())));
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

console.log('default getter')
console.log(posts.getPhotoPosts());
console.log('\n');

console.log('getter with incorrect argument')
console.log(posts.getPhotoPosts('5'));
console.log('\n');

console.log('getter with skip 5 and top 3')
console.log(posts.getPhotoPosts(5, 3));
console.log('\n');

console.log('getter with author filter')
console.log(posts.getPhotoPosts(undefined, 20, new Filter('yana')));
console.log('\n');

console.log('getter with author filter skip 1 and top 2')
console.log(posts.getPhotoPosts(1, 2, new Filter('yana')));
console.log('\n');

console.log('getter with hashtag filter')
console.log(posts.getPhotoPosts(undefined, 20, new Filter(undefined, ['animals', 'cute'])));
console.log('\n');

console.log('getter with hashtag and author filter')
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

function likeOnClick(like) {

    like.onclick = function () {
        if (like.dataset.status === '0') {
            like.dataset.status = '1';
            like.firstChild.textContent = new String(parseInt(like.firstChild.textContent) + 1);
            like.lastChild.style.color = '#FFE066';
        } else {
            like.dataset.status = '0';
            like.firstChild.textContent = new String(parseInt(like.firstChild.textContent) - 1);
            like.lastChild.style.color = '#D0D0D0';
        }
    }
}

function createImg(path) {

    let pic = document.createElement('img');
    pic.className = 'pic';
    pic.src = path;
    pic.alt = 'Invalid photo';
    return pic;
}

function createOverlay(author) {

    let overlay = document.createElement('div');
    overlay.className = 'overlay';

    let tmp = document.createElement('span');
    tmp.className = 'author';
    tmp.textContent = author;
    overlay.appendChild(tmp);

    let like = document.createElement('div');
    like.className = 'like';
    like.dataset.status = '0';
    tmp = document.createElement('span');
    tmp.className = 'numOfLikes';
    tmp.textContent = '0';
    like.appendChild(tmp);
    tmp = document.createElement('button');
    tmp.className = 'heart';
    let icon = document.createElement('i');
    icon.className = 'fas fa-heart';
    tmp.appendChild(icon);
    like.appendChild(tmp);
    likeOnClick(like);
    overlay.appendChild(like);

    return overlay;
}

function loadMore() {

    posts.getPhotoPosts(shown).forEach(function (item) {

        let photos = document.getElementsByClassName('photos')[0];

        let photo = document.createElement('div');
        photo.className = 'photo';

        photo.appendChild(createImg(item.photo.path));
        photo.appendChild(createOverlay(item.photo.author));

        photos.appendChild(photo);
    });

    shown += 15;
}

let shown = 0;
let loadMoreButton = document.getElementById('load-more');
loadMoreButton.onclick = loadMore;
loadMore();