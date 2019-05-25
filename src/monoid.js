const monoid = (combine, identityValue) => (value) => ({
  value: () => value,
  identity: () => monoid(combine, identityValue)(identityValue),
  combine: (a) => monoid(combine, identityValue)(combine(value, a.value())),
})

export const stringMonoid = monoid(
  (a, b) => `${a}${b}`,
  ''
)

export default monoid
