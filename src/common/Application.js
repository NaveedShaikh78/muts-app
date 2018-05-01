export default class Application {

  constructor() {
    this.spin = false;
  }
  idleList = [];
  operatorList = [];
  jobList = [];
  spinOn = () => {
    this.appmain.setState({
      showSpin: true
    });
    this.spin = true;
  }
  showLoginDialog = (show) => {
    return this.loginDialog.show(show);
  }
  spinOff = () => {
    this.spin = false;
    this.appmain.setState({
      showSpin: false
    });
  }
}
