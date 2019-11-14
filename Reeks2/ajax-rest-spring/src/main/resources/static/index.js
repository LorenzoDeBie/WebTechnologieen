// TODO: Add JS code to fetch blogposts
function getPosts() {
    return fetch("./posts.json").then(response => response.json()).catch(error => console.error(error));
}

function displayPosts(jsonPosts) {
    let postsMain = document.getElementById("posts");
    //remove all posts
    while(postsMain.firstChild) {
        postsMain.removeChild(postsMain.firstChild);
    }
    jsonPosts.forEach((item, index) => {
        let template = `
            <div class="card mb-4">
                <div class="card-header">${item.title}</div>
                <div class="card-body">
                    <p class="card-text">${item.content}</p>
                    <a href="#" class="btn btn-primary">Read more</a>
                </div>
            </div>`;
        postsMain.innerHTML += template;
    })
}

getPosts().then(jsonPosts => {
    displayPosts(jsonPosts);
});

