// const myPromise = Promise.resolve({ id: 1 });
// myPromise.then(result => console.log(result));

// const myPromise = Promise.reject(new Error("reason for rejection..."));
// myPromise.catch(error => console.log(error));

// When reject, use new Error for get a callstack

const promiseOne = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

const promiseTwo = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

Promise.race([promiseOne, promiseTwo])
  .then(result => console.log(result))
  .catch(err => console.log("Error", err.message));
