// create a promise
const p = new Promise((resolve, reject) => {
    //kick off some async work 
    // ....
    setTimeout(() => {
        resolve(1); // pending => resolved, fulfilled
        reject(new Error('message')); // pending => rejected
    }, 2000);
})

// comsome it
p
    .then(result => console.log('Result', result)) // to get the result
    .catch(err => console.log('Error', err.message)); // to get the error