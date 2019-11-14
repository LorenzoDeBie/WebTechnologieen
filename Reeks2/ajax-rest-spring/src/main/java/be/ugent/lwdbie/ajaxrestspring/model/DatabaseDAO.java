package be.ugent.lwdbie.ajaxrestspring.model;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Profile("!test")
@Service
public class DatabaseDAO implements BlogPostDAO {
    private BlogPostRepository repository;

    public DatabaseDAO(BlogPostRepository repository) {
        this.repository = repository;
    }

    public void addPost(BlogPost post) {
        repository.save(post);
    }

    public void deletePost(int id) {
        repository.deleteById(id);
    }

    @Override
    public BlogPost getPost(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<BlogPost> getAllPosts() {
        return repository.findAll();
    }
}
