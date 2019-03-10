class Photo {
    constructor(path = '', author = '') {
        this.path = path;
        this.author = author;
    }
};

class Post {
    constructor(photo = new Photo(), description = '', id = '0', hashtags = [], date = new Date(), liked = []) {
        this.photo = photo;
        this.description = description;
        this.id = id;
        this.date = date;
        this.liked = liked;
        this.hashtags = hashtags;
    }
};

class Filter {
    constructor(f_author = '', f_hashtags = [], f_date = false) {
        this.f_author = f_author;
        this.f_hashtags = f_hashtags;
        this.f_date = f_date;
    }
};