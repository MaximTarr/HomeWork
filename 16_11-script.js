const authorsSelect = $("#authors_select")
const postsDiv = $("#posts_list")

const drawPosts = postsArray => {
    postsDiv.empty()
    postsArray.map(post => {
        postsDiv.append(`
        <p onclick="postClick(${post.id})">${post.title}</p>
        <p>${post.body}</p>
        `)
    })
}


const loadAuthors = () => {
    const settings = {
        url: "https://jsonplaceholder.typicode.com/users",
        method: "get",
        success: (response) => {
            authorsSelect.empty()
            authorsSelect.append(`<option>Выберете автора</option>`)
            response.map(user => authorsSelect.append(`<option value="${user.id}">${user.name}</option>`))
        },
        error: (error) => {
            alert("Что-то пошло не так!")
        }
    }

    $.ajax(settings)
}
loadAuthors()



const loadPosts = authorId => {
    const settings = {
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "get",
        success: (response) => {
            const filteredPosts = authorId ? response.filter(post => post.userId == authorId) : response
            drawPosts(filteredPosts)
        },
        error: (error) => {
            alert("Что-то пошло не так!")
        }
    }

    $.ajax(settings)
}

loadPosts()

authorsSelect.change(() => {
    const selectedUserId = authorsSelect.val()
    loadPosts(selectedUserId)
})

const postClick = postId => {
    localStorage.setItem("postId", postId)
    location.href = "comments.html"
}