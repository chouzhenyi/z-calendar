class zPromise{
  constructor(fn) {
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    this.state = 'PENDING';
    this.value = '';
    fn && fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if(this.state === 'PENDING') {
      this.state = 'FULFILLED';
      this.value = value;
      this.resolveCallbacks.map(cb => {
        cb(value);
      })
    }
  }

  reject(value) {
    if (this.state === 'PENDING') {
      this.state = 'REJECTED';
      this.value = value;
      this.rejectCallbacks.map(cb => {
        cb(value);
      })
    }
  }

  then(onFulfilled, onRejected) {
    if(this.state === 'PENDING') {
      this.resolveCallbacks.push(onFulfilled);
      this.rejectCallbacks.push(onRejected);
    }
    if(this.state === 'FULFILLED') {
      onFulfilled(this.value);
    }
    if (this.state === 'REJECTED') {
      onRejected(this.value);
    }
  }
}

function promiseHandle() {
  return new zPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(2333);
    }, 3e3);
  })
}

export {
  promiseHandle
}