import { getSimulatedDelay } from './localApiScenario.types';

export function simulateDelay(overrideMs?: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, overrideMs ?? getSimulatedDelay()),
  );
}
