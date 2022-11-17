const postId = +localStorage.getItem("postId")

$.ajax({
    url: "https://jsonplaceholder.typicode.com/comments?postId="+postId,
    method: "get",
    success: response => {
        response.map(comment => $("#comments_list").append(`
        <p>Name: ${comment.name}</p>
        <p>Email: ${comment.email}</p>
        <p>Body: ${comment.body}</p>
        <hr>
        `))
    },
    error: error => {
        alert("Что-то пошло не так!")
    }
})