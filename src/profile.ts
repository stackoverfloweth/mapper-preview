export interface Profile<
  TSourceKey extends string = string,
  TSource = any,
  TDestinationKey extends string = string,
  TDestination = any
> {
  sourceKey: TSourceKey;
  destinationKey: TDestinationKey;
  map: (source: TSource) => TDestination;
}

export type ExtractSourceKeys<TProfile> = TProfile extends Profile<
  infer TSourceKey,
  any,
  any
>
  ? TSourceKey
  : never;
