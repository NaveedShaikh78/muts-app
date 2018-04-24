
export default class Machine {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    setMacViewValues() {
        this.macView.setState({
            state: this.state,
            jobCount: this.jobCount,
            progress: this.progress,
            cycleTimer: this.cycleTimer,
            selOperator: this.selOperator.id,
            selJob: this.selJob.id,
            selIdle: this.selIdle.id
        });
    }
    setMacList(list) {
        this.macView.setState(list);
    }
}