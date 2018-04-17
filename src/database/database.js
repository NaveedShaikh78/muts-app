import Dexie from 'dexie';
export default class Database {
    constructor() {
        var db = new Dexie("FriendDatabase");
        db.version(1).stores({ friends: "++srno, start_time, end_time, cycletime,idletime, ioport, jobno, opid" });
        this.spin = false;
    }
}