package be.ugent.lwdbie.ajaxrestspring;

import be.ugent.lwdbie.ajaxrestspring.model.BlogPost;
import be.ugent.lwdbie.ajaxrestspring.model.DummyDAO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collection;

@RestController
public class Controller {
    private DummyDAO dummyDAO;

    public Controller(DummyDAO dummyDAO) {
        this.dummyDAO = dummyDAO;
    }

    //get specific post
    @GetMapping("/api/posts/{postID}")
    public BlogPost getPost(@PathVariable int postID) {
        BlogPost post = dummyDAO.getPost(postID);
        if(post == null) throw new IllegalArgumentException();
        return dummyDAO.getPost(postID);
    }

    //get all posts
    @GetMapping("/api/posts")
    public Collection<BlogPost> getPosts() {
        return dummyDAO.getAllPosts();
    }

    //add post
    @PostMapping("/api/posts")
    @ResponseBody
    public ResponseEntity<URI> createPost(@RequestBody BlogPost post) {
        dummyDAO.addPost(post);
        URI location = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(post.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    //delete post
    @DeleteMapping("/api/posts/{postID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable int postID) {
        dummyDAO.deletePost(postID);
    }

    //update post
    @PutMapping("/api/posts/{postID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePost(@PathVariable int postID, @RequestBody BlogPost post) {
        dummyDAO.deletePost(postID);
        dummyDAO.addPost(post);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void IllegalArgumentExceptionHandler() {
    }
}
