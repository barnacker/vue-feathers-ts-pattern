import {
  computed, ComputedRef, onMounted, reactive,
} from '@vue/composition-api';

export enum Comfortable {
  Yeah,
  Bof,
}

export const useBox = (): {
  dimension: { profondeur: number; comfortable: Comfortable };
  isProfound: ComputedRef<boolean>;
} => {
  const dimension = reactive({
    profondeur: 10,
    comfortable: Comfortable.Yeah,
  });

  const isProfound = computed(() => dimension.profondeur > 15);

  onMounted(() => {
    console.log('Box ready!');
    console.log(isProfound.value);
  });

  return {
    dimension,
    isProfound,
  };
};

export default {};
