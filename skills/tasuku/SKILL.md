---
name: tasuku
description: Minimal task runner for Node.js — displays loading, success, error, warning, and skipped states in the terminal. Use when creating CLI task runners, progress displays, or terminal UIs with tasuku.
---

# tasuku

Minimal task runner for Node.js. Renders task states to stderr, keeps stdout clean.

## Quick Start

```ts
import task from 'tasuku'

await task('Build project', async ({ setTitle }) => {
    await build()
    setTitle('Build complete')
})
```

## Entry Points

| Import | Use |
|--------|-----|
| `tasuku` | Default (pinned renderer) |
| `tasuku/inline` | Inline renderer (sequential, no cursor manipulation) |
| `tasuku/create` | Raw factory (`createTasuku`, `pinned`, `inline`) |

## `createTasuku`

The convenience `createTasuku` from `tasuku` or `tasuku/inline` accepts **partial** overrides — the renderer defaults to the entry point's built-in:

```ts
import { createTasuku } from 'tasuku'
const task = createTasuku({ outputStream: process.stdout })  // override stream, keep pinned renderer
```

The raw `createTasuku` from `tasuku/create` requires the renderer explicitly:

```ts
import { createTasuku, pinned } from 'tasuku/create'
const task = createTasuku({ renderer: pinned })
```

## Task Inner API

```ts
await task('Title', async (api) => {
    api.setTitle('Updated title')
    api.setStatus('step 2')           // dimmed, in brackets: [step 2]
    api.setOutput('result data')      // → result data below task
    api.setWarning('careful')         // yellow ⚠ state
    api.setError('failed')            // red ✖ state
    api.skip('not needed')            // gray ⊘ state, throws (never returns)
    api.signal                        // AbortSignal — cooperative cancellation
    api.streamPreview                 // Writable for live streaming output
    api.startTime() / api.stopTime() // elapsed time: (3s), (1m 30s)
})
```

| Method | Effect |
|--------|--------|
| `setTitle(s)` | Update task title |
| `setStatus(s?)` | Show `[status]` after title, clear with no arg |
| `setOutput(s \| { message })` | Show `→ message` below task. Accepts string or object with `.message` |
| `setWarning(s?)` | Warning state. Accepts `Error \| string \| false \| null`. Falsy reverts to loading |
| `setError(s?)` | Error state. Same types as setWarning. Thrown errors auto-set this |
| `skip(msg?)` | Skip task. Throws internally — code after is unreachable. Promise resolves `undefined` |
| `streamPreview` | `Writable` stream for live output. Handles `\r` for progress bars. Shows last `previewLines` (default 5) lines with `(+ N lines)` indicator. Call `.clear()` to remove |
| `startTime()` | Start/restart elapsed timer. Shown as `(Xs)`, `(Xm Ys)`, `(Xh Ym)`. Hidden if < 1s |
| `stopTime()` | Stop timer, return elapsed ms. Display freezes at stopped value |

State changes paint immediately, so the current state is visible before the next line runs (including before synchronous work).

**Async-first / synchronous blocking:** the spinner animates between `await` points. Long synchronous (CPU-bound) work blocks the single thread, so the spinner can't animate during it — the pre-block state is painted, then the spinner freezes until the work finishes. Keep tasks async or offload heavy CPU work (e.g. a worker) to keep the UI live.

## Task Promise

`task()` returns a `TaskPromise<T>` — a Promise with live properties:

```ts
const p = task('Deploy', async () => data)
p.state     // 'loading' | 'success' | 'error' | 'warning' | 'skipped'
p.warning   // string | undefined (message when state is 'warning')
p.error     // string | undefined (message when state is 'error')
p.skipped   // string | undefined (message when state is 'skipped')
p.clear()   // remove from UI, returns same promise for chaining
```

`.clear()` can be chained before `await` — clears automatically on completion:

```ts
const result = await task('Temporary', async () => 42).clear()
// result === 42, task removed from UI
```

## Signal (AbortSignal)

The signal is **cooperative** — only cancels if passed to APIs that respect it (`fetch`, `setTimeout` from `timers/promises`, etc.).

Auto-aborted when:
- In `task.group()`: a sibling task throws (when `stopOnError: true`, the default)
- In nested tasks: the parent task throws

The error that caused the abort is on `signal.reason`.

```ts
await task('Multi-step', async ({ signal }) => {
    await step1(signal)
    signal.throwIfAborted()  // bail between steps
    await step2(signal)
})
```

External signal:

```ts
const controller = new AbortController()
task('Cancellable', fn, { signal: controller.signal })
controller.abort()
```

## Groups

```ts
const results = await task.group(task => [
    task('Step 1', async () => 'a'),
    task('Step 2', async () => 'b'),
], {
    concurrency: 2,
    stopOnError: true,
    maxVisible: 10,
    signal: controller.signal,
})
// results === ['a', 'b'] — array of return values
```

| Option | Default | Description |
|--------|---------|-------------|
| `concurrency` | `1` | Parallel tasks |
| `stopOnError` | `true` | Abort group on first failure |
| `maxVisible` | `rows - 2` | `number` or `(terminalHeight) => number`. Active tasks prioritized. Lifted on `.clear()` |
| `signal` | — | External `AbortSignal` |

Group returns `TaskGroupPromise` with `.clear()` to remove all tasks.

## Nesting

Tasks nest automatically via async context tracking — works across modules:

```ts
await task('Parent', async () => {
    await task('Child A', async () => { /* ... */ })
    await task('Child B', async () => { /* ... */ })
})
```

## Renderers

**Pinned** (default): Task list fixed at bottom, spinner animates in-place, `console.log` moved above.

**Inline**: Sequential output, no cursor manipulation. Use when:
- Console.log ordering matters
- Logging to a file or pipe
- Running multiple `createTasuku()` instances concurrently

Multiple inline renderers on the same stream are supported. Multiple pinned renderers are not (they share a cursor save/restore slot). Use separate output streams for concurrent pinned instances.

## Options

```ts
task('Title', fn, {
    showTime: true,        // auto-start elapsed timer
    previewLines: 5,       // max lines for streamPreview (default 5, min 1)
    signal: abortSignal,   // external abort signal
})
```

## States

| State | Icon | Trigger |
|-------|------|---------|
| pending | ◼ | Queued in group |
| loading | ⠋ | Task executing |
| success | ✔ | Task completed |
| warning | ⚠ | `setWarning(msg)` |
| error | ✖ | `setError(msg)` or thrown error |
| skipped | ⊘ | `skip(msg)` |

## Output Stream

Default: `process.stderr`. Override via `createTasuku({ outputStream })`.

Task UI renders to stderr so stdout stays clean for program output (`mytool | jq`).
