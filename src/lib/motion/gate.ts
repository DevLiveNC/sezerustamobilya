let started = false;

export function markMotionStarted(): void {
  started = true;
}

export function motionStarted(): boolean {
  return started;
}
