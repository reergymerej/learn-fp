import tape from 'tape'
import monoid, { stringMonoid } from './monoid'

const isFunction = (value) => typeof value === 'function'

const hasOwnMethod = (x, name) => x.hasOwnProperty(name)
  ? isFunction(x[name])
  : false

const isMonoid = (x) => hasOwnMethod(x,'value')
  && hasOwnMethod(x,'identity')
  && hasOwnMethod(x,'combine')



tape('stringMonoid', (t) => {
  const a = stringMonoid('a')
  const b = stringMonoid('b')
  const c = stringMonoid('c')

  // test identity/closure
  let result = a.combine(a.identity())
  t.equal(isMonoid(result), true)
  t.equal(result.value(), a.value())


  // test combine/closure
  result = a.combine(b)
  t.equal(isMonoid(result), true)
  t.equal(result.value(), 'ab')


  // test associativity/closure
  const ab = a.combine(b)
  const bc = b.combine(c)

  result = ab.combine(c)
  let result2 = a.combine(bc)
  t.equal(isMonoid(result), true)
  t.equal(result.value(), result2.value())

  t.end()
})


tape('positiveNumMonoid', (t) => {
  const positiveNumMonoid = monoid(
    (a, b) => a + b,
    0
  )

  const a = positiveNumMonoid(1)
  const b = positiveNumMonoid(3)
  const result = a.combine(b)
  t.equal(isMonoid(result), true)
  t.equal(result.value(), result.value())

  t.end()
})
