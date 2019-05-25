#!/usr/bin/env node

function AdditionMonoid(value) { this.value = value }

// identity element - when combined with another, is a no-op
AdditionMonoid.prototype.getIdentityElement = function () {
  return new AdditionMonoid(0)
}

AdditionMonoid.prototype.combine = function (a) {
  return new AdditionMonoid(this.value + a.value)
}

// closure - combining with each other results in another
const a = new AdditionMonoid(1)
const b = new AdditionMonoid(9)
const c = a.combine(b)
console.log(c instanceof AdditionMonoid)

// associative, (a + b) + c = a + (b + c)
console.log(a.combine(b.combine(c)))
console.log(c.combine(a.combine(b)))


// ------------------------------------------------------------------------------
// Why is this cool?
// ------------------------------------------------------------------------------

const reduce = (items) => items.reduce((acc, value) => value.combine(acc),
  (items[0]).getIdentityElement()) // used as a starting element



// Monoids in a list can be used with reduce to distill them to a single value.
const listA = [
  new AdditionMonoid(1),
  new AdditionMonoid(2),
  new AdditionMonoid(3),
  new AdditionMonoid(4),
  new AdditionMonoid(5),
]
const listACombined = reduce(listA)
// (1 + 2 + 3 + 4 + 5)
console.log('listA:', listACombined)



const listB = [
  new AdditionMonoid(6),
  new AdditionMonoid(7),
  new AdditionMonoid(8),
  new AdditionMonoid(9),
  new AdditionMonoid(10),
]
const listBCombined = reduce(listB)
// (6 + 7 + 8 + 9 + 10)
console.log('listB:', listBCombined)



// Since it's associative, we can skip recomputing it a bunch of times.
console.log(
  // (1 + 2 + 3 + 4 + 5) + (6 + 7 + 8 + 9 + 10) =
  reduce([...listA, ...listB]),

  // (listACombined) + (listBCombined)
  listACombined.combine(listBCombined)
)
