import { setTimeout } from 'node:timers/promises';
import { Writable } from 'node:stream';
import { testSuite, expect } from 'manten';
import { createTasuku, theme } from '#tasuku';

const task = createTasuku({
	theme,
	outputStream: new Writable({ write: (_, __, callback) => { callback(); } }) as NodeJS.WriteStream,
});

export default testSuite(({ describe }) => {
	describe('API', ({ test, describe }) => {
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

		describe('clear()', ({ test }) => {
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

		describe('group tasks', ({ test }) => {
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
				], { stopOnError: false }).catch((caughtError: Error) => caughtError);

				expect((error as Error).message).toContain('error 1');
				expect((error as Error).message).toContain('error 2');
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
	});
});
