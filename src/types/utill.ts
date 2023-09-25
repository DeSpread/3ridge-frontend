export type ItemOfArray<T> = T extends (infer U)[] ? U : never;
