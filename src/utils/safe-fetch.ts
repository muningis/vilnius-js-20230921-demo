import { ZodSchema } from "zod";

type TypedResponse<T extends {}> = Omit<Response, "json"> & { json: () => Promise<T> };
export type SafeFetch<T extends {}> = (init?: RequestInit) => Promise<TypedResponse<T>>;

export type ExtractDataFromResponse<
  R extends SafeFetch<T>,
  T extends {} = {}
> = Awaited<ReturnType<Awaited<ReturnType<R>>["json"]>>



export function safeFetch<T extends {}, Path extends string>(schema: ZodSchema<T>, path: Path): SafeFetch<T> {
  return async function safeFetchInner(init?: RequestInit): Promise<TypedResponse<T>> {
    const res = await fetch(path, init);
    const clonedRes = res.clone();

    schema.parse(await clonedRes.json());

    return res;
  }
}
