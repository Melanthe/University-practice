let gallery = (function () {

    let posts = [];

    function isFilter(filter) {

        if (!(filter instanceof Filter)) {
            console.log('Incorrect argument!');
            return false;
        }

        if (filter.f_author !== '' || filter.f_hashtags.length !== 0) {
            return true;
        } else {
            return false;
        }
    }

    function filterByAuthor(num, author) {

        if (typeof (author) === 'string') {

            let found = [];
            let count = 0;

            for (let i = 0; (i < posts.length) && (count < num); ++i) {
                if (posts[i].photo.author === author) {
                    found.push(posts[i]);
                    count++;
                }
            }
            return found;

        } else {
            console.log('Incorrect argument!');
            return undefined;
        }
    }

    function filterByHashtags(num, hashtags) {

        if (Array.isArray(hashtags)) {

            let flag = true;
            let found = [];
            let count = 0;

            for (let i = 0; (i < posts.length) && (count < num); ++i) {
                flag = true;
                for (let j = 0; j < hashtags.length; ++j) {
                    if (!posts[i].hashtags.includes(hashtags[j])) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    found.push(posts[i]);
                    count++;
                }
            }
            return found;

        } else {
            console.log('Incorrect argument!');
            return undefined;
        }
    }

    function sortByDate(list) {
        if (Array.isArray(list)) {
            list.sort(function (x, y) {
                return (x.date.getTime() - y.date.getTime());
            });
            return true;
        } else {
            console.log('Incorrect argument!');
            return false;
        }
    }

    function checkID(id) {
        return posts.some(function (item) {
            return (item.id === id);
        });
    }

    function isStringArray(array) {

        if (array.length === 0) {
            return true;
        }
        return array.every(function (item) {
            return (typeof (item) === 'string');
        });
    }

    function validatePhoto(photo) {

        if (!(photo instanceof Photo)) {
            console.log('Incorrect argument!');
            return false;
        }

        let valid = true;

        if (!photo.path || !photo.author) {
            valid = false;
        } else if (typeof (photo.author) !== 'string' || typeof (photo.path) !== 'string') {
            valid = false;
        }

        return valid;
    }

    function getPhotoPosts(skip = 0, top = 15, filterConfig = new Filter()) {

        let result = [];

        if ((typeof (skip) !== 'number' || typeof (top) !== 'number')) {
            console.log('Incorrect arguments!');
            return undefined;
        }

        if (isFilter(filterConfig)) {

            if (!(filterConfig instanceof Filter) || !isStringArray(filterConfig.f_hashtags)) {
                console.log('Incorrect filter configuration!');
                return undefined;
            }
            if (filterConfig.f_author !== '') {
                result = filterByAuthor(top + skip, filterConfig.f_author);
            }
            if (filterConfig.f_hashtags.length !== 0) {
                result = filterByHashtags(top + skip, filterConfig.f_hashtags);
            }
            result = result.slice(skip);

        } else {
            result = posts.slice(skip, skip + top);
        }

        if (filterConfig.f_date === true) {
            sortByDate(result);
        }


        return result;
    }

    function getPhotoPost(id) {

        if (typeof (id) !== 'string') {
            console.log('Incorrect argument!');
            return undefined;
        }

        return posts.find(function (item) {
            return (item.id === id);
        });
    }

    function validatePhotoPost(post) {

        if (!(post instanceof Post)) {
            console.log('Incorrect argument!');
            return false;
        }

        let valid = true;

        if (!validatePhoto(post.photo)) {
            valid = false;
        } else if ((typeof (post.id) !== 'string') || !(post.date instanceof Date) ||
            !Array.isArray(post.hashtags) || !Array.isArray(post.liked)) {
            valid = false;
        } else if (post.id === '0' || !isStringArray(post.hashtags) || !isStringArray(post.liked)) {
            valid = false;
        }

        return valid;
    }

    function addPhotoPost(post) {

        if (!(post instanceof Post)) {
            console.log('Incorrect argument!');
            return false;
        }

        if (validatePhotoPost(post) && !checkID(post.id)) {
            posts.push(post);
            return true;
        } else {
            return false;
        }
    }

    function editPhotoPost(id, new_post) {

        if (typeof (id) !== 'string' || !(new_post instanceof Post)) {
            console.log('Incorrect argument!');
            return false;
        }

        if (!validatePhotoPost(new_post)) {
            return false;

        } else {

            let post = getPhotoPost(id);

            if (post === undefined) {
                return false;
            }

            post.photo.path = new_post.photo.path;
            post.description = new_post.description;
            post.hashtags = new_post.hashtags.slice();
        }

        return true;
    }

    function removePhotoPost(id) {

        if (typeof (id) !== 'string') {
            console.log('Incorrect argument!');
            return false;
        }

        let index = -1;
        for (let i = 0; i < posts.length; ++i) {
            if (posts[i].id === id) {
                index = i;
            }
        }
        if (index == -1) {
            return false;
        }
        posts.splice(index, 1);
        return true;
    }

    return {
        addPhotoPost,
        removePhotoPost,
        editPhotoPost,
        getPhotoPosts,
        getPhotoPost
    }

})();

//test of functions

console.log('Check add: \n');
console.log(gallery.addPhotoPost(new Post(new Photo('img/1.jpg', 'yana'), 'lick', '1', ['animals', 'cute'], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/2.jpg', 'vova'), '', '2', [], new Date(), ['yana'])));
console.log(gallery.addPhotoPost(new Post(new Photo('img/3.jpg', 'kolya'), 'sea', '3', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/4.jpg', 'masha'), 'dragon', '4', ['magic', 'cute'], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/5.jpg', 'misha'), '', '5', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/6.jpg', 'katty'), '', '6', ['animals', 'cute', 'cat'], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/7.jpg', 'alex'), '', '7', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/8.jpg', 'vladimir'), '', '8', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/9.jpg', 'angel'), 'flowers', '9', [], new Date(), ['vova', 'sasha'])));
console.log(gallery.addPhotoPost(new Post(new Photo('img/10.jpg', 'maxime'), '', '10', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/11.jpg', 'dasha'), 'tree', '11', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/12.jpg', 'alina'), '', '12', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/13.jpg', 'kirill'), '', '13', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/14.jpg', 'oleg'), '', '14', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/15.jpg', 'artem'), '', '15', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/16.jpg', 'sasha'), '', '16', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/17.jpg', 'vlad'), '', '17', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/18.jpg', 'yana'), 'magic', '18', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/19.jpg', 'yana'), 'doggy', '19', [], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/20.jpg', 'yana'), '', '20', ['animals', 'cute'], new Date())));
console.log(gallery.addPhotoPost(new Post(new Photo('img/20.jpg', ''), '', '20', [], new Date()))); //not author
console.log(gallery.addPhotoPost(new Post(new Photo('img/20.jpg', 'tmp'), '', 5, [], new Date()))); //id not a string
console.log(gallery.addPhotoPost(new Post(new Photo('img/20.jpg', 'tmp'), '', '5', [], new Date()))); //not unique id
console.log(gallery.addPhotoPost(new Post(new Photo('img/20.jpg', 'tmp'), '', '21', undefined, undefined, ['hello!'])));

console.log('\n');

console.log('default getter')
console.log(gallery.getPhotoPosts());
console.log('\n');

console.log('getter with incorrect argument')
console.log(gallery.getPhotoPosts('5'));
console.log('\n');

console.log('getter with skip 5 and top 3')
console.log(gallery.getPhotoPosts(5, 3));
console.log('\n');

console.log('getter with author filter')
console.log(gallery.getPhotoPosts(undefined, 20, new Filter('yana')));
console.log('\n');

console.log('getter with author filter skip 1 and top 2')
console.log(gallery.getPhotoPosts(1, 2, new Filter('yana')));
console.log('\n');

console.log('getter with hashtag filter')
console.log(gallery.getPhotoPosts(undefined, 20, new Filter(undefined, ['animals', 'cute'])));
console.log('\n');

console.log('getter with hashtag and author filter')
console.log(gallery.getPhotoPosts(undefined, 20, new Filter('yana', ['animals', 'cute'])));
console.log('\n');

console.log('getter by id')
console.log(gallery.getPhotoPost('5'));
console.log('\n');

let tmp5 = new Post(new Photo('img/5.jpg', 'misha'), '', '5', [], new Date()); //copy of post with id 5
tmp5.photo.path = 'img/2.jpg';
tmp5.id = '6'; //try to change id
tmp5.description = 'The best flowers ever!';

console.log('edit id 5');
console.log('1: in the future this function will be based with a copy of edited photo.');
console.log('2: even if you try to change \'readonly\' fields, they will stay like they were');
console.log(gallery.editPhotoPost('5', tmp5));
console.log('\n');

console.log('let take 5 first photos');
console.log(gallery.getPhotoPosts(0, 5));
console.log('\n');

console.log('end remove 3th one');
console.log(gallery.removePhotoPost('3'));
console.log('new first 5 photos');
console.log(gallery.getPhotoPosts(0, 5));

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

    gallery.getPhotoPosts(shown).forEach(function (item) {

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