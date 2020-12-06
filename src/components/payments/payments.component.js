import AbstractComponent from '../abstract/abstract.component';
import SelectClass from '../selectclass/selectclass.component';
import { baseurl } from '../../shared/baseurl';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// import swal from 'sweetalert';
import { toast } from 'toast-notification-alert';

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
      feeMasterStructures: [],
      feeAddons: null,
      installments: [],
      totalFee: 0,
      isInstallmentsLoading: false,
      installmentsCount: 0,
      inputInstallments: [],
      dueList: []
    }
    this.openPayFeeScreen = this.openPayFeeScreen.bind(this);
    this.toggleAvailed = this.toggleAvailed.bind(this);
    this.checkFeeValidity = this.checkFeeValidity.bind(this);
    this.getTotalFee = this.getTotalFee.bind(this);
    this.handleSubmitFee = this.handleSubmitFee.bind(this);
    this.printReceipt = this.printReceipt.bind(this);
    this.handleFeeStructureRequest = this.handleFeeStructureRequest.bind(this);
    this.handleFeeStructureUpdate = this.handleFeeStructureUpdate.bind(this);
    this.handleFeeInstallmentsRequest = this.handleFeeInstallmentsRequest.bind(this);
    this.handleFeeInstallmentsUpdate = this.handleFeeInstallmentsUpdate.bind(this);
    this.getInstallmentsList = this.getInstallmentsList.bind(this);
    this.updateLastAmount = this.updateLastAmount.bind(this);
  }

  componentDidMount() {
    this.fetchClasses()
    .then(classes => {
      if(this.isErrorPresent(classes)) {
        return;
      }
      this.setState({classes: classes});
      return this.handleStudentSearch(null, 'students', 'student/due-fees');
    }).catch(err => console.log(err));

    this.callServerMethod('student/due-list')
    .then(students => {
      console.log(students);
      if(this.isErrorPresent(students)) {
        return;
      }
      this.setState({dueList: students});
    })
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
      if(this.isErrorPresent(res)) {
        return;
      }
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
      if(this.isErrorPresent(res)) {
        return;
      }
      this.toggleLoading(false);
      toast.show({title: res.message, position: 'bottomright', type: 'success'});
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
      if(this.isErrorPresent(feeData)) {
        return;
      }
      this.setState({
        feeMasterStructures: feeData.feeStructures,
        feeAddons: feeData.feeAddons
      });
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
    this.callServerMethod('feestructure/update-structures', 'POST', {
      'Content-Type': 'application/json'
    }, JSON.stringify({...feeStructures, classId: this.state.feeAddons.classId}))
    .then(feeData => {
      if(this.isErrorPresent(feeData)) {
        return;
      }
      this.toggleLoading(false);
      toast.show({title: 'Fee information updated successfully!', position: 'bottomright', type: 'success'});
      this.setState({
        feeMasterStructures: feeData.feeStructures,
        feeAddons: feeData.feeAddons
      });
    }).catch(err => console.log(err));
  }

  handleFeeInstallmentsRequest(event) {
    const classId = event.target.value;
    this.setState({
      isInstallmentsLoading: true,
      installments: [],
      installmentsCount: 0,
      inputInstallments: []
    });
    this.callServerMethod(`feestructure/${classId}/installments`)
    .then(response => {
      console.log(response);
      if(this.isErrorPresent(response)) {
        return;
      }
      this.setState({
        isInstallmentsLoading: false,
        installments: response.installments,
        totalFee: response.totalFee,
        installmentsCount: response.installments.length,
        inputInstallments: response.installments
      });
    })
  }

  handleFeeInstallmentsUpdate(event) {
    event.preventDefault();
    this.setState({
      isInstallmentsLoading: true
    });
    const installments = this.state.installments.map(item => {
      return {
        ...item,
        installmentDate: this.setTimeZoneToUTC(new Date(item.installmentDate)),
        extendDate: this.setTimeZoneToUTC(new Date(item.extendDate))
      };
    });
    console.log(installments);
    const classId = this.state.installments[0].classId;
    this.callServerMethod(`feestructure/${classId}/installments`, 'POST',{
      'Content-Type': 'application/json'
    }, JSON.stringify(installments))
    .then(response => {
      if(this.isErrorPresent(response)) {
        return;
      }
      toast.show({title: 'Installments updated!', 'position': 'bottomright', 'type': 'success'});
      this.setState({
        isInstallmentsLoading: false,
        installments: response.installments,
        totalFee: response.totalFee,
        installmentsCount: response.installments.length,
        inputInstallments: response.installments
      });
    })
  }

  getInstallmentsList() {
    let list = this.copyObject(this.state.installments);
    const totalFee = this.state.totalFee;
    const parts = Math.round(totalFee / this.state.installmentsCount);
    list = list.map(el => {
      return {...el, amount: parts};
    });
    if(this.state.installmentsCount < this.state.installments.length) {
      list = list.slice(0, this.state.installmentsCount);
    } else {
      for(let i=this.state.installments.length;i<this.state.installmentsCount;i++) {
        list.push({
          "classId": this.state.feeMasterClass,
          "installmentDate": new Date(),
          "extendDate": new Date(),
          "amount": parts
        });
      }
    }
    list[list.length-1].amount += totalFee - list.reduce((total, el) => {
      total += Number(el.amount);
      return total;
    }, 0);
    this.setState({inputInstallments: list});
    return list;
  }

  updateLastAmount() {
    const list = this.state.inputInstallments;
    list[list.length-1].amount += this.state.totalFee - list.reduce((total, el) => {
      total += Number(el.amount);
      return total;
    }, 0);
    this.setState({inputInstallments: list});
  }

  render() {
    return (
      <div className="page">
        {/* Start Page header */}
        <Header />
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
              {/* <ul className="nav nav-tabs page-header-tab">
                <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Fees-all">List</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Fees-Receipt">Fees Receipt</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#fee-master" onClick={() => this.setState({feeMasterClass: ''})}>Fee Master</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Fees-add" id="fees-add-btn">Add Fees</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Installment-penalty" onClick={() => this.setState({feeMasterClass: ''})}>Installment & Penalties</a></li>
              </ul> */}
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
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Due Date</th>
                            <th>Due Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.dueList.map((dueFee, index) => {
                            return(
                              <tr key={index}>
                                <td>{dueFee.id}</td>
                                <td>{dueFee.firstName} {dueFee.lastName}</td>
                                <td>{new Date(dueFee.dueDate).toDateString()}</td>
                                <td>{dueFee.dueFee}</td>
                                <td><button className="btn btn-primary"
                                  onClick={() => {
                                    document.getElementById('fees-add-btn').click();
                                    this.openPayFeeScreen(dueFee.id, dueFee.classId);
                                  }}>Collect</button></td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {!this.state.dueList.length ?
                      <div class="noDataText">
                        <img class="noData d-block" src="../assets/images/undraw_No_data_re_kwbl.svg" alt="No Data" />
                        <strong>No Data Available :(</strong>
                      </div>
                    : null }
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
                        {this.state.feeAddons ?
                        <>
                          <div class="form-group row">
                            <label class="col-4 font-weight-bold">Panelty</label>
                            <div className="d-flex col">
                              <input type="text" name={'panelty-'+this.state.feeAddons.paneltyType}
                                value={this.state.feeAddons.panelty} class="form-control" required min="0"
                                onChange={event => this.handleInputChange(event, 'feeAddons.panelty', 'number')}/>
                              <select value={this.state.feeAddons.paneltyType} required={true} className="form-control"
                                onChange={event => this.handleInputChange(event, 'feeAddons.paneltyType')}>
                                <option value="Percentage">Percentage</option>
                                <option value="Flat Rate">Flat Rate</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group row">
                            <label class="col-4 font-weight-bold">3rd Sibling Discount</label>
                            <div className="d-flex col">
                              <input type="text" name={'siblingDiscount-'+this.state.feeAddons.siblingDiscountType}
                                value={this.state.feeAddons.siblingDiscount} class="form-control" required min="0"
                                onChange={event => this.handleInputChange(event, 'feeAddons.siblingDiscount', 'number')}/>
                              <select value={this.state.feeAddons.siblingDiscountType} required={true} className="form-control"
                                onChange={event => this.handleInputChange(event, 'feeAddons.siblingDiscountType')}>
                                <option value="Percentage">Percentage</option>
                                <option value="Flat Rate">Flat Rate</option>
                              </select>
                            </div>
                          </div>
                        </>
                        : null}
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
                                <img class="avatar" src={baseurl+(student.photo ? student.photo : 'uploads/default.jpg')} alt="" />
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
                              <img src={baseurl+(this.state.feeResources.student.photo
                                ? this.state.feeResources.student.photo : 'uploads/default.jpg')}
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
                            {this.state.feeResources.panelty ? 
                              <tr>
                                <td class="font-weight-bold">Panelty</td>
                                <td>{this.state.feeResources.panelty}</td>
                                <td></td>
                                <td></td>
                              </tr> : null}
                              {this.state.feeResources.siblintDiscount ? 
                              <tr>
                                <td class="font-weight-bold">3rd Sibling Discount</td>
                                <td>{this.state.feeResources.siblintDiscount}</td>
                                <td></td>
                                <td></td>
                              </tr> : null}
                              <tr>
                                  <td class="font-weight-bold">Total</td>
                                  <td>{this.getTotalFee()}</td>
                                  <td>{Object.values(this.state.feeResources.paidFees).reduce((total, fee) => {
                                    return total + fee.paidAmount;
                                  }, 0)}</td>
                                  <td id="total-fee">{this.getTotalFee() - Object.values(this.state.feeResources.paidFees).reduce((total, fee) => {
                                    return total + fee.paidAmount;
                                  }, 0) - this.state.feeResources.siblintDiscount + this.state.feeResources.panelty}</td>
                                  <td></td>
                              </tr>
                          </tbody>
                      </table>
                      <form class="form-group m-3" id="fee-submitter" onSubmit={event => this.handleSubmitFee(event)}>
                          <label for="fee-to-pay" class="pl-2">Capture fee:</label>
                          <div class="d-flex">
                              <input type="text" class="form-control" onChange={event => this.checkFeeValidity(event)} min="1" required id="fee-to-pay" placeholder="Enter amount to pay" />
                              <input type="text" class="form-control" placeholder="Enter method of payment" />
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
              <div className="tab-pane" id="Installment-penalty">
                <div className="container card">
                  <div className="card-header row">
                  <h3 className="card-title">INSTALLMENT MANAGEMENT</h3>
                    <div className="col-12 row mt-4">
                      <label className="col-auto font-weight-bold mt-2 mr-4"> Class</label>
                      <div className="col-lg-4 col-md-5 col-sm-6">
                        <SelectClass classes={this.state.classes} disabledFirst={true}
                          value={this.state.feeMasterClass}
                          onChange={event => {
                            this.setState({feeMasterClass: event.target.value, installments: []});
                            this.handleFeeInstallmentsRequest(event); 
                          }} />
                      </div>
                    </div>
                  </div>
                  <div className="row card-body" style={{minHeight: '30em'}}>
                    {this.state.isInstallmentsLoading ?
                    <div className="col-12" id="fee-structure-loading">
                      <div className="spinner-border m-4" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div> : null }
                    {!this.state.isInstallmentsLoading && this.state.feeMasterClass ?
                    <form onSubmit={event => this.handleFeeInstallmentsUpdate(event)}
                      className="col-12 col-sm-10 col-md-8" id="structure-form">                 
                            <div class="form-group row">
                              <label class="col-4 font-weight-bold">Total Fees Amount</label>
                              <input disabled value={this.state.totalFee} type="text" class="col form-control" required min="0"/>                              
                            </div>
                            <div class="form-group row mt-2">
                              <label class="col-4 font-weight-bold">Installment Duration</label>
                              <input type="number" value={this.state.installmentsCount} onChange={(event) => {
                                this.handleInputChange(event, 'installmentsCount', 'number');
                                setTimeout(() => this.getInstallmentsList(event.target), 10);
                              }} class="col form-control" required min="1"/>                              
                            </div>
                            <div class="row m-3">
                            <table class="table table-hover mt-4">
                                <thead>
                                  <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Installment Date</th>
                                    {/* <th scope="col">Extension</th> */}
                                    <th scope="col">Extended Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.inputInstallments.map((installment,index, arr) => {
                                    return (
                                      <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            <input type="text" value={installment.amount} className="form-cotrol" onChange={(event) => {
                                              this.handleInputChange(event, 'inputInstallments.'+index+'.amount');
                                              setTimeout(() => this.updateLastAmount(), 10);
                                            }} disabled={Number(index+1)===Number(arr.length)} required />
                                        </td>
                                        <td>
                                        <DatePicker selected={new Date(installment.installmentDate)}
                                          onChange={(event) => {
                                            this.handleInputChange(event, 'inputInstallments.'+index+'.installmentDate', 'date');
                                            this.handleInputChange(event, 'inputInstallments.'+index+'.extendDate', 'date');
                                          }} className="form-control" placeholderText="MM/DD/YYYY" required={true} /></td>
                                        {/* <td><input type="checkbox"/></td> */}
                                        <td>
                                        <DatePicker selected={new Date(installment.extendDate)}
                                          onChange={(event) => {
                                            this.handleInputChange(event, 'inputInstallments.'+index+'.extendDate', 'date');
                                          }} className="form-control" placeholderText="MM/DD/YYYY" required={true} />
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          <button type="submit" class="btn btn-primary mt-3">Save Changes</button>
                      </form>
                    : null}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start main footer */}
        <Footer />
      </div>
      );
    }
  };
export default Payments;