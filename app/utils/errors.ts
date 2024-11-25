import { FetchError } from "ofetch";

export function handleFetchError(error: unknown) {
  console.log("handling", error);
  if (error instanceof FetchError) {
    useErrorToast(error.data.message ?? "Something went wrong");
  }
  else {
    useErrorToast("Something went wrong", error instanceof Error ? error.message : undefined);
  }
}
