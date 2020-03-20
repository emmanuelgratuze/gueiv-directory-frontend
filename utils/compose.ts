// Usage : compose functions right to left
// compose(minus8, add10, multiply10)(4) === 42
//
// The resulting function can accept as many arguments as the first function does
// compose(add2, multiply)(4, 10) === 42
export default (...fns: Function[]): Function => fns.reduce((f, g) => (...args: unknown[]) => f(g(...args)))
