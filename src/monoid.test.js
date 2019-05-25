import tap from 'tap'
import monoid from './monoid'

const isFunction = (value) => typeof value === 'function'

const hasOwnMethod = (x, name) => x.hasOwnProperty(name)
  ? isFunction(x[name])
  : false

const isMonoid = (x) => hasOwnMethod(x,'value')
  && hasOwnMethod(x,'identity')
  && hasOwnMethod(x,'combine')

const stringMonoid = (value) => {
  const combine = (a, b) => `${a}${b}`
  const identityValue = ''
  return {
    value: () => value,
    identity: () => stringMonoid(identityValue),
    combine: (a) => stringMonoid(combine(value, a.value())),
  }
}

tap.test('stringMonoid', (t) => {
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
