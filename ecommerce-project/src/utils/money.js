export function FormatMoney(amountCents) {
    return `${(amountCents / 100).toFixed(2)}`;
}