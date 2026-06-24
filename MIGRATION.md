# Migrating from v2 to v3

## Breaking Changes

### 1. Task nesting: `task` removed from inner API

```diff
- await task('Parent', async ({ task }) => {
-     await task('Child', async () => { /* ... */ })
+ await task('Parent', async () => {
+     await task('Child', async () => { /* ... */ })
  })
```

If you destructure the inner API, remove `task`:

```diff
- await task('Deploy', async ({ task, setTitle }) => {
+ await task('Deploy', async ({ setTitle }) => {
```

<details>
<summary>Why this changed</summary>

Nesting now works automatically via async context tracking (Node.js `AsyncLocalStorage`). Any `task()` call inside a task function is automatically a child — no need to use a special `task` property. This also means nesting works across module boundaries without passing the `task` reference around.
</details>

### 2. Return type changed

`task()` resolves to the return value directly, not a `TaskAPI` wrapper:

```diff
- const { result } = await task('Build', async () => 42)
+ const result = await task('Build', async () => 42)
```

`state` and `clear()` are now properties on the promise itself:

```diff
- const api = await task('Build', async () => 42)
- api.state    // 'success'
- api.clear()
+ const p = task('Build', async () => 42)
+ await p
+ p.state    // 'success'
+ p.clear()
```

<details>
<summary>Why this changed</summary>

Two reasons:

1. **Frictionless by default.** In v2, every `await task(...)` returned a `TaskAPI` wrapper, forcing you to destructure `{ result }` even if you just wanted the return value. Most scripts don't need `state` or `clear()` — they just want the result. Now `task()` returns your value directly, as if the wrapper isn't there.

2. **Error handling.** In v2, you couldn't access `state` or `clear()` if the task threw — the promise rejected and you never got the `TaskAPI` object. Moving these onto the promise means they're always accessible, which enables patterns like clearing a failed task from the UI.

The task API is still there when you need it (`p.state`, `p.clear()`, `p.error`) — it's just not in the way when you don't.
</details>

### 3. Group return type changed

Groups resolve to an array of return values, not `TaskAPI` objects:

```diff
  const results = await task.group(task => [
      task('A', async () => 1),
      task('B', async () => 2),
  ])
- results[0].result // 1
+ results[0] // 1
```

### 4. `stopOnError: false` throws `AggregateError`

```diff
  try {
      await task.group(task => [ ... ], { stopOnError: false })
  } catch (error) {
-     console.log(error.message) // "error 1\nerror 2"
+     console.log(error.errors.map(e => e.message)) // ['error 1', 'error 2']
  }
```

<details>
<summary>Why this changed</summary>

The underlying `p-map` dependency was upgraded from v5 to v7, which uses the native `AggregateError` for multiple failures instead of concatenating messages into a single string. `AggregateError` is the standard way to represent multiple errors in JavaScript.
</details>

### 5. Package exports restructured

The default import is unchanged. New subpath exports were added:

```ts
// Default (unchanged)
import task from 'tasuku'

// New entry points
import task from 'tasuku/inline' // inline renderer
import { createTasuku, pinned, inline } from 'tasuku/create' // raw factory
```

<details>
<summary>Why this changed</summary>

v2 bundled everything (including the unused inline renderer) into a single entry point. Subpath exports let bundlers tree-shake the renderer they don't use. Each entry point loads only what it needs.
</details>

## New Features

These are additive — no migration needed.

### `skip()`

Skip a task intentionally. Throws internally so no `return` is needed:

```ts
await task('Deploy', async ({ skip }) => {
    if (!hasChanges) { skip('no changes') }
    await deploy()
})
```

### `signal` (AbortSignal)

Every task gets a cooperative `AbortSignal`. Auto-aborted when a sibling task throws (in groups) or a parent task throws:

```ts
await task('Fetch', async ({ signal }) => {
    await fetch(url, { signal })
})
```

Also accepted as a task option for external cancellation:

```ts
await task('Cancellable', fn, { signal: controller.signal })
```

### Inline renderer

Sequential output — `console.log` appears exactly where you'd expect:

```ts
import task from 'tasuku/inline'

await task('Step 1', async () => { /* ... */ })
console.log('Between tasks')
await task('Step 2', async () => { /* ... */ })
```

### Task promise properties

`state`, `warning`, `error`, `skipped` are readable on the promise at any time:

```ts
const p = task('Deploy', async () => { throw new Error('fail') })
try { await p } catch {}
p.state // 'error'
p.error // 'fail'
p.clear() // remove from UI even after error
```

### `.clear()` chaining

```ts
const result = await task('Temp', async () => 42).clear()
// result === 42, task removed from UI
```

### `streamPreview.clear()`

```ts
await task('Build', async ({ streamPreview }) => {
    childProcess.stderr.pipe(streamPreview)
    await build()
    streamPreview.clear()
})
```

### Colored error/warning output

Error messages render in red, warning messages in yellow.
