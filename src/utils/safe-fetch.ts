import { ZodSchema } from "zod";

/**
 * @description Patched `Response` type which allows us to type `json` method.
 */
type TypedResponse<T extends {}> = Omit<Response, "json"> & { json: () => Promise<T> };

/**
 * @description ReturnType for `safeFetch` with T type generic, so consumers can infer T. Useful for utilities
 *  so you do not have to manually extract/infer type, but is rather done by utility function, which can help
 *  us ensure better type safety.
 * @example
 * ```ts
 * function useSafeFetch<T extends {}>(safeFetch: SafeFetch<T>): T {
 *   return {};
 * }
 * 
 * const fetchUser = safeFetch(userSchema);
 * function UserCard() {
 *   const user = useSafeFetch(fetchUser); // z.infer<userSchema>
 * 
 *   return null;
 * }
 * ```
 */
export type SafeFetch<T extends {}> = (init?: RequestInit) => Promise<TypedResponse<T>>;

/**
 * @description extracts return type of function created with `safeFetch` for when `SafeFetch` can not do the job.
 * @example
* ```ts
 * const fetchUser = safeFetch(userSchema);
 * type User = ExtractDataFromResponse<typeof fetchUser>; // z.infer<userSchema>
 * ```
 */
export type ExtractDataFromResponse<
  R extends SafeFetch<T>,
  T extends {} = {}
> = Awaited<ReturnType<Awaited<ReturnType<R>>["json"]>>


/**
 * @description type-safe(r) fetch, which internally uses zod library
 */
export function safeFetch<T extends {}, Path extends string>(schema: ZodSchema<T>, path: Path): SafeFetch<T> {
  return async function safeFetchInner(init?: RequestInit): Promise<TypedResponse<T>> {
    const res = await fetch(path, init);
    /**
     * Because we want to return whole Response object, we have to clone response first, as .body(), .text() and .json() can only be called once on instance of Response.
     */
    const clonedRes = res.clone();

    schema.parse(await clonedRes.json());
    return res;
  }
}
