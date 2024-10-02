```
❯ npm ci && npm test

added 3 packages, and audited 4 packages in 973ms

found 0 vulnerabilities

> node-bug-enable-source-maps@1.0.0 test
> tsc && node ./index.mjs && node --enable-source-maps ./index.mjs

Version: v22.9.0
execArgv: []
Error: JSClass
    at JSClass.foo (file:///C:/Users/mfischer/src/videmo/test/node-bug-enable-source-maps/index.mjs:3:15)
    at file:///C:/Users/mfischer/src/videmo/test/node-bug-enable-source-maps/index.mjs:30:15
    at ModuleJob.run (node:internal/modules/esm/module_job:262:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:483:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)
Error: JSProto
    at Function.foo (file:///C:/Users/mfischer/src/videmo/test/node-bug-enable-source-maps/index.mjs:12:19)
    at file:///C:/Users/mfischer/src/videmo/test/node-bug-enable-source-maps/index.mjs:32:6
Version: v22.9.0
execArgv: ["--enable-source-maps"]
Error: JSClass
    at Function.foo (C:\Users\mfischer\src\videmo\test\node-bug-enable-source-maps\index.mts:3:11)
    at <anonymous> (C:\Users\mfischer\src\videmo\test\node-bug-enable-source-maps\index.mts:32:15)
    at ModuleJob.run (node:internal/modules/esm/module_job:262:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:483:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)
Error: JSProto
    at Function.foo (C:\Users\mfischer\src\videmo\test\node-bug-enable-source-maps\index.mts:13:13)
    at <anonymous> (C:\Users\mfischer\src\videmo\test\node-bug-enable-source-maps\index.mts:34:4)
```