package be.ugent.lwdbie.ajaxrestspring;

import be.ugent.lwdbie.ajaxrestspring.model.BlogPost;
import be.ugent.lwdbie.ajaxrestspring.model.DummyDAO;
import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;

import java.net.URI;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AjaxRestSpringApplicationTests {

	private final TestRestTemplate template = new TestRestTemplate();
	private final DummyDAO dummyDAO = new DummyDAO();
	private static final String baseURI = "http://localhost:8080/api/";

	@Test
	public void testGetAllPosts() {
		BlogPost[] blogPosts = template.getForObject(baseURI + "posts", BlogPost[].class);
		assert blogPosts != null;

		List<BlogPost> blogPostsFromDAO = dummyDAO.getAllPosts();

		Assert.assertEquals("Size of collections not the same", blogPostsFromDAO.size(), blogPosts.length);
		for (BlogPost post:
			 blogPosts) {
			boolean contains = blogPostsFromDAO.contains(post);
			Assert.assertTrue("Recieved posts contains post which is not in DAO posts", contains);
		}
	}

	@Test
	public void testGetPostById() {
		for (int i = 0; i < 4; i++) {
			BlogPost post = template.getForObject(baseURI + "posts/" + i, BlogPost.class);
			Assert.assertEquals("Post with id " + i + " does not equal post from DAO", dummyDAO.getPost(i), post);
		}
	}

	@Test
	public void testAddPost() {
		BlogPost postToAdd = new BlogPost(4, "new title", "new content");
		HttpEntity<BlogPost> request = new HttpEntity<>(postToAdd);
		URI location = template.postForLocation(baseURI + "posts", request);
		Assert.assertNotNull(location);
		Assert.assertEquals("Recieved URI location not correct", baseURI+"posts/" + 4, location.toString());

		BlogPost post = template.getForObject(location, BlogPost.class);
		Assert.assertEquals("Recieved blogpost not equal to added blogpost", postToAdd, post);

		//delete post again to make sure other tests still work
		template.delete(location);
	}

	@Test
	public void testDeletePost() {
		BlogPost postToAdd = new BlogPost(4, "new title", "new content");
		template.postForLocation(baseURI + "posts", new HttpEntity<BlogPost>(postToAdd));

		template.delete(baseURI + "posts/" + 4);

		try {

			HttpEntity<BlogPost> blogPostHttpEntity = template.getForEntity(baseURI + "posts/" + 4, BlogPost.class);
		}
		catch (HttpClientErrorException ex) {
			Assert.assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
		}
	}

	@Test
	public void testUpdatePost() {
		BlogPost original = new BlogPost(4, "Original title", "Original content");
		BlogPost updated = new BlogPost(4, "updated title", "updated content");
		//add post
		URI location = template.postForLocation(baseURI + "posts", original);
		Assert.assertNotNull(location);
		Assert.assertEquals("Recieved URI location not correct", baseURI+"posts/" + 4, location.toString());

		//update post
		HttpEntity<BlogPost> request = new HttpEntity<>(updated);
		template.put(location, request);

		//get post and check if equal
		BlogPost updatedActual = template.getForObject(location, BlogPost.class);
		Assert.assertEquals("Received blogpost not equal to sent", updated, updatedActual);

		//delete post again to ensure other tests still work
		template.delete(location);


	}

}
