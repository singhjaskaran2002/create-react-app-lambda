import * as moment from "moment";

const createIntervals = (startString, endString) => {
    var start = moment(startString, "HH:mm");
    var end = moment(endString, "HH:mm");

    // round starting minutes up to nearest 15 (12 --> 15, 17 --> 30)
    // 59 will round up to 60
    start.minutes(Math.ceil(start.minutes() / 15) * 15);
    var result = [];
    var current = moment(start);
    while (current < end) {
        const from = current.format("HH:mm");
        const to = current.add(15, "minutes").format("HH:mm");
        if (current.isSameOrBefore(end)) {
            result.push({ from, to });
        }
    }
    return result;
};

export default createIntervals;