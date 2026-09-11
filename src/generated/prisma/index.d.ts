
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Family
 * 
 */
export type Family = $Result.DefaultSelection<Prisma.$FamilyPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model TaskCompletion
 * 
 */
export type TaskCompletion = $Result.DefaultSelection<Prisma.$TaskCompletionPayload>
/**
 * Model Gift
 * 
 */
export type Gift = $Result.DefaultSelection<Prisma.$GiftPayload>
/**
 * Model GiftRedemption
 * 
 */
export type GiftRedemption = $Result.DefaultSelection<Prisma.$GiftRedemptionPayload>
/**
 * Model ExchangeDay
 * 
 */
export type ExchangeDay = $Result.DefaultSelection<Prisma.$ExchangeDayPayload>
/**
 * Model Reward
 * 
 */
export type Reward = $Result.DefaultSelection<Prisma.$RewardPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  PARENT: 'PARENT',
  CHILD: 'CHILD'
};

export type Role = (typeof Role)[keyof typeof Role]


export const RedemptionStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED'
};

export type RedemptionStatus = (typeof RedemptionStatus)[keyof typeof RedemptionStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type RedemptionStatus = $Enums.RedemptionStatus

export const RedemptionStatus: typeof $Enums.RedemptionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.family`: Exposes CRUD operations for the **Family** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Families
    * const families = await prisma.family.findMany()
    * ```
    */
  get family(): Prisma.FamilyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskCompletion`: Exposes CRUD operations for the **TaskCompletion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskCompletions
    * const taskCompletions = await prisma.taskCompletion.findMany()
    * ```
    */
  get taskCompletion(): Prisma.TaskCompletionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gift`: Exposes CRUD operations for the **Gift** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gifts
    * const gifts = await prisma.gift.findMany()
    * ```
    */
  get gift(): Prisma.GiftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.giftRedemption`: Exposes CRUD operations for the **GiftRedemption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GiftRedemptions
    * const giftRedemptions = await prisma.giftRedemption.findMany()
    * ```
    */
  get giftRedemption(): Prisma.GiftRedemptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exchangeDay`: Exposes CRUD operations for the **ExchangeDay** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExchangeDays
    * const exchangeDays = await prisma.exchangeDay.findMany()
    * ```
    */
  get exchangeDay(): Prisma.ExchangeDayDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reward`: Exposes CRUD operations for the **Reward** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rewards
    * const rewards = await prisma.reward.findMany()
    * ```
    */
  get reward(): Prisma.RewardDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Family: 'Family',
    Category: 'Category',
    Task: 'Task',
    TaskCompletion: 'TaskCompletion',
    Gift: 'Gift',
    GiftRedemption: 'GiftRedemption',
    ExchangeDay: 'ExchangeDay',
    Reward: 'Reward'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "family" | "category" | "task" | "taskCompletion" | "gift" | "giftRedemption" | "exchangeDay" | "reward"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Family: {
        payload: Prisma.$FamilyPayload<ExtArgs>
        fields: Prisma.FamilyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FamilyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FamilyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          findFirst: {
            args: Prisma.FamilyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FamilyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          findMany: {
            args: Prisma.FamilyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          create: {
            args: Prisma.FamilyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          createMany: {
            args: Prisma.FamilyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FamilyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          delete: {
            args: Prisma.FamilyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          update: {
            args: Prisma.FamilyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          deleteMany: {
            args: Prisma.FamilyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FamilyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FamilyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          upsert: {
            args: Prisma.FamilyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          aggregate: {
            args: Prisma.FamilyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFamily>
          }
          groupBy: {
            args: Prisma.FamilyGroupByArgs<ExtArgs>
            result: $Utils.Optional<FamilyGroupByOutputType>[]
          }
          count: {
            args: Prisma.FamilyCountArgs<ExtArgs>
            result: $Utils.Optional<FamilyCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      TaskCompletion: {
        payload: Prisma.$TaskCompletionPayload<ExtArgs>
        fields: Prisma.TaskCompletionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskCompletionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskCompletionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          findFirst: {
            args: Prisma.TaskCompletionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskCompletionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          findMany: {
            args: Prisma.TaskCompletionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>[]
          }
          create: {
            args: Prisma.TaskCompletionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          createMany: {
            args: Prisma.TaskCompletionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCompletionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>[]
          }
          delete: {
            args: Prisma.TaskCompletionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          update: {
            args: Prisma.TaskCompletionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          deleteMany: {
            args: Prisma.TaskCompletionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskCompletionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskCompletionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>[]
          }
          upsert: {
            args: Prisma.TaskCompletionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskCompletionPayload>
          }
          aggregate: {
            args: Prisma.TaskCompletionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskCompletion>
          }
          groupBy: {
            args: Prisma.TaskCompletionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskCompletionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCompletionCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCompletionCountAggregateOutputType> | number
          }
        }
      }
      Gift: {
        payload: Prisma.$GiftPayload<ExtArgs>
        fields: Prisma.GiftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GiftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GiftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          findFirst: {
            args: Prisma.GiftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GiftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          findMany: {
            args: Prisma.GiftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          create: {
            args: Prisma.GiftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          createMany: {
            args: Prisma.GiftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GiftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          delete: {
            args: Prisma.GiftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          update: {
            args: Prisma.GiftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          deleteMany: {
            args: Prisma.GiftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GiftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GiftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>[]
          }
          upsert: {
            args: Prisma.GiftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftPayload>
          }
          aggregate: {
            args: Prisma.GiftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGift>
          }
          groupBy: {
            args: Prisma.GiftGroupByArgs<ExtArgs>
            result: $Utils.Optional<GiftGroupByOutputType>[]
          }
          count: {
            args: Prisma.GiftCountArgs<ExtArgs>
            result: $Utils.Optional<GiftCountAggregateOutputType> | number
          }
        }
      }
      GiftRedemption: {
        payload: Prisma.$GiftRedemptionPayload<ExtArgs>
        fields: Prisma.GiftRedemptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GiftRedemptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GiftRedemptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>
          }
          findFirst: {
            args: Prisma.GiftRedemptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GiftRedemptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>
          }
          findMany: {
            args: Prisma.GiftRedemptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>[]
          }
          create: {
            args: Prisma.GiftRedemptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>
          }
          createMany: {
            args: Prisma.GiftRedemptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GiftRedemptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>[]
          }
          delete: {
            args: Prisma.GiftRedemptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>
          }
          update: {
            args: Prisma.GiftRedemptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>
          }
          deleteMany: {
            args: Prisma.GiftRedemptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GiftRedemptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GiftRedemptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>[]
          }
          upsert: {
            args: Prisma.GiftRedemptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GiftRedemptionPayload>
          }
          aggregate: {
            args: Prisma.GiftRedemptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGiftRedemption>
          }
          groupBy: {
            args: Prisma.GiftRedemptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<GiftRedemptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.GiftRedemptionCountArgs<ExtArgs>
            result: $Utils.Optional<GiftRedemptionCountAggregateOutputType> | number
          }
        }
      }
      ExchangeDay: {
        payload: Prisma.$ExchangeDayPayload<ExtArgs>
        fields: Prisma.ExchangeDayFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExchangeDayFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExchangeDayFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>
          }
          findFirst: {
            args: Prisma.ExchangeDayFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExchangeDayFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>
          }
          findMany: {
            args: Prisma.ExchangeDayFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>[]
          }
          create: {
            args: Prisma.ExchangeDayCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>
          }
          createMany: {
            args: Prisma.ExchangeDayCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExchangeDayCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>[]
          }
          delete: {
            args: Prisma.ExchangeDayDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>
          }
          update: {
            args: Prisma.ExchangeDayUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>
          }
          deleteMany: {
            args: Prisma.ExchangeDayDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExchangeDayUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExchangeDayUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>[]
          }
          upsert: {
            args: Prisma.ExchangeDayUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeDayPayload>
          }
          aggregate: {
            args: Prisma.ExchangeDayAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchangeDay>
          }
          groupBy: {
            args: Prisma.ExchangeDayGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExchangeDayGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExchangeDayCountArgs<ExtArgs>
            result: $Utils.Optional<ExchangeDayCountAggregateOutputType> | number
          }
        }
      }
      Reward: {
        payload: Prisma.$RewardPayload<ExtArgs>
        fields: Prisma.RewardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RewardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RewardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          findFirst: {
            args: Prisma.RewardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RewardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          findMany: {
            args: Prisma.RewardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>[]
          }
          create: {
            args: Prisma.RewardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          createMany: {
            args: Prisma.RewardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RewardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>[]
          }
          delete: {
            args: Prisma.RewardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          update: {
            args: Prisma.RewardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          deleteMany: {
            args: Prisma.RewardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RewardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RewardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>[]
          }
          upsert: {
            args: Prisma.RewardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardPayload>
          }
          aggregate: {
            args: Prisma.RewardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReward>
          }
          groupBy: {
            args: Prisma.RewardGroupByArgs<ExtArgs>
            result: $Utils.Optional<RewardGroupByOutputType>[]
          }
          count: {
            args: Prisma.RewardCountArgs<ExtArgs>
            result: $Utils.Optional<RewardCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    family?: FamilyOmit
    category?: CategoryOmit
    task?: TaskOmit
    taskCompletion?: TaskCompletionOmit
    gift?: GiftOmit
    giftRedemption?: GiftRedemptionOmit
    exchangeDay?: ExchangeDayOmit
    reward?: RewardOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    taskCompletions: number
    giftRedemptions: number
    rewards: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskCompletions?: boolean | UserCountOutputTypeCountTaskCompletionsArgs
    giftRedemptions?: boolean | UserCountOutputTypeCountGiftRedemptionsArgs
    rewards?: boolean | UserCountOutputTypeCountRewardsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskCompletionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCompletionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGiftRedemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftRedemptionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRewardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardWhereInput
  }


  /**
   * Count Type FamilyCountOutputType
   */

  export type FamilyCountOutputType = {
    members: number
    tasks: number
    gifts: number
    categories: number
    exchangeDays: number
    rewards: number
  }

  export type FamilyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | FamilyCountOutputTypeCountMembersArgs
    tasks?: boolean | FamilyCountOutputTypeCountTasksArgs
    gifts?: boolean | FamilyCountOutputTypeCountGiftsArgs
    categories?: boolean | FamilyCountOutputTypeCountCategoriesArgs
    exchangeDays?: boolean | FamilyCountOutputTypeCountExchangeDaysArgs
    rewards?: boolean | FamilyCountOutputTypeCountRewardsArgs
  }

  // Custom InputTypes
  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyCountOutputType
     */
    select?: FamilyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountGiftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftWhereInput
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountExchangeDaysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeDayWhereInput
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountRewardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    tasks: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | CategoryCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    completions: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    completions?: boolean | TaskCountOutputTypeCountCompletionsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountCompletionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCompletionWhereInput
  }


  /**
   * Count Type GiftCountOutputType
   */

  export type GiftCountOutputType = {
    redemptions: number
  }

  export type GiftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    redemptions?: boolean | GiftCountOutputTypeCountRedemptionsArgs
  }

  // Custom InputTypes
  /**
   * GiftCountOutputType without action
   */
  export type GiftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftCountOutputType
     */
    select?: GiftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GiftCountOutputType without action
   */
  export type GiftCountOutputTypeCountRedemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftRedemptionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    timezoneOffset: number | null
    currentPoints: number | null
    totalPoints: number | null
  }

  export type UserSumAggregateOutputType = {
    timezoneOffset: number | null
    currentPoints: number | null
    totalPoints: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: $Enums.Role | null
    familyId: string | null
    timezoneOffset: number | null
    createdAt: Date | null
    updatedAt: Date | null
    currentPoints: number | null
    totalPoints: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: $Enums.Role | null
    familyId: string | null
    timezoneOffset: number | null
    createdAt: Date | null
    updatedAt: Date | null
    currentPoints: number | null
    totalPoints: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    familyId: number
    timezoneOffset: number
    createdAt: number
    updatedAt: number
    currentPoints: number
    totalPoints: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    timezoneOffset?: true
    currentPoints?: true
    totalPoints?: true
  }

  export type UserSumAggregateInputType = {
    timezoneOffset?: true
    currentPoints?: true
    totalPoints?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    familyId?: true
    timezoneOffset?: true
    createdAt?: true
    updatedAt?: true
    currentPoints?: true
    totalPoints?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    familyId?: true
    timezoneOffset?: true
    createdAt?: true
    updatedAt?: true
    currentPoints?: true
    totalPoints?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    familyId?: true
    timezoneOffset?: true
    createdAt?: true
    updatedAt?: true
    currentPoints?: true
    totalPoints?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    role: $Enums.Role
    familyId: string
    timezoneOffset: number | null
    createdAt: Date
    updatedAt: Date
    currentPoints: number
    totalPoints: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    familyId?: boolean
    timezoneOffset?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    currentPoints?: boolean
    totalPoints?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    taskCompletions?: boolean | User$taskCompletionsArgs<ExtArgs>
    giftRedemptions?: boolean | User$giftRedemptionsArgs<ExtArgs>
    rewards?: boolean | User$rewardsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    familyId?: boolean
    timezoneOffset?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    currentPoints?: boolean
    totalPoints?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    familyId?: boolean
    timezoneOffset?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    currentPoints?: boolean
    totalPoints?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    familyId?: boolean
    timezoneOffset?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    currentPoints?: boolean
    totalPoints?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "role" | "familyId" | "timezoneOffset" | "createdAt" | "updatedAt" | "currentPoints" | "totalPoints", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    taskCompletions?: boolean | User$taskCompletionsArgs<ExtArgs>
    giftRedemptions?: boolean | User$giftRedemptionsArgs<ExtArgs>
    rewards?: boolean | User$rewardsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      family: Prisma.$FamilyPayload<ExtArgs>
      taskCompletions: Prisma.$TaskCompletionPayload<ExtArgs>[]
      giftRedemptions: Prisma.$GiftRedemptionPayload<ExtArgs>[]
      rewards: Prisma.$RewardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      role: $Enums.Role
      familyId: string
      timezoneOffset: number | null
      createdAt: Date
      updatedAt: Date
      currentPoints: number
      totalPoints: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    taskCompletions<T extends User$taskCompletionsArgs<ExtArgs> = {}>(args?: Subset<T, User$taskCompletionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    giftRedemptions<T extends User$giftRedemptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$giftRedemptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rewards<T extends User$rewardsArgs<ExtArgs> = {}>(args?: Subset<T, User$rewardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly familyId: FieldRef<"User", 'String'>
    readonly timezoneOffset: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly currentPoints: FieldRef<"User", 'Int'>
    readonly totalPoints: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.taskCompletions
   */
  export type User$taskCompletionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    where?: TaskCompletionWhereInput
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    cursor?: TaskCompletionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * User.giftRedemptions
   */
  export type User$giftRedemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    where?: GiftRedemptionWhereInput
    orderBy?: GiftRedemptionOrderByWithRelationInput | GiftRedemptionOrderByWithRelationInput[]
    cursor?: GiftRedemptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GiftRedemptionScalarFieldEnum | GiftRedemptionScalarFieldEnum[]
  }

  /**
   * User.rewards
   */
  export type User$rewardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    where?: RewardWhereInput
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    cursor?: RewardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Family
   */

  export type AggregateFamily = {
    _count: FamilyCountAggregateOutputType | null
    _min: FamilyMinAggregateOutputType | null
    _max: FamilyMaxAggregateOutputType | null
  }

  export type FamilyMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FamilyMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FamilyCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FamilyMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FamilyMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FamilyCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FamilyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Family to aggregate.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Families
    **/
    _count?: true | FamilyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FamilyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FamilyMaxAggregateInputType
  }

  export type GetFamilyAggregateType<T extends FamilyAggregateArgs> = {
        [P in keyof T & keyof AggregateFamily]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFamily[P]>
      : GetScalarType<T[P], AggregateFamily[P]>
  }




  export type FamilyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyWhereInput
    orderBy?: FamilyOrderByWithAggregationInput | FamilyOrderByWithAggregationInput[]
    by: FamilyScalarFieldEnum[] | FamilyScalarFieldEnum
    having?: FamilyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FamilyCountAggregateInputType | true
    _min?: FamilyMinAggregateInputType
    _max?: FamilyMaxAggregateInputType
  }

  export type FamilyGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    _count: FamilyCountAggregateOutputType | null
    _min: FamilyMinAggregateOutputType | null
    _max: FamilyMaxAggregateOutputType | null
  }

  type GetFamilyGroupByPayload<T extends FamilyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FamilyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FamilyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FamilyGroupByOutputType[P]>
            : GetScalarType<T[P], FamilyGroupByOutputType[P]>
        }
      >
    >


  export type FamilySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    members?: boolean | Family$membersArgs<ExtArgs>
    tasks?: boolean | Family$tasksArgs<ExtArgs>
    gifts?: boolean | Family$giftsArgs<ExtArgs>
    categories?: boolean | Family$categoriesArgs<ExtArgs>
    exchangeDays?: boolean | Family$exchangeDaysArgs<ExtArgs>
    rewards?: boolean | Family$rewardsArgs<ExtArgs>
    _count?: boolean | FamilyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["family"]>

  export type FamilySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["family"]>

  export type FamilySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["family"]>

  export type FamilySelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FamilyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["family"]>
  export type FamilyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Family$membersArgs<ExtArgs>
    tasks?: boolean | Family$tasksArgs<ExtArgs>
    gifts?: boolean | Family$giftsArgs<ExtArgs>
    categories?: boolean | Family$categoriesArgs<ExtArgs>
    exchangeDays?: boolean | Family$exchangeDaysArgs<ExtArgs>
    rewards?: boolean | Family$rewardsArgs<ExtArgs>
    _count?: boolean | FamilyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FamilyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FamilyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FamilyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Family"
    objects: {
      members: Prisma.$UserPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      gifts: Prisma.$GiftPayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      exchangeDays: Prisma.$ExchangeDayPayload<ExtArgs>[]
      rewards: Prisma.$RewardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["family"]>
    composites: {}
  }

  type FamilyGetPayload<S extends boolean | null | undefined | FamilyDefaultArgs> = $Result.GetResult<Prisma.$FamilyPayload, S>

  type FamilyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FamilyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FamilyCountAggregateInputType | true
    }

  export interface FamilyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Family'], meta: { name: 'Family' } }
    /**
     * Find zero or one Family that matches the filter.
     * @param {FamilyFindUniqueArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FamilyFindUniqueArgs>(args: SelectSubset<T, FamilyFindUniqueArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Family that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FamilyFindUniqueOrThrowArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FamilyFindUniqueOrThrowArgs>(args: SelectSubset<T, FamilyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Family that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindFirstArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FamilyFindFirstArgs>(args?: SelectSubset<T, FamilyFindFirstArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Family that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindFirstOrThrowArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FamilyFindFirstOrThrowArgs>(args?: SelectSubset<T, FamilyFindFirstOrThrowArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Families that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Families
     * const families = await prisma.family.findMany()
     * 
     * // Get first 10 Families
     * const families = await prisma.family.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const familyWithIdOnly = await prisma.family.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FamilyFindManyArgs>(args?: SelectSubset<T, FamilyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Family.
     * @param {FamilyCreateArgs} args - Arguments to create a Family.
     * @example
     * // Create one Family
     * const Family = await prisma.family.create({
     *   data: {
     *     // ... data to create a Family
     *   }
     * })
     * 
     */
    create<T extends FamilyCreateArgs>(args: SelectSubset<T, FamilyCreateArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Families.
     * @param {FamilyCreateManyArgs} args - Arguments to create many Families.
     * @example
     * // Create many Families
     * const family = await prisma.family.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FamilyCreateManyArgs>(args?: SelectSubset<T, FamilyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Families and returns the data saved in the database.
     * @param {FamilyCreateManyAndReturnArgs} args - Arguments to create many Families.
     * @example
     * // Create many Families
     * const family = await prisma.family.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Families and only return the `id`
     * const familyWithIdOnly = await prisma.family.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FamilyCreateManyAndReturnArgs>(args?: SelectSubset<T, FamilyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Family.
     * @param {FamilyDeleteArgs} args - Arguments to delete one Family.
     * @example
     * // Delete one Family
     * const Family = await prisma.family.delete({
     *   where: {
     *     // ... filter to delete one Family
     *   }
     * })
     * 
     */
    delete<T extends FamilyDeleteArgs>(args: SelectSubset<T, FamilyDeleteArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Family.
     * @param {FamilyUpdateArgs} args - Arguments to update one Family.
     * @example
     * // Update one Family
     * const family = await prisma.family.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FamilyUpdateArgs>(args: SelectSubset<T, FamilyUpdateArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Families.
     * @param {FamilyDeleteManyArgs} args - Arguments to filter Families to delete.
     * @example
     * // Delete a few Families
     * const { count } = await prisma.family.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FamilyDeleteManyArgs>(args?: SelectSubset<T, FamilyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Families
     * const family = await prisma.family.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FamilyUpdateManyArgs>(args: SelectSubset<T, FamilyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Families and returns the data updated in the database.
     * @param {FamilyUpdateManyAndReturnArgs} args - Arguments to update many Families.
     * @example
     * // Update many Families
     * const family = await prisma.family.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Families and only return the `id`
     * const familyWithIdOnly = await prisma.family.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FamilyUpdateManyAndReturnArgs>(args: SelectSubset<T, FamilyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Family.
     * @param {FamilyUpsertArgs} args - Arguments to update or create a Family.
     * @example
     * // Update or create a Family
     * const family = await prisma.family.upsert({
     *   create: {
     *     // ... data to create a Family
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Family we want to update
     *   }
     * })
     */
    upsert<T extends FamilyUpsertArgs>(args: SelectSubset<T, FamilyUpsertArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyCountArgs} args - Arguments to filter Families to count.
     * @example
     * // Count the number of Families
     * const count = await prisma.family.count({
     *   where: {
     *     // ... the filter for the Families we want to count
     *   }
     * })
    **/
    count<T extends FamilyCountArgs>(
      args?: Subset<T, FamilyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FamilyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FamilyAggregateArgs>(args: Subset<T, FamilyAggregateArgs>): Prisma.PrismaPromise<GetFamilyAggregateType<T>>

    /**
     * Group by Family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FamilyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FamilyGroupByArgs['orderBy'] }
        : { orderBy?: FamilyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FamilyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFamilyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Family model
   */
  readonly fields: FamilyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Family.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FamilyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Family$membersArgs<ExtArgs> = {}>(args?: Subset<T, Family$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Family$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Family$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gifts<T extends Family$giftsArgs<ExtArgs> = {}>(args?: Subset<T, Family$giftsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends Family$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Family$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exchangeDays<T extends Family$exchangeDaysArgs<ExtArgs> = {}>(args?: Subset<T, Family$exchangeDaysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rewards<T extends Family$rewardsArgs<ExtArgs> = {}>(args?: Subset<T, Family$rewardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Family model
   */
  interface FamilyFieldRefs {
    readonly id: FieldRef<"Family", 'String'>
    readonly createdAt: FieldRef<"Family", 'DateTime'>
    readonly updatedAt: FieldRef<"Family", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Family findUnique
   */
  export type FamilyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family findUniqueOrThrow
   */
  export type FamilyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family findFirst
   */
  export type FamilyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family findFirstOrThrow
   */
  export type FamilyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family findMany
   */
  export type FamilyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Families to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family create
   */
  export type FamilyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The data needed to create a Family.
     */
    data: XOR<FamilyCreateInput, FamilyUncheckedCreateInput>
  }

  /**
   * Family createMany
   */
  export type FamilyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Families.
     */
    data: FamilyCreateManyInput | FamilyCreateManyInput[]
  }

  /**
   * Family createManyAndReturn
   */
  export type FamilyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * The data used to create many Families.
     */
    data: FamilyCreateManyInput | FamilyCreateManyInput[]
  }

  /**
   * Family update
   */
  export type FamilyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The data needed to update a Family.
     */
    data: XOR<FamilyUpdateInput, FamilyUncheckedUpdateInput>
    /**
     * Choose, which Family to update.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family updateMany
   */
  export type FamilyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Families.
     */
    data: XOR<FamilyUpdateManyMutationInput, FamilyUncheckedUpdateManyInput>
    /**
     * Filter which Families to update
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to update.
     */
    limit?: number
  }

  /**
   * Family updateManyAndReturn
   */
  export type FamilyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * The data used to update Families.
     */
    data: XOR<FamilyUpdateManyMutationInput, FamilyUncheckedUpdateManyInput>
    /**
     * Filter which Families to update
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to update.
     */
    limit?: number
  }

  /**
   * Family upsert
   */
  export type FamilyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The filter to search for the Family to update in case it exists.
     */
    where: FamilyWhereUniqueInput
    /**
     * In case the Family found by the `where` argument doesn't exist, create a new Family with this data.
     */
    create: XOR<FamilyCreateInput, FamilyUncheckedCreateInput>
    /**
     * In case the Family was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FamilyUpdateInput, FamilyUncheckedUpdateInput>
  }

  /**
   * Family delete
   */
  export type FamilyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter which Family to delete.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family deleteMany
   */
  export type FamilyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Families to delete
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to delete.
     */
    limit?: number
  }

  /**
   * Family.members
   */
  export type Family$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Family.tasks
   */
  export type Family$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Family.gifts
   */
  export type Family$giftsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    where?: GiftWhereInput
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    cursor?: GiftWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Family.categories
   */
  export type Family$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Family.exchangeDays
   */
  export type Family$exchangeDaysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    where?: ExchangeDayWhereInput
    orderBy?: ExchangeDayOrderByWithRelationInput | ExchangeDayOrderByWithRelationInput[]
    cursor?: ExchangeDayWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeDayScalarFieldEnum | ExchangeDayScalarFieldEnum[]
  }

  /**
   * Family.rewards
   */
  export type Family$rewardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    where?: RewardWhereInput
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    cursor?: RewardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * Family without action
   */
  export type FamilyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    order: number | null
  }

  export type CategorySumAggregateOutputType = {
    order: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    familyId: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    familyId: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    familyId: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    order?: true
  }

  export type CategorySumAggregateInputType = {
    order?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    familyId?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    familyId?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    familyId?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    familyId: string
    order: number
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    familyId?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    tasks?: boolean | Category$tasksArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    familyId?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    familyId?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    familyId?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "familyId" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    tasks?: boolean | Category$tasksArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      family: Prisma.$FamilyPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      familyId: string
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends Category$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Category$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly familyId: FieldRef<"Category", 'String'>
    readonly order: FieldRef<"Category", 'Int'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.tasks
   */
  export type Category$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    points: number | null
  }

  export type TaskSumAggregateOutputType = {
    points: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    name: string | null
    points: number | null
    description: string | null
    categoryId: string | null
    familyId: string | null
    availableDays: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    name: string | null
    points: number | null
    description: string | null
    categoryId: string | null
    familyId: string | null
    availableDays: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    name: number
    points: number
    description: number
    categoryId: number
    familyId: number
    availableDays: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    points?: true
  }

  export type TaskSumAggregateInputType = {
    points?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    name?: true
    points?: true
    description?: true
    categoryId?: true
    familyId?: true
    availableDays?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    name?: true
    points?: true
    description?: true
    categoryId?: true
    familyId?: true
    availableDays?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    name?: true
    points?: true
    description?: true
    categoryId?: true
    familyId?: true
    availableDays?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    name: string
    points: number
    description: string | null
    categoryId: string
    familyId: string
    availableDays: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    points?: boolean
    description?: boolean
    categoryId?: boolean
    familyId?: boolean
    availableDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    completions?: boolean | Task$completionsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    points?: boolean
    description?: boolean
    categoryId?: boolean
    familyId?: boolean
    availableDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    points?: boolean
    description?: boolean
    categoryId?: boolean
    familyId?: boolean
    availableDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    name?: boolean
    points?: boolean
    description?: boolean
    categoryId?: boolean
    familyId?: boolean
    availableDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "points" | "description" | "categoryId" | "familyId" | "availableDays" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    completions?: boolean | Task$completionsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      family: Prisma.$FamilyPayload<ExtArgs>
      completions: Prisma.$TaskCompletionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      points: number
      description: string | null
      categoryId: string
      familyId: string
      availableDays: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    completions<T extends Task$completionsArgs<ExtArgs> = {}>(args?: Subset<T, Task$completionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly name: FieldRef<"Task", 'String'>
    readonly points: FieldRef<"Task", 'Int'>
    readonly description: FieldRef<"Task", 'String'>
    readonly categoryId: FieldRef<"Task", 'String'>
    readonly familyId: FieldRef<"Task", 'String'>
    readonly availableDays: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
    readonly deletedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.completions
   */
  export type Task$completionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    where?: TaskCompletionWhereInput
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    cursor?: TaskCompletionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model TaskCompletion
   */

  export type AggregateTaskCompletion = {
    _count: TaskCompletionCountAggregateOutputType | null
    _avg: TaskCompletionAvgAggregateOutputType | null
    _sum: TaskCompletionSumAggregateOutputType | null
    _min: TaskCompletionMinAggregateOutputType | null
    _max: TaskCompletionMaxAggregateOutputType | null
  }

  export type TaskCompletionAvgAggregateOutputType = {
    points: number | null
  }

  export type TaskCompletionSumAggregateOutputType = {
    points: number | null
  }

  export type TaskCompletionMinAggregateOutputType = {
    id: string | null
    taskId: string | null
    userId: string | null
    points: number | null
    completedAt: Date | null
    revokedAt: Date | null
    revokedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCompletionMaxAggregateOutputType = {
    id: string | null
    taskId: string | null
    userId: string | null
    points: number | null
    completedAt: Date | null
    revokedAt: Date | null
    revokedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskCompletionCountAggregateOutputType = {
    id: number
    taskId: number
    userId: number
    points: number
    completedAt: number
    revokedAt: number
    revokedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskCompletionAvgAggregateInputType = {
    points?: true
  }

  export type TaskCompletionSumAggregateInputType = {
    points?: true
  }

  export type TaskCompletionMinAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    points?: true
    completedAt?: true
    revokedAt?: true
    revokedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCompletionMaxAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    points?: true
    completedAt?: true
    revokedAt?: true
    revokedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskCompletionCountAggregateInputType = {
    id?: true
    taskId?: true
    userId?: true
    points?: true
    completedAt?: true
    revokedAt?: true
    revokedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskCompletionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskCompletion to aggregate.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskCompletions
    **/
    _count?: true | TaskCompletionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskCompletionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskCompletionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskCompletionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskCompletionMaxAggregateInputType
  }

  export type GetTaskCompletionAggregateType<T extends TaskCompletionAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskCompletion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskCompletion[P]>
      : GetScalarType<T[P], AggregateTaskCompletion[P]>
  }




  export type TaskCompletionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskCompletionWhereInput
    orderBy?: TaskCompletionOrderByWithAggregationInput | TaskCompletionOrderByWithAggregationInput[]
    by: TaskCompletionScalarFieldEnum[] | TaskCompletionScalarFieldEnum
    having?: TaskCompletionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCompletionCountAggregateInputType | true
    _avg?: TaskCompletionAvgAggregateInputType
    _sum?: TaskCompletionSumAggregateInputType
    _min?: TaskCompletionMinAggregateInputType
    _max?: TaskCompletionMaxAggregateInputType
  }

  export type TaskCompletionGroupByOutputType = {
    id: string
    taskId: string
    userId: string
    points: number
    completedAt: Date
    revokedAt: Date | null
    revokedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: TaskCompletionCountAggregateOutputType | null
    _avg: TaskCompletionAvgAggregateOutputType | null
    _sum: TaskCompletionSumAggregateOutputType | null
    _min: TaskCompletionMinAggregateOutputType | null
    _max: TaskCompletionMaxAggregateOutputType | null
  }

  type GetTaskCompletionGroupByPayload<T extends TaskCompletionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskCompletionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskCompletionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskCompletionGroupByOutputType[P]>
            : GetScalarType<T[P], TaskCompletionGroupByOutputType[P]>
        }
      >
    >


  export type TaskCompletionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    points?: boolean
    completedAt?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCompletion"]>

  export type TaskCompletionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    points?: boolean
    completedAt?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCompletion"]>

  export type TaskCompletionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskId?: boolean
    userId?: boolean
    points?: boolean
    completedAt?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskCompletion"]>

  export type TaskCompletionSelectScalar = {
    id?: boolean
    taskId?: boolean
    userId?: boolean
    points?: boolean
    completedAt?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskCompletionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "taskId" | "userId" | "points" | "completedAt" | "revokedAt" | "revokedBy" | "createdAt" | "updatedAt", ExtArgs["result"]["taskCompletion"]>
  export type TaskCompletionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskCompletionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskCompletionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskCompletionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskCompletion"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskId: string
      userId: string
      points: number
      completedAt: Date
      revokedAt: Date | null
      revokedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskCompletion"]>
    composites: {}
  }

  type TaskCompletionGetPayload<S extends boolean | null | undefined | TaskCompletionDefaultArgs> = $Result.GetResult<Prisma.$TaskCompletionPayload, S>

  type TaskCompletionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskCompletionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCompletionCountAggregateInputType | true
    }

  export interface TaskCompletionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskCompletion'], meta: { name: 'TaskCompletion' } }
    /**
     * Find zero or one TaskCompletion that matches the filter.
     * @param {TaskCompletionFindUniqueArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskCompletionFindUniqueArgs>(args: SelectSubset<T, TaskCompletionFindUniqueArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskCompletion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskCompletionFindUniqueOrThrowArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskCompletionFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskCompletionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskCompletion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindFirstArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskCompletionFindFirstArgs>(args?: SelectSubset<T, TaskCompletionFindFirstArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskCompletion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindFirstOrThrowArgs} args - Arguments to find a TaskCompletion
     * @example
     * // Get one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskCompletionFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskCompletionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskCompletions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskCompletions
     * const taskCompletions = await prisma.taskCompletion.findMany()
     * 
     * // Get first 10 TaskCompletions
     * const taskCompletions = await prisma.taskCompletion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskCompletionWithIdOnly = await prisma.taskCompletion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskCompletionFindManyArgs>(args?: SelectSubset<T, TaskCompletionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskCompletion.
     * @param {TaskCompletionCreateArgs} args - Arguments to create a TaskCompletion.
     * @example
     * // Create one TaskCompletion
     * const TaskCompletion = await prisma.taskCompletion.create({
     *   data: {
     *     // ... data to create a TaskCompletion
     *   }
     * })
     * 
     */
    create<T extends TaskCompletionCreateArgs>(args: SelectSubset<T, TaskCompletionCreateArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskCompletions.
     * @param {TaskCompletionCreateManyArgs} args - Arguments to create many TaskCompletions.
     * @example
     * // Create many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCompletionCreateManyArgs>(args?: SelectSubset<T, TaskCompletionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskCompletions and returns the data saved in the database.
     * @param {TaskCompletionCreateManyAndReturnArgs} args - Arguments to create many TaskCompletions.
     * @example
     * // Create many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskCompletions and only return the `id`
     * const taskCompletionWithIdOnly = await prisma.taskCompletion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCompletionCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCompletionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskCompletion.
     * @param {TaskCompletionDeleteArgs} args - Arguments to delete one TaskCompletion.
     * @example
     * // Delete one TaskCompletion
     * const TaskCompletion = await prisma.taskCompletion.delete({
     *   where: {
     *     // ... filter to delete one TaskCompletion
     *   }
     * })
     * 
     */
    delete<T extends TaskCompletionDeleteArgs>(args: SelectSubset<T, TaskCompletionDeleteArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskCompletion.
     * @param {TaskCompletionUpdateArgs} args - Arguments to update one TaskCompletion.
     * @example
     * // Update one TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskCompletionUpdateArgs>(args: SelectSubset<T, TaskCompletionUpdateArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskCompletions.
     * @param {TaskCompletionDeleteManyArgs} args - Arguments to filter TaskCompletions to delete.
     * @example
     * // Delete a few TaskCompletions
     * const { count } = await prisma.taskCompletion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskCompletionDeleteManyArgs>(args?: SelectSubset<T, TaskCompletionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskCompletionUpdateManyArgs>(args: SelectSubset<T, TaskCompletionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskCompletions and returns the data updated in the database.
     * @param {TaskCompletionUpdateManyAndReturnArgs} args - Arguments to update many TaskCompletions.
     * @example
     * // Update many TaskCompletions
     * const taskCompletion = await prisma.taskCompletion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskCompletions and only return the `id`
     * const taskCompletionWithIdOnly = await prisma.taskCompletion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskCompletionUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskCompletionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskCompletion.
     * @param {TaskCompletionUpsertArgs} args - Arguments to update or create a TaskCompletion.
     * @example
     * // Update or create a TaskCompletion
     * const taskCompletion = await prisma.taskCompletion.upsert({
     *   create: {
     *     // ... data to create a TaskCompletion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskCompletion we want to update
     *   }
     * })
     */
    upsert<T extends TaskCompletionUpsertArgs>(args: SelectSubset<T, TaskCompletionUpsertArgs<ExtArgs>>): Prisma__TaskCompletionClient<$Result.GetResult<Prisma.$TaskCompletionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskCompletions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionCountArgs} args - Arguments to filter TaskCompletions to count.
     * @example
     * // Count the number of TaskCompletions
     * const count = await prisma.taskCompletion.count({
     *   where: {
     *     // ... the filter for the TaskCompletions we want to count
     *   }
     * })
    **/
    count<T extends TaskCompletionCountArgs>(
      args?: Subset<T, TaskCompletionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCompletionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskCompletionAggregateArgs>(args: Subset<T, TaskCompletionAggregateArgs>): Prisma.PrismaPromise<GetTaskCompletionAggregateType<T>>

    /**
     * Group by TaskCompletion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCompletionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskCompletionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskCompletionGroupByArgs['orderBy'] }
        : { orderBy?: TaskCompletionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskCompletionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskCompletionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskCompletion model
   */
  readonly fields: TaskCompletionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskCompletion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskCompletionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskCompletion model
   */
  interface TaskCompletionFieldRefs {
    readonly id: FieldRef<"TaskCompletion", 'String'>
    readonly taskId: FieldRef<"TaskCompletion", 'String'>
    readonly userId: FieldRef<"TaskCompletion", 'String'>
    readonly points: FieldRef<"TaskCompletion", 'Int'>
    readonly completedAt: FieldRef<"TaskCompletion", 'DateTime'>
    readonly revokedAt: FieldRef<"TaskCompletion", 'DateTime'>
    readonly revokedBy: FieldRef<"TaskCompletion", 'String'>
    readonly createdAt: FieldRef<"TaskCompletion", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskCompletion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskCompletion findUnique
   */
  export type TaskCompletionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion findUniqueOrThrow
   */
  export type TaskCompletionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion findFirst
   */
  export type TaskCompletionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCompletions.
     */
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion findFirstOrThrow
   */
  export type TaskCompletionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletion to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCompletions.
     */
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion findMany
   */
  export type TaskCompletionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter, which TaskCompletions to fetch.
     */
    where?: TaskCompletionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskCompletions to fetch.
     */
    orderBy?: TaskCompletionOrderByWithRelationInput | TaskCompletionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskCompletions.
     */
    cursor?: TaskCompletionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskCompletions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskCompletions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskCompletions.
     */
    distinct?: TaskCompletionScalarFieldEnum | TaskCompletionScalarFieldEnum[]
  }

  /**
   * TaskCompletion create
   */
  export type TaskCompletionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskCompletion.
     */
    data: XOR<TaskCompletionCreateInput, TaskCompletionUncheckedCreateInput>
  }

  /**
   * TaskCompletion createMany
   */
  export type TaskCompletionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskCompletions.
     */
    data: TaskCompletionCreateManyInput | TaskCompletionCreateManyInput[]
  }

  /**
   * TaskCompletion createManyAndReturn
   */
  export type TaskCompletionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * The data used to create many TaskCompletions.
     */
    data: TaskCompletionCreateManyInput | TaskCompletionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskCompletion update
   */
  export type TaskCompletionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskCompletion.
     */
    data: XOR<TaskCompletionUpdateInput, TaskCompletionUncheckedUpdateInput>
    /**
     * Choose, which TaskCompletion to update.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion updateMany
   */
  export type TaskCompletionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskCompletions.
     */
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyInput>
    /**
     * Filter which TaskCompletions to update
     */
    where?: TaskCompletionWhereInput
    /**
     * Limit how many TaskCompletions to update.
     */
    limit?: number
  }

  /**
   * TaskCompletion updateManyAndReturn
   */
  export type TaskCompletionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * The data used to update TaskCompletions.
     */
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyInput>
    /**
     * Filter which TaskCompletions to update
     */
    where?: TaskCompletionWhereInput
    /**
     * Limit how many TaskCompletions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskCompletion upsert
   */
  export type TaskCompletionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskCompletion to update in case it exists.
     */
    where: TaskCompletionWhereUniqueInput
    /**
     * In case the TaskCompletion found by the `where` argument doesn't exist, create a new TaskCompletion with this data.
     */
    create: XOR<TaskCompletionCreateInput, TaskCompletionUncheckedCreateInput>
    /**
     * In case the TaskCompletion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskCompletionUpdateInput, TaskCompletionUncheckedUpdateInput>
  }

  /**
   * TaskCompletion delete
   */
  export type TaskCompletionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
    /**
     * Filter which TaskCompletion to delete.
     */
    where: TaskCompletionWhereUniqueInput
  }

  /**
   * TaskCompletion deleteMany
   */
  export type TaskCompletionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskCompletions to delete
     */
    where?: TaskCompletionWhereInput
    /**
     * Limit how many TaskCompletions to delete.
     */
    limit?: number
  }

  /**
   * TaskCompletion without action
   */
  export type TaskCompletionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCompletion
     */
    select?: TaskCompletionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskCompletion
     */
    omit?: TaskCompletionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskCompletionInclude<ExtArgs> | null
  }


  /**
   * Model Gift
   */

  export type AggregateGift = {
    _count: GiftCountAggregateOutputType | null
    _avg: GiftAvgAggregateOutputType | null
    _sum: GiftSumAggregateOutputType | null
    _min: GiftMinAggregateOutputType | null
    _max: GiftMaxAggregateOutputType | null
  }

  export type GiftAvgAggregateOutputType = {
    points: number | null
    weeklyLimit: number | null
  }

  export type GiftSumAggregateOutputType = {
    points: number | null
    weeklyLimit: number | null
  }

  export type GiftMinAggregateOutputType = {
    id: string | null
    name: string | null
    points: number | null
    description: string | null
    color: string | null
    weeklyLimit: number | null
    familyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type GiftMaxAggregateOutputType = {
    id: string | null
    name: string | null
    points: number | null
    description: string | null
    color: string | null
    weeklyLimit: number | null
    familyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type GiftCountAggregateOutputType = {
    id: number
    name: number
    points: number
    description: number
    color: number
    weeklyLimit: number
    familyId: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type GiftAvgAggregateInputType = {
    points?: true
    weeklyLimit?: true
  }

  export type GiftSumAggregateInputType = {
    points?: true
    weeklyLimit?: true
  }

  export type GiftMinAggregateInputType = {
    id?: true
    name?: true
    points?: true
    description?: true
    color?: true
    weeklyLimit?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type GiftMaxAggregateInputType = {
    id?: true
    name?: true
    points?: true
    description?: true
    color?: true
    weeklyLimit?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type GiftCountAggregateInputType = {
    id?: true
    name?: true
    points?: true
    description?: true
    color?: true
    weeklyLimit?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type GiftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gift to aggregate.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gifts
    **/
    _count?: true | GiftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GiftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GiftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GiftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GiftMaxAggregateInputType
  }

  export type GetGiftAggregateType<T extends GiftAggregateArgs> = {
        [P in keyof T & keyof AggregateGift]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGift[P]>
      : GetScalarType<T[P], AggregateGift[P]>
  }




  export type GiftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftWhereInput
    orderBy?: GiftOrderByWithAggregationInput | GiftOrderByWithAggregationInput[]
    by: GiftScalarFieldEnum[] | GiftScalarFieldEnum
    having?: GiftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GiftCountAggregateInputType | true
    _avg?: GiftAvgAggregateInputType
    _sum?: GiftSumAggregateInputType
    _min?: GiftMinAggregateInputType
    _max?: GiftMaxAggregateInputType
  }

  export type GiftGroupByOutputType = {
    id: string
    name: string
    points: number
    description: string | null
    color: string | null
    weeklyLimit: number | null
    familyId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: GiftCountAggregateOutputType | null
    _avg: GiftAvgAggregateOutputType | null
    _sum: GiftSumAggregateOutputType | null
    _min: GiftMinAggregateOutputType | null
    _max: GiftMaxAggregateOutputType | null
  }

  type GetGiftGroupByPayload<T extends GiftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GiftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GiftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GiftGroupByOutputType[P]>
            : GetScalarType<T[P], GiftGroupByOutputType[P]>
        }
      >
    >


  export type GiftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    points?: boolean
    description?: boolean
    color?: boolean
    weeklyLimit?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    redemptions?: boolean | Gift$redemptionsArgs<ExtArgs>
    _count?: boolean | GiftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    points?: boolean
    description?: boolean
    color?: boolean
    weeklyLimit?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    points?: boolean
    description?: boolean
    color?: boolean
    weeklyLimit?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gift"]>

  export type GiftSelectScalar = {
    id?: boolean
    name?: boolean
    points?: boolean
    description?: boolean
    color?: boolean
    weeklyLimit?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type GiftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "points" | "description" | "color" | "weeklyLimit" | "familyId" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["gift"]>
  export type GiftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    redemptions?: boolean | Gift$redemptionsArgs<ExtArgs>
    _count?: boolean | GiftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GiftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type GiftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $GiftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Gift"
    objects: {
      family: Prisma.$FamilyPayload<ExtArgs>
      redemptions: Prisma.$GiftRedemptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      points: number
      description: string | null
      color: string | null
      weeklyLimit: number | null
      familyId: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["gift"]>
    composites: {}
  }

  type GiftGetPayload<S extends boolean | null | undefined | GiftDefaultArgs> = $Result.GetResult<Prisma.$GiftPayload, S>

  type GiftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GiftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GiftCountAggregateInputType | true
    }

  export interface GiftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Gift'], meta: { name: 'Gift' } }
    /**
     * Find zero or one Gift that matches the filter.
     * @param {GiftFindUniqueArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GiftFindUniqueArgs>(args: SelectSubset<T, GiftFindUniqueArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gift that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GiftFindUniqueOrThrowArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GiftFindUniqueOrThrowArgs>(args: SelectSubset<T, GiftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindFirstArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GiftFindFirstArgs>(args?: SelectSubset<T, GiftFindFirstArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gift that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindFirstOrThrowArgs} args - Arguments to find a Gift
     * @example
     * // Get one Gift
     * const gift = await prisma.gift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GiftFindFirstOrThrowArgs>(args?: SelectSubset<T, GiftFindFirstOrThrowArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gifts
     * const gifts = await prisma.gift.findMany()
     * 
     * // Get first 10 Gifts
     * const gifts = await prisma.gift.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const giftWithIdOnly = await prisma.gift.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GiftFindManyArgs>(args?: SelectSubset<T, GiftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gift.
     * @param {GiftCreateArgs} args - Arguments to create a Gift.
     * @example
     * // Create one Gift
     * const Gift = await prisma.gift.create({
     *   data: {
     *     // ... data to create a Gift
     *   }
     * })
     * 
     */
    create<T extends GiftCreateArgs>(args: SelectSubset<T, GiftCreateArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gifts.
     * @param {GiftCreateManyArgs} args - Arguments to create many Gifts.
     * @example
     * // Create many Gifts
     * const gift = await prisma.gift.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GiftCreateManyArgs>(args?: SelectSubset<T, GiftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Gifts and returns the data saved in the database.
     * @param {GiftCreateManyAndReturnArgs} args - Arguments to create many Gifts.
     * @example
     * // Create many Gifts
     * const gift = await prisma.gift.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Gifts and only return the `id`
     * const giftWithIdOnly = await prisma.gift.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GiftCreateManyAndReturnArgs>(args?: SelectSubset<T, GiftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Gift.
     * @param {GiftDeleteArgs} args - Arguments to delete one Gift.
     * @example
     * // Delete one Gift
     * const Gift = await prisma.gift.delete({
     *   where: {
     *     // ... filter to delete one Gift
     *   }
     * })
     * 
     */
    delete<T extends GiftDeleteArgs>(args: SelectSubset<T, GiftDeleteArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gift.
     * @param {GiftUpdateArgs} args - Arguments to update one Gift.
     * @example
     * // Update one Gift
     * const gift = await prisma.gift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GiftUpdateArgs>(args: SelectSubset<T, GiftUpdateArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gifts.
     * @param {GiftDeleteManyArgs} args - Arguments to filter Gifts to delete.
     * @example
     * // Delete a few Gifts
     * const { count } = await prisma.gift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GiftDeleteManyArgs>(args?: SelectSubset<T, GiftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gifts
     * const gift = await prisma.gift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GiftUpdateManyArgs>(args: SelectSubset<T, GiftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gifts and returns the data updated in the database.
     * @param {GiftUpdateManyAndReturnArgs} args - Arguments to update many Gifts.
     * @example
     * // Update many Gifts
     * const gift = await prisma.gift.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Gifts and only return the `id`
     * const giftWithIdOnly = await prisma.gift.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GiftUpdateManyAndReturnArgs>(args: SelectSubset<T, GiftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Gift.
     * @param {GiftUpsertArgs} args - Arguments to update or create a Gift.
     * @example
     * // Update or create a Gift
     * const gift = await prisma.gift.upsert({
     *   create: {
     *     // ... data to create a Gift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gift we want to update
     *   }
     * })
     */
    upsert<T extends GiftUpsertArgs>(args: SelectSubset<T, GiftUpsertArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftCountArgs} args - Arguments to filter Gifts to count.
     * @example
     * // Count the number of Gifts
     * const count = await prisma.gift.count({
     *   where: {
     *     // ... the filter for the Gifts we want to count
     *   }
     * })
    **/
    count<T extends GiftCountArgs>(
      args?: Subset<T, GiftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GiftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GiftAggregateArgs>(args: Subset<T, GiftAggregateArgs>): Prisma.PrismaPromise<GetGiftAggregateType<T>>

    /**
     * Group by Gift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GiftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GiftGroupByArgs['orderBy'] }
        : { orderBy?: GiftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGiftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Gift model
   */
  readonly fields: GiftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Gift.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GiftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    redemptions<T extends Gift$redemptionsArgs<ExtArgs> = {}>(args?: Subset<T, Gift$redemptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Gift model
   */
  interface GiftFieldRefs {
    readonly id: FieldRef<"Gift", 'String'>
    readonly name: FieldRef<"Gift", 'String'>
    readonly points: FieldRef<"Gift", 'Int'>
    readonly description: FieldRef<"Gift", 'String'>
    readonly color: FieldRef<"Gift", 'String'>
    readonly weeklyLimit: FieldRef<"Gift", 'Int'>
    readonly familyId: FieldRef<"Gift", 'String'>
    readonly createdAt: FieldRef<"Gift", 'DateTime'>
    readonly updatedAt: FieldRef<"Gift", 'DateTime'>
    readonly deletedAt: FieldRef<"Gift", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Gift findUnique
   */
  export type GiftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift findUniqueOrThrow
   */
  export type GiftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift findFirst
   */
  export type GiftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gifts.
     */
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift findFirstOrThrow
   */
  export type GiftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gift to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gifts.
     */
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift findMany
   */
  export type GiftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter, which Gifts to fetch.
     */
    where?: GiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gifts to fetch.
     */
    orderBy?: GiftOrderByWithRelationInput | GiftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gifts.
     */
    cursor?: GiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gifts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gifts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gifts.
     */
    distinct?: GiftScalarFieldEnum | GiftScalarFieldEnum[]
  }

  /**
   * Gift create
   */
  export type GiftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The data needed to create a Gift.
     */
    data: XOR<GiftCreateInput, GiftUncheckedCreateInput>
  }

  /**
   * Gift createMany
   */
  export type GiftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gifts.
     */
    data: GiftCreateManyInput | GiftCreateManyInput[]
  }

  /**
   * Gift createManyAndReturn
   */
  export type GiftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * The data used to create many Gifts.
     */
    data: GiftCreateManyInput | GiftCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Gift update
   */
  export type GiftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The data needed to update a Gift.
     */
    data: XOR<GiftUpdateInput, GiftUncheckedUpdateInput>
    /**
     * Choose, which Gift to update.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift updateMany
   */
  export type GiftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gifts.
     */
    data: XOR<GiftUpdateManyMutationInput, GiftUncheckedUpdateManyInput>
    /**
     * Filter which Gifts to update
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to update.
     */
    limit?: number
  }

  /**
   * Gift updateManyAndReturn
   */
  export type GiftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * The data used to update Gifts.
     */
    data: XOR<GiftUpdateManyMutationInput, GiftUncheckedUpdateManyInput>
    /**
     * Filter which Gifts to update
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Gift upsert
   */
  export type GiftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * The filter to search for the Gift to update in case it exists.
     */
    where: GiftWhereUniqueInput
    /**
     * In case the Gift found by the `where` argument doesn't exist, create a new Gift with this data.
     */
    create: XOR<GiftCreateInput, GiftUncheckedCreateInput>
    /**
     * In case the Gift was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GiftUpdateInput, GiftUncheckedUpdateInput>
  }

  /**
   * Gift delete
   */
  export type GiftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
    /**
     * Filter which Gift to delete.
     */
    where: GiftWhereUniqueInput
  }

  /**
   * Gift deleteMany
   */
  export type GiftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gifts to delete
     */
    where?: GiftWhereInput
    /**
     * Limit how many Gifts to delete.
     */
    limit?: number
  }

  /**
   * Gift.redemptions
   */
  export type Gift$redemptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    where?: GiftRedemptionWhereInput
    orderBy?: GiftRedemptionOrderByWithRelationInput | GiftRedemptionOrderByWithRelationInput[]
    cursor?: GiftRedemptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GiftRedemptionScalarFieldEnum | GiftRedemptionScalarFieldEnum[]
  }

  /**
   * Gift without action
   */
  export type GiftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gift
     */
    select?: GiftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gift
     */
    omit?: GiftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftInclude<ExtArgs> | null
  }


  /**
   * Model GiftRedemption
   */

  export type AggregateGiftRedemption = {
    _count: GiftRedemptionCountAggregateOutputType | null
    _avg: GiftRedemptionAvgAggregateOutputType | null
    _sum: GiftRedemptionSumAggregateOutputType | null
    _min: GiftRedemptionMinAggregateOutputType | null
    _max: GiftRedemptionMaxAggregateOutputType | null
  }

  export type GiftRedemptionAvgAggregateOutputType = {
    points: number | null
  }

  export type GiftRedemptionSumAggregateOutputType = {
    points: number | null
  }

  export type GiftRedemptionMinAggregateOutputType = {
    id: string | null
    giftId: string | null
    userId: string | null
    points: number | null
    status: $Enums.RedemptionStatus | null
    redeemedAt: Date | null
    confirmedAt: Date | null
    confirmedBy: string | null
    cancelledAt: Date | null
    cancelledBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GiftRedemptionMaxAggregateOutputType = {
    id: string | null
    giftId: string | null
    userId: string | null
    points: number | null
    status: $Enums.RedemptionStatus | null
    redeemedAt: Date | null
    confirmedAt: Date | null
    confirmedBy: string | null
    cancelledAt: Date | null
    cancelledBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GiftRedemptionCountAggregateOutputType = {
    id: number
    giftId: number
    userId: number
    points: number
    status: number
    redeemedAt: number
    confirmedAt: number
    confirmedBy: number
    cancelledAt: number
    cancelledBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GiftRedemptionAvgAggregateInputType = {
    points?: true
  }

  export type GiftRedemptionSumAggregateInputType = {
    points?: true
  }

  export type GiftRedemptionMinAggregateInputType = {
    id?: true
    giftId?: true
    userId?: true
    points?: true
    status?: true
    redeemedAt?: true
    confirmedAt?: true
    confirmedBy?: true
    cancelledAt?: true
    cancelledBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GiftRedemptionMaxAggregateInputType = {
    id?: true
    giftId?: true
    userId?: true
    points?: true
    status?: true
    redeemedAt?: true
    confirmedAt?: true
    confirmedBy?: true
    cancelledAt?: true
    cancelledBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GiftRedemptionCountAggregateInputType = {
    id?: true
    giftId?: true
    userId?: true
    points?: true
    status?: true
    redeemedAt?: true
    confirmedAt?: true
    confirmedBy?: true
    cancelledAt?: true
    cancelledBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GiftRedemptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GiftRedemption to aggregate.
     */
    where?: GiftRedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GiftRedemptions to fetch.
     */
    orderBy?: GiftRedemptionOrderByWithRelationInput | GiftRedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GiftRedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GiftRedemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GiftRedemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GiftRedemptions
    **/
    _count?: true | GiftRedemptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GiftRedemptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GiftRedemptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GiftRedemptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GiftRedemptionMaxAggregateInputType
  }

  export type GetGiftRedemptionAggregateType<T extends GiftRedemptionAggregateArgs> = {
        [P in keyof T & keyof AggregateGiftRedemption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGiftRedemption[P]>
      : GetScalarType<T[P], AggregateGiftRedemption[P]>
  }




  export type GiftRedemptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GiftRedemptionWhereInput
    orderBy?: GiftRedemptionOrderByWithAggregationInput | GiftRedemptionOrderByWithAggregationInput[]
    by: GiftRedemptionScalarFieldEnum[] | GiftRedemptionScalarFieldEnum
    having?: GiftRedemptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GiftRedemptionCountAggregateInputType | true
    _avg?: GiftRedemptionAvgAggregateInputType
    _sum?: GiftRedemptionSumAggregateInputType
    _min?: GiftRedemptionMinAggregateInputType
    _max?: GiftRedemptionMaxAggregateInputType
  }

  export type GiftRedemptionGroupByOutputType = {
    id: string
    giftId: string
    userId: string
    points: number
    status: $Enums.RedemptionStatus
    redeemedAt: Date
    confirmedAt: Date | null
    confirmedBy: string | null
    cancelledAt: Date | null
    cancelledBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: GiftRedemptionCountAggregateOutputType | null
    _avg: GiftRedemptionAvgAggregateOutputType | null
    _sum: GiftRedemptionSumAggregateOutputType | null
    _min: GiftRedemptionMinAggregateOutputType | null
    _max: GiftRedemptionMaxAggregateOutputType | null
  }

  type GetGiftRedemptionGroupByPayload<T extends GiftRedemptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GiftRedemptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GiftRedemptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GiftRedemptionGroupByOutputType[P]>
            : GetScalarType<T[P], GiftRedemptionGroupByOutputType[P]>
        }
      >
    >


  export type GiftRedemptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    giftId?: boolean
    userId?: boolean
    points?: boolean
    status?: boolean
    redeemedAt?: boolean
    confirmedAt?: boolean
    confirmedBy?: boolean
    cancelledAt?: boolean
    cancelledBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["giftRedemption"]>

  export type GiftRedemptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    giftId?: boolean
    userId?: boolean
    points?: boolean
    status?: boolean
    redeemedAt?: boolean
    confirmedAt?: boolean
    confirmedBy?: boolean
    cancelledAt?: boolean
    cancelledBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["giftRedemption"]>

  export type GiftRedemptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    giftId?: boolean
    userId?: boolean
    points?: boolean
    status?: boolean
    redeemedAt?: boolean
    confirmedAt?: boolean
    confirmedBy?: boolean
    cancelledAt?: boolean
    cancelledBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["giftRedemption"]>

  export type GiftRedemptionSelectScalar = {
    id?: boolean
    giftId?: boolean
    userId?: boolean
    points?: boolean
    status?: boolean
    redeemedAt?: boolean
    confirmedAt?: boolean
    confirmedBy?: boolean
    cancelledAt?: boolean
    cancelledBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GiftRedemptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "giftId" | "userId" | "points" | "status" | "redeemedAt" | "confirmedAt" | "confirmedBy" | "cancelledAt" | "cancelledBy" | "createdAt" | "updatedAt", ExtArgs["result"]["giftRedemption"]>
  export type GiftRedemptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GiftRedemptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GiftRedemptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    gift?: boolean | GiftDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GiftRedemptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GiftRedemption"
    objects: {
      gift: Prisma.$GiftPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      giftId: string
      userId: string
      points: number
      status: $Enums.RedemptionStatus
      redeemedAt: Date
      confirmedAt: Date | null
      confirmedBy: string | null
      cancelledAt: Date | null
      cancelledBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["giftRedemption"]>
    composites: {}
  }

  type GiftRedemptionGetPayload<S extends boolean | null | undefined | GiftRedemptionDefaultArgs> = $Result.GetResult<Prisma.$GiftRedemptionPayload, S>

  type GiftRedemptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GiftRedemptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GiftRedemptionCountAggregateInputType | true
    }

  export interface GiftRedemptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GiftRedemption'], meta: { name: 'GiftRedemption' } }
    /**
     * Find zero or one GiftRedemption that matches the filter.
     * @param {GiftRedemptionFindUniqueArgs} args - Arguments to find a GiftRedemption
     * @example
     * // Get one GiftRedemption
     * const giftRedemption = await prisma.giftRedemption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GiftRedemptionFindUniqueArgs>(args: SelectSubset<T, GiftRedemptionFindUniqueArgs<ExtArgs>>): Prisma__GiftRedemptionClient<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GiftRedemption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GiftRedemptionFindUniqueOrThrowArgs} args - Arguments to find a GiftRedemption
     * @example
     * // Get one GiftRedemption
     * const giftRedemption = await prisma.giftRedemption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GiftRedemptionFindUniqueOrThrowArgs>(args: SelectSubset<T, GiftRedemptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GiftRedemptionClient<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GiftRedemption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftRedemptionFindFirstArgs} args - Arguments to find a GiftRedemption
     * @example
     * // Get one GiftRedemption
     * const giftRedemption = await prisma.giftRedemption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GiftRedemptionFindFirstArgs>(args?: SelectSubset<T, GiftRedemptionFindFirstArgs<ExtArgs>>): Prisma__GiftRedemptionClient<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GiftRedemption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftRedemptionFindFirstOrThrowArgs} args - Arguments to find a GiftRedemption
     * @example
     * // Get one GiftRedemption
     * const giftRedemption = await prisma.giftRedemption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GiftRedemptionFindFirstOrThrowArgs>(args?: SelectSubset<T, GiftRedemptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__GiftRedemptionClient<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GiftRedemptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftRedemptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GiftRedemptions
     * const giftRedemptions = await prisma.giftRedemption.findMany()
     * 
     * // Get first 10 GiftRedemptions
     * const giftRedemptions = await prisma.giftRedemption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const giftRedemptionWithIdOnly = await prisma.giftRedemption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GiftRedemptionFindManyArgs>(args?: SelectSubset<T, GiftRedemptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GiftRedemption.
     * @param {GiftRedemptionCreateArgs} args - Arguments to create a GiftRedemption.
     * @example
     * // Create one GiftRedemption
     * const GiftRedemption = await prisma.giftRedemption.create({
     *   data: {
     *     // ... data to create a GiftRedemption
     *   }
     * })
     * 
     */
    create<T extends GiftRedemptionCreateArgs>(args: SelectSubset<T, GiftRedemptionCreateArgs<ExtArgs>>): Prisma__GiftRedemptionClient<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GiftRedemptions.
     * @param {GiftRedemptionCreateManyArgs} args - Arguments to create many GiftRedemptions.
     * @example
     * // Create many GiftRedemptions
     * const giftRedemption = await prisma.giftRedemption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GiftRedemptionCreateManyArgs>(args?: SelectSubset<T, GiftRedemptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GiftRedemptions and returns the data saved in the database.
     * @param {GiftRedemptionCreateManyAndReturnArgs} args - Arguments to create many GiftRedemptions.
     * @example
     * // Create many GiftRedemptions
     * const giftRedemption = await prisma.giftRedemption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GiftRedemptions and only return the `id`
     * const giftRedemptionWithIdOnly = await prisma.giftRedemption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GiftRedemptionCreateManyAndReturnArgs>(args?: SelectSubset<T, GiftRedemptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GiftRedemption.
     * @param {GiftRedemptionDeleteArgs} args - Arguments to delete one GiftRedemption.
     * @example
     * // Delete one GiftRedemption
     * const GiftRedemption = await prisma.giftRedemption.delete({
     *   where: {
     *     // ... filter to delete one GiftRedemption
     *   }
     * })
     * 
     */
    delete<T extends GiftRedemptionDeleteArgs>(args: SelectSubset<T, GiftRedemptionDeleteArgs<ExtArgs>>): Prisma__GiftRedemptionClient<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GiftRedemption.
     * @param {GiftRedemptionUpdateArgs} args - Arguments to update one GiftRedemption.
     * @example
     * // Update one GiftRedemption
     * const giftRedemption = await prisma.giftRedemption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GiftRedemptionUpdateArgs>(args: SelectSubset<T, GiftRedemptionUpdateArgs<ExtArgs>>): Prisma__GiftRedemptionClient<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GiftRedemptions.
     * @param {GiftRedemptionDeleteManyArgs} args - Arguments to filter GiftRedemptions to delete.
     * @example
     * // Delete a few GiftRedemptions
     * const { count } = await prisma.giftRedemption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GiftRedemptionDeleteManyArgs>(args?: SelectSubset<T, GiftRedemptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GiftRedemptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftRedemptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GiftRedemptions
     * const giftRedemption = await prisma.giftRedemption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GiftRedemptionUpdateManyArgs>(args: SelectSubset<T, GiftRedemptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GiftRedemptions and returns the data updated in the database.
     * @param {GiftRedemptionUpdateManyAndReturnArgs} args - Arguments to update many GiftRedemptions.
     * @example
     * // Update many GiftRedemptions
     * const giftRedemption = await prisma.giftRedemption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GiftRedemptions and only return the `id`
     * const giftRedemptionWithIdOnly = await prisma.giftRedemption.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GiftRedemptionUpdateManyAndReturnArgs>(args: SelectSubset<T, GiftRedemptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GiftRedemption.
     * @param {GiftRedemptionUpsertArgs} args - Arguments to update or create a GiftRedemption.
     * @example
     * // Update or create a GiftRedemption
     * const giftRedemption = await prisma.giftRedemption.upsert({
     *   create: {
     *     // ... data to create a GiftRedemption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GiftRedemption we want to update
     *   }
     * })
     */
    upsert<T extends GiftRedemptionUpsertArgs>(args: SelectSubset<T, GiftRedemptionUpsertArgs<ExtArgs>>): Prisma__GiftRedemptionClient<$Result.GetResult<Prisma.$GiftRedemptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GiftRedemptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftRedemptionCountArgs} args - Arguments to filter GiftRedemptions to count.
     * @example
     * // Count the number of GiftRedemptions
     * const count = await prisma.giftRedemption.count({
     *   where: {
     *     // ... the filter for the GiftRedemptions we want to count
     *   }
     * })
    **/
    count<T extends GiftRedemptionCountArgs>(
      args?: Subset<T, GiftRedemptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GiftRedemptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GiftRedemption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftRedemptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GiftRedemptionAggregateArgs>(args: Subset<T, GiftRedemptionAggregateArgs>): Prisma.PrismaPromise<GetGiftRedemptionAggregateType<T>>

    /**
     * Group by GiftRedemption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiftRedemptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GiftRedemptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GiftRedemptionGroupByArgs['orderBy'] }
        : { orderBy?: GiftRedemptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GiftRedemptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGiftRedemptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GiftRedemption model
   */
  readonly fields: GiftRedemptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GiftRedemption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GiftRedemptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    gift<T extends GiftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GiftDefaultArgs<ExtArgs>>): Prisma__GiftClient<$Result.GetResult<Prisma.$GiftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GiftRedemption model
   */
  interface GiftRedemptionFieldRefs {
    readonly id: FieldRef<"GiftRedemption", 'String'>
    readonly giftId: FieldRef<"GiftRedemption", 'String'>
    readonly userId: FieldRef<"GiftRedemption", 'String'>
    readonly points: FieldRef<"GiftRedemption", 'Int'>
    readonly status: FieldRef<"GiftRedemption", 'RedemptionStatus'>
    readonly redeemedAt: FieldRef<"GiftRedemption", 'DateTime'>
    readonly confirmedAt: FieldRef<"GiftRedemption", 'DateTime'>
    readonly confirmedBy: FieldRef<"GiftRedemption", 'String'>
    readonly cancelledAt: FieldRef<"GiftRedemption", 'DateTime'>
    readonly cancelledBy: FieldRef<"GiftRedemption", 'String'>
    readonly createdAt: FieldRef<"GiftRedemption", 'DateTime'>
    readonly updatedAt: FieldRef<"GiftRedemption", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GiftRedemption findUnique
   */
  export type GiftRedemptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which GiftRedemption to fetch.
     */
    where: GiftRedemptionWhereUniqueInput
  }

  /**
   * GiftRedemption findUniqueOrThrow
   */
  export type GiftRedemptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which GiftRedemption to fetch.
     */
    where: GiftRedemptionWhereUniqueInput
  }

  /**
   * GiftRedemption findFirst
   */
  export type GiftRedemptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which GiftRedemption to fetch.
     */
    where?: GiftRedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GiftRedemptions to fetch.
     */
    orderBy?: GiftRedemptionOrderByWithRelationInput | GiftRedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GiftRedemptions.
     */
    cursor?: GiftRedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GiftRedemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GiftRedemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GiftRedemptions.
     */
    distinct?: GiftRedemptionScalarFieldEnum | GiftRedemptionScalarFieldEnum[]
  }

  /**
   * GiftRedemption findFirstOrThrow
   */
  export type GiftRedemptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which GiftRedemption to fetch.
     */
    where?: GiftRedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GiftRedemptions to fetch.
     */
    orderBy?: GiftRedemptionOrderByWithRelationInput | GiftRedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GiftRedemptions.
     */
    cursor?: GiftRedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GiftRedemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GiftRedemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GiftRedemptions.
     */
    distinct?: GiftRedemptionScalarFieldEnum | GiftRedemptionScalarFieldEnum[]
  }

  /**
   * GiftRedemption findMany
   */
  export type GiftRedemptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * Filter, which GiftRedemptions to fetch.
     */
    where?: GiftRedemptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GiftRedemptions to fetch.
     */
    orderBy?: GiftRedemptionOrderByWithRelationInput | GiftRedemptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GiftRedemptions.
     */
    cursor?: GiftRedemptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GiftRedemptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GiftRedemptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GiftRedemptions.
     */
    distinct?: GiftRedemptionScalarFieldEnum | GiftRedemptionScalarFieldEnum[]
  }

  /**
   * GiftRedemption create
   */
  export type GiftRedemptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * The data needed to create a GiftRedemption.
     */
    data: XOR<GiftRedemptionCreateInput, GiftRedemptionUncheckedCreateInput>
  }

  /**
   * GiftRedemption createMany
   */
  export type GiftRedemptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GiftRedemptions.
     */
    data: GiftRedemptionCreateManyInput | GiftRedemptionCreateManyInput[]
  }

  /**
   * GiftRedemption createManyAndReturn
   */
  export type GiftRedemptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * The data used to create many GiftRedemptions.
     */
    data: GiftRedemptionCreateManyInput | GiftRedemptionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GiftRedemption update
   */
  export type GiftRedemptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * The data needed to update a GiftRedemption.
     */
    data: XOR<GiftRedemptionUpdateInput, GiftRedemptionUncheckedUpdateInput>
    /**
     * Choose, which GiftRedemption to update.
     */
    where: GiftRedemptionWhereUniqueInput
  }

  /**
   * GiftRedemption updateMany
   */
  export type GiftRedemptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GiftRedemptions.
     */
    data: XOR<GiftRedemptionUpdateManyMutationInput, GiftRedemptionUncheckedUpdateManyInput>
    /**
     * Filter which GiftRedemptions to update
     */
    where?: GiftRedemptionWhereInput
    /**
     * Limit how many GiftRedemptions to update.
     */
    limit?: number
  }

  /**
   * GiftRedemption updateManyAndReturn
   */
  export type GiftRedemptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * The data used to update GiftRedemptions.
     */
    data: XOR<GiftRedemptionUpdateManyMutationInput, GiftRedemptionUncheckedUpdateManyInput>
    /**
     * Filter which GiftRedemptions to update
     */
    where?: GiftRedemptionWhereInput
    /**
     * Limit how many GiftRedemptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GiftRedemption upsert
   */
  export type GiftRedemptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * The filter to search for the GiftRedemption to update in case it exists.
     */
    where: GiftRedemptionWhereUniqueInput
    /**
     * In case the GiftRedemption found by the `where` argument doesn't exist, create a new GiftRedemption with this data.
     */
    create: XOR<GiftRedemptionCreateInput, GiftRedemptionUncheckedCreateInput>
    /**
     * In case the GiftRedemption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GiftRedemptionUpdateInput, GiftRedemptionUncheckedUpdateInput>
  }

  /**
   * GiftRedemption delete
   */
  export type GiftRedemptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
    /**
     * Filter which GiftRedemption to delete.
     */
    where: GiftRedemptionWhereUniqueInput
  }

  /**
   * GiftRedemption deleteMany
   */
  export type GiftRedemptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GiftRedemptions to delete
     */
    where?: GiftRedemptionWhereInput
    /**
     * Limit how many GiftRedemptions to delete.
     */
    limit?: number
  }

  /**
   * GiftRedemption without action
   */
  export type GiftRedemptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GiftRedemption
     */
    select?: GiftRedemptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GiftRedemption
     */
    omit?: GiftRedemptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GiftRedemptionInclude<ExtArgs> | null
  }


  /**
   * Model ExchangeDay
   */

  export type AggregateExchangeDay = {
    _count: ExchangeDayCountAggregateOutputType | null
    _avg: ExchangeDayAvgAggregateOutputType | null
    _sum: ExchangeDaySumAggregateOutputType | null
    _min: ExchangeDayMinAggregateOutputType | null
    _max: ExchangeDayMaxAggregateOutputType | null
  }

  export type ExchangeDayAvgAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type ExchangeDaySumAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type ExchangeDayMinAggregateOutputType = {
    id: string | null
    familyId: string | null
    dayOfWeek: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExchangeDayMaxAggregateOutputType = {
    id: string | null
    familyId: string | null
    dayOfWeek: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExchangeDayCountAggregateOutputType = {
    id: number
    familyId: number
    dayOfWeek: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExchangeDayAvgAggregateInputType = {
    dayOfWeek?: true
  }

  export type ExchangeDaySumAggregateInputType = {
    dayOfWeek?: true
  }

  export type ExchangeDayMinAggregateInputType = {
    id?: true
    familyId?: true
    dayOfWeek?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExchangeDayMaxAggregateInputType = {
    id?: true
    familyId?: true
    dayOfWeek?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExchangeDayCountAggregateInputType = {
    id?: true
    familyId?: true
    dayOfWeek?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExchangeDayAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeDay to aggregate.
     */
    where?: ExchangeDayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeDays to fetch.
     */
    orderBy?: ExchangeDayOrderByWithRelationInput | ExchangeDayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExchangeDayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeDays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeDays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExchangeDays
    **/
    _count?: true | ExchangeDayCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExchangeDayAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExchangeDaySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExchangeDayMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExchangeDayMaxAggregateInputType
  }

  export type GetExchangeDayAggregateType<T extends ExchangeDayAggregateArgs> = {
        [P in keyof T & keyof AggregateExchangeDay]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchangeDay[P]>
      : GetScalarType<T[P], AggregateExchangeDay[P]>
  }




  export type ExchangeDayGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeDayWhereInput
    orderBy?: ExchangeDayOrderByWithAggregationInput | ExchangeDayOrderByWithAggregationInput[]
    by: ExchangeDayScalarFieldEnum[] | ExchangeDayScalarFieldEnum
    having?: ExchangeDayScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExchangeDayCountAggregateInputType | true
    _avg?: ExchangeDayAvgAggregateInputType
    _sum?: ExchangeDaySumAggregateInputType
    _min?: ExchangeDayMinAggregateInputType
    _max?: ExchangeDayMaxAggregateInputType
  }

  export type ExchangeDayGroupByOutputType = {
    id: string
    familyId: string
    dayOfWeek: number
    createdAt: Date
    updatedAt: Date
    _count: ExchangeDayCountAggregateOutputType | null
    _avg: ExchangeDayAvgAggregateOutputType | null
    _sum: ExchangeDaySumAggregateOutputType | null
    _min: ExchangeDayMinAggregateOutputType | null
    _max: ExchangeDayMaxAggregateOutputType | null
  }

  type GetExchangeDayGroupByPayload<T extends ExchangeDayGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExchangeDayGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExchangeDayGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExchangeDayGroupByOutputType[P]>
            : GetScalarType<T[P], ExchangeDayGroupByOutputType[P]>
        }
      >
    >


  export type ExchangeDaySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    familyId?: boolean
    dayOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeDay"]>

  export type ExchangeDaySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    familyId?: boolean
    dayOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeDay"]>

  export type ExchangeDaySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    familyId?: boolean
    dayOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeDay"]>

  export type ExchangeDaySelectScalar = {
    id?: boolean
    familyId?: boolean
    dayOfWeek?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExchangeDayOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "familyId" | "dayOfWeek" | "createdAt" | "updatedAt", ExtArgs["result"]["exchangeDay"]>
  export type ExchangeDayInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type ExchangeDayIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type ExchangeDayIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $ExchangeDayPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExchangeDay"
    objects: {
      family: Prisma.$FamilyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      familyId: string
      dayOfWeek: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exchangeDay"]>
    composites: {}
  }

  type ExchangeDayGetPayload<S extends boolean | null | undefined | ExchangeDayDefaultArgs> = $Result.GetResult<Prisma.$ExchangeDayPayload, S>

  type ExchangeDayCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExchangeDayFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExchangeDayCountAggregateInputType | true
    }

  export interface ExchangeDayDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExchangeDay'], meta: { name: 'ExchangeDay' } }
    /**
     * Find zero or one ExchangeDay that matches the filter.
     * @param {ExchangeDayFindUniqueArgs} args - Arguments to find a ExchangeDay
     * @example
     * // Get one ExchangeDay
     * const exchangeDay = await prisma.exchangeDay.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExchangeDayFindUniqueArgs>(args: SelectSubset<T, ExchangeDayFindUniqueArgs<ExtArgs>>): Prisma__ExchangeDayClient<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExchangeDay that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExchangeDayFindUniqueOrThrowArgs} args - Arguments to find a ExchangeDay
     * @example
     * // Get one ExchangeDay
     * const exchangeDay = await prisma.exchangeDay.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExchangeDayFindUniqueOrThrowArgs>(args: SelectSubset<T, ExchangeDayFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExchangeDayClient<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExchangeDay that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeDayFindFirstArgs} args - Arguments to find a ExchangeDay
     * @example
     * // Get one ExchangeDay
     * const exchangeDay = await prisma.exchangeDay.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExchangeDayFindFirstArgs>(args?: SelectSubset<T, ExchangeDayFindFirstArgs<ExtArgs>>): Prisma__ExchangeDayClient<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExchangeDay that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeDayFindFirstOrThrowArgs} args - Arguments to find a ExchangeDay
     * @example
     * // Get one ExchangeDay
     * const exchangeDay = await prisma.exchangeDay.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExchangeDayFindFirstOrThrowArgs>(args?: SelectSubset<T, ExchangeDayFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExchangeDayClient<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExchangeDays that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeDayFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExchangeDays
     * const exchangeDays = await prisma.exchangeDay.findMany()
     * 
     * // Get first 10 ExchangeDays
     * const exchangeDays = await prisma.exchangeDay.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exchangeDayWithIdOnly = await prisma.exchangeDay.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExchangeDayFindManyArgs>(args?: SelectSubset<T, ExchangeDayFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExchangeDay.
     * @param {ExchangeDayCreateArgs} args - Arguments to create a ExchangeDay.
     * @example
     * // Create one ExchangeDay
     * const ExchangeDay = await prisma.exchangeDay.create({
     *   data: {
     *     // ... data to create a ExchangeDay
     *   }
     * })
     * 
     */
    create<T extends ExchangeDayCreateArgs>(args: SelectSubset<T, ExchangeDayCreateArgs<ExtArgs>>): Prisma__ExchangeDayClient<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExchangeDays.
     * @param {ExchangeDayCreateManyArgs} args - Arguments to create many ExchangeDays.
     * @example
     * // Create many ExchangeDays
     * const exchangeDay = await prisma.exchangeDay.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExchangeDayCreateManyArgs>(args?: SelectSubset<T, ExchangeDayCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExchangeDays and returns the data saved in the database.
     * @param {ExchangeDayCreateManyAndReturnArgs} args - Arguments to create many ExchangeDays.
     * @example
     * // Create many ExchangeDays
     * const exchangeDay = await prisma.exchangeDay.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExchangeDays and only return the `id`
     * const exchangeDayWithIdOnly = await prisma.exchangeDay.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExchangeDayCreateManyAndReturnArgs>(args?: SelectSubset<T, ExchangeDayCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExchangeDay.
     * @param {ExchangeDayDeleteArgs} args - Arguments to delete one ExchangeDay.
     * @example
     * // Delete one ExchangeDay
     * const ExchangeDay = await prisma.exchangeDay.delete({
     *   where: {
     *     // ... filter to delete one ExchangeDay
     *   }
     * })
     * 
     */
    delete<T extends ExchangeDayDeleteArgs>(args: SelectSubset<T, ExchangeDayDeleteArgs<ExtArgs>>): Prisma__ExchangeDayClient<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExchangeDay.
     * @param {ExchangeDayUpdateArgs} args - Arguments to update one ExchangeDay.
     * @example
     * // Update one ExchangeDay
     * const exchangeDay = await prisma.exchangeDay.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExchangeDayUpdateArgs>(args: SelectSubset<T, ExchangeDayUpdateArgs<ExtArgs>>): Prisma__ExchangeDayClient<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExchangeDays.
     * @param {ExchangeDayDeleteManyArgs} args - Arguments to filter ExchangeDays to delete.
     * @example
     * // Delete a few ExchangeDays
     * const { count } = await prisma.exchangeDay.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExchangeDayDeleteManyArgs>(args?: SelectSubset<T, ExchangeDayDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeDays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeDayUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExchangeDays
     * const exchangeDay = await prisma.exchangeDay.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExchangeDayUpdateManyArgs>(args: SelectSubset<T, ExchangeDayUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeDays and returns the data updated in the database.
     * @param {ExchangeDayUpdateManyAndReturnArgs} args - Arguments to update many ExchangeDays.
     * @example
     * // Update many ExchangeDays
     * const exchangeDay = await prisma.exchangeDay.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExchangeDays and only return the `id`
     * const exchangeDayWithIdOnly = await prisma.exchangeDay.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExchangeDayUpdateManyAndReturnArgs>(args: SelectSubset<T, ExchangeDayUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExchangeDay.
     * @param {ExchangeDayUpsertArgs} args - Arguments to update or create a ExchangeDay.
     * @example
     * // Update or create a ExchangeDay
     * const exchangeDay = await prisma.exchangeDay.upsert({
     *   create: {
     *     // ... data to create a ExchangeDay
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExchangeDay we want to update
     *   }
     * })
     */
    upsert<T extends ExchangeDayUpsertArgs>(args: SelectSubset<T, ExchangeDayUpsertArgs<ExtArgs>>): Prisma__ExchangeDayClient<$Result.GetResult<Prisma.$ExchangeDayPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExchangeDays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeDayCountArgs} args - Arguments to filter ExchangeDays to count.
     * @example
     * // Count the number of ExchangeDays
     * const count = await prisma.exchangeDay.count({
     *   where: {
     *     // ... the filter for the ExchangeDays we want to count
     *   }
     * })
    **/
    count<T extends ExchangeDayCountArgs>(
      args?: Subset<T, ExchangeDayCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExchangeDayCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExchangeDay.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeDayAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExchangeDayAggregateArgs>(args: Subset<T, ExchangeDayAggregateArgs>): Prisma.PrismaPromise<GetExchangeDayAggregateType<T>>

    /**
     * Group by ExchangeDay.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeDayGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExchangeDayGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExchangeDayGroupByArgs['orderBy'] }
        : { orderBy?: ExchangeDayGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExchangeDayGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangeDayGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExchangeDay model
   */
  readonly fields: ExchangeDayFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExchangeDay.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExchangeDayClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExchangeDay model
   */
  interface ExchangeDayFieldRefs {
    readonly id: FieldRef<"ExchangeDay", 'String'>
    readonly familyId: FieldRef<"ExchangeDay", 'String'>
    readonly dayOfWeek: FieldRef<"ExchangeDay", 'Int'>
    readonly createdAt: FieldRef<"ExchangeDay", 'DateTime'>
    readonly updatedAt: FieldRef<"ExchangeDay", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExchangeDay findUnique
   */
  export type ExchangeDayFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeDay to fetch.
     */
    where: ExchangeDayWhereUniqueInput
  }

  /**
   * ExchangeDay findUniqueOrThrow
   */
  export type ExchangeDayFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeDay to fetch.
     */
    where: ExchangeDayWhereUniqueInput
  }

  /**
   * ExchangeDay findFirst
   */
  export type ExchangeDayFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeDay to fetch.
     */
    where?: ExchangeDayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeDays to fetch.
     */
    orderBy?: ExchangeDayOrderByWithRelationInput | ExchangeDayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeDays.
     */
    cursor?: ExchangeDayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeDays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeDays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeDays.
     */
    distinct?: ExchangeDayScalarFieldEnum | ExchangeDayScalarFieldEnum[]
  }

  /**
   * ExchangeDay findFirstOrThrow
   */
  export type ExchangeDayFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeDay to fetch.
     */
    where?: ExchangeDayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeDays to fetch.
     */
    orderBy?: ExchangeDayOrderByWithRelationInput | ExchangeDayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeDays.
     */
    cursor?: ExchangeDayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeDays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeDays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeDays.
     */
    distinct?: ExchangeDayScalarFieldEnum | ExchangeDayScalarFieldEnum[]
  }

  /**
   * ExchangeDay findMany
   */
  export type ExchangeDayFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeDays to fetch.
     */
    where?: ExchangeDayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeDays to fetch.
     */
    orderBy?: ExchangeDayOrderByWithRelationInput | ExchangeDayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExchangeDays.
     */
    cursor?: ExchangeDayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeDays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeDays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeDays.
     */
    distinct?: ExchangeDayScalarFieldEnum | ExchangeDayScalarFieldEnum[]
  }

  /**
   * ExchangeDay create
   */
  export type ExchangeDayCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * The data needed to create a ExchangeDay.
     */
    data: XOR<ExchangeDayCreateInput, ExchangeDayUncheckedCreateInput>
  }

  /**
   * ExchangeDay createMany
   */
  export type ExchangeDayCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExchangeDays.
     */
    data: ExchangeDayCreateManyInput | ExchangeDayCreateManyInput[]
  }

  /**
   * ExchangeDay createManyAndReturn
   */
  export type ExchangeDayCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * The data used to create many ExchangeDays.
     */
    data: ExchangeDayCreateManyInput | ExchangeDayCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExchangeDay update
   */
  export type ExchangeDayUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * The data needed to update a ExchangeDay.
     */
    data: XOR<ExchangeDayUpdateInput, ExchangeDayUncheckedUpdateInput>
    /**
     * Choose, which ExchangeDay to update.
     */
    where: ExchangeDayWhereUniqueInput
  }

  /**
   * ExchangeDay updateMany
   */
  export type ExchangeDayUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExchangeDays.
     */
    data: XOR<ExchangeDayUpdateManyMutationInput, ExchangeDayUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeDays to update
     */
    where?: ExchangeDayWhereInput
    /**
     * Limit how many ExchangeDays to update.
     */
    limit?: number
  }

  /**
   * ExchangeDay updateManyAndReturn
   */
  export type ExchangeDayUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * The data used to update ExchangeDays.
     */
    data: XOR<ExchangeDayUpdateManyMutationInput, ExchangeDayUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeDays to update
     */
    where?: ExchangeDayWhereInput
    /**
     * Limit how many ExchangeDays to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExchangeDay upsert
   */
  export type ExchangeDayUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * The filter to search for the ExchangeDay to update in case it exists.
     */
    where: ExchangeDayWhereUniqueInput
    /**
     * In case the ExchangeDay found by the `where` argument doesn't exist, create a new ExchangeDay with this data.
     */
    create: XOR<ExchangeDayCreateInput, ExchangeDayUncheckedCreateInput>
    /**
     * In case the ExchangeDay was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExchangeDayUpdateInput, ExchangeDayUncheckedUpdateInput>
  }

  /**
   * ExchangeDay delete
   */
  export type ExchangeDayDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
    /**
     * Filter which ExchangeDay to delete.
     */
    where: ExchangeDayWhereUniqueInput
  }

  /**
   * ExchangeDay deleteMany
   */
  export type ExchangeDayDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeDays to delete
     */
    where?: ExchangeDayWhereInput
    /**
     * Limit how many ExchangeDays to delete.
     */
    limit?: number
  }

  /**
   * ExchangeDay without action
   */
  export type ExchangeDayDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeDay
     */
    select?: ExchangeDaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeDay
     */
    omit?: ExchangeDayOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeDayInclude<ExtArgs> | null
  }


  /**
   * Model Reward
   */

  export type AggregateReward = {
    _count: RewardCountAggregateOutputType | null
    _avg: RewardAvgAggregateOutputType | null
    _sum: RewardSumAggregateOutputType | null
    _min: RewardMinAggregateOutputType | null
    _max: RewardMaxAggregateOutputType | null
  }

  export type RewardAvgAggregateOutputType = {
    points: number | null
  }

  export type RewardSumAggregateOutputType = {
    points: number | null
  }

  export type RewardMinAggregateOutputType = {
    id: string | null
    userId: string | null
    familyId: string | null
    points: number | null
    reason: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RewardMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    familyId: string | null
    points: number | null
    reason: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RewardCountAggregateOutputType = {
    id: number
    userId: number
    familyId: number
    points: number
    reason: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RewardAvgAggregateInputType = {
    points?: true
  }

  export type RewardSumAggregateInputType = {
    points?: true
  }

  export type RewardMinAggregateInputType = {
    id?: true
    userId?: true
    familyId?: true
    points?: true
    reason?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RewardMaxAggregateInputType = {
    id?: true
    userId?: true
    familyId?: true
    points?: true
    reason?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RewardCountAggregateInputType = {
    id?: true
    userId?: true
    familyId?: true
    points?: true
    reason?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RewardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reward to aggregate.
     */
    where?: RewardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rewards to fetch.
     */
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RewardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rewards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rewards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rewards
    **/
    _count?: true | RewardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RewardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RewardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RewardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RewardMaxAggregateInputType
  }

  export type GetRewardAggregateType<T extends RewardAggregateArgs> = {
        [P in keyof T & keyof AggregateReward]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReward[P]>
      : GetScalarType<T[P], AggregateReward[P]>
  }




  export type RewardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardWhereInput
    orderBy?: RewardOrderByWithAggregationInput | RewardOrderByWithAggregationInput[]
    by: RewardScalarFieldEnum[] | RewardScalarFieldEnum
    having?: RewardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RewardCountAggregateInputType | true
    _avg?: RewardAvgAggregateInputType
    _sum?: RewardSumAggregateInputType
    _min?: RewardMinAggregateInputType
    _max?: RewardMaxAggregateInputType
  }

  export type RewardGroupByOutputType = {
    id: string
    userId: string
    familyId: string
    points: number
    reason: string
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: RewardCountAggregateOutputType | null
    _avg: RewardAvgAggregateOutputType | null
    _sum: RewardSumAggregateOutputType | null
    _min: RewardMinAggregateOutputType | null
    _max: RewardMaxAggregateOutputType | null
  }

  type GetRewardGroupByPayload<T extends RewardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RewardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RewardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RewardGroupByOutputType[P]>
            : GetScalarType<T[P], RewardGroupByOutputType[P]>
        }
      >
    >


  export type RewardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    familyId?: boolean
    points?: boolean
    reason?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reward"]>

  export type RewardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    familyId?: boolean
    points?: boolean
    reason?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reward"]>

  export type RewardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    familyId?: boolean
    points?: boolean
    reason?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reward"]>

  export type RewardSelectScalar = {
    id?: boolean
    userId?: boolean
    familyId?: boolean
    points?: boolean
    reason?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RewardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "familyId" | "points" | "reason" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["reward"]>
  export type RewardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type RewardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }
  export type RewardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $RewardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reward"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      family: Prisma.$FamilyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      familyId: string
      points: number
      reason: string
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reward"]>
    composites: {}
  }

  type RewardGetPayload<S extends boolean | null | undefined | RewardDefaultArgs> = $Result.GetResult<Prisma.$RewardPayload, S>

  type RewardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RewardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RewardCountAggregateInputType | true
    }

  export interface RewardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reward'], meta: { name: 'Reward' } }
    /**
     * Find zero or one Reward that matches the filter.
     * @param {RewardFindUniqueArgs} args - Arguments to find a Reward
     * @example
     * // Get one Reward
     * const reward = await prisma.reward.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RewardFindUniqueArgs>(args: SelectSubset<T, RewardFindUniqueArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reward that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RewardFindUniqueOrThrowArgs} args - Arguments to find a Reward
     * @example
     * // Get one Reward
     * const reward = await prisma.reward.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RewardFindUniqueOrThrowArgs>(args: SelectSubset<T, RewardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reward that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardFindFirstArgs} args - Arguments to find a Reward
     * @example
     * // Get one Reward
     * const reward = await prisma.reward.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RewardFindFirstArgs>(args?: SelectSubset<T, RewardFindFirstArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reward that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardFindFirstOrThrowArgs} args - Arguments to find a Reward
     * @example
     * // Get one Reward
     * const reward = await prisma.reward.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RewardFindFirstOrThrowArgs>(args?: SelectSubset<T, RewardFindFirstOrThrowArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rewards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rewards
     * const rewards = await prisma.reward.findMany()
     * 
     * // Get first 10 Rewards
     * const rewards = await prisma.reward.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rewardWithIdOnly = await prisma.reward.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RewardFindManyArgs>(args?: SelectSubset<T, RewardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reward.
     * @param {RewardCreateArgs} args - Arguments to create a Reward.
     * @example
     * // Create one Reward
     * const Reward = await prisma.reward.create({
     *   data: {
     *     // ... data to create a Reward
     *   }
     * })
     * 
     */
    create<T extends RewardCreateArgs>(args: SelectSubset<T, RewardCreateArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rewards.
     * @param {RewardCreateManyArgs} args - Arguments to create many Rewards.
     * @example
     * // Create many Rewards
     * const reward = await prisma.reward.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RewardCreateManyArgs>(args?: SelectSubset<T, RewardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rewards and returns the data saved in the database.
     * @param {RewardCreateManyAndReturnArgs} args - Arguments to create many Rewards.
     * @example
     * // Create many Rewards
     * const reward = await prisma.reward.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rewards and only return the `id`
     * const rewardWithIdOnly = await prisma.reward.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RewardCreateManyAndReturnArgs>(args?: SelectSubset<T, RewardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reward.
     * @param {RewardDeleteArgs} args - Arguments to delete one Reward.
     * @example
     * // Delete one Reward
     * const Reward = await prisma.reward.delete({
     *   where: {
     *     // ... filter to delete one Reward
     *   }
     * })
     * 
     */
    delete<T extends RewardDeleteArgs>(args: SelectSubset<T, RewardDeleteArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reward.
     * @param {RewardUpdateArgs} args - Arguments to update one Reward.
     * @example
     * // Update one Reward
     * const reward = await prisma.reward.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RewardUpdateArgs>(args: SelectSubset<T, RewardUpdateArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rewards.
     * @param {RewardDeleteManyArgs} args - Arguments to filter Rewards to delete.
     * @example
     * // Delete a few Rewards
     * const { count } = await prisma.reward.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RewardDeleteManyArgs>(args?: SelectSubset<T, RewardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rewards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rewards
     * const reward = await prisma.reward.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RewardUpdateManyArgs>(args: SelectSubset<T, RewardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rewards and returns the data updated in the database.
     * @param {RewardUpdateManyAndReturnArgs} args - Arguments to update many Rewards.
     * @example
     * // Update many Rewards
     * const reward = await prisma.reward.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rewards and only return the `id`
     * const rewardWithIdOnly = await prisma.reward.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RewardUpdateManyAndReturnArgs>(args: SelectSubset<T, RewardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reward.
     * @param {RewardUpsertArgs} args - Arguments to update or create a Reward.
     * @example
     * // Update or create a Reward
     * const reward = await prisma.reward.upsert({
     *   create: {
     *     // ... data to create a Reward
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reward we want to update
     *   }
     * })
     */
    upsert<T extends RewardUpsertArgs>(args: SelectSubset<T, RewardUpsertArgs<ExtArgs>>): Prisma__RewardClient<$Result.GetResult<Prisma.$RewardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rewards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardCountArgs} args - Arguments to filter Rewards to count.
     * @example
     * // Count the number of Rewards
     * const count = await prisma.reward.count({
     *   where: {
     *     // ... the filter for the Rewards we want to count
     *   }
     * })
    **/
    count<T extends RewardCountArgs>(
      args?: Subset<T, RewardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RewardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reward.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RewardAggregateArgs>(args: Subset<T, RewardAggregateArgs>): Prisma.PrismaPromise<GetRewardAggregateType<T>>

    /**
     * Group by Reward.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RewardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RewardGroupByArgs['orderBy'] }
        : { orderBy?: RewardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RewardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRewardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reward model
   */
  readonly fields: RewardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reward.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RewardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reward model
   */
  interface RewardFieldRefs {
    readonly id: FieldRef<"Reward", 'String'>
    readonly userId: FieldRef<"Reward", 'String'>
    readonly familyId: FieldRef<"Reward", 'String'>
    readonly points: FieldRef<"Reward", 'Int'>
    readonly reason: FieldRef<"Reward", 'String'>
    readonly createdBy: FieldRef<"Reward", 'String'>
    readonly createdAt: FieldRef<"Reward", 'DateTime'>
    readonly updatedAt: FieldRef<"Reward", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reward findUnique
   */
  export type RewardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Reward to fetch.
     */
    where: RewardWhereUniqueInput
  }

  /**
   * Reward findUniqueOrThrow
   */
  export type RewardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Reward to fetch.
     */
    where: RewardWhereUniqueInput
  }

  /**
   * Reward findFirst
   */
  export type RewardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Reward to fetch.
     */
    where?: RewardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rewards to fetch.
     */
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rewards.
     */
    cursor?: RewardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rewards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rewards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rewards.
     */
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * Reward findFirstOrThrow
   */
  export type RewardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Reward to fetch.
     */
    where?: RewardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rewards to fetch.
     */
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rewards.
     */
    cursor?: RewardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rewards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rewards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rewards.
     */
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * Reward findMany
   */
  export type RewardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter, which Rewards to fetch.
     */
    where?: RewardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rewards to fetch.
     */
    orderBy?: RewardOrderByWithRelationInput | RewardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rewards.
     */
    cursor?: RewardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rewards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rewards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rewards.
     */
    distinct?: RewardScalarFieldEnum | RewardScalarFieldEnum[]
  }

  /**
   * Reward create
   */
  export type RewardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * The data needed to create a Reward.
     */
    data: XOR<RewardCreateInput, RewardUncheckedCreateInput>
  }

  /**
   * Reward createMany
   */
  export type RewardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rewards.
     */
    data: RewardCreateManyInput | RewardCreateManyInput[]
  }

  /**
   * Reward createManyAndReturn
   */
  export type RewardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * The data used to create many Rewards.
     */
    data: RewardCreateManyInput | RewardCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reward update
   */
  export type RewardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * The data needed to update a Reward.
     */
    data: XOR<RewardUpdateInput, RewardUncheckedUpdateInput>
    /**
     * Choose, which Reward to update.
     */
    where: RewardWhereUniqueInput
  }

  /**
   * Reward updateMany
   */
  export type RewardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rewards.
     */
    data: XOR<RewardUpdateManyMutationInput, RewardUncheckedUpdateManyInput>
    /**
     * Filter which Rewards to update
     */
    where?: RewardWhereInput
    /**
     * Limit how many Rewards to update.
     */
    limit?: number
  }

  /**
   * Reward updateManyAndReturn
   */
  export type RewardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * The data used to update Rewards.
     */
    data: XOR<RewardUpdateManyMutationInput, RewardUncheckedUpdateManyInput>
    /**
     * Filter which Rewards to update
     */
    where?: RewardWhereInput
    /**
     * Limit how many Rewards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reward upsert
   */
  export type RewardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * The filter to search for the Reward to update in case it exists.
     */
    where: RewardWhereUniqueInput
    /**
     * In case the Reward found by the `where` argument doesn't exist, create a new Reward with this data.
     */
    create: XOR<RewardCreateInput, RewardUncheckedCreateInput>
    /**
     * In case the Reward was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RewardUpdateInput, RewardUncheckedUpdateInput>
  }

  /**
   * Reward delete
   */
  export type RewardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
    /**
     * Filter which Reward to delete.
     */
    where: RewardWhereUniqueInput
  }

  /**
   * Reward deleteMany
   */
  export type RewardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rewards to delete
     */
    where?: RewardWhereInput
    /**
     * Limit how many Rewards to delete.
     */
    limit?: number
  }

  /**
   * Reward without action
   */
  export type RewardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reward
     */
    select?: RewardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reward
     */
    omit?: RewardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role',
    familyId: 'familyId',
    timezoneOffset: 'timezoneOffset',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentPoints: 'currentPoints',
    totalPoints: 'totalPoints'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FamilyScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FamilyScalarFieldEnum = (typeof FamilyScalarFieldEnum)[keyof typeof FamilyScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    familyId: 'familyId',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    name: 'name',
    points: 'points',
    description: 'description',
    categoryId: 'categoryId',
    familyId: 'familyId',
    availableDays: 'availableDays',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const TaskCompletionScalarFieldEnum: {
    id: 'id',
    taskId: 'taskId',
    userId: 'userId',
    points: 'points',
    completedAt: 'completedAt',
    revokedAt: 'revokedAt',
    revokedBy: 'revokedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskCompletionScalarFieldEnum = (typeof TaskCompletionScalarFieldEnum)[keyof typeof TaskCompletionScalarFieldEnum]


  export const GiftScalarFieldEnum: {
    id: 'id',
    name: 'name',
    points: 'points',
    description: 'description',
    color: 'color',
    weeklyLimit: 'weeklyLimit',
    familyId: 'familyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type GiftScalarFieldEnum = (typeof GiftScalarFieldEnum)[keyof typeof GiftScalarFieldEnum]


  export const GiftRedemptionScalarFieldEnum: {
    id: 'id',
    giftId: 'giftId',
    userId: 'userId',
    points: 'points',
    status: 'status',
    redeemedAt: 'redeemedAt',
    confirmedAt: 'confirmedAt',
    confirmedBy: 'confirmedBy',
    cancelledAt: 'cancelledAt',
    cancelledBy: 'cancelledBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GiftRedemptionScalarFieldEnum = (typeof GiftRedemptionScalarFieldEnum)[keyof typeof GiftRedemptionScalarFieldEnum]


  export const ExchangeDayScalarFieldEnum: {
    id: 'id',
    familyId: 'familyId',
    dayOfWeek: 'dayOfWeek',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExchangeDayScalarFieldEnum = (typeof ExchangeDayScalarFieldEnum)[keyof typeof ExchangeDayScalarFieldEnum]


  export const RewardScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    familyId: 'familyId',
    points: 'points',
    reason: 'reason',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RewardScalarFieldEnum = (typeof RewardScalarFieldEnum)[keyof typeof RewardScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'RedemptionStatus'
   */
  export type EnumRedemptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RedemptionStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    familyId?: StringFilter<"User"> | string
    timezoneOffset?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    currentPoints?: IntFilter<"User"> | number
    totalPoints?: IntFilter<"User"> | number
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    taskCompletions?: TaskCompletionListRelationFilter
    giftRedemptions?: GiftRedemptionListRelationFilter
    rewards?: RewardListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    familyId?: SortOrder
    timezoneOffset?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentPoints?: SortOrder
    totalPoints?: SortOrder
    family?: FamilyOrderByWithRelationInput
    taskCompletions?: TaskCompletionOrderByRelationAggregateInput
    giftRedemptions?: GiftRedemptionOrderByRelationAggregateInput
    rewards?: RewardOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    familyId_username?: UserFamilyIdUsernameCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    familyId?: StringFilter<"User"> | string
    timezoneOffset?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    currentPoints?: IntFilter<"User"> | number
    totalPoints?: IntFilter<"User"> | number
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    taskCompletions?: TaskCompletionListRelationFilter
    giftRedemptions?: GiftRedemptionListRelationFilter
    rewards?: RewardListRelationFilter
  }, "id" | "familyId_username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    familyId?: SortOrder
    timezoneOffset?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentPoints?: SortOrder
    totalPoints?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    familyId?: StringWithAggregatesFilter<"User"> | string
    timezoneOffset?: IntNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    currentPoints?: IntWithAggregatesFilter<"User"> | number
    totalPoints?: IntWithAggregatesFilter<"User"> | number
  }

  export type FamilyWhereInput = {
    AND?: FamilyWhereInput | FamilyWhereInput[]
    OR?: FamilyWhereInput[]
    NOT?: FamilyWhereInput | FamilyWhereInput[]
    id?: StringFilter<"Family"> | string
    createdAt?: DateTimeFilter<"Family"> | Date | string
    updatedAt?: DateTimeFilter<"Family"> | Date | string
    members?: UserListRelationFilter
    tasks?: TaskListRelationFilter
    gifts?: GiftListRelationFilter
    categories?: CategoryListRelationFilter
    exchangeDays?: ExchangeDayListRelationFilter
    rewards?: RewardListRelationFilter
  }

  export type FamilyOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    members?: UserOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    gifts?: GiftOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
    exchangeDays?: ExchangeDayOrderByRelationAggregateInput
    rewards?: RewardOrderByRelationAggregateInput
  }

  export type FamilyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FamilyWhereInput | FamilyWhereInput[]
    OR?: FamilyWhereInput[]
    NOT?: FamilyWhereInput | FamilyWhereInput[]
    createdAt?: DateTimeFilter<"Family"> | Date | string
    updatedAt?: DateTimeFilter<"Family"> | Date | string
    members?: UserListRelationFilter
    tasks?: TaskListRelationFilter
    gifts?: GiftListRelationFilter
    categories?: CategoryListRelationFilter
    exchangeDays?: ExchangeDayListRelationFilter
    rewards?: RewardListRelationFilter
  }, "id">

  export type FamilyOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FamilyCountOrderByAggregateInput
    _max?: FamilyMaxOrderByAggregateInput
    _min?: FamilyMinOrderByAggregateInput
  }

  export type FamilyScalarWhereWithAggregatesInput = {
    AND?: FamilyScalarWhereWithAggregatesInput | FamilyScalarWhereWithAggregatesInput[]
    OR?: FamilyScalarWhereWithAggregatesInput[]
    NOT?: FamilyScalarWhereWithAggregatesInput | FamilyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Family"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Family"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Family"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    familyId?: StringFilter<"Category"> | string
    order?: IntFilter<"Category"> | number
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    tasks?: TaskListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    familyId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    family?: FamilyOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    familyId_name?: CategoryFamilyIdNameCompoundUniqueInput
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    familyId?: StringFilter<"Category"> | string
    order?: IntFilter<"Category"> | number
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    tasks?: TaskListRelationFilter
  }, "id" | "familyId_name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    familyId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    familyId?: StringWithAggregatesFilter<"Category"> | string
    order?: IntWithAggregatesFilter<"Category"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    name?: StringFilter<"Task"> | string
    points?: IntFilter<"Task"> | number
    description?: StringNullableFilter<"Task"> | string | null
    categoryId?: StringFilter<"Task"> | string
    familyId?: StringFilter<"Task"> | string
    availableDays?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    completions?: TaskCompletionListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    familyId?: SortOrder
    availableDays?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    category?: CategoryOrderByWithRelationInput
    family?: FamilyOrderByWithRelationInput
    completions?: TaskCompletionOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    name?: StringFilter<"Task"> | string
    points?: IntFilter<"Task"> | number
    description?: StringNullableFilter<"Task"> | string | null
    categoryId?: StringFilter<"Task"> | string
    familyId?: StringFilter<"Task"> | string
    availableDays?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    completions?: TaskCompletionListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    familyId?: SortOrder
    availableDays?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    name?: StringWithAggregatesFilter<"Task"> | string
    points?: IntWithAggregatesFilter<"Task"> | number
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    categoryId?: StringWithAggregatesFilter<"Task"> | string
    familyId?: StringWithAggregatesFilter<"Task"> | string
    availableDays?: StringNullableWithAggregatesFilter<"Task"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
  }

  export type TaskCompletionWhereInput = {
    AND?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    OR?: TaskCompletionWhereInput[]
    NOT?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    id?: StringFilter<"TaskCompletion"> | string
    taskId?: StringFilter<"TaskCompletion"> | string
    userId?: StringFilter<"TaskCompletion"> | string
    points?: IntFilter<"TaskCompletion"> | number
    completedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    revokedAt?: DateTimeNullableFilter<"TaskCompletion"> | Date | string | null
    revokedBy?: StringNullableFilter<"TaskCompletion"> | string | null
    createdAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskCompletionOrderByWithRelationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    completedAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TaskCompletionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    OR?: TaskCompletionWhereInput[]
    NOT?: TaskCompletionWhereInput | TaskCompletionWhereInput[]
    taskId?: StringFilter<"TaskCompletion"> | string
    userId?: StringFilter<"TaskCompletion"> | string
    points?: IntFilter<"TaskCompletion"> | number
    completedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    revokedAt?: DateTimeNullableFilter<"TaskCompletion"> | Date | string | null
    revokedBy?: StringNullableFilter<"TaskCompletion"> | string | null
    createdAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskCompletionOrderByWithAggregationInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    completedAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskCompletionCountOrderByAggregateInput
    _avg?: TaskCompletionAvgOrderByAggregateInput
    _max?: TaskCompletionMaxOrderByAggregateInput
    _min?: TaskCompletionMinOrderByAggregateInput
    _sum?: TaskCompletionSumOrderByAggregateInput
  }

  export type TaskCompletionScalarWhereWithAggregatesInput = {
    AND?: TaskCompletionScalarWhereWithAggregatesInput | TaskCompletionScalarWhereWithAggregatesInput[]
    OR?: TaskCompletionScalarWhereWithAggregatesInput[]
    NOT?: TaskCompletionScalarWhereWithAggregatesInput | TaskCompletionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskCompletion"> | string
    taskId?: StringWithAggregatesFilter<"TaskCompletion"> | string
    userId?: StringWithAggregatesFilter<"TaskCompletion"> | string
    points?: IntWithAggregatesFilter<"TaskCompletion"> | number
    completedAt?: DateTimeWithAggregatesFilter<"TaskCompletion"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"TaskCompletion"> | Date | string | null
    revokedBy?: StringNullableWithAggregatesFilter<"TaskCompletion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TaskCompletion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskCompletion"> | Date | string
  }

  export type GiftWhereInput = {
    AND?: GiftWhereInput | GiftWhereInput[]
    OR?: GiftWhereInput[]
    NOT?: GiftWhereInput | GiftWhereInput[]
    id?: StringFilter<"Gift"> | string
    name?: StringFilter<"Gift"> | string
    points?: IntFilter<"Gift"> | number
    description?: StringNullableFilter<"Gift"> | string | null
    color?: StringNullableFilter<"Gift"> | string | null
    weeklyLimit?: IntNullableFilter<"Gift"> | number | null
    familyId?: StringFilter<"Gift"> | string
    createdAt?: DateTimeFilter<"Gift"> | Date | string
    updatedAt?: DateTimeFilter<"Gift"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Gift"> | Date | string | null
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    redemptions?: GiftRedemptionListRelationFilter
  }

  export type GiftOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    weeklyLimit?: SortOrderInput | SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    family?: FamilyOrderByWithRelationInput
    redemptions?: GiftRedemptionOrderByRelationAggregateInput
  }

  export type GiftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GiftWhereInput | GiftWhereInput[]
    OR?: GiftWhereInput[]
    NOT?: GiftWhereInput | GiftWhereInput[]
    name?: StringFilter<"Gift"> | string
    points?: IntFilter<"Gift"> | number
    description?: StringNullableFilter<"Gift"> | string | null
    color?: StringNullableFilter<"Gift"> | string | null
    weeklyLimit?: IntNullableFilter<"Gift"> | number | null
    familyId?: StringFilter<"Gift"> | string
    createdAt?: DateTimeFilter<"Gift"> | Date | string
    updatedAt?: DateTimeFilter<"Gift"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Gift"> | Date | string | null
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    redemptions?: GiftRedemptionListRelationFilter
  }, "id">

  export type GiftOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    weeklyLimit?: SortOrderInput | SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: GiftCountOrderByAggregateInput
    _avg?: GiftAvgOrderByAggregateInput
    _max?: GiftMaxOrderByAggregateInput
    _min?: GiftMinOrderByAggregateInput
    _sum?: GiftSumOrderByAggregateInput
  }

  export type GiftScalarWhereWithAggregatesInput = {
    AND?: GiftScalarWhereWithAggregatesInput | GiftScalarWhereWithAggregatesInput[]
    OR?: GiftScalarWhereWithAggregatesInput[]
    NOT?: GiftScalarWhereWithAggregatesInput | GiftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Gift"> | string
    name?: StringWithAggregatesFilter<"Gift"> | string
    points?: IntWithAggregatesFilter<"Gift"> | number
    description?: StringNullableWithAggregatesFilter<"Gift"> | string | null
    color?: StringNullableWithAggregatesFilter<"Gift"> | string | null
    weeklyLimit?: IntNullableWithAggregatesFilter<"Gift"> | number | null
    familyId?: StringWithAggregatesFilter<"Gift"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Gift"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Gift"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Gift"> | Date | string | null
  }

  export type GiftRedemptionWhereInput = {
    AND?: GiftRedemptionWhereInput | GiftRedemptionWhereInput[]
    OR?: GiftRedemptionWhereInput[]
    NOT?: GiftRedemptionWhereInput | GiftRedemptionWhereInput[]
    id?: StringFilter<"GiftRedemption"> | string
    giftId?: StringFilter<"GiftRedemption"> | string
    userId?: StringFilter<"GiftRedemption"> | string
    points?: IntFilter<"GiftRedemption"> | number
    status?: EnumRedemptionStatusFilter<"GiftRedemption"> | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFilter<"GiftRedemption"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"GiftRedemption"> | Date | string | null
    confirmedBy?: StringNullableFilter<"GiftRedemption"> | string | null
    cancelledAt?: DateTimeNullableFilter<"GiftRedemption"> | Date | string | null
    cancelledBy?: StringNullableFilter<"GiftRedemption"> | string | null
    createdAt?: DateTimeFilter<"GiftRedemption"> | Date | string
    updatedAt?: DateTimeFilter<"GiftRedemption"> | Date | string
    gift?: XOR<GiftScalarRelationFilter, GiftWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GiftRedemptionOrderByWithRelationInput = {
    id?: SortOrder
    giftId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    confirmedBy?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    cancelledBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gift?: GiftOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type GiftRedemptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GiftRedemptionWhereInput | GiftRedemptionWhereInput[]
    OR?: GiftRedemptionWhereInput[]
    NOT?: GiftRedemptionWhereInput | GiftRedemptionWhereInput[]
    giftId?: StringFilter<"GiftRedemption"> | string
    userId?: StringFilter<"GiftRedemption"> | string
    points?: IntFilter<"GiftRedemption"> | number
    status?: EnumRedemptionStatusFilter<"GiftRedemption"> | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFilter<"GiftRedemption"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"GiftRedemption"> | Date | string | null
    confirmedBy?: StringNullableFilter<"GiftRedemption"> | string | null
    cancelledAt?: DateTimeNullableFilter<"GiftRedemption"> | Date | string | null
    cancelledBy?: StringNullableFilter<"GiftRedemption"> | string | null
    createdAt?: DateTimeFilter<"GiftRedemption"> | Date | string
    updatedAt?: DateTimeFilter<"GiftRedemption"> | Date | string
    gift?: XOR<GiftScalarRelationFilter, GiftWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type GiftRedemptionOrderByWithAggregationInput = {
    id?: SortOrder
    giftId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    confirmedBy?: SortOrderInput | SortOrder
    cancelledAt?: SortOrderInput | SortOrder
    cancelledBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GiftRedemptionCountOrderByAggregateInput
    _avg?: GiftRedemptionAvgOrderByAggregateInput
    _max?: GiftRedemptionMaxOrderByAggregateInput
    _min?: GiftRedemptionMinOrderByAggregateInput
    _sum?: GiftRedemptionSumOrderByAggregateInput
  }

  export type GiftRedemptionScalarWhereWithAggregatesInput = {
    AND?: GiftRedemptionScalarWhereWithAggregatesInput | GiftRedemptionScalarWhereWithAggregatesInput[]
    OR?: GiftRedemptionScalarWhereWithAggregatesInput[]
    NOT?: GiftRedemptionScalarWhereWithAggregatesInput | GiftRedemptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GiftRedemption"> | string
    giftId?: StringWithAggregatesFilter<"GiftRedemption"> | string
    userId?: StringWithAggregatesFilter<"GiftRedemption"> | string
    points?: IntWithAggregatesFilter<"GiftRedemption"> | number
    status?: EnumRedemptionStatusWithAggregatesFilter<"GiftRedemption"> | $Enums.RedemptionStatus
    redeemedAt?: DateTimeWithAggregatesFilter<"GiftRedemption"> | Date | string
    confirmedAt?: DateTimeNullableWithAggregatesFilter<"GiftRedemption"> | Date | string | null
    confirmedBy?: StringNullableWithAggregatesFilter<"GiftRedemption"> | string | null
    cancelledAt?: DateTimeNullableWithAggregatesFilter<"GiftRedemption"> | Date | string | null
    cancelledBy?: StringNullableWithAggregatesFilter<"GiftRedemption"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GiftRedemption"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GiftRedemption"> | Date | string
  }

  export type ExchangeDayWhereInput = {
    AND?: ExchangeDayWhereInput | ExchangeDayWhereInput[]
    OR?: ExchangeDayWhereInput[]
    NOT?: ExchangeDayWhereInput | ExchangeDayWhereInput[]
    id?: StringFilter<"ExchangeDay"> | string
    familyId?: StringFilter<"ExchangeDay"> | string
    dayOfWeek?: IntFilter<"ExchangeDay"> | number
    createdAt?: DateTimeFilter<"ExchangeDay"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeDay"> | Date | string
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
  }

  export type ExchangeDayOrderByWithRelationInput = {
    id?: SortOrder
    familyId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    family?: FamilyOrderByWithRelationInput
  }

  export type ExchangeDayWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    familyId_dayOfWeek?: ExchangeDayFamilyIdDayOfWeekCompoundUniqueInput
    AND?: ExchangeDayWhereInput | ExchangeDayWhereInput[]
    OR?: ExchangeDayWhereInput[]
    NOT?: ExchangeDayWhereInput | ExchangeDayWhereInput[]
    familyId?: StringFilter<"ExchangeDay"> | string
    dayOfWeek?: IntFilter<"ExchangeDay"> | number
    createdAt?: DateTimeFilter<"ExchangeDay"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeDay"> | Date | string
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
  }, "id" | "familyId_dayOfWeek">

  export type ExchangeDayOrderByWithAggregationInput = {
    id?: SortOrder
    familyId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExchangeDayCountOrderByAggregateInput
    _avg?: ExchangeDayAvgOrderByAggregateInput
    _max?: ExchangeDayMaxOrderByAggregateInput
    _min?: ExchangeDayMinOrderByAggregateInput
    _sum?: ExchangeDaySumOrderByAggregateInput
  }

  export type ExchangeDayScalarWhereWithAggregatesInput = {
    AND?: ExchangeDayScalarWhereWithAggregatesInput | ExchangeDayScalarWhereWithAggregatesInput[]
    OR?: ExchangeDayScalarWhereWithAggregatesInput[]
    NOT?: ExchangeDayScalarWhereWithAggregatesInput | ExchangeDayScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExchangeDay"> | string
    familyId?: StringWithAggregatesFilter<"ExchangeDay"> | string
    dayOfWeek?: IntWithAggregatesFilter<"ExchangeDay"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ExchangeDay"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExchangeDay"> | Date | string
  }

  export type RewardWhereInput = {
    AND?: RewardWhereInput | RewardWhereInput[]
    OR?: RewardWhereInput[]
    NOT?: RewardWhereInput | RewardWhereInput[]
    id?: StringFilter<"Reward"> | string
    userId?: StringFilter<"Reward"> | string
    familyId?: StringFilter<"Reward"> | string
    points?: IntFilter<"Reward"> | number
    reason?: StringFilter<"Reward"> | string
    createdBy?: StringFilter<"Reward"> | string
    createdAt?: DateTimeFilter<"Reward"> | Date | string
    updatedAt?: DateTimeFilter<"Reward"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
  }

  export type RewardOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    familyId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    family?: FamilyOrderByWithRelationInput
  }

  export type RewardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RewardWhereInput | RewardWhereInput[]
    OR?: RewardWhereInput[]
    NOT?: RewardWhereInput | RewardWhereInput[]
    userId?: StringFilter<"Reward"> | string
    familyId?: StringFilter<"Reward"> | string
    points?: IntFilter<"Reward"> | number
    reason?: StringFilter<"Reward"> | string
    createdBy?: StringFilter<"Reward"> | string
    createdAt?: DateTimeFilter<"Reward"> | Date | string
    updatedAt?: DateTimeFilter<"Reward"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
  }, "id">

  export type RewardOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    familyId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RewardCountOrderByAggregateInput
    _avg?: RewardAvgOrderByAggregateInput
    _max?: RewardMaxOrderByAggregateInput
    _min?: RewardMinOrderByAggregateInput
    _sum?: RewardSumOrderByAggregateInput
  }

  export type RewardScalarWhereWithAggregatesInput = {
    AND?: RewardScalarWhereWithAggregatesInput | RewardScalarWhereWithAggregatesInput[]
    OR?: RewardScalarWhereWithAggregatesInput[]
    NOT?: RewardScalarWhereWithAggregatesInput | RewardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reward"> | string
    userId?: StringWithAggregatesFilter<"Reward"> | string
    familyId?: StringWithAggregatesFilter<"Reward"> | string
    points?: IntWithAggregatesFilter<"Reward"> | number
    reason?: StringWithAggregatesFilter<"Reward"> | string
    createdBy?: StringWithAggregatesFilter<"Reward"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Reward"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Reward"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    family: FamilyCreateNestedOneWithoutMembersInput
    taskCompletions?: TaskCompletionCreateNestedManyWithoutUserInput
    giftRedemptions?: GiftRedemptionCreateNestedManyWithoutUserInput
    rewards?: RewardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    familyId: string
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    taskCompletions?: TaskCompletionUncheckedCreateNestedManyWithoutUserInput
    giftRedemptions?: GiftRedemptionUncheckedCreateNestedManyWithoutUserInput
    rewards?: RewardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    taskCompletions?: TaskCompletionUpdateManyWithoutUserNestedInput
    giftRedemptions?: GiftRedemptionUpdateManyWithoutUserNestedInput
    rewards?: RewardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    familyId?: StringFieldUpdateOperationsInput | string
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    taskCompletions?: TaskCompletionUncheckedUpdateManyWithoutUserNestedInput
    giftRedemptions?: GiftRedemptionUncheckedUpdateManyWithoutUserNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    familyId: string
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    familyId?: StringFieldUpdateOperationsInput | string
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
  }

  export type FamilyCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserCreateNestedManyWithoutFamilyInput
    tasks?: TaskCreateNestedManyWithoutFamilyInput
    gifts?: GiftCreateNestedManyWithoutFamilyInput
    categories?: CategoryCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayCreateNestedManyWithoutFamilyInput
    rewards?: RewardCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserUncheckedCreateNestedManyWithoutFamilyInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFamilyInput
    gifts?: GiftUncheckedCreateNestedManyWithoutFamilyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayUncheckedCreateNestedManyWithoutFamilyInput
    rewards?: RewardUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUncheckedUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FamilyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutCategoriesInput
    tasks?: TaskCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    familyId: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutCategoriesNestedInput
    tasks?: TaskUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    familyId: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    category: CategoryCreateNestedOneWithoutTasksInput
    family: FamilyCreateNestedOneWithoutTasksInput
    completions?: TaskCompletionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    categoryId: string
    familyId: string
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    completions?: TaskCompletionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutTasksNestedInput
    family?: FamilyUpdateOneRequiredWithoutTasksNestedInput
    completions?: TaskCompletionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completions?: TaskCompletionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    categoryId: string
    familyId: string
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskCompletionCreateInput = {
    id?: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutCompletionsInput
    user: UserCreateNestedOneWithoutTaskCompletionsInput
  }

  export type TaskCompletionUncheckedCreateInput = {
    id?: string
    taskId: string
    userId: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCompletionsNestedInput
    user?: UserUpdateOneRequiredWithoutTaskCompletionsNestedInput
  }

  export type TaskCompletionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionCreateManyInput = {
    id?: string
    taskId: string
    userId: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftCreateInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    color?: string | null
    weeklyLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    family: FamilyCreateNestedOneWithoutGiftsInput
    redemptions?: GiftRedemptionCreateNestedManyWithoutGiftInput
  }

  export type GiftUncheckedCreateInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    color?: string | null
    weeklyLimit?: number | null
    familyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    redemptions?: GiftRedemptionUncheckedCreateNestedManyWithoutGiftInput
  }

  export type GiftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutGiftsNestedInput
    redemptions?: GiftRedemptionUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    familyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redemptions?: GiftRedemptionUncheckedUpdateManyWithoutGiftNestedInput
  }

  export type GiftCreateManyInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    color?: string | null
    weeklyLimit?: number | null
    familyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type GiftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GiftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    familyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GiftRedemptionCreateInput = {
    id?: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gift: GiftCreateNestedOneWithoutRedemptionsInput
    user: UserCreateNestedOneWithoutGiftRedemptionsInput
  }

  export type GiftRedemptionUncheckedCreateInput = {
    id?: string
    giftId: string
    userId: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GiftRedemptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneRequiredWithoutRedemptionsNestedInput
    user?: UserUpdateOneRequiredWithoutGiftRedemptionsNestedInput
  }

  export type GiftRedemptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftRedemptionCreateManyInput = {
    id?: string
    giftId: string
    userId: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GiftRedemptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftRedemptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeDayCreateInput = {
    id?: string
    dayOfWeek: number
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutExchangeDaysInput
  }

  export type ExchangeDayUncheckedCreateInput = {
    id?: string
    familyId: string
    dayOfWeek: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangeDayUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutExchangeDaysNestedInput
  }

  export type ExchangeDayUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeDayCreateManyInput = {
    id?: string
    familyId: string
    dayOfWeek: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangeDayUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeDayUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardCreateInput = {
    id?: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRewardsInput
    family: FamilyCreateNestedOneWithoutRewardsInput
  }

  export type RewardUncheckedCreateInput = {
    id?: string
    userId: string
    familyId: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRewardsNestedInput
    family?: FamilyUpdateOneRequiredWithoutRewardsNestedInput
  }

  export type RewardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardCreateManyInput = {
    id?: string
    userId: string
    familyId: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FamilyScalarRelationFilter = {
    is?: FamilyWhereInput
    isNot?: FamilyWhereInput
  }

  export type TaskCompletionListRelationFilter = {
    every?: TaskCompletionWhereInput
    some?: TaskCompletionWhereInput
    none?: TaskCompletionWhereInput
  }

  export type GiftRedemptionListRelationFilter = {
    every?: GiftRedemptionWhereInput
    some?: GiftRedemptionWhereInput
    none?: GiftRedemptionWhereInput
  }

  export type RewardListRelationFilter = {
    every?: RewardWhereInput
    some?: RewardWhereInput
    none?: RewardWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TaskCompletionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GiftRedemptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RewardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserFamilyIdUsernameCompoundUniqueInput = {
    familyId: string
    username: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    familyId?: SortOrder
    timezoneOffset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentPoints?: SortOrder
    totalPoints?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    timezoneOffset?: SortOrder
    currentPoints?: SortOrder
    totalPoints?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    familyId?: SortOrder
    timezoneOffset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentPoints?: SortOrder
    totalPoints?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    familyId?: SortOrder
    timezoneOffset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentPoints?: SortOrder
    totalPoints?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    timezoneOffset?: SortOrder
    currentPoints?: SortOrder
    totalPoints?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type GiftListRelationFilter = {
    every?: GiftWhereInput
    some?: GiftWhereInput
    none?: GiftWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type ExchangeDayListRelationFilter = {
    every?: ExchangeDayWhereInput
    some?: ExchangeDayWhereInput
    none?: ExchangeDayWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GiftOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExchangeDayOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FamilyCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FamilyMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FamilyMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryFamilyIdNameCompoundUniqueInput = {
    familyId: string
    name: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    familyId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    familyId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    familyId?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    familyId?: SortOrder
    availableDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    familyId?: SortOrder
    availableDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrder
    categoryId?: SortOrder
    familyId?: SortOrder
    availableDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TaskCompletionCountOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    completedAt?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCompletionAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type TaskCompletionMaxOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    completedAt?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCompletionMinOrderByAggregateInput = {
    id?: SortOrder
    taskId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    completedAt?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskCompletionSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type GiftCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrder
    color?: SortOrder
    weeklyLimit?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type GiftAvgOrderByAggregateInput = {
    points?: SortOrder
    weeklyLimit?: SortOrder
  }

  export type GiftMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrder
    color?: SortOrder
    weeklyLimit?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type GiftMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    points?: SortOrder
    description?: SortOrder
    color?: SortOrder
    weeklyLimit?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type GiftSumOrderByAggregateInput = {
    points?: SortOrder
    weeklyLimit?: SortOrder
  }

  export type EnumRedemptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RedemptionStatus | EnumRedemptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RedemptionStatus[]
    notIn?: $Enums.RedemptionStatus[]
    not?: NestedEnumRedemptionStatusFilter<$PrismaModel> | $Enums.RedemptionStatus
  }

  export type GiftScalarRelationFilter = {
    is?: GiftWhereInput
    isNot?: GiftWhereInput
  }

  export type GiftRedemptionCountOrderByAggregateInput = {
    id?: SortOrder
    giftId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrder
    confirmedAt?: SortOrder
    confirmedBy?: SortOrder
    cancelledAt?: SortOrder
    cancelledBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GiftRedemptionAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type GiftRedemptionMaxOrderByAggregateInput = {
    id?: SortOrder
    giftId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrder
    confirmedAt?: SortOrder
    confirmedBy?: SortOrder
    cancelledAt?: SortOrder
    cancelledBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GiftRedemptionMinOrderByAggregateInput = {
    id?: SortOrder
    giftId?: SortOrder
    userId?: SortOrder
    points?: SortOrder
    status?: SortOrder
    redeemedAt?: SortOrder
    confirmedAt?: SortOrder
    confirmedBy?: SortOrder
    cancelledAt?: SortOrder
    cancelledBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GiftRedemptionSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type EnumRedemptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RedemptionStatus | EnumRedemptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RedemptionStatus[]
    notIn?: $Enums.RedemptionStatus[]
    not?: NestedEnumRedemptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.RedemptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRedemptionStatusFilter<$PrismaModel>
    _max?: NestedEnumRedemptionStatusFilter<$PrismaModel>
  }

  export type ExchangeDayFamilyIdDayOfWeekCompoundUniqueInput = {
    familyId: string
    dayOfWeek: number
  }

  export type ExchangeDayCountOrderByAggregateInput = {
    id?: SortOrder
    familyId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExchangeDayAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type ExchangeDayMaxOrderByAggregateInput = {
    id?: SortOrder
    familyId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExchangeDayMinOrderByAggregateInput = {
    id?: SortOrder
    familyId?: SortOrder
    dayOfWeek?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExchangeDaySumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type RewardCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    familyId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type RewardMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    familyId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    familyId?: SortOrder
    points?: SortOrder
    reason?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type FamilyCreateNestedOneWithoutMembersInput = {
    create?: XOR<FamilyCreateWithoutMembersInput, FamilyUncheckedCreateWithoutMembersInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutMembersInput
    connect?: FamilyWhereUniqueInput
  }

  export type TaskCompletionCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCompletionCreateWithoutUserInput, TaskCompletionUncheckedCreateWithoutUserInput> | TaskCompletionCreateWithoutUserInput[] | TaskCompletionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutUserInput | TaskCompletionCreateOrConnectWithoutUserInput[]
    createMany?: TaskCompletionCreateManyUserInputEnvelope
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
  }

  export type GiftRedemptionCreateNestedManyWithoutUserInput = {
    create?: XOR<GiftRedemptionCreateWithoutUserInput, GiftRedemptionUncheckedCreateWithoutUserInput> | GiftRedemptionCreateWithoutUserInput[] | GiftRedemptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GiftRedemptionCreateOrConnectWithoutUserInput | GiftRedemptionCreateOrConnectWithoutUserInput[]
    createMany?: GiftRedemptionCreateManyUserInputEnvelope
    connect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
  }

  export type RewardCreateNestedManyWithoutUserInput = {
    create?: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput> | RewardCreateWithoutUserInput[] | RewardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutUserInput | RewardCreateOrConnectWithoutUserInput[]
    createMany?: RewardCreateManyUserInputEnvelope
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
  }

  export type TaskCompletionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCompletionCreateWithoutUserInput, TaskCompletionUncheckedCreateWithoutUserInput> | TaskCompletionCreateWithoutUserInput[] | TaskCompletionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutUserInput | TaskCompletionCreateOrConnectWithoutUserInput[]
    createMany?: TaskCompletionCreateManyUserInputEnvelope
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
  }

  export type GiftRedemptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GiftRedemptionCreateWithoutUserInput, GiftRedemptionUncheckedCreateWithoutUserInput> | GiftRedemptionCreateWithoutUserInput[] | GiftRedemptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GiftRedemptionCreateOrConnectWithoutUserInput | GiftRedemptionCreateOrConnectWithoutUserInput[]
    createMany?: GiftRedemptionCreateManyUserInputEnvelope
    connect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
  }

  export type RewardUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput> | RewardCreateWithoutUserInput[] | RewardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutUserInput | RewardCreateOrConnectWithoutUserInput[]
    createMany?: RewardCreateManyUserInputEnvelope
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FamilyUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<FamilyCreateWithoutMembersInput, FamilyUncheckedCreateWithoutMembersInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutMembersInput
    upsert?: FamilyUpsertWithoutMembersInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutMembersInput, FamilyUpdateWithoutMembersInput>, FamilyUncheckedUpdateWithoutMembersInput>
  }

  export type TaskCompletionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCompletionCreateWithoutUserInput, TaskCompletionUncheckedCreateWithoutUserInput> | TaskCompletionCreateWithoutUserInput[] | TaskCompletionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutUserInput | TaskCompletionCreateOrConnectWithoutUserInput[]
    upsert?: TaskCompletionUpsertWithWhereUniqueWithoutUserInput | TaskCompletionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCompletionCreateManyUserInputEnvelope
    set?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    disconnect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    delete?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    update?: TaskCompletionUpdateWithWhereUniqueWithoutUserInput | TaskCompletionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskCompletionUpdateManyWithWhereWithoutUserInput | TaskCompletionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
  }

  export type GiftRedemptionUpdateManyWithoutUserNestedInput = {
    create?: XOR<GiftRedemptionCreateWithoutUserInput, GiftRedemptionUncheckedCreateWithoutUserInput> | GiftRedemptionCreateWithoutUserInput[] | GiftRedemptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GiftRedemptionCreateOrConnectWithoutUserInput | GiftRedemptionCreateOrConnectWithoutUserInput[]
    upsert?: GiftRedemptionUpsertWithWhereUniqueWithoutUserInput | GiftRedemptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GiftRedemptionCreateManyUserInputEnvelope
    set?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    disconnect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    delete?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    connect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    update?: GiftRedemptionUpdateWithWhereUniqueWithoutUserInput | GiftRedemptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GiftRedemptionUpdateManyWithWhereWithoutUserInput | GiftRedemptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GiftRedemptionScalarWhereInput | GiftRedemptionScalarWhereInput[]
  }

  export type RewardUpdateManyWithoutUserNestedInput = {
    create?: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput> | RewardCreateWithoutUserInput[] | RewardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutUserInput | RewardCreateOrConnectWithoutUserInput[]
    upsert?: RewardUpsertWithWhereUniqueWithoutUserInput | RewardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RewardCreateManyUserInputEnvelope
    set?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    disconnect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    delete?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    update?: RewardUpdateWithWhereUniqueWithoutUserInput | RewardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RewardUpdateManyWithWhereWithoutUserInput | RewardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RewardScalarWhereInput | RewardScalarWhereInput[]
  }

  export type TaskCompletionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCompletionCreateWithoutUserInput, TaskCompletionUncheckedCreateWithoutUserInput> | TaskCompletionCreateWithoutUserInput[] | TaskCompletionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutUserInput | TaskCompletionCreateOrConnectWithoutUserInput[]
    upsert?: TaskCompletionUpsertWithWhereUniqueWithoutUserInput | TaskCompletionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCompletionCreateManyUserInputEnvelope
    set?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    disconnect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    delete?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    update?: TaskCompletionUpdateWithWhereUniqueWithoutUserInput | TaskCompletionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskCompletionUpdateManyWithWhereWithoutUserInput | TaskCompletionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
  }

  export type GiftRedemptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GiftRedemptionCreateWithoutUserInput, GiftRedemptionUncheckedCreateWithoutUserInput> | GiftRedemptionCreateWithoutUserInput[] | GiftRedemptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GiftRedemptionCreateOrConnectWithoutUserInput | GiftRedemptionCreateOrConnectWithoutUserInput[]
    upsert?: GiftRedemptionUpsertWithWhereUniqueWithoutUserInput | GiftRedemptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GiftRedemptionCreateManyUserInputEnvelope
    set?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    disconnect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    delete?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    connect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    update?: GiftRedemptionUpdateWithWhereUniqueWithoutUserInput | GiftRedemptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GiftRedemptionUpdateManyWithWhereWithoutUserInput | GiftRedemptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GiftRedemptionScalarWhereInput | GiftRedemptionScalarWhereInput[]
  }

  export type RewardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput> | RewardCreateWithoutUserInput[] | RewardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutUserInput | RewardCreateOrConnectWithoutUserInput[]
    upsert?: RewardUpsertWithWhereUniqueWithoutUserInput | RewardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RewardCreateManyUserInputEnvelope
    set?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    disconnect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    delete?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    update?: RewardUpdateWithWhereUniqueWithoutUserInput | RewardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RewardUpdateManyWithWhereWithoutUserInput | RewardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RewardScalarWhereInput | RewardScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutFamilyInput = {
    create?: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput> | UserCreateWithoutFamilyInput[] | UserUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFamilyInput | UserCreateOrConnectWithoutFamilyInput[]
    createMany?: UserCreateManyFamilyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutFamilyInput = {
    create?: XOR<TaskCreateWithoutFamilyInput, TaskUncheckedCreateWithoutFamilyInput> | TaskCreateWithoutFamilyInput[] | TaskUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutFamilyInput | TaskCreateOrConnectWithoutFamilyInput[]
    createMany?: TaskCreateManyFamilyInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type GiftCreateNestedManyWithoutFamilyInput = {
    create?: XOR<GiftCreateWithoutFamilyInput, GiftUncheckedCreateWithoutFamilyInput> | GiftCreateWithoutFamilyInput[] | GiftUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: GiftCreateOrConnectWithoutFamilyInput | GiftCreateOrConnectWithoutFamilyInput[]
    createMany?: GiftCreateManyFamilyInputEnvelope
    connect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutFamilyInput = {
    create?: XOR<CategoryCreateWithoutFamilyInput, CategoryUncheckedCreateWithoutFamilyInput> | CategoryCreateWithoutFamilyInput[] | CategoryUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutFamilyInput | CategoryCreateOrConnectWithoutFamilyInput[]
    createMany?: CategoryCreateManyFamilyInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ExchangeDayCreateNestedManyWithoutFamilyInput = {
    create?: XOR<ExchangeDayCreateWithoutFamilyInput, ExchangeDayUncheckedCreateWithoutFamilyInput> | ExchangeDayCreateWithoutFamilyInput[] | ExchangeDayUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: ExchangeDayCreateOrConnectWithoutFamilyInput | ExchangeDayCreateOrConnectWithoutFamilyInput[]
    createMany?: ExchangeDayCreateManyFamilyInputEnvelope
    connect?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
  }

  export type RewardCreateNestedManyWithoutFamilyInput = {
    create?: XOR<RewardCreateWithoutFamilyInput, RewardUncheckedCreateWithoutFamilyInput> | RewardCreateWithoutFamilyInput[] | RewardUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutFamilyInput | RewardCreateOrConnectWithoutFamilyInput[]
    createMany?: RewardCreateManyFamilyInputEnvelope
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput> | UserCreateWithoutFamilyInput[] | UserUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFamilyInput | UserCreateOrConnectWithoutFamilyInput[]
    createMany?: UserCreateManyFamilyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<TaskCreateWithoutFamilyInput, TaskUncheckedCreateWithoutFamilyInput> | TaskCreateWithoutFamilyInput[] | TaskUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutFamilyInput | TaskCreateOrConnectWithoutFamilyInput[]
    createMany?: TaskCreateManyFamilyInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type GiftUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<GiftCreateWithoutFamilyInput, GiftUncheckedCreateWithoutFamilyInput> | GiftCreateWithoutFamilyInput[] | GiftUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: GiftCreateOrConnectWithoutFamilyInput | GiftCreateOrConnectWithoutFamilyInput[]
    createMany?: GiftCreateManyFamilyInputEnvelope
    connect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<CategoryCreateWithoutFamilyInput, CategoryUncheckedCreateWithoutFamilyInput> | CategoryCreateWithoutFamilyInput[] | CategoryUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutFamilyInput | CategoryCreateOrConnectWithoutFamilyInput[]
    createMany?: CategoryCreateManyFamilyInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ExchangeDayUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<ExchangeDayCreateWithoutFamilyInput, ExchangeDayUncheckedCreateWithoutFamilyInput> | ExchangeDayCreateWithoutFamilyInput[] | ExchangeDayUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: ExchangeDayCreateOrConnectWithoutFamilyInput | ExchangeDayCreateOrConnectWithoutFamilyInput[]
    createMany?: ExchangeDayCreateManyFamilyInputEnvelope
    connect?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
  }

  export type RewardUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<RewardCreateWithoutFamilyInput, RewardUncheckedCreateWithoutFamilyInput> | RewardCreateWithoutFamilyInput[] | RewardUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutFamilyInput | RewardCreateOrConnectWithoutFamilyInput[]
    createMany?: RewardCreateManyFamilyInputEnvelope
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput> | UserCreateWithoutFamilyInput[] | UserUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFamilyInput | UserCreateOrConnectWithoutFamilyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFamilyInput | UserUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: UserCreateManyFamilyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFamilyInput | UserUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFamilyInput | UserUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<TaskCreateWithoutFamilyInput, TaskUncheckedCreateWithoutFamilyInput> | TaskCreateWithoutFamilyInput[] | TaskUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutFamilyInput | TaskCreateOrConnectWithoutFamilyInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutFamilyInput | TaskUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: TaskCreateManyFamilyInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutFamilyInput | TaskUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutFamilyInput | TaskUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type GiftUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<GiftCreateWithoutFamilyInput, GiftUncheckedCreateWithoutFamilyInput> | GiftCreateWithoutFamilyInput[] | GiftUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: GiftCreateOrConnectWithoutFamilyInput | GiftCreateOrConnectWithoutFamilyInput[]
    upsert?: GiftUpsertWithWhereUniqueWithoutFamilyInput | GiftUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: GiftCreateManyFamilyInputEnvelope
    set?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    disconnect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    delete?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    connect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    update?: GiftUpdateWithWhereUniqueWithoutFamilyInput | GiftUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: GiftUpdateManyWithWhereWithoutFamilyInput | GiftUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: GiftScalarWhereInput | GiftScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<CategoryCreateWithoutFamilyInput, CategoryUncheckedCreateWithoutFamilyInput> | CategoryCreateWithoutFamilyInput[] | CategoryUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutFamilyInput | CategoryCreateOrConnectWithoutFamilyInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutFamilyInput | CategoryUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: CategoryCreateManyFamilyInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutFamilyInput | CategoryUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutFamilyInput | CategoryUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ExchangeDayUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<ExchangeDayCreateWithoutFamilyInput, ExchangeDayUncheckedCreateWithoutFamilyInput> | ExchangeDayCreateWithoutFamilyInput[] | ExchangeDayUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: ExchangeDayCreateOrConnectWithoutFamilyInput | ExchangeDayCreateOrConnectWithoutFamilyInput[]
    upsert?: ExchangeDayUpsertWithWhereUniqueWithoutFamilyInput | ExchangeDayUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: ExchangeDayCreateManyFamilyInputEnvelope
    set?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
    disconnect?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
    delete?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
    connect?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
    update?: ExchangeDayUpdateWithWhereUniqueWithoutFamilyInput | ExchangeDayUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: ExchangeDayUpdateManyWithWhereWithoutFamilyInput | ExchangeDayUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: ExchangeDayScalarWhereInput | ExchangeDayScalarWhereInput[]
  }

  export type RewardUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<RewardCreateWithoutFamilyInput, RewardUncheckedCreateWithoutFamilyInput> | RewardCreateWithoutFamilyInput[] | RewardUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutFamilyInput | RewardCreateOrConnectWithoutFamilyInput[]
    upsert?: RewardUpsertWithWhereUniqueWithoutFamilyInput | RewardUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: RewardCreateManyFamilyInputEnvelope
    set?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    disconnect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    delete?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    update?: RewardUpdateWithWhereUniqueWithoutFamilyInput | RewardUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: RewardUpdateManyWithWhereWithoutFamilyInput | RewardUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: RewardScalarWhereInput | RewardScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput> | UserCreateWithoutFamilyInput[] | UserUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFamilyInput | UserCreateOrConnectWithoutFamilyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFamilyInput | UserUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: UserCreateManyFamilyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFamilyInput | UserUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFamilyInput | UserUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<TaskCreateWithoutFamilyInput, TaskUncheckedCreateWithoutFamilyInput> | TaskCreateWithoutFamilyInput[] | TaskUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutFamilyInput | TaskCreateOrConnectWithoutFamilyInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutFamilyInput | TaskUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: TaskCreateManyFamilyInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutFamilyInput | TaskUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutFamilyInput | TaskUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type GiftUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<GiftCreateWithoutFamilyInput, GiftUncheckedCreateWithoutFamilyInput> | GiftCreateWithoutFamilyInput[] | GiftUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: GiftCreateOrConnectWithoutFamilyInput | GiftCreateOrConnectWithoutFamilyInput[]
    upsert?: GiftUpsertWithWhereUniqueWithoutFamilyInput | GiftUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: GiftCreateManyFamilyInputEnvelope
    set?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    disconnect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    delete?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    connect?: GiftWhereUniqueInput | GiftWhereUniqueInput[]
    update?: GiftUpdateWithWhereUniqueWithoutFamilyInput | GiftUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: GiftUpdateManyWithWhereWithoutFamilyInput | GiftUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: GiftScalarWhereInput | GiftScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<CategoryCreateWithoutFamilyInput, CategoryUncheckedCreateWithoutFamilyInput> | CategoryCreateWithoutFamilyInput[] | CategoryUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutFamilyInput | CategoryCreateOrConnectWithoutFamilyInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutFamilyInput | CategoryUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: CategoryCreateManyFamilyInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutFamilyInput | CategoryUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutFamilyInput | CategoryUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ExchangeDayUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<ExchangeDayCreateWithoutFamilyInput, ExchangeDayUncheckedCreateWithoutFamilyInput> | ExchangeDayCreateWithoutFamilyInput[] | ExchangeDayUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: ExchangeDayCreateOrConnectWithoutFamilyInput | ExchangeDayCreateOrConnectWithoutFamilyInput[]
    upsert?: ExchangeDayUpsertWithWhereUniqueWithoutFamilyInput | ExchangeDayUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: ExchangeDayCreateManyFamilyInputEnvelope
    set?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
    disconnect?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
    delete?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
    connect?: ExchangeDayWhereUniqueInput | ExchangeDayWhereUniqueInput[]
    update?: ExchangeDayUpdateWithWhereUniqueWithoutFamilyInput | ExchangeDayUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: ExchangeDayUpdateManyWithWhereWithoutFamilyInput | ExchangeDayUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: ExchangeDayScalarWhereInput | ExchangeDayScalarWhereInput[]
  }

  export type RewardUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<RewardCreateWithoutFamilyInput, RewardUncheckedCreateWithoutFamilyInput> | RewardCreateWithoutFamilyInput[] | RewardUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: RewardCreateOrConnectWithoutFamilyInput | RewardCreateOrConnectWithoutFamilyInput[]
    upsert?: RewardUpsertWithWhereUniqueWithoutFamilyInput | RewardUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: RewardCreateManyFamilyInputEnvelope
    set?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    disconnect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    delete?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    connect?: RewardWhereUniqueInput | RewardWhereUniqueInput[]
    update?: RewardUpdateWithWhereUniqueWithoutFamilyInput | RewardUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: RewardUpdateManyWithWhereWithoutFamilyInput | RewardUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: RewardScalarWhereInput | RewardScalarWhereInput[]
  }

  export type FamilyCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<FamilyCreateWithoutCategoriesInput, FamilyUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutCategoriesInput
    connect?: FamilyWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput> | TaskCreateWithoutCategoryInput[] | TaskUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCategoryInput | TaskCreateOrConnectWithoutCategoryInput[]
    createMany?: TaskCreateManyCategoryInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput> | TaskCreateWithoutCategoryInput[] | TaskUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCategoryInput | TaskCreateOrConnectWithoutCategoryInput[]
    createMany?: TaskCreateManyCategoryInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type FamilyUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<FamilyCreateWithoutCategoriesInput, FamilyUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutCategoriesInput
    upsert?: FamilyUpsertWithoutCategoriesInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutCategoriesInput, FamilyUpdateWithoutCategoriesInput>, FamilyUncheckedUpdateWithoutCategoriesInput>
  }

  export type TaskUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput> | TaskCreateWithoutCategoryInput[] | TaskUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCategoryInput | TaskCreateOrConnectWithoutCategoryInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCategoryInput | TaskUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TaskCreateManyCategoryInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCategoryInput | TaskUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCategoryInput | TaskUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput> | TaskCreateWithoutCategoryInput[] | TaskUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutCategoryInput | TaskCreateOrConnectWithoutCategoryInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutCategoryInput | TaskUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TaskCreateManyCategoryInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutCategoryInput | TaskUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutCategoryInput | TaskUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutTasksInput = {
    create?: XOR<CategoryCreateWithoutTasksInput, CategoryUncheckedCreateWithoutTasksInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTasksInput
    connect?: CategoryWhereUniqueInput
  }

  export type FamilyCreateNestedOneWithoutTasksInput = {
    create?: XOR<FamilyCreateWithoutTasksInput, FamilyUncheckedCreateWithoutTasksInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutTasksInput
    connect?: FamilyWhereUniqueInput
  }

  export type TaskCompletionCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput> | TaskCompletionCreateWithoutTaskInput[] | TaskCompletionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutTaskInput | TaskCompletionCreateOrConnectWithoutTaskInput[]
    createMany?: TaskCompletionCreateManyTaskInputEnvelope
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
  }

  export type TaskCompletionUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput> | TaskCompletionCreateWithoutTaskInput[] | TaskCompletionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutTaskInput | TaskCompletionCreateOrConnectWithoutTaskInput[]
    createMany?: TaskCompletionCreateManyTaskInputEnvelope
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CategoryUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<CategoryCreateWithoutTasksInput, CategoryUncheckedCreateWithoutTasksInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTasksInput
    upsert?: CategoryUpsertWithoutTasksInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutTasksInput, CategoryUpdateWithoutTasksInput>, CategoryUncheckedUpdateWithoutTasksInput>
  }

  export type FamilyUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<FamilyCreateWithoutTasksInput, FamilyUncheckedCreateWithoutTasksInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutTasksInput
    upsert?: FamilyUpsertWithoutTasksInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutTasksInput, FamilyUpdateWithoutTasksInput>, FamilyUncheckedUpdateWithoutTasksInput>
  }

  export type TaskCompletionUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput> | TaskCompletionCreateWithoutTaskInput[] | TaskCompletionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutTaskInput | TaskCompletionCreateOrConnectWithoutTaskInput[]
    upsert?: TaskCompletionUpsertWithWhereUniqueWithoutTaskInput | TaskCompletionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskCompletionCreateManyTaskInputEnvelope
    set?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    disconnect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    delete?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    update?: TaskCompletionUpdateWithWhereUniqueWithoutTaskInput | TaskCompletionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskCompletionUpdateManyWithWhereWithoutTaskInput | TaskCompletionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
  }

  export type TaskCompletionUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput> | TaskCompletionCreateWithoutTaskInput[] | TaskCompletionUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: TaskCompletionCreateOrConnectWithoutTaskInput | TaskCompletionCreateOrConnectWithoutTaskInput[]
    upsert?: TaskCompletionUpsertWithWhereUniqueWithoutTaskInput | TaskCompletionUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: TaskCompletionCreateManyTaskInputEnvelope
    set?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    disconnect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    delete?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    connect?: TaskCompletionWhereUniqueInput | TaskCompletionWhereUniqueInput[]
    update?: TaskCompletionUpdateWithWhereUniqueWithoutTaskInput | TaskCompletionUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: TaskCompletionUpdateManyWithWhereWithoutTaskInput | TaskCompletionUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutCompletionsInput = {
    create?: XOR<TaskCreateWithoutCompletionsInput, TaskUncheckedCreateWithoutCompletionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCompletionsInput
    connect?: TaskWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTaskCompletionsInput = {
    create?: XOR<UserCreateWithoutTaskCompletionsInput, UserUncheckedCreateWithoutTaskCompletionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskCompletionsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutCompletionsNestedInput = {
    create?: XOR<TaskCreateWithoutCompletionsInput, TaskUncheckedCreateWithoutCompletionsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutCompletionsInput
    upsert?: TaskUpsertWithoutCompletionsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutCompletionsInput, TaskUpdateWithoutCompletionsInput>, TaskUncheckedUpdateWithoutCompletionsInput>
  }

  export type UserUpdateOneRequiredWithoutTaskCompletionsNestedInput = {
    create?: XOR<UserCreateWithoutTaskCompletionsInput, UserUncheckedCreateWithoutTaskCompletionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskCompletionsInput
    upsert?: UserUpsertWithoutTaskCompletionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskCompletionsInput, UserUpdateWithoutTaskCompletionsInput>, UserUncheckedUpdateWithoutTaskCompletionsInput>
  }

  export type FamilyCreateNestedOneWithoutGiftsInput = {
    create?: XOR<FamilyCreateWithoutGiftsInput, FamilyUncheckedCreateWithoutGiftsInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutGiftsInput
    connect?: FamilyWhereUniqueInput
  }

  export type GiftRedemptionCreateNestedManyWithoutGiftInput = {
    create?: XOR<GiftRedemptionCreateWithoutGiftInput, GiftRedemptionUncheckedCreateWithoutGiftInput> | GiftRedemptionCreateWithoutGiftInput[] | GiftRedemptionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: GiftRedemptionCreateOrConnectWithoutGiftInput | GiftRedemptionCreateOrConnectWithoutGiftInput[]
    createMany?: GiftRedemptionCreateManyGiftInputEnvelope
    connect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
  }

  export type GiftRedemptionUncheckedCreateNestedManyWithoutGiftInput = {
    create?: XOR<GiftRedemptionCreateWithoutGiftInput, GiftRedemptionUncheckedCreateWithoutGiftInput> | GiftRedemptionCreateWithoutGiftInput[] | GiftRedemptionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: GiftRedemptionCreateOrConnectWithoutGiftInput | GiftRedemptionCreateOrConnectWithoutGiftInput[]
    createMany?: GiftRedemptionCreateManyGiftInputEnvelope
    connect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
  }

  export type FamilyUpdateOneRequiredWithoutGiftsNestedInput = {
    create?: XOR<FamilyCreateWithoutGiftsInput, FamilyUncheckedCreateWithoutGiftsInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutGiftsInput
    upsert?: FamilyUpsertWithoutGiftsInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutGiftsInput, FamilyUpdateWithoutGiftsInput>, FamilyUncheckedUpdateWithoutGiftsInput>
  }

  export type GiftRedemptionUpdateManyWithoutGiftNestedInput = {
    create?: XOR<GiftRedemptionCreateWithoutGiftInput, GiftRedemptionUncheckedCreateWithoutGiftInput> | GiftRedemptionCreateWithoutGiftInput[] | GiftRedemptionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: GiftRedemptionCreateOrConnectWithoutGiftInput | GiftRedemptionCreateOrConnectWithoutGiftInput[]
    upsert?: GiftRedemptionUpsertWithWhereUniqueWithoutGiftInput | GiftRedemptionUpsertWithWhereUniqueWithoutGiftInput[]
    createMany?: GiftRedemptionCreateManyGiftInputEnvelope
    set?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    disconnect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    delete?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    connect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    update?: GiftRedemptionUpdateWithWhereUniqueWithoutGiftInput | GiftRedemptionUpdateWithWhereUniqueWithoutGiftInput[]
    updateMany?: GiftRedemptionUpdateManyWithWhereWithoutGiftInput | GiftRedemptionUpdateManyWithWhereWithoutGiftInput[]
    deleteMany?: GiftRedemptionScalarWhereInput | GiftRedemptionScalarWhereInput[]
  }

  export type GiftRedemptionUncheckedUpdateManyWithoutGiftNestedInput = {
    create?: XOR<GiftRedemptionCreateWithoutGiftInput, GiftRedemptionUncheckedCreateWithoutGiftInput> | GiftRedemptionCreateWithoutGiftInput[] | GiftRedemptionUncheckedCreateWithoutGiftInput[]
    connectOrCreate?: GiftRedemptionCreateOrConnectWithoutGiftInput | GiftRedemptionCreateOrConnectWithoutGiftInput[]
    upsert?: GiftRedemptionUpsertWithWhereUniqueWithoutGiftInput | GiftRedemptionUpsertWithWhereUniqueWithoutGiftInput[]
    createMany?: GiftRedemptionCreateManyGiftInputEnvelope
    set?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    disconnect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    delete?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    connect?: GiftRedemptionWhereUniqueInput | GiftRedemptionWhereUniqueInput[]
    update?: GiftRedemptionUpdateWithWhereUniqueWithoutGiftInput | GiftRedemptionUpdateWithWhereUniqueWithoutGiftInput[]
    updateMany?: GiftRedemptionUpdateManyWithWhereWithoutGiftInput | GiftRedemptionUpdateManyWithWhereWithoutGiftInput[]
    deleteMany?: GiftRedemptionScalarWhereInput | GiftRedemptionScalarWhereInput[]
  }

  export type GiftCreateNestedOneWithoutRedemptionsInput = {
    create?: XOR<GiftCreateWithoutRedemptionsInput, GiftUncheckedCreateWithoutRedemptionsInput>
    connectOrCreate?: GiftCreateOrConnectWithoutRedemptionsInput
    connect?: GiftWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGiftRedemptionsInput = {
    create?: XOR<UserCreateWithoutGiftRedemptionsInput, UserUncheckedCreateWithoutGiftRedemptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGiftRedemptionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRedemptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.RedemptionStatus
  }

  export type GiftUpdateOneRequiredWithoutRedemptionsNestedInput = {
    create?: XOR<GiftCreateWithoutRedemptionsInput, GiftUncheckedCreateWithoutRedemptionsInput>
    connectOrCreate?: GiftCreateOrConnectWithoutRedemptionsInput
    upsert?: GiftUpsertWithoutRedemptionsInput
    connect?: GiftWhereUniqueInput
    update?: XOR<XOR<GiftUpdateToOneWithWhereWithoutRedemptionsInput, GiftUpdateWithoutRedemptionsInput>, GiftUncheckedUpdateWithoutRedemptionsInput>
  }

  export type UserUpdateOneRequiredWithoutGiftRedemptionsNestedInput = {
    create?: XOR<UserCreateWithoutGiftRedemptionsInput, UserUncheckedCreateWithoutGiftRedemptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGiftRedemptionsInput
    upsert?: UserUpsertWithoutGiftRedemptionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGiftRedemptionsInput, UserUpdateWithoutGiftRedemptionsInput>, UserUncheckedUpdateWithoutGiftRedemptionsInput>
  }

  export type FamilyCreateNestedOneWithoutExchangeDaysInput = {
    create?: XOR<FamilyCreateWithoutExchangeDaysInput, FamilyUncheckedCreateWithoutExchangeDaysInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutExchangeDaysInput
    connect?: FamilyWhereUniqueInput
  }

  export type FamilyUpdateOneRequiredWithoutExchangeDaysNestedInput = {
    create?: XOR<FamilyCreateWithoutExchangeDaysInput, FamilyUncheckedCreateWithoutExchangeDaysInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutExchangeDaysInput
    upsert?: FamilyUpsertWithoutExchangeDaysInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutExchangeDaysInput, FamilyUpdateWithoutExchangeDaysInput>, FamilyUncheckedUpdateWithoutExchangeDaysInput>
  }

  export type UserCreateNestedOneWithoutRewardsInput = {
    create?: XOR<UserCreateWithoutRewardsInput, UserUncheckedCreateWithoutRewardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRewardsInput
    connect?: UserWhereUniqueInput
  }

  export type FamilyCreateNestedOneWithoutRewardsInput = {
    create?: XOR<FamilyCreateWithoutRewardsInput, FamilyUncheckedCreateWithoutRewardsInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutRewardsInput
    connect?: FamilyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRewardsNestedInput = {
    create?: XOR<UserCreateWithoutRewardsInput, UserUncheckedCreateWithoutRewardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRewardsInput
    upsert?: UserUpsertWithoutRewardsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRewardsInput, UserUpdateWithoutRewardsInput>, UserUncheckedUpdateWithoutRewardsInput>
  }

  export type FamilyUpdateOneRequiredWithoutRewardsNestedInput = {
    create?: XOR<FamilyCreateWithoutRewardsInput, FamilyUncheckedCreateWithoutRewardsInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutRewardsInput
    upsert?: FamilyUpsertWithoutRewardsInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutRewardsInput, FamilyUpdateWithoutRewardsInput>, FamilyUncheckedUpdateWithoutRewardsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRedemptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RedemptionStatus | EnumRedemptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RedemptionStatus[]
    notIn?: $Enums.RedemptionStatus[]
    not?: NestedEnumRedemptionStatusFilter<$PrismaModel> | $Enums.RedemptionStatus
  }

  export type NestedEnumRedemptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RedemptionStatus | EnumRedemptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RedemptionStatus[]
    notIn?: $Enums.RedemptionStatus[]
    not?: NestedEnumRedemptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.RedemptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRedemptionStatusFilter<$PrismaModel>
    _max?: NestedEnumRedemptionStatusFilter<$PrismaModel>
  }

  export type FamilyCreateWithoutMembersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutFamilyInput
    gifts?: GiftCreateNestedManyWithoutFamilyInput
    categories?: CategoryCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayCreateNestedManyWithoutFamilyInput
    rewards?: RewardCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutMembersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutFamilyInput
    gifts?: GiftUncheckedCreateNestedManyWithoutFamilyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayUncheckedCreateNestedManyWithoutFamilyInput
    rewards?: RewardUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutMembersInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutMembersInput, FamilyUncheckedCreateWithoutMembersInput>
  }

  export type TaskCompletionCreateWithoutUserInput = {
    id?: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    task: TaskCreateNestedOneWithoutCompletionsInput
  }

  export type TaskCompletionUncheckedCreateWithoutUserInput = {
    id?: string
    taskId: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionCreateOrConnectWithoutUserInput = {
    where: TaskCompletionWhereUniqueInput
    create: XOR<TaskCompletionCreateWithoutUserInput, TaskCompletionUncheckedCreateWithoutUserInput>
  }

  export type TaskCompletionCreateManyUserInputEnvelope = {
    data: TaskCompletionCreateManyUserInput | TaskCompletionCreateManyUserInput[]
  }

  export type GiftRedemptionCreateWithoutUserInput = {
    id?: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    gift: GiftCreateNestedOneWithoutRedemptionsInput
  }

  export type GiftRedemptionUncheckedCreateWithoutUserInput = {
    id?: string
    giftId: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GiftRedemptionCreateOrConnectWithoutUserInput = {
    where: GiftRedemptionWhereUniqueInput
    create: XOR<GiftRedemptionCreateWithoutUserInput, GiftRedemptionUncheckedCreateWithoutUserInput>
  }

  export type GiftRedemptionCreateManyUserInputEnvelope = {
    data: GiftRedemptionCreateManyUserInput | GiftRedemptionCreateManyUserInput[]
  }

  export type RewardCreateWithoutUserInput = {
    id?: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutRewardsInput
  }

  export type RewardUncheckedCreateWithoutUserInput = {
    id?: string
    familyId: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardCreateOrConnectWithoutUserInput = {
    where: RewardWhereUniqueInput
    create: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput>
  }

  export type RewardCreateManyUserInputEnvelope = {
    data: RewardCreateManyUserInput | RewardCreateManyUserInput[]
  }

  export type FamilyUpsertWithoutMembersInput = {
    update: XOR<FamilyUpdateWithoutMembersInput, FamilyUncheckedUpdateWithoutMembersInput>
    create: XOR<FamilyCreateWithoutMembersInput, FamilyUncheckedCreateWithoutMembersInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutMembersInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutMembersInput, FamilyUncheckedUpdateWithoutMembersInput>
  }

  export type FamilyUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUncheckedUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type TaskCompletionUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskCompletionWhereUniqueInput
    update: XOR<TaskCompletionUpdateWithoutUserInput, TaskCompletionUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCompletionCreateWithoutUserInput, TaskCompletionUncheckedCreateWithoutUserInput>
  }

  export type TaskCompletionUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskCompletionWhereUniqueInput
    data: XOR<TaskCompletionUpdateWithoutUserInput, TaskCompletionUncheckedUpdateWithoutUserInput>
  }

  export type TaskCompletionUpdateManyWithWhereWithoutUserInput = {
    where: TaskCompletionScalarWhereInput
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskCompletionScalarWhereInput = {
    AND?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
    OR?: TaskCompletionScalarWhereInput[]
    NOT?: TaskCompletionScalarWhereInput | TaskCompletionScalarWhereInput[]
    id?: StringFilter<"TaskCompletion"> | string
    taskId?: StringFilter<"TaskCompletion"> | string
    userId?: StringFilter<"TaskCompletion"> | string
    points?: IntFilter<"TaskCompletion"> | number
    completedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    revokedAt?: DateTimeNullableFilter<"TaskCompletion"> | Date | string | null
    revokedBy?: StringNullableFilter<"TaskCompletion"> | string | null
    createdAt?: DateTimeFilter<"TaskCompletion"> | Date | string
    updatedAt?: DateTimeFilter<"TaskCompletion"> | Date | string
  }

  export type GiftRedemptionUpsertWithWhereUniqueWithoutUserInput = {
    where: GiftRedemptionWhereUniqueInput
    update: XOR<GiftRedemptionUpdateWithoutUserInput, GiftRedemptionUncheckedUpdateWithoutUserInput>
    create: XOR<GiftRedemptionCreateWithoutUserInput, GiftRedemptionUncheckedCreateWithoutUserInput>
  }

  export type GiftRedemptionUpdateWithWhereUniqueWithoutUserInput = {
    where: GiftRedemptionWhereUniqueInput
    data: XOR<GiftRedemptionUpdateWithoutUserInput, GiftRedemptionUncheckedUpdateWithoutUserInput>
  }

  export type GiftRedemptionUpdateManyWithWhereWithoutUserInput = {
    where: GiftRedemptionScalarWhereInput
    data: XOR<GiftRedemptionUpdateManyMutationInput, GiftRedemptionUncheckedUpdateManyWithoutUserInput>
  }

  export type GiftRedemptionScalarWhereInput = {
    AND?: GiftRedemptionScalarWhereInput | GiftRedemptionScalarWhereInput[]
    OR?: GiftRedemptionScalarWhereInput[]
    NOT?: GiftRedemptionScalarWhereInput | GiftRedemptionScalarWhereInput[]
    id?: StringFilter<"GiftRedemption"> | string
    giftId?: StringFilter<"GiftRedemption"> | string
    userId?: StringFilter<"GiftRedemption"> | string
    points?: IntFilter<"GiftRedemption"> | number
    status?: EnumRedemptionStatusFilter<"GiftRedemption"> | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFilter<"GiftRedemption"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"GiftRedemption"> | Date | string | null
    confirmedBy?: StringNullableFilter<"GiftRedemption"> | string | null
    cancelledAt?: DateTimeNullableFilter<"GiftRedemption"> | Date | string | null
    cancelledBy?: StringNullableFilter<"GiftRedemption"> | string | null
    createdAt?: DateTimeFilter<"GiftRedemption"> | Date | string
    updatedAt?: DateTimeFilter<"GiftRedemption"> | Date | string
  }

  export type RewardUpsertWithWhereUniqueWithoutUserInput = {
    where: RewardWhereUniqueInput
    update: XOR<RewardUpdateWithoutUserInput, RewardUncheckedUpdateWithoutUserInput>
    create: XOR<RewardCreateWithoutUserInput, RewardUncheckedCreateWithoutUserInput>
  }

  export type RewardUpdateWithWhereUniqueWithoutUserInput = {
    where: RewardWhereUniqueInput
    data: XOR<RewardUpdateWithoutUserInput, RewardUncheckedUpdateWithoutUserInput>
  }

  export type RewardUpdateManyWithWhereWithoutUserInput = {
    where: RewardScalarWhereInput
    data: XOR<RewardUpdateManyMutationInput, RewardUncheckedUpdateManyWithoutUserInput>
  }

  export type RewardScalarWhereInput = {
    AND?: RewardScalarWhereInput | RewardScalarWhereInput[]
    OR?: RewardScalarWhereInput[]
    NOT?: RewardScalarWhereInput | RewardScalarWhereInput[]
    id?: StringFilter<"Reward"> | string
    userId?: StringFilter<"Reward"> | string
    familyId?: StringFilter<"Reward"> | string
    points?: IntFilter<"Reward"> | number
    reason?: StringFilter<"Reward"> | string
    createdBy?: StringFilter<"Reward"> | string
    createdAt?: DateTimeFilter<"Reward"> | Date | string
    updatedAt?: DateTimeFilter<"Reward"> | Date | string
  }

  export type UserCreateWithoutFamilyInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    taskCompletions?: TaskCompletionCreateNestedManyWithoutUserInput
    giftRedemptions?: GiftRedemptionCreateNestedManyWithoutUserInput
    rewards?: RewardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFamilyInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    taskCompletions?: TaskCompletionUncheckedCreateNestedManyWithoutUserInput
    giftRedemptions?: GiftRedemptionUncheckedCreateNestedManyWithoutUserInput
    rewards?: RewardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFamilyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput>
  }

  export type UserCreateManyFamilyInputEnvelope = {
    data: UserCreateManyFamilyInput | UserCreateManyFamilyInput[]
  }

  export type TaskCreateWithoutFamilyInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    category: CategoryCreateNestedOneWithoutTasksInput
    completions?: TaskCompletionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutFamilyInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    categoryId: string
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    completions?: TaskCompletionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutFamilyInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutFamilyInput, TaskUncheckedCreateWithoutFamilyInput>
  }

  export type TaskCreateManyFamilyInputEnvelope = {
    data: TaskCreateManyFamilyInput | TaskCreateManyFamilyInput[]
  }

  export type GiftCreateWithoutFamilyInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    color?: string | null
    weeklyLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    redemptions?: GiftRedemptionCreateNestedManyWithoutGiftInput
  }

  export type GiftUncheckedCreateWithoutFamilyInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    color?: string | null
    weeklyLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    redemptions?: GiftRedemptionUncheckedCreateNestedManyWithoutGiftInput
  }

  export type GiftCreateOrConnectWithoutFamilyInput = {
    where: GiftWhereUniqueInput
    create: XOR<GiftCreateWithoutFamilyInput, GiftUncheckedCreateWithoutFamilyInput>
  }

  export type GiftCreateManyFamilyInputEnvelope = {
    data: GiftCreateManyFamilyInput | GiftCreateManyFamilyInput[]
  }

  export type CategoryCreateWithoutFamilyInput = {
    id?: string
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutFamilyInput = {
    id?: string
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutFamilyInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutFamilyInput, CategoryUncheckedCreateWithoutFamilyInput>
  }

  export type CategoryCreateManyFamilyInputEnvelope = {
    data: CategoryCreateManyFamilyInput | CategoryCreateManyFamilyInput[]
  }

  export type ExchangeDayCreateWithoutFamilyInput = {
    id?: string
    dayOfWeek: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangeDayUncheckedCreateWithoutFamilyInput = {
    id?: string
    dayOfWeek: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangeDayCreateOrConnectWithoutFamilyInput = {
    where: ExchangeDayWhereUniqueInput
    create: XOR<ExchangeDayCreateWithoutFamilyInput, ExchangeDayUncheckedCreateWithoutFamilyInput>
  }

  export type ExchangeDayCreateManyFamilyInputEnvelope = {
    data: ExchangeDayCreateManyFamilyInput | ExchangeDayCreateManyFamilyInput[]
  }

  export type RewardCreateWithoutFamilyInput = {
    id?: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRewardsInput
  }

  export type RewardUncheckedCreateWithoutFamilyInput = {
    id?: string
    userId: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardCreateOrConnectWithoutFamilyInput = {
    where: RewardWhereUniqueInput
    create: XOR<RewardCreateWithoutFamilyInput, RewardUncheckedCreateWithoutFamilyInput>
  }

  export type RewardCreateManyFamilyInputEnvelope = {
    data: RewardCreateManyFamilyInput | RewardCreateManyFamilyInput[]
  }

  export type UserUpsertWithWhereUniqueWithoutFamilyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFamilyInput, UserUncheckedUpdateWithoutFamilyInput>
    create: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFamilyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFamilyInput, UserUncheckedUpdateWithoutFamilyInput>
  }

  export type UserUpdateManyWithWhereWithoutFamilyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFamilyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    familyId?: StringFilter<"User"> | string
    timezoneOffset?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    currentPoints?: IntFilter<"User"> | number
    totalPoints?: IntFilter<"User"> | number
  }

  export type TaskUpsertWithWhereUniqueWithoutFamilyInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutFamilyInput, TaskUncheckedUpdateWithoutFamilyInput>
    create: XOR<TaskCreateWithoutFamilyInput, TaskUncheckedCreateWithoutFamilyInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutFamilyInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutFamilyInput, TaskUncheckedUpdateWithoutFamilyInput>
  }

  export type TaskUpdateManyWithWhereWithoutFamilyInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutFamilyInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    name?: StringFilter<"Task"> | string
    points?: IntFilter<"Task"> | number
    description?: StringNullableFilter<"Task"> | string | null
    categoryId?: StringFilter<"Task"> | string
    familyId?: StringFilter<"Task"> | string
    availableDays?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
  }

  export type GiftUpsertWithWhereUniqueWithoutFamilyInput = {
    where: GiftWhereUniqueInput
    update: XOR<GiftUpdateWithoutFamilyInput, GiftUncheckedUpdateWithoutFamilyInput>
    create: XOR<GiftCreateWithoutFamilyInput, GiftUncheckedCreateWithoutFamilyInput>
  }

  export type GiftUpdateWithWhereUniqueWithoutFamilyInput = {
    where: GiftWhereUniqueInput
    data: XOR<GiftUpdateWithoutFamilyInput, GiftUncheckedUpdateWithoutFamilyInput>
  }

  export type GiftUpdateManyWithWhereWithoutFamilyInput = {
    where: GiftScalarWhereInput
    data: XOR<GiftUpdateManyMutationInput, GiftUncheckedUpdateManyWithoutFamilyInput>
  }

  export type GiftScalarWhereInput = {
    AND?: GiftScalarWhereInput | GiftScalarWhereInput[]
    OR?: GiftScalarWhereInput[]
    NOT?: GiftScalarWhereInput | GiftScalarWhereInput[]
    id?: StringFilter<"Gift"> | string
    name?: StringFilter<"Gift"> | string
    points?: IntFilter<"Gift"> | number
    description?: StringNullableFilter<"Gift"> | string | null
    color?: StringNullableFilter<"Gift"> | string | null
    weeklyLimit?: IntNullableFilter<"Gift"> | number | null
    familyId?: StringFilter<"Gift"> | string
    createdAt?: DateTimeFilter<"Gift"> | Date | string
    updatedAt?: DateTimeFilter<"Gift"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Gift"> | Date | string | null
  }

  export type CategoryUpsertWithWhereUniqueWithoutFamilyInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutFamilyInput, CategoryUncheckedUpdateWithoutFamilyInput>
    create: XOR<CategoryCreateWithoutFamilyInput, CategoryUncheckedCreateWithoutFamilyInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutFamilyInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutFamilyInput, CategoryUncheckedUpdateWithoutFamilyInput>
  }

  export type CategoryUpdateManyWithWhereWithoutFamilyInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutFamilyInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    familyId?: StringFilter<"Category"> | string
    order?: IntFilter<"Category"> | number
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type ExchangeDayUpsertWithWhereUniqueWithoutFamilyInput = {
    where: ExchangeDayWhereUniqueInput
    update: XOR<ExchangeDayUpdateWithoutFamilyInput, ExchangeDayUncheckedUpdateWithoutFamilyInput>
    create: XOR<ExchangeDayCreateWithoutFamilyInput, ExchangeDayUncheckedCreateWithoutFamilyInput>
  }

  export type ExchangeDayUpdateWithWhereUniqueWithoutFamilyInput = {
    where: ExchangeDayWhereUniqueInput
    data: XOR<ExchangeDayUpdateWithoutFamilyInput, ExchangeDayUncheckedUpdateWithoutFamilyInput>
  }

  export type ExchangeDayUpdateManyWithWhereWithoutFamilyInput = {
    where: ExchangeDayScalarWhereInput
    data: XOR<ExchangeDayUpdateManyMutationInput, ExchangeDayUncheckedUpdateManyWithoutFamilyInput>
  }

  export type ExchangeDayScalarWhereInput = {
    AND?: ExchangeDayScalarWhereInput | ExchangeDayScalarWhereInput[]
    OR?: ExchangeDayScalarWhereInput[]
    NOT?: ExchangeDayScalarWhereInput | ExchangeDayScalarWhereInput[]
    id?: StringFilter<"ExchangeDay"> | string
    familyId?: StringFilter<"ExchangeDay"> | string
    dayOfWeek?: IntFilter<"ExchangeDay"> | number
    createdAt?: DateTimeFilter<"ExchangeDay"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeDay"> | Date | string
  }

  export type RewardUpsertWithWhereUniqueWithoutFamilyInput = {
    where: RewardWhereUniqueInput
    update: XOR<RewardUpdateWithoutFamilyInput, RewardUncheckedUpdateWithoutFamilyInput>
    create: XOR<RewardCreateWithoutFamilyInput, RewardUncheckedCreateWithoutFamilyInput>
  }

  export type RewardUpdateWithWhereUniqueWithoutFamilyInput = {
    where: RewardWhereUniqueInput
    data: XOR<RewardUpdateWithoutFamilyInput, RewardUncheckedUpdateWithoutFamilyInput>
  }

  export type RewardUpdateManyWithWhereWithoutFamilyInput = {
    where: RewardScalarWhereInput
    data: XOR<RewardUpdateManyMutationInput, RewardUncheckedUpdateManyWithoutFamilyInput>
  }

  export type FamilyCreateWithoutCategoriesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserCreateNestedManyWithoutFamilyInput
    tasks?: TaskCreateNestedManyWithoutFamilyInput
    gifts?: GiftCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayCreateNestedManyWithoutFamilyInput
    rewards?: RewardCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutCategoriesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserUncheckedCreateNestedManyWithoutFamilyInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFamilyInput
    gifts?: GiftUncheckedCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayUncheckedCreateNestedManyWithoutFamilyInput
    rewards?: RewardUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutCategoriesInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutCategoriesInput, FamilyUncheckedCreateWithoutCategoriesInput>
  }

  export type TaskCreateWithoutCategoryInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    family: FamilyCreateNestedOneWithoutTasksInput
    completions?: TaskCompletionCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    familyId: string
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    completions?: TaskCompletionUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutCategoryInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput>
  }

  export type TaskCreateManyCategoryInputEnvelope = {
    data: TaskCreateManyCategoryInput | TaskCreateManyCategoryInput[]
  }

  export type FamilyUpsertWithoutCategoriesInput = {
    update: XOR<FamilyUpdateWithoutCategoriesInput, FamilyUncheckedUpdateWithoutCategoriesInput>
    create: XOR<FamilyCreateWithoutCategoriesInput, FamilyUncheckedCreateWithoutCategoriesInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutCategoriesInput, FamilyUncheckedUpdateWithoutCategoriesInput>
  }

  export type FamilyUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUncheckedUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutCategoryInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutCategoryInput, TaskUncheckedUpdateWithoutCategoryInput>
    create: XOR<TaskCreateWithoutCategoryInput, TaskUncheckedCreateWithoutCategoryInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutCategoryInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutCategoryInput, TaskUncheckedUpdateWithoutCategoryInput>
  }

  export type TaskUpdateManyWithWhereWithoutCategoryInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryCreateWithoutTasksInput = {
    id?: string
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    familyId: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutTasksInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutTasksInput, CategoryUncheckedCreateWithoutTasksInput>
  }

  export type FamilyCreateWithoutTasksInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserCreateNestedManyWithoutFamilyInput
    gifts?: GiftCreateNestedManyWithoutFamilyInput
    categories?: CategoryCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayCreateNestedManyWithoutFamilyInput
    rewards?: RewardCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutTasksInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserUncheckedCreateNestedManyWithoutFamilyInput
    gifts?: GiftUncheckedCreateNestedManyWithoutFamilyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayUncheckedCreateNestedManyWithoutFamilyInput
    rewards?: RewardUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutTasksInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutTasksInput, FamilyUncheckedCreateWithoutTasksInput>
  }

  export type TaskCompletionCreateWithoutTaskInput = {
    id?: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTaskCompletionsInput
  }

  export type TaskCompletionUncheckedCreateWithoutTaskInput = {
    id?: string
    userId: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionCreateOrConnectWithoutTaskInput = {
    where: TaskCompletionWhereUniqueInput
    create: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput>
  }

  export type TaskCompletionCreateManyTaskInputEnvelope = {
    data: TaskCompletionCreateManyTaskInput | TaskCompletionCreateManyTaskInput[]
  }

  export type CategoryUpsertWithoutTasksInput = {
    update: XOR<CategoryUpdateWithoutTasksInput, CategoryUncheckedUpdateWithoutTasksInput>
    create: XOR<CategoryCreateWithoutTasksInput, CategoryUncheckedCreateWithoutTasksInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutTasksInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutTasksInput, CategoryUncheckedUpdateWithoutTasksInput>
  }

  export type CategoryUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyUpsertWithoutTasksInput = {
    update: XOR<FamilyUpdateWithoutTasksInput, FamilyUncheckedUpdateWithoutTasksInput>
    create: XOR<FamilyCreateWithoutTasksInput, FamilyUncheckedCreateWithoutTasksInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutTasksInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutTasksInput, FamilyUncheckedUpdateWithoutTasksInput>
  }

  export type FamilyUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUncheckedUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type TaskCompletionUpsertWithWhereUniqueWithoutTaskInput = {
    where: TaskCompletionWhereUniqueInput
    update: XOR<TaskCompletionUpdateWithoutTaskInput, TaskCompletionUncheckedUpdateWithoutTaskInput>
    create: XOR<TaskCompletionCreateWithoutTaskInput, TaskCompletionUncheckedCreateWithoutTaskInput>
  }

  export type TaskCompletionUpdateWithWhereUniqueWithoutTaskInput = {
    where: TaskCompletionWhereUniqueInput
    data: XOR<TaskCompletionUpdateWithoutTaskInput, TaskCompletionUncheckedUpdateWithoutTaskInput>
  }

  export type TaskCompletionUpdateManyWithWhereWithoutTaskInput = {
    where: TaskCompletionScalarWhereInput
    data: XOR<TaskCompletionUpdateManyMutationInput, TaskCompletionUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutCompletionsInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    category: CategoryCreateNestedOneWithoutTasksInput
    family: FamilyCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutCompletionsInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    categoryId: string
    familyId: string
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TaskCreateOrConnectWithoutCompletionsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutCompletionsInput, TaskUncheckedCreateWithoutCompletionsInput>
  }

  export type UserCreateWithoutTaskCompletionsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    family: FamilyCreateNestedOneWithoutMembersInput
    giftRedemptions?: GiftRedemptionCreateNestedManyWithoutUserInput
    rewards?: RewardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTaskCompletionsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    familyId: string
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    giftRedemptions?: GiftRedemptionUncheckedCreateNestedManyWithoutUserInput
    rewards?: RewardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTaskCompletionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskCompletionsInput, UserUncheckedCreateWithoutTaskCompletionsInput>
  }

  export type TaskUpsertWithoutCompletionsInput = {
    update: XOR<TaskUpdateWithoutCompletionsInput, TaskUncheckedUpdateWithoutCompletionsInput>
    create: XOR<TaskCreateWithoutCompletionsInput, TaskUncheckedCreateWithoutCompletionsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutCompletionsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutCompletionsInput, TaskUncheckedUpdateWithoutCompletionsInput>
  }

  export type TaskUpdateWithoutCompletionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutTasksNestedInput
    family?: FamilyUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutCompletionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutTaskCompletionsInput = {
    update: XOR<UserUpdateWithoutTaskCompletionsInput, UserUncheckedUpdateWithoutTaskCompletionsInput>
    create: XOR<UserCreateWithoutTaskCompletionsInput, UserUncheckedCreateWithoutTaskCompletionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskCompletionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskCompletionsInput, UserUncheckedUpdateWithoutTaskCompletionsInput>
  }

  export type UserUpdateWithoutTaskCompletionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    giftRedemptions?: GiftRedemptionUpdateManyWithoutUserNestedInput
    rewards?: RewardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskCompletionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    familyId?: StringFieldUpdateOperationsInput | string
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    giftRedemptions?: GiftRedemptionUncheckedUpdateManyWithoutUserNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FamilyCreateWithoutGiftsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserCreateNestedManyWithoutFamilyInput
    tasks?: TaskCreateNestedManyWithoutFamilyInput
    categories?: CategoryCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayCreateNestedManyWithoutFamilyInput
    rewards?: RewardCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutGiftsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserUncheckedCreateNestedManyWithoutFamilyInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFamilyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayUncheckedCreateNestedManyWithoutFamilyInput
    rewards?: RewardUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutGiftsInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutGiftsInput, FamilyUncheckedCreateWithoutGiftsInput>
  }

  export type GiftRedemptionCreateWithoutGiftInput = {
    id?: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGiftRedemptionsInput
  }

  export type GiftRedemptionUncheckedCreateWithoutGiftInput = {
    id?: string
    userId: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GiftRedemptionCreateOrConnectWithoutGiftInput = {
    where: GiftRedemptionWhereUniqueInput
    create: XOR<GiftRedemptionCreateWithoutGiftInput, GiftRedemptionUncheckedCreateWithoutGiftInput>
  }

  export type GiftRedemptionCreateManyGiftInputEnvelope = {
    data: GiftRedemptionCreateManyGiftInput | GiftRedemptionCreateManyGiftInput[]
  }

  export type FamilyUpsertWithoutGiftsInput = {
    update: XOR<FamilyUpdateWithoutGiftsInput, FamilyUncheckedUpdateWithoutGiftsInput>
    create: XOR<FamilyCreateWithoutGiftsInput, FamilyUncheckedCreateWithoutGiftsInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutGiftsInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutGiftsInput, FamilyUncheckedUpdateWithoutGiftsInput>
  }

  export type FamilyUpdateWithoutGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutGiftsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUncheckedUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type GiftRedemptionUpsertWithWhereUniqueWithoutGiftInput = {
    where: GiftRedemptionWhereUniqueInput
    update: XOR<GiftRedemptionUpdateWithoutGiftInput, GiftRedemptionUncheckedUpdateWithoutGiftInput>
    create: XOR<GiftRedemptionCreateWithoutGiftInput, GiftRedemptionUncheckedCreateWithoutGiftInput>
  }

  export type GiftRedemptionUpdateWithWhereUniqueWithoutGiftInput = {
    where: GiftRedemptionWhereUniqueInput
    data: XOR<GiftRedemptionUpdateWithoutGiftInput, GiftRedemptionUncheckedUpdateWithoutGiftInput>
  }

  export type GiftRedemptionUpdateManyWithWhereWithoutGiftInput = {
    where: GiftRedemptionScalarWhereInput
    data: XOR<GiftRedemptionUpdateManyMutationInput, GiftRedemptionUncheckedUpdateManyWithoutGiftInput>
  }

  export type GiftCreateWithoutRedemptionsInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    color?: string | null
    weeklyLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    family: FamilyCreateNestedOneWithoutGiftsInput
  }

  export type GiftUncheckedCreateWithoutRedemptionsInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    color?: string | null
    weeklyLimit?: number | null
    familyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type GiftCreateOrConnectWithoutRedemptionsInput = {
    where: GiftWhereUniqueInput
    create: XOR<GiftCreateWithoutRedemptionsInput, GiftUncheckedCreateWithoutRedemptionsInput>
  }

  export type UserCreateWithoutGiftRedemptionsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    family: FamilyCreateNestedOneWithoutMembersInput
    taskCompletions?: TaskCompletionCreateNestedManyWithoutUserInput
    rewards?: RewardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGiftRedemptionsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    familyId: string
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    taskCompletions?: TaskCompletionUncheckedCreateNestedManyWithoutUserInput
    rewards?: RewardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGiftRedemptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGiftRedemptionsInput, UserUncheckedCreateWithoutGiftRedemptionsInput>
  }

  export type GiftUpsertWithoutRedemptionsInput = {
    update: XOR<GiftUpdateWithoutRedemptionsInput, GiftUncheckedUpdateWithoutRedemptionsInput>
    create: XOR<GiftCreateWithoutRedemptionsInput, GiftUncheckedCreateWithoutRedemptionsInput>
    where?: GiftWhereInput
  }

  export type GiftUpdateToOneWithWhereWithoutRedemptionsInput = {
    where?: GiftWhereInput
    data: XOR<GiftUpdateWithoutRedemptionsInput, GiftUncheckedUpdateWithoutRedemptionsInput>
  }

  export type GiftUpdateWithoutRedemptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutGiftsNestedInput
  }

  export type GiftUncheckedUpdateWithoutRedemptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    familyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUpsertWithoutGiftRedemptionsInput = {
    update: XOR<UserUpdateWithoutGiftRedemptionsInput, UserUncheckedUpdateWithoutGiftRedemptionsInput>
    create: XOR<UserCreateWithoutGiftRedemptionsInput, UserUncheckedCreateWithoutGiftRedemptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGiftRedemptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGiftRedemptionsInput, UserUncheckedUpdateWithoutGiftRedemptionsInput>
  }

  export type UserUpdateWithoutGiftRedemptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    taskCompletions?: TaskCompletionUpdateManyWithoutUserNestedInput
    rewards?: RewardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGiftRedemptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    familyId?: StringFieldUpdateOperationsInput | string
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    taskCompletions?: TaskCompletionUncheckedUpdateManyWithoutUserNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FamilyCreateWithoutExchangeDaysInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserCreateNestedManyWithoutFamilyInput
    tasks?: TaskCreateNestedManyWithoutFamilyInput
    gifts?: GiftCreateNestedManyWithoutFamilyInput
    categories?: CategoryCreateNestedManyWithoutFamilyInput
    rewards?: RewardCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutExchangeDaysInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserUncheckedCreateNestedManyWithoutFamilyInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFamilyInput
    gifts?: GiftUncheckedCreateNestedManyWithoutFamilyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutFamilyInput
    rewards?: RewardUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutExchangeDaysInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutExchangeDaysInput, FamilyUncheckedCreateWithoutExchangeDaysInput>
  }

  export type FamilyUpsertWithoutExchangeDaysInput = {
    update: XOR<FamilyUpdateWithoutExchangeDaysInput, FamilyUncheckedUpdateWithoutExchangeDaysInput>
    create: XOR<FamilyCreateWithoutExchangeDaysInput, FamilyUncheckedCreateWithoutExchangeDaysInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutExchangeDaysInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutExchangeDaysInput, FamilyUncheckedUpdateWithoutExchangeDaysInput>
  }

  export type FamilyUpdateWithoutExchangeDaysInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutExchangeDaysInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutFamilyNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type UserCreateWithoutRewardsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    family: FamilyCreateNestedOneWithoutMembersInput
    taskCompletions?: TaskCompletionCreateNestedManyWithoutUserInput
    giftRedemptions?: GiftRedemptionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRewardsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    familyId: string
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
    taskCompletions?: TaskCompletionUncheckedCreateNestedManyWithoutUserInput
    giftRedemptions?: GiftRedemptionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRewardsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRewardsInput, UserUncheckedCreateWithoutRewardsInput>
  }

  export type FamilyCreateWithoutRewardsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserCreateNestedManyWithoutFamilyInput
    tasks?: TaskCreateNestedManyWithoutFamilyInput
    gifts?: GiftCreateNestedManyWithoutFamilyInput
    categories?: CategoryCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutRewardsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: UserUncheckedCreateNestedManyWithoutFamilyInput
    tasks?: TaskUncheckedCreateNestedManyWithoutFamilyInput
    gifts?: GiftUncheckedCreateNestedManyWithoutFamilyInput
    categories?: CategoryUncheckedCreateNestedManyWithoutFamilyInput
    exchangeDays?: ExchangeDayUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutRewardsInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutRewardsInput, FamilyUncheckedCreateWithoutRewardsInput>
  }

  export type UserUpsertWithoutRewardsInput = {
    update: XOR<UserUpdateWithoutRewardsInput, UserUncheckedUpdateWithoutRewardsInput>
    create: XOR<UserCreateWithoutRewardsInput, UserUncheckedCreateWithoutRewardsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRewardsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRewardsInput, UserUncheckedUpdateWithoutRewardsInput>
  }

  export type UserUpdateWithoutRewardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    taskCompletions?: TaskCompletionUpdateManyWithoutUserNestedInput
    giftRedemptions?: GiftRedemptionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRewardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    familyId?: StringFieldUpdateOperationsInput | string
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    taskCompletions?: TaskCompletionUncheckedUpdateManyWithoutUserNestedInput
    giftRedemptions?: GiftRedemptionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FamilyUpsertWithoutRewardsInput = {
    update: XOR<FamilyUpdateWithoutRewardsInput, FamilyUncheckedUpdateWithoutRewardsInput>
    create: XOR<FamilyCreateWithoutRewardsInput, FamilyUncheckedCreateWithoutRewardsInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutRewardsInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutRewardsInput, FamilyUncheckedUpdateWithoutRewardsInput>
  }

  export type FamilyUpdateWithoutRewardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutRewardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutFamilyNestedInput
    gifts?: GiftUncheckedUpdateManyWithoutFamilyNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutFamilyNestedInput
    exchangeDays?: ExchangeDayUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type TaskCompletionCreateManyUserInput = {
    id?: string
    taskId: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GiftRedemptionCreateManyUserInput = {
    id?: string
    giftId: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardCreateManyUserInput = {
    id?: string
    familyId: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutCompletionsNestedInput
  }

  export type TaskCompletionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftRedemptionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gift?: GiftUpdateOneRequiredWithoutRedemptionsNestedInput
  }

  export type GiftRedemptionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftRedemptionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    giftId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutRewardsNestedInput
  }

  export type RewardUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyFamilyInput = {
    id?: string
    username: string
    password: string
    role: $Enums.Role
    timezoneOffset?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    currentPoints?: number
    totalPoints?: number
  }

  export type TaskCreateManyFamilyInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    categoryId: string
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type GiftCreateManyFamilyInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    color?: string | null
    weeklyLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type CategoryCreateManyFamilyInput = {
    id?: string
    name: string
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangeDayCreateManyFamilyInput = {
    id?: string
    dayOfWeek: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardCreateManyFamilyInput = {
    id?: string
    userId: string
    points: number
    reason: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    taskCompletions?: TaskCompletionUpdateManyWithoutUserNestedInput
    giftRedemptions?: GiftRedemptionUpdateManyWithoutUserNestedInput
    rewards?: RewardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    taskCompletions?: TaskCompletionUncheckedUpdateManyWithoutUserNestedInput
    giftRedemptions?: GiftRedemptionUncheckedUpdateManyWithoutUserNestedInput
    rewards?: RewardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    timezoneOffset?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentPoints?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
  }

  export type TaskUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: CategoryUpdateOneRequiredWithoutTasksNestedInput
    completions?: TaskCompletionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completions?: TaskCompletionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GiftUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redemptions?: GiftRedemptionUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    redemptions?: GiftRedemptionUncheckedUpdateManyWithoutGiftNestedInput
  }

  export type GiftUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    weeklyLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeDayUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeDayUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeDayUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRewardsNestedInput
  }

  export type RewardUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyCategoryInput = {
    id?: string
    name: string
    points: number
    description?: string | null
    familyId: string
    availableDays?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type TaskUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutTasksNestedInput
    completions?: TaskCompletionUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completions?: TaskCompletionUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    availableDays?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskCompletionCreateManyTaskInput = {
    id?: string
    userId: string
    points: number
    completedAt?: Date | string
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCompletionUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTaskCompletionsNestedInput
  }

  export type TaskCompletionUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCompletionUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftRedemptionCreateManyGiftInput = {
    id?: string
    userId: string
    points: number
    status?: $Enums.RedemptionStatus
    redeemedAt?: Date | string
    confirmedAt?: Date | string | null
    confirmedBy?: string | null
    cancelledAt?: Date | string | null
    cancelledBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GiftRedemptionUpdateWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGiftRedemptionsNestedInput
  }

  export type GiftRedemptionUncheckedUpdateWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GiftRedemptionUncheckedUpdateManyWithoutGiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    status?: EnumRedemptionStatusFieldUpdateOperationsInput | $Enums.RedemptionStatus
    redeemedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confirmedBy?: NullableStringFieldUpdateOperationsInput | string | null
    cancelledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelledBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}