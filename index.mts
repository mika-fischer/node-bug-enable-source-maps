Error.stackTraceLimit = 1;

class JSClass {
  static foo() {
    throw new Error();
  }
}

function JSProto() {}
JSProto.foo = function foo() {
  throw new Error();
};

try {
  JSClass.foo();
} catch (err) {
  console.error(err);
}

try {
  JSProto.foo();
} catch (err) {
  console.error(err);
}
