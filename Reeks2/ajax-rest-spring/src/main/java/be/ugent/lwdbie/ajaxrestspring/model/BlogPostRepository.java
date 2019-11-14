package be.ugent.lwdbie.ajaxrestspring.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Integer> {
}
