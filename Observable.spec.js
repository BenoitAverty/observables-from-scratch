const { of, from } = require('./Observable')

describe("Observables", () => {
  describe("`of` constructor", () => {
    it('Emits a single element', () => {
      const myObservable = of(1)

      // Expect the callback to be called only once
      expect.assertions(1)

      myObservable.subscribe(value => {
        expect(value).toBe(1)
      })
    })

    it('Emits several elements in order', () => {
      const myObservable = of(1, 2, 3)

      // Expect the callback to be called only once
      expect.assertions(3)

      let times = 0;
      myObservable.subscribe(value => {
        expect(value).toBe(++times)
      })
    })

    it('calls `complete` callback after all the values', () => {
      const myObservable = of(1, 2)

      expect.assertions(1)

      let times = 0;
      myObservable.subscribe({
        next: value => times++,
        complete: () => {
          expect(times).toBe(2) // Verify that `next` was called two times before completion
        }
      })
    })
  })

  describe("`from` constructor", () => {
    it('Emits the resolved value of a promise', (done) => {
      const myPromise = new Promise((resolve) => {
        setTimeout(() => resolve(true), 100)
      })
      const myObservable = from(myPromise)

      myObservable.subscribe({
        next: value => expect(value).toBe(true),
        complete: () => done()
      })
    })

    it('Calls `error` callback if the promise rejects', (done) => {
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject("Error"), 100)
      })
      const myObservable = from(myPromise)

      myObservable.subscribe({
        next: value => fail("No value should be sent"),
        complete: () => fail("Completion not called in case of error"),
        error: v => {
          expect(v).toBe("Error")
          done()
        }
      })
    })
  })
})