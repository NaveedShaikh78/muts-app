export default class Application {

  constructor() {
   this.spin = false;
  }
  idleList = [];
  operatorList = [];
  jobList = [];
  spinOn =()=> {
   this.spin =true;
  }
  spinOff =()=> {
   this.spin =false;
  }
}
