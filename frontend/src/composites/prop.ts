import {
  Ref, ref, SetupContext, watch,
} from '@vue/composition-api';

/**
 * Creates a new Ref which is initialized with the value of a property
 * and updated when the property value changes.
 */
export const usePropRef = (props: object, name: string): Ref => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = ref((props as any)[name]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch((): Ref => (props as any)[name], (newValue): void => {
    r.value = newValue;
  });

  return r;
};

/**
 * Creates a new Ref which is initialized with the value of a property
 * and updated when the property value changes. When the Ref changes, it
 * emits an update event for .sync property declaration
 */
export const useSyncedProp = (context: SetupContext, props: object, name: string): Ref => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = ref((props as any)[name]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch((): Ref => (props as any)[name], (newValue): void => {
    r.value = newValue;
  });

  watch(r, (newValue): void => {
    context.emit(`${name}:update`, newValue);
  });

  return r;
};

export default {};
