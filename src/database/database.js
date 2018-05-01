import Dexie from 'dexie';
let app;
export default class Database {
    constructor() {
        app = window.application;
        this.db = new Dexie("loggerdb");
        this.db.version(1).stores({ machinelog: "++srno, [ioport+start_time]" });
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
                arr.forEach(element => {
                    const opname = this.getFieldValue(element.opid, app.operatorList, 'opname');
                    const jobname = this.getFieldValue(element.jobno, app.jobList, 'jobname');
                    result.push({
                        ioport: element.ioport,
                        opname,
                        jobname,
                        start_time: element.start_time,
                        end_time: element.end_time
                    });
                });
                return result;
            });

    }
    jobCountList(filter) {
        const result = [];
        return this.db.machinelog.where(["ioport+start_time"])
            .between([filter.ioport, filter.start_time], [filter.ioport, filter.end_time]).toArray().then(objectArray => {
                const temp = objectArray.reduce(function (acc, obj) {
                    var mc = obj['ioport'];
                    var op = obj['opid'];
                    var job = obj['jobno'];
                    if (!acc[mc]) {
                        acc[mc] = [];
                    }
                    if (!acc[mc][op]) {
                        acc[mc][op] = [];
                        acc[mc][op];
                    }
                    if (!acc[mc][op][job]) {
                        acc[mc][op][job] = [];
                        acc[mc][op][job].jobcount = 0;
                    }

                    acc[mc][op][job].jobcount += 1;
                    return acc;
                }, {});
                for (var mc in temp) {
                    for (var op in temp[mc]) {
                        for (var job in temp[mc][op]) {

                            const opname = this.getFieldValue(op, app.operatorList, 'opname');
                            const jobname = this.getFieldValue(job, app.jobList, 'jobname');
                            const jobcount = temp[mc][op][job].jobcount;
                            result.push({ macname: mc, opname, jobname, jobcount });
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
                this.lastRec = parseInt(logs[logs.length - 1].srno) + 1, 10;
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