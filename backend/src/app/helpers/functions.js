module.exports.getNextMonthFromDate = function getNextMonthFromDate(date) {
    var month = date.getMonth() == 11 ? 0 : date.getMonth() + 1;
    return new Date(date.getFullYear() + (month == 0 ? 1 : 0), month, 1);
}