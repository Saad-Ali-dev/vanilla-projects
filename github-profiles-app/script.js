const main = document.getElementById("main");
const form = document.getElementById('form');
const userInput = document.getElementById('search');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const search = userInput.value;
    if(search){
        getGithubUser(search);
        userInput.value = '';
    }
});

async function getGithubUser(search) {
    const response = await fetch(`https://api.github.com/users/${search}`);
    const data = await response.json();
    createUserCard(data);
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>

            <div id="repos"></div>
        </div>
    </div>
    `;

    main.innerHTML = cardHTML;
}