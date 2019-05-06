package photoPortal.classes.filter;

import java.util.ArrayList;
import java.util.List;

public class Filter {

    private String author;
    private List<String> hashtags;

    public Filter(String author, List<String> hashtags) {
        this.author = author;
        this.hashtags = new ArrayList<>(hashtags);
    }

    public Filter() {
        this.author = "";
        this.hashtags = new ArrayList<>();
    }

    public String getAuthor() {
        return author;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setHashtags(List<String> hashtags) {
        this.hashtags = hashtags;
    }

    public boolean isEmptyFilter() {
        return this.author.equals("") && this.hashtags.size() == 0;
    }
}
