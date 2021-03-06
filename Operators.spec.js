const { of, from } = require('./Observable')
const { map, concat } = require('./Operators')

describe("Operators", () => {
  describe('Map operator', () => {
    it('Calls the given function on each value the emits them', () => {
      const input = of(1, 2, 3)
      const output = map(x => 2 * x, input)

      let i = 0
      output.subscribe({
        next: val => {
          expect(val).toBe(2 * ++i)
        },
        complete: v => expect(i).toBe(3)
      })
    })

    it('Works with promises', (done) => {
      const input = from(new Promise(resolve => setTimeout(() => resolve(true), 100)))
      const output = map(x => !x, input)

      expect.assertions(1)

      output.subscribe({
        next: val => {
          expect(val).toBe(false)
        },
        complete: () => done()
      })
    })
  })

  describe('Concat operator', () => {
    it('Appends two observables', () => {
      const myObservable = concat(
        of(1, 2, 3),
        of(4, 5, 6)
      )

      let i = 0
      myObservable.subscribe({
        next: val => {
          expect(val).toBe(++i)
        },
        complete: v => expect(i).toBe(6)
      })
    })
  })
})
