let input = document.querySelector(['#search'])

let form = document.querySelector(['#github-form'])
form.addEventListener('submit', searchUser)

function searchUser(e) {
    e.preventDefault()
    form.reset()
    fetch(`https://api.github.com/users?q=${input.value}`, {
    method: 'GET',
    headers: {"Accept": "application/vnd.github.v3+json"}
    })
    .then (res => res.json())
    .then (data => {data.forEach(repo => buildUserInfo(repo))})
}

function buildUserInfo(userData) {
    let username = document.createElement('p')
    username.textContent = `${userData.login}`
    username.id = 'username'
    username.addEventListener('click', () => {
        fetch(`https://api.github.com/users/${userData.login}/repos`, {
        method: 'GET',
        headers: {"Accept": "application/vnd.github.v3+json"}
        })
        .then(res => res.json())
        .then(data => {data.forEach(repo => {
            let repoName = document.createElement('p')
            repoName.textContent = `${repo.name}`
    
    
            document.querySelector('#repos-list').append(repoName)
        })
        })
            
        })

    let avatar = document.createElement('img')
    avatar.src = `${userData.avatar_url}`

    let profileLink = document.createElement('a')
    profileLink.textContent = `PROFILE`
    profileLink.href = `${userData.url}`

    document.querySelector(['#user-list']).append(username, avatar, profileLink)
}

// function userRepos(repo) {
    
// }