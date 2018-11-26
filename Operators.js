function map(fn, inputObservable) {
  function subscribe(observer) {
    if (typeof observer === 'function') {
      observer = { next: observer }
    }

    inputObservable.subscribe({
      next: v => observer.next(fn(v)),
      complete: observer.complete,
      error: err => observer.error(err)
    })
  }

  return {
    subscribe,
  }

  return {
    subscribe
  }
}

function concat(obs1, obs2) {
  function subscribe(observer) {
    if (typeof observer === 'function') {
      observer = { next: observer }
    }

    obs1.subscribe({
      next: v => observer.next(v),
      complete: () => {
        obs2.subscribe({
          next: v => observer.next(v),
          complete: observer.complete,
          error: err => observer.error(err)
        })
      },
      error: err => observer.error(err)
    })
  }

  return {
    subscribe
  }
}

module.exports = {
  map,
  concat,
}