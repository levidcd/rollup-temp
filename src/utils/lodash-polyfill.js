var _g =
  typeof window !== 'undefined' && window.Math === Math
    ? window
    : typeof global === 'object'
    ? global
    : this

if (!_g.Object) {
  _g.Object = Object
}

if (!_g.Date) {
  _g.Date = Date
}
