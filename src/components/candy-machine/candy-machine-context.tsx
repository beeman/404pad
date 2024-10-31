import { createContextId } from '@builder.io/qwik';

export interface CandyMachineState {
  itemsAvailable: number;
  itemsRedeemed: number;
  price: number;
  isLoading: boolean;
}

export const CandyMachineContext = createContextId<CandyMachineState>('candy-machine-context');