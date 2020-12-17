import {
  Ref, ref, SetupContext, watch,
} from '@vue/composition-api';

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
