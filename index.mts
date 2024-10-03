Error.stackTraceLimit = 1;

class JSClass {
  static async foo() {
    throw new Error();
  }
}

function JSProto() {}
JSProto.foo = async function foo() {
  throw new Error();
};

await JSClass.foo().catch(console.error);
await(JSProto as any)
  .foo()
  .catch(console.error);
