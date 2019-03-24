/* eslint-disable no-console */

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