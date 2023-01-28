import { expectType } from 'tsd';
import task from '#tasuku';

const booleanResult = await task('title', async () => false);
expectType<boolean>(booleanResult.result);

const numberResult = await task('title', async () => 123);
expectType<number>(numberResult.result);

const stringResult = await task('title', async () => 'string');
expectType<string>(stringResult.result);

const groupApi = await task.group(task => [
	task('title', async () => false),
	task('title', async () => 123),
	task('title', async () => 'string'),
]);

expectType<boolean>(groupApi[0].result);
expectType<number>(groupApi[1].result);
expectType<string>(groupApi[2].result);
