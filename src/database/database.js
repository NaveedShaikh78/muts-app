import Dexie from 'dexie';
export default class Database {
    constructor() {
        this.db = new Dexie("loggerdb");
        this.db.version(1).stores({ machinelog: "++srno, start_time, end_time, cycletime,idletime, ioport, jobno, opid" });
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
    addLogs = logs => {
        console.log(logs);
        if (logs) {
            if (logs.length > 0) {
                this.lastRec = parseInt(logs[logs.length - 1].srno) + 1, 10;
            }
            return Promise.all(logs.map(log => {
                log.srno = parseInt(log.srno,10);
                log.start_time = new Date(log.start_time);
                log.start_time = new Date(log.end_time);
                return this.db.machinelog.put(log);
            }));
        }
        return Promise.resolve();
    }
}