class JSClass {
  static async foo() {
    throw new Error("JSClass");
  }
}

function JSProto() {}
Object.defineProperties(JSProto, {
  foo: {
    configurable: true,
    writable: true,
    value: async function foo() {
      throw new Error("JSProto");
    },
  },
  prototype: {
    configurable: false,
    enumerable: false,
    writable: false,
    value: Object.create(Object.prototype, {
      constructor: {
        configurable: true,
        writable: true,
        value: JSProto,
      },
    }),
  },
});

console.log(`Version: ${process.version}`);
console.log(`execArgv: ${JSON.stringify(process.execArgv)}`);
await JSClass.foo().catch(console.error);
await(JSProto as any)
  .foo()
  .catch(console.error);
