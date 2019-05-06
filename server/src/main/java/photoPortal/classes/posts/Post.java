package photoPortal.classes.posts;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Post {

    private String author;
    private String photoPath;
    private String description;
    private List<String> hashtags;
    private Date date;
    private List<String> liked;
    private long id;
    private int likes;

    public Post(String author, String photoPath, String description,
                List<String> hashtags, Date date, List<String> liked, long id, int likes) {
        this.author = author;
        this.photoPath = photoPath;
        this.description = description;
        this.hashtags = new ArrayList<>(hashtags);
        this.date = date;
        this.liked = new ArrayList<>(liked);
        this.id = id;
        this.likes = likes;
    }

    public Post(String author, String photoPath, long id) {
        this.author = author;
        this.photoPath = photoPath;
        this.description = "";
        this.hashtags = new ArrayList<>();
        this.date = new Date();
        this.liked = new ArrayList<>();
        this.id = id;
        this.likes = 0;
    }

    @Override
    public String toString() {
        Gson jsonBuilder = new GsonBuilder().setPrettyPrinting().create();
        return jsonBuilder.toJson(this);
    }

    public boolean validatePhotoPost() {
        return !photoPath.equals("") && !author.equals("");
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public void setHashtags(List<String> hashtags) {
        this.hashtags = hashtags;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<String> getLiked() {
        return liked;
    }

    public void setLiked(List<String> liked) {
        this.liked = liked;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}