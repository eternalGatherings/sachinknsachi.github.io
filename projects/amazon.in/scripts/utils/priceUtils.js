export function formatePrice(priceCents) {
    return (Math.round(priceCents) /100).toFixed(2);
}