import type { Profile } from './profile';

type User = { id: number; name: string; email: string };
type UserLite = { id: number };
type UserDto = { name: string };
type UserSummary = { id: number };

const numberToString = {
  sourceKey: 'number',
  destinationKey: 'string',
  map: (source: number): string => source.toString(),
} as const satisfies Profile;

const numberToDate = {
  sourceKey: 'number',
  destinationKey: 'Date',
  map: (source: number): Date => new Date(source),
} as const satisfies Profile;

const userToDto = {
  sourceKey: 'user',
  destinationKey: 'dto',
  map: (source: User): UserDto => ({ name: source.name }),
} as const satisfies Profile;

const userToSummary = {
  sourceKey: 'user',
  destinationKey: 'summary',
  map: (source: UserLite): UserSummary => ({ id: source.id }),
} as const satisfies Profile;

const profiles = [
  numberToString,
  numberToDate,
  userToDto,
  userToSummary,
] as const;
declare const mapper: Mapper<typeof profiles>;

const user: User = { id: 1, name: 'Ada', email: 'ada@example.com' };
const lite: UserLite = { id: 1 };

const okString: string = mapper.map('number', 123, 'string');
const okDate: Date = mapper.map('number', 456, 'Date');
const okDto: UserDto = mapper.map('user', user, 'dto');
const okSummary: UserSummary = mapper.map('user', lite, 'summary');
const okMany: string[] = mapper.mapMany('number', [1, 2, 3], 'string');
const okUserAsLite: UserSummary = mapper.map('user', user, 'summary');

// const failBadSourceKey = mapper.map('nope', 123, 'string')
// const failBadDestKey = mapper.map('number', 123, 'boolean')
// const failWrongSource = mapper.map('number', '123', 'string')
// const failLiteAsDto = mapper.map('user', lite, 'dto')
// const failCrossPair = mapper.map('number', 123, 'dto')
