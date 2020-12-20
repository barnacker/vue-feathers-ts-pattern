import {
  Ref,
  ref,
  SetupContext,
  watch
} from '@vue/composition-api';
import _ from 'lodash';

const cloneValue = (value: unknown): unknown => {
  if (_.isArray(value) || _.isObject(value)) {
    return _.cloneDeep(value);
  }
  return value;
};

/**
 * Creates a new Ref which is initialized with the value of a property
 * and updated when the property value changes.
 */
export const useProp = (props: object, name: string): Ref => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = ref(cloneValue((props as any)[name]));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch((): Ref => (props as any)[name], (newValue): void => {
    r.value = cloneValue(newValue);
  });

  return r;
};

/**
 * Creates a new Ref which is initialized with the value of a property
 * and updated when the property value changes. When the Ref changes, it
 * emits an update event for .sync property declaration
 */
export const useSyncedProp = (props: object, name: string, context: SetupContext): Ref => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = ref(cloneValue((props as any)[name]));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch((): Ref => (props as any)[name], (newValue): void => {
    r.value = cloneValue(newValue);
  });

  watch(r, (newValue): void => {
    context.emit(`update:${name}`, newValue);
  });

  return r;
};

export default {};
