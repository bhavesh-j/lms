import AbstractComponent from '../abstract/abstract.component';
import SelectClass from '../selectclass/selectclass.component';
import { baseurl } from '../../shared/baseurl';

class Payments extends AbstractComponent {
  constructor() {
    super();
    this.state = {
      classes: [],
      students: [],
      studentsSearchParam: {
        name: '',
        classId: ''
      },
      feeMasterClass: '',
      showFeeScreen: false,
      feeResources: null,
      feeToPay: 0,
      selectedFeeParams: null,
      showReceipt: false,
      invoice: null,
      feeMasterStructures: []
    }
    this.openPayFeeScreen = this.openPayFeeScreen.bind(this);
    this.toggleAvailed = this.toggleAvailed.bind(this);
    this.checkFeeValidity = this.checkFeeValidity.bind(this);
    this.getTotalFee = this.getTotalFee.bind(this);
    this.handleSubmitFee = this.handleSubmitFee.bind(this);
    this.printReceipt = this.printReceipt.bind(this);
    this.handleFeeStructureRequest = this.handleFeeStructureRequest.bind(this);
    this.handleFeeStructureUpdate = this.handleFeeStructureUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchClasses()
    .then(classes => {
      this.setState({classes: classes});
      return this.handleStudentSearch(null, 'students', 'student/due-fees');
    }).catch(err => console.log(err));
  }

  toggleAvailed(index) {
    const feeStructure = this.state.feeResources.feeStructures;
    feeStructure[index].availed = !feeStructure[index].availed;
    this.setState({feeStructure: feeStructure});
  }

  openPayFeeScreen(studentId, classId) {
    this.setState({
      showFeeScreen: true,
      selectedFeeParams: {
        studentId: studentId,
        classId: classId
      }
    });
    this.callServerMethod('student/'+studentId+'/'+classId+'/fee-info')
    .then(res => {
      const paidFees = res.paidFees;
      res.feeStructures.forEach((structure, index) => {
        const paid = (paidFees[structure.id] ? paidFees[structure.id].paidAmount : 0);
        let availed = paid!=null;
        if(availed) {
            if(structure.particular.toLowerCase().includes('hostel') || structure.particular.toLowerCase().includes('transport')) {
                availed = false;
            }
        }
        res.feeStructures[index].availed = availed;
      });
      this.setState({
        feeResources: res,
        selectedFeeParams: {
          ...this.state.selectedFeeParams,
          fullName: res.student.firstName+' '+res.student.lastName,
          className: res.student.className
        }
      });
    }).catch(err => console.log(err));
  }

  getTotalFee(key='amount') {
    return this.state.feeResources.feeStructures.reduce((total, structure) => {
      if(structure.availed) total += structure[key];
      return total;
    }, 0);
  }

  checkFeeValidity(event) {
    const value = event.target.value;
    if(isNaN(Number(value))) {
      return;
    }
    this.setState({feeToPay: value});
    const totalFee = this.getTotalFee();
    const feeToPay = Number(value);
    event.target.setCustomValidity((feeToPay > totalFee) ? "Fee amount is greate than "+totalFee+"!": "");
  }

  handleSubmitFee(event) {
    event.preventDefault();
    this.toggleLoading(true);
    const hostel = document.getElementById('avail-hostel-fee')
      ? document.getElementById('avail-hostel-fee').checked : false;
    const transport = document.getElementById('avail-transport-fee')
      ? document.getElementById('avail-hostel-fee').checked : false;
    this.callServerMethod('payfee', 'POST', {
      'Content-Type': 'application/json'
    }, JSON.stringify({
      classId: this.state.selectedFeeParams.classId,
      studentId: this.state.selectedFeeParams.studentId,
      hostel: hostel,
      transport: transport,
      amount: this.state.feeToPay,
      year: new Date().getFullYear().toString()
    })).then(res => {
      this.toggleLoading(false);
      console.log('Pay Successful!', res.message, 'success');
      this.setState({
        showReceipt: true,
        showFeeScreen: false,
        feeResources: null,
        invoice: {
          date: new Date(),
          amount: res.payload
        }
      });
    }).catch(err => console.log(err));
  }

  printReceipt() {
    this.printDocument('invoice');
  }

  handleFeeStructureRequest(event) {
    const classId = event.target.value;
    this.callServerMethod('feestructure/'+classId)
    .then(feeData => {
      this.setState({feeMasterStructures: feeData});
    }).catch(err => console.log(err));
  }

  handleFeeStructureUpdate(event) {
    event.preventDefault();
    const feeStructures = {};
    for(let index=0;index<event.target.length;index++) {
        const field = event.target[index];
        feeStructures[field.name] = field.value;
    }
    this.toggleLoading(true);
    fetch('https://lms.dabinventive.com/feestructure/update-structures', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feeStructures)
    }).then(res => res.text())
    .then(res => console.log(res));
    this.callServerMethod('feestructure/update-structures', 'PUT', {
      'Content-Type': 'application/json'
    }, JSON.stringify(feeStructures))
    .then(feeData => {
      this.toggleLoading(false);
      console.log('Success', 'Fee information updated successfully!', 'success');
      this.setState({feeMasterStructures: feeData});
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="page">
        {/* Start Page header */}
        <div className="section-body" id="page_top">
          <div className="container-fluid">
            <div className="page-header">
              <div className="left">                        
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="What you want to find" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Search</button>
                  </div>
                </div>
              </div>
              <div className="right">
                <ul className="nav nav-pills">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="page-empty.html">Empty page</a>
                      <a className="dropdown-item" href="page-profile.html">Profile</a>
                      <a className="dropdown-item" href="page-search.html">Search Results</a>
                      <a className="dropdown-item" href="page-timeline.html">Timeline</a>
                      <a className="dropdown-item" href="page-invoices.html">Invoices</a>
                      <a className="dropdown-item" href="page-pricing.html">Pricing</a>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Auth</a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="login.html">Login</a>
                      <a className="dropdown-item" href="register.html">Register</a>
                      <a className="dropdown-item" href="forgot-password.html">Forgot password</a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="404.html">404 error</a>
                      <a className="dropdown-item" href="500.html">500 error</a>
                    </div>
                  </li>
                </ul>
                <div className="notification d-flex">
                  <div className="dropdown d-flex">
                    <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i className="fa fa-language" /></a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                      <a className="dropdown-item" href="#"><img className="w20 mr-2" src="../assets/images/flags/us.svg" alt="" />English</a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="#"><img className="w20 mr-2" src="../assets/images/flags/es.svg" alt="" />Spanish</a>
                      <a className="dropdown-item" href="#"><img className="w20 mr-2" src="../assets/images/flags/jp.svg" alt="" />japanese</a>
                      <a className="dropdown-item" href="#"><img className="w20 mr-2" src="../assets/images/flags/bl.svg" alt="" />France</a>
                    </div>
                  </div>
                  <div className="dropdown d-flex">
                    <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i className="fa fa-envelope" /><span className="badge badge-success nav-unread" /></a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                      <ul className="right_chat list-unstyled w350 p-0">
                        <li className="online">
                          <a href="javascript:void(0);" className="media">
                            <img className="media-object" src="../assets/images/xs/avatar4.jpg" alt="" />
                            <div className="media-body">
                              <span className="name">Donald Gardner</span>
                              <div className="message">It is a long established fact that a reader</div>
                              <small>11 mins ago</small>
                              <span className="badge badge-outline status" />
                            </div>
                          </a>
                        </li>
                        <li className="online">
                          <a href="javascript:void(0);" className="media">
                            <img className="media-object " src="../assets/images/xs/avatar5.jpg" alt="" />
                            <div className="media-body">
                              <span className="name">Wendy Keen</span>
                              <div className="message">There are many variations of passages of Lorem Ipsum</div>
                              <small>18 mins ago</small>
                              <span className="badge badge-outline status" />
                            </div>
                          </a>                            
                        </li>
                        <li className="offline">
                          <a href="javascript:void(0);" className="media">
                            <img className="media-object " src="../assets/images/xs/avatar2.jpg" alt="" />
                            <div className="media-body">
                              <span className="name">Matt Rosales</span>
                              <div className="message">Contrary to popular belief, Lorem Ipsum is not simply</div>
                              <small>27 mins ago</small>
                              <span className="badge badge-outline status" />
                            </div>
                          </a>                            
                        </li>
                        <li className="online">
                          <a href="javascript:void(0);" className="media">
                            <img className="media-object " src="../assets/images/xs/avatar3.jpg" alt="" />
                            <div className="media-body">
                              <span className="name">Phillip Smith</span>
                              <div className="message">It has roots in a piece of classical Latin literature from 45 BC</div>
                              <small>33 mins ago</small>
                              <span className="badge badge-outline status" />
                            </div>
                          </a>                            
                        </li>                        
                      </ul>
                      <div className="dropdown-divider" />
                      <a href="javascript:void(0)" className="dropdown-item text-center text-muted-dark readall">Mark all as read</a>
                    </div>
                  </div>
                  <div className="dropdown d-flex">
                    <a className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i className="fa fa-bell" /><span className="badge badge-primary nav-unread" /></a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                      <ul className="list-unstyled feeds_widget">
                        <li>
                          <div className="feeds-left">
                            <span className="avatar avatar-blue"><i className="fa fa-check" /></span>
                          </div>
                          <div className="feeds-body ml-3">
                            <p className="text-muted mb-0">Campaign <strong className="text-blue font-weight-bold">Holiday</strong> is nearly reach budget limit.</p>
                          </div>
                        </li>
                        <li>
                          <div className="feeds-left">
                            <span className="avatar avatar-green"><i className="fa fa-user" /></span>
                          </div>
                          <div className="feeds-body ml-3">
                            <p className="text-muted mb-0">New admission <strong className="text-green font-weight-bold">32</strong> in computer department.</p>
                          </div>
                        </li>
                        <li>
                          <div className="feeds-left">
                            <span className="avatar avatar-red"><i className="fa fa-info" /></span>
                          </div>
                          <div className="feeds-body ml-3">
                            <p className="text-muted mb-0">6th sem result <strong className="text-red font-weight-bold">67%</strong> in computer department.</p>
                          </div>
                        </li>
                        <li>
                          <div className="feeds-left">
                            <span className="avatar avatar-azure"><i className="fa fa-thumbs-o-up" /></span>
                          </div>
                          <div className="feeds-body ml-3">
                            <p className="text-muted mb-0">New Feedback <strong className="text-azure font-weight-bold">53</strong> for university assessment.</p>
                          </div>
                        </li>
                      </ul>
                      <div className="dropdown-divider" />
                      <a href="javascript:void(0)" className="dropdown-item text-center text-muted-dark readall">Mark all as read</a>
                    </div>
                  </div>
                  <div className="dropdown d-flex">
                    <a href="javascript:void(0)" className="chip ml-3" data-toggle="dropdown">
                      <span className="avatar" style={{backgroundImage: 'url(../assets/images/xs/avatar5.jpg)'}} /> George</a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                      <a className="dropdown-item" href="page-profile.html"><i className="dropdown-icon fe fe-user" /> Profile</a>
                      <a className="dropdown-item" href="app-setting.html"><i className="dropdown-icon fe fe-settings" /> Settings</a>
                      <a className="dropdown-item" href="app-email.html"><span className="float-right"><span className="badge badge-primary">6</span></span><i className="dropdown-icon fe fe-mail" /> Inbox</a>
                      <a className="dropdown-item" href="javascript:void(0)"><i className="dropdown-icon fe fe-send" /> Message</a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="javascript:void(0)"><i className="dropdown-icon fe fe-help-circle" /> Need help?</a>
                      <a className="dropdown-item" href="login.html"><i className="dropdown-icon fe fe-log-out" /> Sign out</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start Page title and tab */}
        <div className="section-body">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center ">
              <div className="header-action">
                <h1 className="page-title">Fees</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Ericsson</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Fees</li>
                </ol>
              </div>
              <ul className="nav nav-tabs page-header-tab">
                <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Fees-all">List</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Fees-Receipt">Fees Receipt</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#fee-master">Fee Master</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Fees-add">Add Fees</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="section-body mt-4">
          <div className="container-fluid">
            <div className="tab-content">
              <div className="tab-pane active" id="Fees-all">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover text-nowrap js-basic-example dataTable table-striped table_custom border-style spacing5">
                        <thead>
                          <tr>
                            <th>Roll No.</th>
                            <th>Student Name</th>
                            <th>Fees Type</th>
                            <th>Date</th>
                            <th>Invoice No.</th>
                            <th>Payment Type</th>
                            <th>Status</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>111</td>
                            <td>Corrine Johnson</td>
                            <td>Annual</td>
                            <td>12 Jan 2018</td>
                            <td>IN-4578</td>
                            <td>cash</td>
                            <td><span className="tag tag-green">paid</span></td>
                            <td>248$</td>
                          </tr>
                          <tr>
                            <td>112</td>
                            <td>Gladys Smith</td>
                            <td>Tuition</td>
                            <td>12 Feb 2018</td>
                            <td>IN-3695</td>
                            <td>cheque</td>
                            <td><span className="tag tag-orange">pending</span></td>
                            <td>124$</td>
                          </tr>
                          <tr>
                            <td>113</td>
                            <td>Alice Smith</td>
                            <td>Annual</td>
                            <td>24 Feb 2018</td>
                            <td>IN-4679</td>
                            <td>credit card</td>
                            <td><span className="tag tag-red">unpaid</span></td>
                            <td>340$</td>
                          </tr>
                          <tr>
                            <td>114</td>
                            <td>Gladys Smith</td>
                            <td>Tuition</td>
                            <td>25 Feb 2018</td>
                            <td>IN-2839</td>
                            <td>cashn</td>
                            <td><span className="tag tag-green">paid</span></td>
                            <td>112$</td>
                          </tr>
                          <tr>
                            <td>115</td>
                            <td>Corrine Johnson</td>
                            <td>Transport</td>
                            <td>12 March 2018</td>
                            <td>IN-4916</td>
                            <td>cheque</td>
                            <td><span className="tag tag-green">paid</span></td>
                            <td>340$</td>
                          </tr>
                          <tr>
                            <td>116</td>
                            <td>Gladys Smith</td>
                            <td>Tuition</td>
                            <td>12 May 2018</td>
                            <td>IN-7542</td>
                            <td>cashn</td>
                            <td><span className="tag tag-red">unpaid</span></td>
                            <td>421$</td>
                          </tr>
                          <tr>
                            <td>117</td>
                            <td>Alice Smith</td>
                            <td>Transport</td>
                            <td>12 May 2018</td>
                            <td>IN-8653</td>
                            <td>credit card</td>
                            <td><span className="tag tag-orange">pending</span></td>
                            <td>124$</td>
                          </tr>
                          <tr>
                            <td>118</td>
                            <td>Gladys Smith</td>
                            <td>Library</td>
                            <td>12 May 2018</td>
                            <td>IN-4859</td>
                            <td>cheque</td>
                            <td><span className="tag tag-green">paid</span></td>
                            <td>485$</td>
                          </tr>
                          <tr>
                            <td>119</td>
                            <td>Alice Smith</td>
                            <td>Annual</td>
                            <td>12 Jun 2018</td>
                            <td>IN-2648</td>
                            <td>cheque</td>
                            <td><span className="tag tag-orange">pending</span></td>
                            <td>231$</td>
                          </tr>
                          <tr>
                            <td>120</td>
                            <td>Corrine Johnson</td>
                            <td>Tuition</td>
                            <td>21 Jun 2018</td>
                            <td>IN-4875</td>
                            <td>cashn</td>
                            <td><span className="tag tag-green">paid</span></td>
                            <td>4856$</td>
                          </tr>
                          <tr>
                            <td>121</td>
                            <td>Gladys Smith</td>
                            <td>Transport</td>
                            <td>28 Jun 2018</td>
                            <td>IN-7946</td>
                            <td>credit card</td>
                            <td><span className="tag tag-red">unpaid</span></td>
                            <td>340$</td>
                          </tr>
                          <tr>
                            <td>122</td>
                            <td>Ken Smith</td>
                            <td>Annual</td>
                            <td>12 Jun 2018</td>
                            <td>IN-9135</td>
                            <td>cheque</td>
                            <td><span className="tag tag-orange">pending</span></td>
                            <td>340$</td>
                          </tr>
                          <tr>
                            <td>123</td>
                            <td>Corrine Johnson</td>
                            <td>Annual</td>
                            <td>22 Jun 2018</td>
                            <td>IN-5284</td>
                            <td>credit card</td>
                            <td><span className="tag tag-orange">pending</span></td>
                            <td>340$</td>
                          </tr>
                          <tr>
                            <td>124</td>
                            <td>Ken Smith</td>
                            <td>Transport</td>
                            <td>18 Aug 2018</td>
                            <td>IN-4613</td>
                            <td>cashn</td>
                            <td><span className="tag tag-green">paid</span></td>
                            <td>254$</td>
                          </tr>
                          <tr>
                            <td>125</td>
                            <td>Emmett Johnson</td>
                            <td>Annual</td>
                            <td>13 Aug 2018</td>
                            <td>IN-1826</td>
                            <td>credit card</td>
                            <td><span className="tag tag-red">unpaid</span></td>
                            <td>340$</td>
                          </tr>
                          <tr>
                            <td>126</td>
                            <td>Ken Smith</td>
                            <td>Library</td>
                            <td>17 Aug 2018</td>
                            <td>IN-76149</td>
                            <td>cashn</td>
                            <td><span className="tag tag-green">paid</span></td>
                            <td>340$</td>
                          </tr>
                          <tr>
                            <td>127</td>
                            <td>Emmett Johnson</td>
                            <td>Annual</td>
                            <td>4 Sept 2018</td>
                            <td>IN-3794</td>
                            <td>credit card</td>
                            <td><span className="tag tag-orange">pending</span></td>
                            <td>548$</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="Fees-Receipt">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">#AB0017</h3>
                    <div className="card-options">
                      <button type="button" className="btn btn-primary"><i className="si si-printer" /> Print Invoice</button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row my-8">
                      <div className="col-6">
                        <p className="h3">Company</p>
                        <address>
                          Street Address<br />
                          State, City<br />
                          Region, Postal Code<br />
                          ltd@example.com
                        </address>
                      </div>
                      <div className="col-6 text-right">
                        <p className="h3">Client</p>
                        <address>
                          Street Address<br />
                          State, City<br />
                          Region, Postal Code<br />
                          ctr@example.com
                        </address>
                      </div>
                    </div>
                    <div className="table-responsive push">
                      <table className="table table-bordered table-hover text-nowrap">
                        <tbody><tr>
                            <th className="text-center width35" />
                            <th>Product</th>
                            <th className="text-center" style={{width: '1%'}}>Qnt</th>
                            <th className="text-right" style={{width: '1%'}}>Unit</th>
                            <th className="text-right" style={{width: '1%'}}>Amount</th>
                          </tr>
                          <tr>
                            <td className="text-center">1</td>
                            <td>
                              <p className="font600 mb-1">Logo Creation</p>
                              <div className="text-muted">Logo and business cards design</div>
                            </td>
                            <td className="text-center">1</td>
                            <td className="text-right">$1.800,00</td>
                            <td className="text-right">$1.800,00</td>
                          </tr>
                          <tr>
                            <td className="text-center">2</td>
                            <td>
                              <p className="font600 mb-1">Online Store Design &amp; Development</p>
                              <div className="text-muted">Design/Development for all popular modern browsers</div>
                            </td>
                            <td className="text-center">1</td>
                            <td className="text-right">$20.000,00</td>
                            <td className="text-right">$20.000,00</td>
                          </tr>
                          <tr>
                            <td className="text-center">3</td>
                            <td>
                              <p className="font600 mb-1">App Design</p>
                              <div className="text-muted">Promotional mobile application</div>
                            </td>
                            <td className="text-center">1</td>
                            <td className="text-right">$3.200,00</td>
                            <td className="text-right">$3.200,00</td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="font600 text-right">Subtotal</td>
                            <td className="text-right">$25.000,00</td>
                          </tr>
                          <tr className="bg-light">
                            <td colSpan={4} className="font600 text-right">Vat Rate</td>
                            <td className="text-right">20%</td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="font600 text-right">Vat Due</td>
                            <td className="text-right">$5.000,00</td>
                          </tr>
                          <tr className="bg-green text-light">
                            <td colSpan={4} className="font700 text-right">Total Due</td>
                            <td className="font700 text-right">$30.000,00</td>
                          </tr>
                        </tbody></table>
                    </div>
                    <p className="text-muted text-center">Thank you very much for doing business with us. We look forward to working with you again!</p>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="fee-master">
                <div className="container card">
                  <div className="card-header row">
                    <div className="col-12 row">
                      <label className="col-auto font-weight-bold mt-2 mr-4"> Class</label>
                      <div className="col-lg-4 col-md-5 col-sm-6">
                        <SelectClass classes={this.state.classes} disabledFirst={true}
                          value={this.state.feeMasterClass}
                          onChange={event => {
                            this.setState({feeMasterClass: event.target.value, feeMasterStructures: []});
                            this.handleFeeStructureRequest(event); 
                          }} />
                      </div>
                    </div>
                  </div>
                  <div className="row card-body" style={{minHeight: '30em'}}>
                    {this.state.feeMasterClass && !this.state.feeMasterStructures.length ?
                    <div className="col-12" id="fee-structure-loading">
                      <div className="spinner-border m-4" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div> : null }
                    <form onSubmit={event => this.handleFeeStructureUpdate(event)}
                      className="col-12 col-sm-10 col-md-8" id="structure-form">
                        {this.state.feeMasterStructures.map((structure, index) => {
                          return (
                            <div class="form-group row" key={index}>
                              <label class="col-4 font-weight-bold">{structure.particular}</label>
                              <input type="text" name={structure.particularId+'-'+(structure.id ? structure.id : '')}
                                value={structure.amount} class="col form-control" required min="0"
                                onChange={event => this.handleInputChange(event, 'feeMasterStructures.'+index+'.amount', 'number')}/>
                          </div>
                          );
                        })}
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="Fees-add">
                <form className="card" onSubmit={event => {
                  this.setState({
                    showFeeScreen: false,
                    showReceipt: false,
                    feeResources: null,
                    selectedFeeParams: null
                  });
                    this.handleStudentSearch(event, 'students', 'student/due-fees');
                  }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Name"
                            value={this.state.studentsSearchParam.name}
                            onChange={event => this.handleInputChange(event, 'studentsSearchParam.name')} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-9 col-sm-6">
                        <SelectClass classes={this.state.classes} disabledFirst={false}
                          value={this.state.studentsSearchParam.classId}
                          onChange={event => this.handleInputChange(event, 'studentsSearchParam.classId')} />
                      </div>
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <button type="submit" className="btn btn-sm btn-primary btn-block" title>Search</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="table-responsive card">
                  {!this.state.showFeeScreen && !this.state.showReceipt ?
                  <table id="student-table" className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                    <thead>
                      <tr>
                        <th />
                        <th>Name</th>
                        <th>Class</th>
                        <th>Due Fee</th>
                        <th>Collect Fee</th>
                      </tr>
                    </thead>
                    <tbody id="student-table-content">
                      {this.state.students.map(student => {
                        return (
                          <tr key={student.id}>
                            <td class="w-60">
                                <img class="avatar" src={student.photo ? student.photo : baseurl+'uploads/default.jpg'} alt="" />
                            </td>
                            <td>{student.fullName}</td>
                            <td>{student.className}</td>
                            <td>{student.fee}</td>
                            <td>
                                <button type="button" disabled={!student.fee}
                                  class="btn btn-primary"
                                    onClick={() => this.openPayFeeScreen(student.studentId, student.classId)}>
                                    Collect
                                </button>
                            </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table> : null}
                </div>
                {this.state.showFeeScreen ?
                <div className="card" id="pay-fee">
                  <div className="card-header">
                    <h3 className="card-title">Collect Fee</h3>
                    <div className="card-options ">
                      {/* <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                      <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a> */}
                    </div>
                  </div>
                  {!this.state.feeResources ?
                  <div id="pay-fee-loading" className="ml-4" style={{height: '20em'}}>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div> :
                  <div id="pay-fee-wrapper">
                    <div class="d-flex card-body">
                      <div class="col-12 col-md-5">
                              <div class="form-group row">
                                  <label class="col-md-4 font-weight-bold col-form-label">ID Number</label>
                                  <div class="col-md-8">
                                      {this.state.feeResources.student.id}
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label class="col-md-4 font-weight-bold col-form-label">Class</label>
                                  <div class="col-md-8">
                                      {this.state.feeResources.student.className}
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label class="col-md-4 font-weight-bold col-form-label">Section</label>
                                  <div class="col-md-8">
                                      {this.state.feeResources.student.sectionName}
                                  </div>
                              </div>
                          </div>    
                          <div class="col-12 col-md-5">   
                              <div class="form-group row">
                                  <label class="col-md-4 font-weight-bold col-form-label">Student Name </label>
                                  <div class="col-md-8">
                                      {this.state.feeResources.student.firstName} {this.state.feeResources.student.lastName}
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label class="col-md-4 font-weight-bold col-form-label">Gender</label>
                                  <div class="col-md-8">
                                      {this.state.feeResources.student.gender}
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label class="col-md-4 font-weight-bold col-form-label">Date Of Admission </label>
                                  <div class="col-md-8">
                                      {new Date(this.state.feeResources.student.dateOfAdmission).toDateString()}
                                  </div>
                              </div>                            
                      </div>
                      <div class="col-12 col-md-2">
                          <div class="col-md-9">
                              <img src={this.state.feeResources.student.photo
                                ? this.state.feeResources.student.photo : baseurl+'uploads/default.jpg'}
                                class="rounded float-left" alt="Profile" />
                          </div>
                      </div>
                  </div>
                  <div class="row m-3">
                      <table class="table table-bordered col-12">
                          <thead>
                              <th>Fee Particulars</th>
                              <th>Total Amount</th>
                              <th>Paid Amount</th>
                              <th>Balance (To be Paid)</th>
                              <th>Avail</th>
                          </thead>
                          <tbody>
                          {this.state.feeResources.feeStructures.map((structure, index) => {
                              const amount = structure.amount;
                              const paid = (this.state.feeResources.paidFees[structure.id] ?
                                this.state.feeResources.paidFees[structure.id].paidAmount : 0);
                                let availed = paid!=null;
                                if(availed) {
                                  if(structure.particular.toLowerCase().includes('hostel') || structure.particular.toLowerCase().includes('transport')) {
                                      availed = false;
                                  }
                                }
                              return (
                                <tr key={index}>
                                  <td>{structure.particular}</td>
                                  <td>{amount}</td>
                                  <td>{paid ? paid : 0}</td>
                                  <td>{structure.availed ? amount-paid: 0}</td>
                                  <td><input type="checkbox" class="form-check" disabled={availed}
                                      value={structure.availed}
                                      id={(structure.particular.toLowerCase().includes('hostel') ? 'avail-hostel-fee' : '')
                                        + (structure.particular.toLowerCase().includes('transport') ? ' avail-transport-fee' : '')}
                                      onChange={() => this.toggleAvailed(index)} />
                                  </td>
                                </tr>
                              );
                          })}
                              <tr>
                                  <td class="font-weight-bold">Total</td>
                                  <td>{this.getTotalFee()}</td>
                                  <td>{Object.values(this.state.feeResources.paidFees).reduce((total, fee) => {
                                    return total + fee.paidAmount;
                                  }, 0)}</td>
                                  <td id="total-fee">{this.getTotalFee() - Object.values(this.state.feeResources.paidFees).reduce((total, fee) => {
                                    return total + fee.paidAmount;
                                  }, 0)}</td>
                                  <td></td>
                              </tr>
                          </tbody>
                      </table>
                      <form class="form-group m-3" id="fee-submitter" onSubmit={event => this.handleSubmitFee(event)}>
                          <label for="fee-to-pay" class="pl-2">Capture fee:</label>
                          <div class="d-flex">
                              <input type="text" class="form-control" onChange={event => this.checkFeeValidity(event)} min="1" required id="fee-to-pay" placeholder="Enter amount to pay" />
                              <button type="submit" class="btn btn-primary">Submit</button>
                          </div>
                      </form>
                  </div>
                  </div>}
                </div> : null}
                {this.state.showReceipt ?
                <div className="card" id="receipt">
                  <div className="card-header">
                    <h3 className="card-title">#AB0017</h3>
                    <div className="card-options">
                      <button type="button" className="btn btn-primary" onClick={this.printReceipt}><i className="si si-printer" /> Print Invoice</button>
                    </div>
                  </div>
                  <div className="card-body" id="invoice">
                    <div className="row my-8">
                      <div className="col-6">
                        <p className="h3">School Full Name</p>
                        <address>
                          Street Address<br />
                          State, City<br />
                          Region, Postal Code<br />
                          ltd@example.com
                        </address>
                      </div>
                      <div className="col-6 text-right">
                        <p className="h3">{this.state.selectedFeeParams.fullName}</p>
                        {this.state.invoice.date.toDateString()}<br />
                        {this.state.selectedFeeParams.className}
                      </div>
                    </div>
                    <div className="table-responsive push">
                      <table className="table table-bordered table-hover text-nowrap">
                        <tbody><tr>
                            <th className="text-center width35" />
                            <th>Payment Method</th>
                            <th className>Date</th>
                            <th className="text-right" style={{width: '1%'}}>Amount</th>
                          </tr>
                          <tr>
                            <td className="text-center">1</td>
                            <td>
                              Cash Deposit
                            </td>
                            <td className>{this.state.invoice.date.toDateString()}</td>
                            <td className="text-right">Rs {this.state.invoice.amount}</td>
                          </tr>
                          <tr className="bg-green text-light">
                            <td colSpan={3} className="font700 text-right">Total Paid</td>
                            <td className="font700 text-right">Rs {this.state.invoice.amount}</td>
                          </tr>
                        </tbody></table>
                    </div>
                  </div>
                </div> : null}
              </div>
            </div>
          </div>
        </div>
        {/* Start main footer */}
        <div className="section-body">
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  Copyright © 2019 <a href="https://themeforest.net/user/puffintheme/portfolio">PuffinTheme</a>.
                </div>
                <div className="col-md-6 col-sm-12 text-md-right">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item"><a href="../doc/index.html">Documentation</a></li>
                    <li className="list-inline-item"><a href="javascript:void(0)">FAQ</a></li>
                    <li className="list-inline-item"><a href="javascript:void(0)" className="btn btn-outline-primary btn-sm">Buy Now</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
      );
    }
  };
export default Payments;