// we cant do this

// console.log("before");
// const user = getUser(1);
// console.log(user);
// console.log("after");

// function getUser(id) {
//   setTimeout(() => {
//     console.log("Reading from databases....");
//     return { id: id, github: "emzhofb" };
//   }, 2000);
// }

// we need to use callback like this

// console.log("before");
// getUser(1, user => {
//   console.log("user", user);
//   // get repositories
//   getRepo(user.github, repo => {
//     console.log("repo", repo);
//   });
// });
// console.log("after");

// // add parameter callback

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log("Reading from databases....");
//     callback({ id: id, github: "emzhofb" });
//   }, 2000);
// }

// function getRepo(username, callback) {
//   setTimeout(() => {
//     console.log(`Getting repositories... from ${username}`);
//     callback(["nodejs", "reactjs", "react-native"]);
//   });
// }

/*
// Asynchronous
console.log("before");
getUser(1, user => {
  getRepo(user.github, repo => {
    getCommit(repo, commit => {
      // Callback Hell
    });
  });
});
console.log("after");
// Synchronous
console.log("before");
const user = getUser(1);
const repo = getRepo(user.github);
const commit = getCommit(repo[0]);
console.log("after");
*/

// little bit confusing but at least no callback hell
/*
console.log("before");
getUser(1, getRepo);
console.log("after");

function getRepo(user) {
  getRepo(user.github, getCommit);
}

function displayCommit(commit) {
  console.log(commit);
}

function getCommit(repo) {
  getCommit(repo, displayCommit);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading from databases....");
    callback({ id: id, github: "emzhofb" });
  }, 2000);
}

function getRepo(username, callback) {
  setTimeout(() => {
    console.log(`Getting repositories... from ${username}`);
    callback(["nodejs", "reactjs", "react-native"]);
  });
}
*/

// Using promise

// console.log("Before");
// getUser(1, user => {
//   getRepositories(user.gitHubUsername, repos => {
//     getCommits(repos[0], commits => {
//       console.log(commits);
//     });
//   });
// });
// console.log("After");

console.log("Before");

// Promise-based approach

// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log("Commits", commits))
//   .catch(err => console.log("Error", err.message));

// Async and Await approach

async function displayCommits() {
  // using try and catch block
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log("Error", err.message);
  }
}
displayCommits();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["repo1", "repo2", "repo3"]);
      // reject(new Error("Could not get the repos."));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit"]);
    }, 2000);
  });
}
