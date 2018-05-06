export default {
    miliSecToHms(d) {
        d = Number(d) / 1000;
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    },
    percentage(value, outof) {
        let ret = value / outof * 100;
        ret = ret > 100 ? 100 : ret;
        return ret;
    }
};
