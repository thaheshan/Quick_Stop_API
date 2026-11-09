"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcCommission = calcCommission;
exports.calcOwnerPayout = calcOwnerPayout;
exports.formatLKR = formatLKR;
function calcCommission(amount, rate = 0.12) {
    return parseFloat((amount * rate).toFixed(2));
}
function calcOwnerPayout(amount, rate = 0.12) {
    return parseFloat((amount - calcCommission(amount, rate)).toFixed(2));
}
function formatLKR(amount) {
    return `LKR ${amount.toLocaleString('si-LK')}`;
}
//# sourceMappingURL=currency.util.js.map