class ZPromise {
  constructor(fn) {
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    this.state = 'PENDING';
    this.value = '';
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.state === 'PENDING') {
      this.state = 'FULFILLED';
      this.value = value;
      this.resolveCallbacks.forEach((cb) => {
        cb(value);
      });
    }
  }

  reject(value) {
    if (this.state === 'PENDING') {
      this.state = 'REJECTED';
      this.value = value;
      this.rejectCallbacks.forEach((cb) => {
        cb(value);
      });
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'PENDING') {
      this.resolveCallbacks.push(onFulfilled);
      this.rejectCallbacks.push(onRejected);
    }
    if (this.state === 'FULFILLED') {
      onFulfilled(this.value);
    }
    if (this.state === 'REJECTED') {
      onRejected(this.value);
    }
  }
}

function promiseHandle() {
  return new ZPromise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() <= 0.2) {
        reject('yoyo');
      } else {
        resolve(2333);
      }
    }, 3e3);
  });
}

export {
  ZPromise,
  promiseHandle,
};
