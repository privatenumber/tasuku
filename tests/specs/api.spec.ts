import { setTimeout } from 'node:timers/promises';
import { Writable } from 'node:stream';
import { describe, test, expect } from 'manten';
import { createTasuku, pinned } from '#tasuku/create';

const task = createTasuku({
	renderer: pinned,
	outputStream: new Writable({ write: (_, __, callback) => { callback(); } }) as NodeJS.WriteStream,
});

describe('API', () => {
	test('task - return number', async () => {
		const result = await task('Some task', async () => 1 + 1);
		expect(result).toBe(2);
	});

	test('task - return string', async () => {
		const result = await task('Some task', async () => 'some string');
		expect(result).toBe('some string');
	});

	test('task return Promise<number>', async () => {
		const result = await task(
			'Some task',
			() => Promise.resolve(123),
		);
		expect(result).toBe(123);
	});

	test('state is loading before await, success after', async () => {
		const p = task('Some task', async () => {
			await setTimeout(50);
		});

		expect(p.state).toBe('loading');
		await p;
		expect(p.state).toBe('success');
	});

	test('warning property returns message when state is warning', async () => {
		const p = task('Warn task', async ({ setWarning }) => {
			setWarning('something is off');
		});
		await p;

		expect(p.state).toBe('warning');
		expect(p.warning).toBe('something is off');
		expect(p.error).toBeUndefined();
	});

	test('error property returns message when state is error', async () => {
		const p = task('Error task', async ({ setError }) => {
			setError('something broke');
		});
		await p;

		expect(p.state).toBe('error');
		expect(p.error).toBe('something broke');
		expect(p.warning).toBeUndefined();
	});

	test('warning and error are undefined on success', async () => {
		const p = task('OK task', async () => 'done');
		await p;

		expect(p.state).toBe('success');
		expect(p.warning).toBeUndefined();
		expect(p.error).toBeUndefined();
	});

	test('setWarning with Error object extracts message', async () => {
		const p = task('Warn task', async ({ setWarning }) => {
			setWarning(new Error('warning from error'));
		});
		await p;

		expect(p.state).toBe('warning');
		expect(p.warning).toBe('warning from error');
	});

	test('setError with Error object extracts message', async () => {
		const p = task('Error task', async ({ setError }) => {
			setError(new Error('error from Error'));
		});
		await p;

		expect(p.state).toBe('error');
		expect(p.error).toBe('error from Error');
	});

	test('thrown string sets error state', async () => {
		const p = task('Throws string', async () => {
			// eslint-disable-next-line no-throw-literal
			throw 'something broke';
		});

		try { await p; } catch {}

		expect(p.state).toBe('error');
		expect(p.error).toBe('something broke');
	});

	test('thrown object with message property extracts message', async () => {
		const p = task('Throws object', async () => {
			// eslint-disable-next-line no-throw-literal
			throw { message: 'custom error' };
		});

		try { await p; } catch {}

		expect(p.state).toBe('error');
		expect(p.error).toBe('custom error');
	});

	test('thrown object with non-string message falls back to String()', async () => {
		const p = task('Throws bad message', async () => {
			// eslint-disable-next-line no-throw-literal
			throw { message: 42 };
		});

		try { await p; } catch {}

		expect(p.state).toBe('error');
		expect(typeof p.error).toBe('string');
	});

	test('thrown number does not cause internal TypeError', async () => {
		const p = task('Throws number', async () => {
			// eslint-disable-next-line no-throw-literal
			throw 42;
		});

		let caughtError: unknown;
		try { await p; } catch (error) { caughtError = error; }

		expect(caughtError).toBe(42);
		expect(p.state).toBe('error');
	});

	describe('skip()', () => {
		test('sets state to skipped', async () => {
			const p = task('Skippable', async ({ skip }) => {
				skip();
			});
			await p;

			expect(p.state).toBe('skipped');
			expect(p.skipped).toBeUndefined();
		});

		test('skip with message exposes reason via skipped property', async () => {
			const p = task('Skippable', async ({ skip }) => {
				skip('cache hit');
			});
			await p;

			expect(p.state).toBe('skipped');
			expect(p.skipped).toBe('cache hit');
		});

		test('does not throw to caller', async () => {
			const result = await task('Skippable', async ({ skip }) => {
				skip('not needed');
				// unreachable — skip() throws internally
			});

			expect(result).toBeUndefined();
		});

		test('skip does not execute code after it', async () => {
			let afterSkip = false;
			await task('Skippable', async ({ skip }) => {
				skip();
				afterSkip = true;
			});

			expect(afterSkip).toBe(false);
		});

		test('skip in group resolves with undefined for skipped task', async () => {
			const results = await task.group(task => [
				task('First', async () => 'a'),
				task('Skippable', async ({ skip }) => { skip('not needed'); }),
				task('Last', async () => 'c'),
			]);

			expect(results[0]).toBe('a');
			expect(results[1]).toBeUndefined();
			expect(results[2]).toBe('c');
		});

		test('nested skip does not affect parent', async () => {
			const p = task('Parent', async () => {
				const child = task('Child', async ({ skip }) => { skip(); });
				await child;
				expect(child.state).toBe('skipped');
				return 'parent done';
			});
			const result = await p;

			expect(result).toBe('parent done');
			expect(p.state).toBe('success');
		});
	});

	describe('clear()', () => {
		test('chained - resolves to task result', async () => {
			const result = await task('Some task', async () => {
				await setTimeout(50);
				return 'hello';
			}).clear();

			expect(result).toBe('hello');
		});

		test('chained - defers clear until task completes', async () => {
			const p = task('Some task', async () => {
				await setTimeout(50);
				return 'done';
			});

			expect(p.state).toBe('loading');
			const result = await p.clear();

			expect(result).toBe('done');
			expect(p.state).toBe('success');
		});

		test('chained - propagates thrown error', async () => {
			await expect(
				task('Failing task', async () => {
					throw new Error('task failed');
				}).clear(),
			).rejects.toThrow('task failed');
		});

		test('chained - clears on setError (non-throwing)', async () => {
			const result = await task('Error task', async ({ setError }) => {
				setError('something broke');
				return 'still returns';
			}).clear();

			expect(result).toBe('still returns');
		});

		test('chained - clears on warning', async () => {
			const result = await task('Warn task', async ({ setWarning }) => {
				setWarning('heads up');
				return 42;
			}).clear();

			expect(result).toBe(42);
		});

		test('after await - returns same promise', async () => {
			const p = task('Some task', async () => {
				await setTimeout(50);
			});
			await p;

			const returned = p.clear();
			expect(returned).toBe(p);
		});

		test('after await - clears immediately (synchronous)', async () => {
			const p = task('Some task', async () => {
				await setTimeout(50);
			});
			await p;

			expect(p.state).toBe('success');
			p.clear();
			// No additional await needed — already cleared synchronously
		});

		test('multiple calls do not throw', async () => {
			const p = task('Some task', async () => {
				await setTimeout(50);
			});
			await p;

			p.clear();
			p.clear();
			p.clear();
		});

		test('chained on nested task', async () => {
			const result = await task('Parent', async () => {
				const nested = await task('Child', async () => {
					await setTimeout(50);
					return 'nested result';
				}).clear();

				expect(nested).toBe('nested result');
				return 'parent result';
			});

			expect(result).toBe('parent result');
		});
	});

	test('nested tasks', async () => {
		const result = await task('Some task', async () => {
			const nestedResult = await task('nested task', async () => 'nested works');
			expect(nestedResult).toBe('nested works');

			return 1;
		});

		expect(result).toBe(1);
	});

	describe('group tasks', () => {
		test('task results', async () => {
			const groupTasks = await task.group(task => [
				task('number', async () => 123),
				task('string', async () => 'hello'),
				task('boolean', async () => false),
			]);

			expect(groupTasks[0]).toBe(123);
			expect(groupTasks[1]).toBe('hello');
			expect(groupTasks[2]).toBe(false);
		});

		test('concurrency - series', async () => {
			const startTime = Date.now();
			const groupTasks = await task.group(task => [
				task('one', async () => {
					await setTimeout(200);
					return 1;
				}),
				task('two', async () => {
					await setTimeout(200);
					return 2;
				}),
				task('three', async () => {
					await setTimeout(200);
					return 3;
				}),
			]);

			const elapsed = Date.now() - startTime;

			// Series execution should take at least 600ms (3 tasks × 200ms)
			// CI can be slow, so allow generous upper bound
			expect(elapsed).toBeGreaterThanOrEqual(600);

			expect(groupTasks[0]).toBe(1);
			expect(groupTasks[1]).toBe(2);
			expect(groupTasks[2]).toBe(3);
		});

		test('concurrency - parallel', async () => {
			const taskDuration = 100;

			const startTime = Date.now();
			const groupTasks = await task.group(task => [
				task('one', async () => {
					await setTimeout(taskDuration);
					return 1;
				}),
				task('two', async () => {
					await setTimeout(taskDuration);
					return 2;
				}),
				task('three', async () => {
					await setTimeout(taskDuration);
					return 3;
				}),
			], { concurrency: Number.POSITIVE_INFINITY });
			const elapsed = Date.now() - startTime;

			// Parallel execution should take at least 100ms (longest task)
			expect(elapsed).toBeGreaterThanOrEqual(taskDuration);

			expect(groupTasks[0]).toBe(1);
			expect(groupTasks[1]).toBe(2);
			expect(groupTasks[2]).toBe(3);
		});

		test('signal - abort pending tasks', async () => {
			const abortController = new AbortController();
			const executedTasks: number[] = [];

			await expect(
				task.group(task => [
					task('one', async () => {
						executedTasks.push(1);
						// Abort after first task completes
						abortController.abort();
						return 1;
					}),
					task('two', async () => {
						// Never resolves - but abort should prevent this from starting
						await new Promise(() => {});
						executedTasks.push(2);
						return 2;
					}),
					task('three', async () => {
						executedTasks.push(3);
						return 3;
					}),
				], { signal: abortController.signal }),
			).rejects.toThrow('aborted');

			// Only first task should complete before abort
			expect(executedTasks).toEqual([1]);
		});

		test('stopOnError - false aggregates errors', async () => {
			const error = await task.group(task => [
				task('one', async () => {
					throw new Error('error 1');
				}),
				task('two', async () => {
					throw new Error('error 2');
				}),
			], { stopOnError: false }).catch((caughtError: unknown) => caughtError);

			expect(error).toBeInstanceOf(AggregateError);
			const messages = (error as AggregateError).errors.map((element: Error) => element.message);
			expect(messages).toContain('error 1');
			expect(messages).toContain('error 2');
		});

		test('stopOnError - true (default) stops on first error', async () => {
			const executedTasks: number[] = [];

			await expect(
				task.group(task => [
					task('one', async () => {
						executedTasks.push(1);
						throw new Error('first error');
					}),
					task('two', async () => {
						executedTasks.push(2);
						return 2;
					}),
				]),
			).rejects.toThrow('first error');

			// Only first task should execute before stopping
			expect(executedTasks).toEqual([1]);
		});
	});

	describe('signal', () => {
		test('signal is available in task inner API', async () => {
			let receivedSignal: AbortSignal | undefined;

			await task('Signal task', async ({ signal }) => {
				receivedSignal = signal;
			});

			expect(receivedSignal).toBeInstanceOf(AbortSignal);
			expect(receivedSignal!.aborted).toBe(false);
		});

		test('standalone task receives external signal', async () => {
			const controller = new AbortController();
			let receivedSignal: AbortSignal | undefined;

			controller.abort();

			await task('Signal task', async ({ signal }) => {
				receivedSignal = signal;
			}, { signal: controller.signal });

			expect(receivedSignal!.aborted).toBe(true);
		});

		test('group auto-aborts running tasks on failure', async () => {
			let siblingSignal: AbortSignal | undefined;
			const failureError = new Error('boom');

			await expect(
				task.group(task => [
					task('slow', async ({ signal }) => {
						siblingSignal = signal;
						// Wait until aborted
						await new Promise((_resolve, reject) => {
							signal.addEventListener('abort', () => reject(new Error('aborted')));
						});
					}),
					task('fails', async () => {
						throw failureError;
					}),
				], { concurrency: 2 }),
			).rejects.toThrow();

			expect(siblingSignal!.aborted).toBe(true);
			expect(siblingSignal!.reason).toBe(failureError);
		});

		test('group with stopOnError false does not auto-abort', async () => {
			let taskASignal: AbortSignal | undefined;

			await expect(
				task.group(task => [
					task('A', async ({ signal }) => {
						taskASignal = signal;
						await setTimeout(50);
					}),
					task('B', async () => {
						throw new Error('fail');
					}),
				], {
					concurrency: 2,
					stopOnError: false,
				}),
			).rejects.toThrow();

			expect(taskASignal!.aborted).toBe(false);
		});

		test('parent abort propagates to nested child tasks', async () => {
			let childSignal: AbortSignal | undefined;

			await expect(
				task('parent', async () => {
					// Fire-and-forget child — catch its abort rejection
					task('child', async ({ signal }) => {
						childSignal = signal;
						await setTimeout(5000, undefined, { signal });
					}).catch(() => {});

					throw new Error('parent failed');
				}),
			).rejects.toThrow('parent failed');

			expect(childSignal).toBeInstanceOf(AbortSignal);
			expect(childSignal!.aborted).toBe(true);
		});

		test('setError does not abort signal', async () => {
			let receivedSignal: AbortSignal | undefined;

			await task('Error task', async ({ signal, setError }) => {
				setError('something broke');
				receivedSignal = signal;
			});

			expect(receivedSignal!.aborted).toBe(false);
		});

		test('abort signal reason contains the error that caused it', async () => {
			let childSignal: AbortSignal | undefined;
			const parentError = new Error('parent failed');

			await expect(
				task('parent', async () => {
					task('child', async ({ signal }) => {
						childSignal = signal;
						await setTimeout(5000, undefined, { signal });
					}).catch(() => {});

					throw parentError;
				}),
			).rejects.toThrow('parent failed');

			expect(childSignal!.reason).toBe(parentError);
		});
	});
});
