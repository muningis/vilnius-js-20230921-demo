import { useEffect, useRef, useState } from "react";
import { SafeFetch } from "./safe-fetch";
import { ZodError } from "zod";

export function useSafeFetch<T extends {}>(safeFetch: SafeFetch<T>) {
  const [data, setData] = useState<T>();
  const [state, setState] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<Error>();
  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) return;
    setState("loading");
    fetched.current = true;
    safeFetch().then(async (res) => {
      const data = await res.json();
      setData(data);
    }).catch(err => {
      if (err instanceof ZodError) console.error("Received error from zod!", err);
      setError(err);
    }).finally(() => {
      setState("idle");
    })
  }, []);

  return { data, state, error };
}