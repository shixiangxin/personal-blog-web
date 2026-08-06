export function useDebounce<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  duration: number = 200,
) {
  let timerId: number | undefined
  return function (...args: TArgs) {
    if (timerId !== void 0) {
      clearTimeout(timerId)
      timerId = undefined
    }
    timerId = setTimeout(() => {
      fn(...args)
    }, duration)
  }
}
