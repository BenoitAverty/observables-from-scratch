function of(...values) {

  function subscribe(observer) {
    if (typeof observer === 'function') {
      observer = { next: observer }
    }

    values.forEach(v => observer.next(v))
    if (observer.complete) {
      observer.complete()
    }
  }

  return {
    subscribe,
  }
}

function from(promise) {
  function subscribe(observer) {
    if (typeof observer === 'function') {
      observer = { next: observer }
    }

    promise.then(v => {
      observer.next(v)

      if (observer.complete) {
        observer.complete()
      }
    }, err => {
      if (observer.error) {
        observer.error(err)
      }
    })
  }

  return {
    subscribe,
  }
}

module.exports = {
  of,
  from,
}