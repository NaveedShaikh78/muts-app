import Dexie from 'dexie';
import moment from 'moment';
let app;
export default class Database {
    constructor() {
        app = window.application;
        this.db = new Dexie("loggerdb");
        this.db.version(1).stores({ machinelog: "++srno, start_time, [ioport+start_time],[opid+start_time],[jobno+start_time] " });
        this.db.version(1).stores({ operatorList: "++id" });
        this.db.version(1).stores({ idleList: "++id" });
        this.db.version(1).stores({ jobList: "++id" });
        this.db.open().then(() => {
            this.db.machinelog.orderBy('srno').last(obj => {
                if (obj) {
                    this.lastRec = parseInt(obj.srno, 10);
                } else {
                    this.lastRec = 508050;
                }
            });
        });
        this.spin = false;
    }
    getLogData(filter) {
        const result = [];
        return this.db.machinelog.where(["ioport+start_time"])
            .between([filter.ioport, filter.start_time], [filter.ioport, filter.end_time])
            .toArray(arr => {
                arr.forEach(item => {
                    const opname = this.getFieldValue(item.opid, app.operatorList, 'opname');
                    const jobname = this.getFieldValue(item.jobno, app.jobList, 'jobname');
                    const macname = this.getFieldValue(parseInt(item.ioport, 10), app.machines, 'name');
                    result.push({
                        macname,
                        opname,
                        jobname,
                        start_time: moment(item.start_time).format('DD/MM/YY HH:mm:ss'),
                        end_time: moment(item.end_time).format('DD/MM/YY HH:mm:ss'),
                        idletime: moment.utc(parseInt(item.idletime, 10) * 1000).format('HH:mm:ss'),
                        cycletime: moment.utc(parseInt(item.cycletime, 10) * 1000).format('HH:mm:ss')

                    });
                });
                return result;
            });

    }
    jobCountList(col, filter) {
        const result = [];
        return this.getJobCount(col, filter, result);

    }
    getJobCount = (col, filter, result) => {
        const value = filter[col];
        let cond = `[${col}+start_time]`;
        let val1 = [value, filter.start_time];
        let val2 = [value, filter.end_time];
        if (filter.ioport === "0" &&
            filter.opid === "0" &&
            filter.jobno === "0") {
            cond = 'start_time';
            val1 = filter.start_time;
            val2 = filter.end_time;
        }
        return this.db.machinelog.where(cond)
            .between(val1, val2).toArray().then(objectArray => {
                const temp = objectArray.reduce(function (acc, obj) {
                    var mc = obj.ioport;
                    var op = obj.opid;
                    var job = obj.jobno;
                    if (!acc[mc]) {
                        acc[mc] = [];
                    }
                    if (!acc[mc][op]) {
                        acc[mc][op] = [];
                    }
                    if (!acc[mc][op][job]) {
                        acc[mc][op][job] = [];
                    }

                    var start_time = moment(obj.start_time);
                    var date = moment(obj.start_time).format("YYYY-MM-DD");

                    var morningStart = moment(date + " 00:00:00", "YYYY-MM-DD HH:mm:ss")
                    var morningEnd = moment(date + " 08:00:00", "YYYY-MM-DD HH:mm:ss")

                    var shift1Start = moment(date + " 08:00:00", "YYYY-MM-DD HH:mm:ss")
                    var shift2End = moment(date + " 20:00:00", "YYYY-MM-DD HH:mm:ss")

                    if (!acc[mc][op][job][date]) {
                        acc[mc][op][job][date] = [];
                        acc[mc][op][job][date].shift1Count = 0;
                        acc[mc][op][job][date].shift2Count = 0;
                    }
                    if (start_time.isSameOrAfter(morningStart) &&
                        start_time.isBefore(morningEnd)) {
                        const prev_time = start_time.subtract(1, "days");
                        const prevdate = moment(prev_time).format("YYYY-MM-DD");
                        if (!acc[mc][op][job][prevdate]) {
                            acc[mc][op][job][prevdate] = [];
                            acc[mc][op][job][prevdate].shift2Count = 0;
                        }
                        acc[mc][op][job][prevdate].shift2Count += 1;
                    } else if (start_time.isSameOrAfter(shift1Start) &&
                        start_time.isBefore(shift2End)) {
                        acc[mc][op][job][date].shift1Count += 1;
                    } else {
                        acc[mc][op][job][date].shift2Count += 1;

                    }

                    return acc;
                }, {});
                for (var mc in temp) {
                    for (var op in temp[mc]) {
                        for (var job in temp[mc][op]) {
                            for (var date in temp[mc][op][job]) {

                                const macname = this.getFieldValue(parseInt(mc, 10), app.machines, 'name');
                                const opname = this.getFieldValue(op, app.operatorList, 'opname');
                                const jobname = this.getFieldValue(job, app.jobList, 'jobname');
                                const shift1Count = temp[mc][op][job][date].shift1Count;
                                const shift2Count = temp[mc][op][job][date].shift2Count;
                                result.push({ macname, opname, jobname, date, shift1Count, shift2Count });
                            }
                        }
                    }
                }
                return result;
            });
    }
    getFieldValue(id, list, prop) {
        if (id) {
            const obj = list.filter(x => x.id === id)[0];
            return obj ? obj[prop] : '';
        }
    }
    addLogs = logs => {
        if (logs) {
            if (logs.length > 0) {
                this.lastRec = parseInt(logs[logs.length - 1].srno, 10) + 1;
            }
            return Promise.all(logs.map(log => {
                log.srno = parseInt(log.srno, 10);
                log.start_time = new Date(log.start_time);
                log.end_time = new Date(log.end_time);
                return this.db.machinelog.put(log);
            }));
        }
        return Promise.resolve();
    }
    getList = table => {
        return this.db[table].toArray();
    }
    addList = (list, table) => {
        console.log(list);
        this.db[table].clear();
        if (list) {
            return Promise.all(list.map(item => {
                return this.db[table].put(item);
            }));
        }
        return Promise.resolve();
    }
}