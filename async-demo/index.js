// Asynchronous
console.log('Before');
getUser(1, getRepositories);
console.log('After');

function getRepositories (user) {
    getRepositories(user.getUsername, getCommits)
}

function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

// Synchronous
// console.log('After');
// const user = getUser(1);
// const repos = getRepositories(user.githubUsername);
// const commits = getCommits(repos[0]);
// console.log('After');

// callbacks
// Promises
// Async/Await

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database ...');
        callback({ id: id, gitHubUsername: 'Decargar' });
    }, 2000);

    // return 1;
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling github API ...');
        return(['repo1', 'repo2', 'repo3']);
    }, 2000); 
}