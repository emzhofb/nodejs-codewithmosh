const examplePromise = new Promise((resolve, reject) => {
  // Kick off some async work
  // ...
  setTimeout(() => {
    resolve(1); // pending => resolved
    reject(new Error("message")); // pending => rejected
  }, 2000);
});

examplePromise
  .then(result => {
    console.log("result", result);
  })
  .catch(err => {
    console.log("error", err);
  });
