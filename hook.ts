@external("env", "_g")
declare function _g(id: i32, maxiter: i32): i32

@external("env", "accept")
declare function accept(read_ptr: string, read_len: i32, err: i64): i64

@external("env", "trace")
declare function trace(mread_ptr: string, mread_len: i32, dread_ptr: string, dread_len: i32, as_hex: i32): i64

const n = ''

export function cbak(reserved: i64): i64 {
  return 0
}

export function hook(reserved: i64): i64 {
  const t = "test"

  _g(1, 1)

  for (let i = 0; _g(10, 10), i < 3; i++) {
    trace(t, t.length * 2, t, t.length * 2, 0)
  }

  accept(t, t.length * 2, 0)

  return 0
}
