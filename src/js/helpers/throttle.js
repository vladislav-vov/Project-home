export default function throttle(func, ms) {
  let isThrottling = false;
  let savedArgs;
  let savedThis;

  return function wrapper() {
    if (isThrottling) {
      savedArgs = arguments;
      savedThis = this;

      return;
    }

    func.apply(this, arguments);

    isThrottling = true;

    setTimeout(() => {
      isThrottling = false;

      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);

        savedArgs = savedThis = null;
      }
    }, ms);
  };
}
