$("#success_alert").hide();
$("#fail_alert").hide();

document.getElementById("frm").onsubmit = () => {
    console.log("onsubmit of form");
    let post = {
        title: $("#txtTitle").val(),
        content: $("#txtContent").val()
    };
    console.log("Title: ", post.title);
    console.log("content: ", post.content);
    fetch("https://lorre.free.beeceptor.com", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then((response) => {console.log(response)}).catch((error) => {console.error(error)});
    return false;
};