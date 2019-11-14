package be.ugent.lwdbie.ajaxrestspring.model;

import java.util.List;

public interface BlogPostDAO {
    BlogPost getPost(int id);
    List<BlogPost> getAllPosts();
}
