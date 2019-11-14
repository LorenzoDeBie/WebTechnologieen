package be.ugent.lwdbie.ajaxrestspring.model;

import javax.persistence.*;

@Table(name = "blogposts")
@Entity
public class BlogPost {
    private String title;
    private String content;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    protected BlogPost() {
    }

    public BlogPost(int id, String title, String content) {
        this.title = title;
        this.content = content;
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if(obj == null) return false;
        if(!obj.getClass().equals(this.getClass())) return false;
        else {
            BlogPost post = (BlogPost) obj;
            return post.id == id && post.content.equals(content) && post.title.equals(title);
        }
    }
}
