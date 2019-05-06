package photoPortal.classes.filter;

import java.util.ArrayList;
import java.util.List;

public class Filter {

    private String author;
    private List<String> hashtags;
    private boolean date;

    public Filter(String author, List<String> hashtags, boolean date) {
        this.author = author;
        this.hashtags = new ArrayList<>(hashtags);
        this.date = date;
    }

    public Filter() {
        this.author = "";
        this.hashtags = new ArrayList<String>();
        this.date = true;
    }

    public String getAuthor() {
        return author;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public boolean isDate() {
        return date;
    }

    public boolean isEmptyFilter() {
        return this.author.equals("") && this.hashtags.size() == 0;
    }
}
