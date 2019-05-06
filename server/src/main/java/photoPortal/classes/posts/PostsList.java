package photoPortal.classes.posts;

import photoPortal.classes.filter.Filter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PostsList {

    private List<Post> posts;

    public PostsList(List<Post> posts) {
        this.posts = new ArrayList<>(posts);
    }

    public PostsList() {
        this.posts = new ArrayList<>();
    }

    public int getNumOfPosts() {
        return posts.size();
    }

    public Post getPost(long id) {

        for (Post item : posts) {
            if (item.getId() == id) {
                return item;
            }
        }
        return null;
    }

    private List<Post> filterByAuthor(int num, String author, List<Post> currResult) {

        List<Post> found = new ArrayList<>();
        int count = 0, tmpSize = currResult.size();

        for (int i = 0; (i < tmpSize) && (count < num); ++i) {
            if (currResult.get(i).getAuthor().equals(author)) {
                found.add(currResult.get(i));
                count++;
            }
        }
        return found;
    }

    private List<Post> filterByHashtags(int num, List<String> hashtags, List<Post> currResult) {

        boolean flag;
        List<Post> found = new ArrayList<>();
        int count = 0, tmpSize = currResult.size();

        for (int i = 0; (i < tmpSize) && (count < num); ++i) {
            flag = true;
            for (String hashtag : hashtags) {
                if (!currResult.get(i).getHashtags().contains(hashtag)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                found.add(currResult.get(i));
                count++;
            }
        }
        return found;
    }

    private void sortByDate(List<Post> list) {
        list.sort((x, y) -> (int) (y.getDate().getTime() - x.getDate().getTime()));
    }

    public List<Post> getPhotoPosts(int skip, int top, Filter filterConfig) {

        List<Post> result = new ArrayList<>(posts);

        if (top > posts.size() - skip) {
            top = posts.size() - skip;
        }

        if (!(filterConfig.isEmptyFilter())) {

            if (!filterConfig.getAuthor().equals("")) {
                result = filterByAuthor(top + skip, filterConfig.getAuthor(), result);
            }
            if (filterConfig.getHashtags().size() != 0) {
                result = filterByHashtags(top + skip, filterConfig.getHashtags(), result);
            }
            result = new ArrayList<>(result.subList(skip, result.size()));

        } else {
            result = new ArrayList<>(result.subList(skip, skip + top));
        }

        sortByDate(result);

        return result;
    }

    public boolean ifExistID(long id) {
        return posts.stream().anyMatch(item -> (item.getId() == id));
    }

    private long generateID() {
        return ((new Date()).getTime() + Math.round(Math.random() * 1000));
    }

    public boolean addPhotoPost(Post post) {

        if (post.getId() == -1) {
            post.setId(generateID());
        } else if (ifExistID(post.getId())) {
            return false;
        }

        if (post.validatePhotoPost()) {
            posts.add(post);
            return true;
        }
        return false;
    }

    public boolean editPhotoPost(long id, String description, String photoPath, List<String> hashtags) {


        Post post = getPost(id);
        if (post == null) {
            return false;
        }

        if (photoPath.equals("")) {
            return false;
        }
        post.setPhotoPath(photoPath);
        post.setDescription(description);
        post.setHashtags(hashtags);

        return true;
    }

    public boolean removePhotoPost(long id) {

        if (!ifExistID(id)) {
            return false;
        }

        int index = -1;
        int size = posts.size();
        for (int i = 0; i < size; ++i) {
            if (posts.get(i).getId() == id) {
                index = i;
            }
        }

        if (index == -1) {
            return false;
        }
        posts.remove(index);

        return true;
    }
}
