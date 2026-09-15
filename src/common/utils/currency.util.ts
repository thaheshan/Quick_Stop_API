export function calcCommission(amount: number, rate = 0.12): number {
  return parseFloat((amount * rate).toFixed(2));
}

export function calcOwnerPayout(amount: number, rate = 0.12): number {
  return parseFloat((amount - calcCommission(amount, rate)).toFixed(2));
}

export function formatLKR(amount: number): string {
  return `LKR ${amount.toLocaleString('si-LK')}`;
}
