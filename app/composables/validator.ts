import type { ZodIssue, ZodObject, ZodRawShape } from "zod";

export type Validator = {
  issues: Ref<ZodIssue[]>;
  invalid: Ref<boolean>;
  dirty: Ref<boolean>;
  reset: () => void;
  validate: () => boolean;
};

export function useValidator<T extends ZodRawShape, S extends Record<keyof T, any>>(schema: ZodObject<T>, state: MaybeRef<S>): Validator {
  const issues = ref<ZodIssue[]>([]);

  const invalid = ref(false);
  const dirty = ref(false);

  watch(state, () => {
    dirty.value = true;
  }, { deep: true });

  function reset() {
    issues.value = [];
    invalid.value = false;
  }

  function validate() {
    reset();

    const stateUnref = unref(state);
    const result = schema.passthrough().safeParse(stateUnref);
    if (result.success) {
      return true;
    }

    issues.value = result.error.issues;
    invalid.value = true;

    return false;
  }

  return {
    issues,
    invalid,
    dirty,
    reset,
    validate
  };
}
