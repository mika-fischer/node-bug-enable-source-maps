# V8 stack traces of static method calls are somewhat broken (receiver has incorrect name)

- NodeJS issue: https://github.com/nodejs/node/issues/55236
- V8 issue: 

## Description of the bug

Given this code:
```javascript
class JSClass {
  static async foo() {
    throw new Error("JSClass");
  }
}

function JSProto() {}
JSProto.foo = async function foo() {
  throw new Error("JSProto");
};

await JSClass.foo().catch(console.error);
await(JSProto as any).foo().catch(console.error);
```

There are actually two issues:

### Built-in stacktraces only work correctly for real classes
```
❯ node index.mjs
Error
    at JSClass.foo (file:///C:/Users/mfischer/src/bugs/node-bug-enable-source-maps/index.mjs:4:15)
Error
    at Function.foo (file:///C:/Users/mfischer/src/bugs/node-bug-enable-source-maps/index.mjs:9:11)
```

Note that for `JSProto`, the receiver name is `"Function"`, when it should be `"JSProto"`.

## Error.prepareStackTrace always gets the wrong receiver type name
```
❯ node --enable-source-maps index.mjs
Error
    at Function.foo (C:\Users\mfischer\src\bugs\node-bug-enable-source-maps\index.mts:5:11)
Error
    at Function.foo (C:\Users\mfischer\src\bugs\node-bug-enable-source-maps\index.mts:11:9)
```

Now it does not even work for `JSClass` anymore...

## Causes and fixes

### Special handling of JSClassConstructor for printing

In `AppendMethodCall` (https://github.com/v8/v8/blob/b41d2e6595b4604cd49b8657a14860b454e12b56/src/objects/call-site-info.cc#L745-L752) there is special handling for `JSClassConstructor` receivers. Because of this, `JSProto` does not fall under this special case and somehow `GetTypeName` just returns `"Function"`.

If we extend the special handling to all `JSFunction`s instead of only `JSClassConstructors` (see the patch here: https://github.com/mika-fischer/node/commit/9802b28e326302e828388fbdf1a18c2694bf2a76), the built-in printing works as expected:
```
❯ node index.mjs
Error
    at JSClass.foo (file:///C:/Users/mfischer/src/bugs/node-bug-enable-source-maps/index.mjs:4:15)
Error
    at JSProto.foo (file:///C:/Users/mfischer/src/bugs/node-bug-enable-source-maps/index.mjs:9:11)
```

### Special handling is only used for printing, not for GetTypeName

For `Error.prepareStackTrace` consumers to also get the correct receiver type name, we can move the special handling from `AppendMethodCall` into `GetTypeName` (https://github.com/v8/v8/blob/b41d2e6595b4604cd49b8657a14860b454e12b56/src/objects/call-site-info.cc#L513-L525), (see the patch here: https://github.com/mika-fischer/node/commit/bed263730c7d449049197a0b9845a7b736bd50fb).

Then everything works correctly, also when using `Error.prepareStackTrace`.

```
❯ node --enable-source-maps index.mjs
Error
    at JSClass.foo (C:\Users\mfischer\src\bugs\node-bug-enable-source-maps\index.mts:5:11)
Error
    at JSProto.foo (C:\Users\mfischer\src\bugs\node-bug-enable-source-maps\index.mts:11:9)
```
