import AbstractComponent from '../abstract/abstract.component';
import { baseurl } from '../../shared/baseurl';
import SelectClass, {SelectClassSection} from '../selectclass/selectclass.component';
import { Link } from 'react-router-dom';


function StateDropdown(props) {
  return (
    <select disabled={props.readOnly} className="form-control input-height" name={props.name}
      value={props.value} onChange={props.onChange} required>
      <option value="" disabled selected>Select State</option>
      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
      <option value="Andhra Pradesh">Andhra Pradesh</option>
      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
      <option value="Assam">Assam</option>
      <option value="Bihar">Bihar</option>
      <option value="Chandigarh">Chandigarh</option>
      <option value="Chhattisgarh">Chhattisgarh</option>
      <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
      <option value="Daman and Diu">Daman and Diu</option>
      <option value="Delhi">Delhi</option>
      <option value="Goa">Goa</option>
      <option value="Gujarat">Gujarat</option>
      <option value="Haryana">Haryana</option>
      <option value="Himachal Pradesh">Himachal Pradesh</option>
      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
      <option value="Jharkhand">Jharkhand</option>
      <option value="Karnataka">Karnataka</option>
      <option value="Kerala">Kerala</option>
      <option value="Lakshadweep">Lakshadweep</option>
      <option value="Madhya Pradesh">Madhya Pradesh</option>
      <option value="Maharashtra">Maharashtra</option>
      <option value="Manipur">Manipur</option>
      <option value="Meghalaya">Meghalaya</option>
      <option value="Mizoram">Mizoram</option>
      <option value="Nagaland">Nagaland</option>
      <option value="Orissa">Orissa</option>
      <option value="Pondicherry">Pondicherry</option>
      <option value="Punjab">Punjab</option>
      <option value="Rajasthan">Rajasthan</option>
      <option value="Sikkim">Sikkim</option>
      <option value="Tamil Nadu">Tamil Nadu</option>
      <option value="Tripura">Tripura</option>
      <option value="Uttaranchal">Uttaranchal</option>
      <option value="Uttar Pradesh">Uttar Pradesh</option>
      <option value="West Bengal">West Bengal</option>
    </select>
  );
}

function AcademicYear(props) {
  return (
    <select disabled={props.readOnly} className="form-control input-height" name={props.name} required>
      <option value>Select Year</option>
      <option value="2020">2020</option>
      <option value="2019">2019</option>
      <option value="2018">2018</option>
      <option value="2017">2017</option>
      <option value="2016">2016</option>
      <option value="2015">2015</option>
      <option value="2014">2014</option>
      <option value="2013">2013</option>
      <option value="2012">2012</option>
      <option value="2011">2011</option>
      <option value="2010">2010</option>
      <option value="2009">2009</option>
      <option value="2008">2008</option>
      <option value="2007">2007</option>
      <option value="2006">2006</option>
      <option value="2005">2005</option>
      <option value="2004">2004</option>
      <option value="2003">2003</option>
      <option value="2002">2002</option>
      <option value="2001">2001</option>
      <option value="2000">2000</option>
      <option value="1999">1999</option>
      <option value="1998">1998</option>
      <option value="1997">1997</option>
      <option value="1996">1996</option>
      <option value="1995">1995</option>
      <option value="1994">1994</option>
      <option value="1993">1993</option>
      <option value="1992">1992</option>
      <option value="1991">1991</option>
      <option value="1990">1990</option>
    </select>
  );
}

class Students extends AbstractComponent {
  constructor() {
    super();
    this.state = {
      isStudentsLoading: false,
      students: [],
      classes: [],
      studentForm: {
        firstName: '',
        lastName: '',
        admissionForClass: '',
        classSection: '',
        dateOfBirth: '',
        placeOfBirth: '',
        nationality: '',
        gender: '',
        permanentAddress: {
          street: '',
          city: '',
          state: '',
          pincode: ''
        },
        caste: 'General',
        motherTongue: '',
        aadharNo: '',
        relegion: '',
        bloodGroup: 'A+',
        presentAddress: {
          street: '',
          city: '',
          state: '',
          pincode: ''
        },
        photo: '',
        parents: []
      },
      studentFormResources: {
        permanentAddress: '',
        presentAddress: '',
        permanentAndPresentAddressSame: false,
        father: {
          name: '',
          qualification: '',
          occupation: '',
          mobileNo: '',
          email: '',
          relationToStudent: 'Father'
        },
        mother: {
          name: '',
          qualification: '',
          occupation: '',
          mobileNo: '',
          email: '',
          relationToStudent: 'Mother'
        },
        guardian: {
          name: '',
          qualification: '',
          occupation: '',
          mobileNo: '',
          email: '',
          relationToStudent: 'Guardian'
        },
        parentOrGuardian: 'Parents',
        studentId: null
      },
      admissionFormErrors: [],
      submitAdmissionFee: false,
      feeList: [],
      feeToPay: 0,
      studentsSearchParam: {
        name: '',
        classId: ''
      },
      studentListForIdCard: [],
      studentListForIdCardSearchParam: {
        name: '',
        classId: ''
      },
      showIdCard: false,
      selectedStudentForIdCard: null
    };
    this.defaultFormValues = {
      studentForm: this.copyObject(this.state.studentForm),
      studentFormResources: this.copyObject(this.state.studentFormResources)
    };
    this.handleAdmissionFormSubmit = this.handleAdmissionFormSubmit.bind(this);
    this.showFeeForClass = this.showFeeForClass.bind(this);
    this.getTotalFee = this.getTotalFee.bind(this);
    this.checkFeeValidity = this.checkFeeValidity.bind(this);
    this.feeToggle = this.feeToggle.bind(this);
    this.handleSubmitFee = this.handleSubmitFee.bind(this);
    this.toggleFeeCard = this.toggleFeeCard.bind(this);
    this.generateIdCard = this.generateIdCard.bind(this);
    this.printIdCard = this.printIdCard.bind(this);
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "/assets/js/page/students.js";
    script.async = true;

    document.body.appendChild(script);

    this.setState({ isStudentsLoading: true });
    this.fetchClasses()
      .then(classes => {
        this.callServerMethod('student')
          .then(students => {
            this.setState({
              isStudentsLoading: false,
              students: students
            });
          });
        this.setState({ classes: classes });
      }).catch(err => console.log(err));
  }

  handleAdmissionFormSubmit(event) {
    event.preventDefault();
    this.toggleLoading(true);
    this.setState({ admissionFormErrors: [] });
    const permanentAddress = this.state.studentFormResources.permanentAddress.split(',');
    const admissionForm = this.copyObject(this.state.studentForm);
    admissionForm.permanentAddress.street = (permanentAddress.length > 1 ?
      permanentAddress.slice(0, permanentAddress.length - 1).join(',').trim()
      : permanentAddress.join(',').trim());
    admissionForm.permanentAddress.city = (permanentAddress.length > 1 ?
      permanentAddress[permanentAddress.length - 1].trim()
      : null);

    if (this.state.studentFormResources.permanentAndPresentAddressSame) {
      admissionForm.presentAddress = admissionForm.permanentAddress;
    } else {
      const presentAddress = this.state.studentFormResources.presentAddress.split(',');
      admissionForm.presentAddress.street = (presentAddress.length > 1 ?
        presentAddress.slice(0, presentAddress.length - 1).join(',').trim()
        : presentAddress.join(',').trim());
      admissionForm.presentAddress.city = (presentAddress.length > 1 ?
        presentAddress[presentAddress.length - 1].trim()
        : null);
    }
    admissionForm.classSection = Number(admissionForm.classSection);
    const photos = new FormData();
    const studentPhoto = document.getElementById('student-photo');
    if (studentPhoto.files && studentPhoto.files[0]) {
      photos.append('student', studentPhoto.files[0]);
    }
    if (this.state.studentFormResources.parentOrGuardian === 'Parents') {
      const fatherPhoto = document.getElementById('father-photo');
      if (fatherPhoto.files && fatherPhoto.files[0]) {
        photos.append('Father', fatherPhoto.files[0]);
      }
      admissionForm.parents.push(this.state.studentFormResources.father);
      const motherPhoto = document.getElementById('mother-photo');
      if (motherPhoto.files && motherPhoto.files[0]) {
        photos.append('Mother', motherPhoto.files[0]);
      }
      admissionForm.parents.push(this.state.studentFormResources.mother);
    } else {
      const guardianPhoto = document.getElementById('guardian-photo');
      if (guardianPhoto.files && guardianPhoto.files[0]) {
        photos.append('Guardian', guardianPhoto.files[0]);
      }
      admissionForm.parents.push(this.state.studentFormResources.guardian);
    }
    admissionForm.dateOfBirth = new Date(admissionForm.dateOfBirth);
    for (let i in admissionForm.parents) {
      const fullname = admissionForm.parents[i].name.split(' ');
      admissionForm.parents[i].firstName = fullname[0];
      admissionForm.parents[i].lastName = fullname[1];
    }
    this.callServerMethod('student/validate-admission-form-resources', 'POST', {
      'Content-Type': 'application/json'
    }, JSON.stringify(admissionForm)).then(res => {
      this.toggleLoading(false);
      if (typeof res === 'boolean') {
        if (res) {
          this.toggleLoading(true);
          this.callServerMethod('fileupload', 'POST', null, photos).then(urls => {
            admissionForm.photo = urls.student;
            for (let index = 0; index < admissionForm.parents.length; index++) {
              admissionForm.parents[index].photo = urls[admissionForm.parents[index].relationToStudent];
            }
            return this.callServerMethod('student/admission', 'POST', {
              'Content-Type': 'application/json'
            }, JSON.stringify(admissionForm));
          }).then(res => {
            this.toggleLoading(false);
            if (res.success) {
              alert('Form Submittes Form is successfully submitted success');
              this.showFeeForClass(admissionForm.admissionForClass, res.payload);
              const students = this.state.students;
              const admissionForClass = document.getElementById('admission-for-class');
              students.push({
                id: res.payload,
                firstName: admissionForm.firstName,
                lastName: admissionForm.lastName,
                className: admissionForClass.options[admissionForClass.selectedIndex].text,
                dateOfBirth: admissionForm.dateOfBirth,
                gender: admissionForm.gender,
                dateOfAdmission: new Date().toUTCString(),
                photo: admissionForm.photo
              });
              this.setState({
                students: students,
                studentFormResources: { ...this.state.studentFormResources, studentId: res.payload }
              });
              this.scrollTop();
            } else {
              let listErrors = [];
              if (res.message) {
                listErrors.push(res.message);
              } else {
                for (let key in res) {
                  res[key]._errors.forEach(msg => {
                    listErrors.push(msg['<ErrorMessage>k__BackingField']);
                  });
                }
              }
              this.setState({ admissionFormErrors: listErrors });
              this.scrollTop();
            }
          }).catch(err => console.log(err));
        } else {
          this.setState({
            admissionFormErrors: [`Aadhar Number ${admissionForm.aadharNo} already exists.`]
          });
          this.scrollTop();
        }
      } else {
        let listErrors = [];
        if (res.message) {
          listErrors.push(res.message);
        } else {
          for (let key in res) {
            res[key]._errors.forEach(msg => {
              listErrors.push(msg['<ErrorMessage>k__BackingField']);
            });
          }
        }
        this.setState({ admissionFormErrors: listErrors });
        this.scrollTop();
      }
    }).catch(err => console.log(err));
  }

  showFeeForClass(classId, studentId) {
    this.toggleLoading(true);
    this.callServerMethod('feestructure/' + classId)
      .then(feeList => {
        feeList.forEach((feeItem, index) => {
          const particular = feeItem.particular.toLowerCase();
          let toInclude = true;
          if (particular.includes('hostel') || particular.includes('transport')) {
            toInclude = false;
          }
          feeList[index].include = toInclude;
        });
        this.toggleLoading(false);
        this.setState({
          submitAdmissionFee: true,
          feeList: feeList,
        });
      }).catch(err => console.log(err));
  }

  resetAdmissionForm() {
    this.setState({
      studentForm: this.copyObject(this.defaultFormValues.studentForm),
      studentFormResources: this.copyObject(this.defaultFormValues.studentFormResources)
    });
    const tagId = (id) => document.getElementById(id);
    ['student', 'father', 'mother', 'guardian'].forEach(entity => {
      if (tagId(entity + '-photo')) tagId(entity + '-photo').value = '';
    });
  }

  getTotalFee() {
    return this.state.feeList.reduce((totalFee, feeItem) => {
      if (feeItem.include) totalFee += feeItem.amount;
      return totalFee;
    }, 0);
  }

  checkFeeValidity(event) {
    const value = event.target.value;
    if (isNaN(Number(value))) {
      return;
    }
    this.setState({ feeToPay: value });
    const totalFee = this.getTotalFee();
    const feeToPay = Number(value);
    event.target.setCustomValidity((feeToPay > totalFee) ? "Fee amount is greate than " + totalFee + "!" : "");
  }

  feeToggle(event, hint) {
    const feeList = this.state.feeList;
    feeList.forEach((feeItem, index) => {
      const particular = feeItem.particular.toLowerCase();
      if (particular.includes(hint)) {
        feeList[index].include = !feeList[index].include;
        return false;
      }
    });
    this.setState({ feeList: feeList });
  }

  toggleFeeCard() {
    this.resetAdmissionForm();
    this.setState({ submitAdmissionFee: false });
  }

  handleSubmitFee(event) {
    event.preventDefault();
    this.toggleLoading(true);
    const hostel = document.getElementById('avail-hostel-fee').checked;
    const transport = document.getElementById('avail-transport-fee').checked;
    const classId = this.state.studentForm.admissionForClass;
    const studentId = this.state.studentFormResources.studentId;
    const feeToPay = this.state.feeToPay;
    console.log(feeToPay);
    this.callServerMethod('payfee', 'POST', {
      'Content-Type': 'application/json'
    }, JSON.stringify({
      classId: classId,
      studentId: studentId,
      hostel: hostel,
      transport: transport,
      amount: feeToPay,
      year: new Date().getFullYear().toString()
    })).then(res => {
      this.toggleLoading(false);
      console.log('Pay Successful!', res.message, 'success');
      this.toggleFeeCard();
      this.setState({ feeToPay: 0 });
    }).catch(err => console.log(err));
  }

  generateIdCard(studentIndex) {
    const studentId = this.state.studentListForIdCard[studentIndex].id;
    this.setState({ showIdCard: true });
    this.callServerMethod('student/' + studentId)
      .then(student => {
        this.setState({
          selectedStudentForIdCard: student
        });
      }).catch(err => console.log(err));
  }

  printIdCard() {
    this.printDocument('id-card-wrapper');
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
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
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
                      <span className="avatar" style={{ backgroundImage: 'url(../assets/images/xs/avatar5.jpg)' }} /> George</a>
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
                <h1 className="page-title">Students</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Ericsson</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Students</li>
                </ol>
              </div>
              <ul className="nav nav-tabs page-header-tab">
                <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Student-all">List View</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#generate-id-card">Generate Id Card</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Student-profile">Profile</a></li>
                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#Student-add">Add</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="section-body mt-4">
          <div className="container-fluid">
            <div className="tab-content">
              <div className="tab-pane active" id="Student-all">
                <form className="card" onSubmit={event => this.handleStudentSearch(event, 'students')}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Name"
                            value={this.state.studentsSearchParam.name}
                            onChange={event => this.handleInputChange(event, 'studentsSearchParam.name')} />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="StudentUID" />
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
                  <table id="student-table" className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                    <thead>
                      <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Emergency Contact</th>
                        <th>Contact Number</th>
                        <th></th>
                      </tr>
                    </thead>
                    {this.state.isStudentsLoading ?
                    <div class="d-flex justify-content-center">
                      <div class="spinner-border text-info my-5" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div> : null}
                    <tbody>
                        {this.state.students.map(student => {
                          return (
                            <tr key={student.id}>
                                <td style={{width: 60}}>
                                    <img className="avatar" src={baseurl+(student.photo ? student.photo : 'uploads/default.jpg')} alt="" />
                                </td>
                                <td>{student.id}</td>
                                <td>{student.firstName} {student.lastName}</td>
                                <td>{student.className}</td>
                                <td>{new Date(student.dateOfBirth).toDateString()}</td>
                                <td>{student.gender}</td>
                                <td>{student.emergencyContact.firstName} {student.emergencyContact.lastName}</td>
								                <td>{student.emergencyContact.mobileNo}</td>
                                <td>
                                    <Link to={"view-student/"+student.id}><button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button></Link>
                                    <Link to={"edit-student/"+student.id}><button type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit"></i></button></Link>
                                    <button type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i className="fa fa-trash-o text-danger"></i></button>
                                </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tab-pane" id="generate-id-card">
                <form className="card" onSubmit={event => {
                  this.setState({
                    showIdCard: false,
                    selectedStudentForIdCard: null
                  });
                  this.handleStudentSearch(event, 'studentListForIdCard');
                }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Name"
                            value={this.state.studentListForIdCardSearchParam.name}
                            onChange={event => this.handleInputChange(event, 'studentListForIdCardSearchParam.name')} />
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="StudentUID" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-9 col-sm-6">
                        <SelectClass classes={this.state.classes} disabledFirst={false}
                          value={this.state.studentListForIdCardSearchParam.classId}
                          onChange={event => this.handleInputChange(event, 'studentListForIdCardSearchParam.classId')} />
                      </div>
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <button type="submit" className="btn btn-sm btn-primary btn-block" title>Search</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="table-responsive card">
                  {!this.state.showIdCard ?
                    <table id="student-table-2" className="table table-hover table-vcenter table-striped mb-0 text-nowrap">
                      <thead>
                        <tr>
                          <th></th>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Class</th>
                          <th>Birth Date</th>
                          <th>Gender</th>
                          <th>Admission Date</th>
                          <th>Generate Id Card</th>
                        </tr>
                      </thead>
                      <tbody id="student-table-content-2">
                        {this.state.studentListForIdCard.map((student, index) => {
                          return (
                            <tr key={student.id}>
                              <td className="w-60">
                                  <img className="avatar" src={baseurl+(student.photo ? student.photo : 'uploads/default.jpg')} alt="" />
                              </td>
                              <td>{student.id}</td>
                              <td>{student.firstName} {student.lastName}</td>
                              <td>{student.className} {student.sectionName ? ('(' + student.sectionName + ')') : ''}</td>
                              <td>{new Date(student.dateOfBirth).toDateString()}</td>
                              <td>{student.gender}</td>
                              <td>{new Date(student.dateOfAdmission).toDateString()}</td>
                              <td class="d-flex">
                                <button class="btn btn-primary mx-auto"
                                  onClick={() => this.generateIdCard(index)}>
                                  Generate
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table> : null}
                </div>
                {this.state.showIdCard ?
                  <div className="container" id="id-card">
                    <div className="d-flex justify-content-between">
                      <div className="h4">Identity Card</div>
                      <button className="ml-auto btn btn-primary" onClick={this.printIdCard}
                        disabled={!this.state.selectedStudentForIdCard}>Print</button>
                    </div>
                    {!this.state.selectedStudentForIdCard ?
                      <div id="id-card-loading" style={{ height: '20em' }}>
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div> :
                      <div className="wrapper" id="id-card-wrapper">
                        <div className="identityCard">
                          <header className="identityCard__header d-flex flex-column text-center">
                            <div>Central Academy School</div>
                            <div>Identity Card</div>
                          </header>
                          <div className="identityCard__profile">
                            {/* <div class="identityCard__identity">
                                                <strong>Carte nationale d'identité n° :</strong> {id}
                                            </div> */}
                            <div className="identityCard__visual">
                              <img src={baseurl+(this.state.selectedStudentForIdCard.photo ?this.state.selectedStudentForIdCard.photo:'uploads/default.jpg')}
                                alt="" />
                            </div>
                            <ul className="identityCard__list list-unstyled">
                              <li><strong>Name :</strong> {this.state.selectedStudentForIdCard.firstName} {this.state.selectedStudentForIdCard.lastName}</li>
                              <li><strong>Class :</strong> {this.state.selectedStudentForIdCard.className + (this.state.selectedStudentForIdCard.sectionName ? ' (' + this.state.selectedStudentForIdCard.sectionName + ')' : '')}</li>
                              <li><strong>Gender :</strong> {this.state.selectedStudentForIdCard.gender}</li>
                              <li><strong>Date of birth :</strong> {new Date(this.state.selectedStudentForIdCard.dateOfBirth).toDateString()}</li>
                              <li><strong>Emergency Contact Number :</strong> {this.state.selectedStudentForIdCard.emergencyContact.mobileNo}</li>
                              <li><strong>Blood Group :</strong> {this.state.selectedStudentForIdCard.bloodGroup}</li>
                            </ul>
                          </div>
                          <footer className="identityCard__footer">
                            <div className="filled"><span>123 some street, city - +91 123 456 7890</span></div>
                            {/* <div class="filled"><span>{School Address}</span></div> */}
                          </footer>
                        </div>
                      </div>}
                  </div> : null}
              </div>
              <div className="tab-pane" id="Student-profile">
                <div className="row">
                  <div className="col-xl-4 col-md-12">
                    <div className="card">
                      <div className="card-body w_user">
                        <div className="user_avtar">
                          <img className="rounded-circle" src="../assets/images/sm/avatar2.jpg" alt="" />
                        </div>
                        <div className="wid-u-info">
                          <h5>Dessie Parks</h5>
                          <p className="text-muted m-b-0">119 Peepee Way, Hilo, HI, 96720</p>
                          <ul className="list-unstyled">
                            <li>
                              <h5 className="mb-0">270</h5>
                              <small>Followers</small>
                            </li>
                            <li>
                              <h5 className="mb-0">310</h5>
                              <small>Following</small>
                            </li>
                            <li>
                              <h5 className="mb-0">908</h5>
                              <small>Liks</small>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">About Me</h3>
                        <div className="card-options ">
                          <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                          <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                        </div>
                      </div>
                      <div className="card-body">
                        <p>Hello I am Celena Anderson a Clerk in Xyz College USA. I love to work with all my college staff and seniour professors.</p>
                        <ul className="list-group">
                          <li className="list-group-item">
                            <b>Gender </b>
                            <div className="pull-right">Female</div>
                          </li>
                          <li className="list-group-item">
                            <b>Department</b>
                            <div className="pull-right">Mechanical</div>
                          </li>
                          <li className="list-group-item">
                            <b>Email </b>
                            <div className="pull-right">test@example.com</div>
                          </li>
                          <li className="list-group-item">
                            <b>Phone</b>
                            <div className="pull-right">1234567890</div>
                          </li>
                          <li className="list-group-item">
                            <div className="clearfix">
                              <div className="float-left"><strong>Study</strong></div>
                              <div className="float-right"><small className="text-muted">35%</small></div>
                            </div>
                            <div className="progress progress-xxs">
                              <div className="progress-bar bg-pink" role="progressbar" style={{ width: '35%' }} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div className="clearfix">
                              <div className="float-left"><strong>Cricket</strong></div>
                              <div className="float-right"><small className="text-muted">72%</small></div>
                            </div>
                            <div className="progress progress-xxs">
                              <div className="progress-bar bg-blue" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div className="clearfix">
                              <div className="float-left"><strong>Music</strong></div>
                              <div className="float-right"><small className="text-muted">60%</small></div>
                            </div>
                            <div className="progress progress-xxs">
                              <div className="progress-bar bg-green" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer text-center">
                        <div className="row">
                          <div className="col-md-9 col-sm-4 col-6">
                            <div className="font-18 font-weight-bold">37</div>
                            <div>Projects</div>
                          </div>
                          <div className="col-md-9 col-sm-4 col-6">
                            <div className="font-18 font-weight-bold">51</div>
                            <div>Tasks</div>
                          </div>
                          <div className="col-md-9 col-sm-4 col-6">
                            <div className="font-18 font-weight-bold">61</div>
                            <div>Uploads</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8 col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Timeline Activity</h3>
                        <div className="card-options">
                          <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                          <a href="#" className="card-options-fullscreen" data-toggle="card-fullscreen"><i className="fe fe-maximize" /></a>
                          <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                          <div className="item-action dropdown ml-2">
                            <a href="javascript:void(0)" data-toggle="dropdown"><i className="fe fe-more-vertical" /></a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-eye" /> View Details </a>
                              <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-share-alt" /> Share </a>
                              <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-cloud-download" /> Download</a>
                              <div className="dropdown-divider" />
                              <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-copy" /> Copy to</a>
                              <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-folder" /> Move to</a>
                              <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-edit" /> Rename</a>
                              <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-trash" /> Delete</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="summernote">
                          Hello there,
                              <br />
                          <p>The toolbar can be customized and it also supports various callbacks such as <code>oninit</code>, <code>onfocus</code>, <code>onpaste</code> and many more.</p>
                          <p>Please try <b>paste some texts</b> here</p>
                        </div>
                        <div className="timeline_item ">
                          <img className="tl_avatar" src="../assets/images/xs/avatar1.jpg" alt="" />
                          <span><a href="javascript:void(0);">Elisse Joson</a> San Francisco, CA <small className="float-right text-right">20-April-2019 - Today</small></span>
                          <h6 className="font600">Hello, 'Im a single div responsive timeline without media Queries!</h6>
                          <div className="msg">
                            <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web card she has is the Lorem card.</p>
                            <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 12 Love</a>
                            <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i className="fa fa-comments" /> 1 Comment</a>
                            <div className="collapse p-4 section-gray mt-2" id="collapseExample">
                              <form className="well">
                                <div className="form-group">
                                  <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                                </div>
                                <button className="btn btn-primary">Submit</button>
                              </form>
                              <ul className="recent_comments list-unstyled mt-4 mb-0">
                                <li>
                                  <div className="avatar_img">
                                    <img className="rounded img-fluid" src="../assets/images/xs/avatar4.jpg" alt="" />
                                  </div>
                                  <div className="comment_body">
                                    <h6>Donald Gardner <small className="float-right font-14">Just now</small></h6>
                                    <p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline_item ">
                          <img className="tl_avatar" src="../assets/images/xs/avatar4.jpg" alt="" />
                          <span><a href="javascript:void(0);" title>Dessie Parks</a> Oakland, CA <small className="float-right text-right">19-April-2019 - Yesterday</small></span>
                          <h6 className="font600">Oeehhh, that's awesome.. Me too!</h6>
                          <div className="msg">
                            <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.</p>
                            <div className="timeline_img mb-20">
                              <img className="width100" src="../assets/images/gallery/1.jpg" alt="Awesome Image" />
                              <img className="width100" src="../assets/images/gallery/2.jpg" alt="Awesome Image" />
                            </div>
                            <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 23 Love</a>
                            <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1"><i className="fa fa-comments" /> 2 Comment</a>
                            <div className="collapse p-4 section-gray mt-2" id="collapseExample1">
                              <form className="well">
                                <div className="form-group">
                                  <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                                </div>
                                <button className="btn btn-primary">Submit</button>
                              </form>
                              <ul className="recent_comments list-unstyled mt-4 mb-0">
                                <li>
                                  <div className="avatar_img">
                                    <img className="rounded img-fluid" src="../assets/images/xs/avatar4.jpg" alt="" />
                                  </div>
                                  <div className="comment_body">
                                    <h6>Donald Gardner <small className="float-right font-14">Just now</small></h6>
                                    <p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
                                    <div className="timeline_img mb-20">
                                      <img className="width150" src="../assets/images/gallery/7.jpg" alt="Awesome Image" />
                                      <img className="width150" src="../assets/images/gallery/8.jpg" alt="Awesome Image" />
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="avatar_img">
                                    <img className="rounded img-fluid" src="../assets/images/xs/avatar3.jpg" alt="" />
                                  </div>
                                  <div className="comment_body">
                                    <h6>Dessie Parks <small className="float-right font-14">1min ago</small></h6>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline_item ">
                          <img className="tl_avatar" src="../assets/images/xs/avatar7.jpg" alt="" />
                          <span><a href="javascript:void(0);" title>Rochelle Barton</a> San Francisco, CA <small className="float-right text-right">12-April-2019</small></span>
                          <h6 className="font600">An Engineer Explains Why You Should Always Order the Larger Pizza</h6>
                          <div className="msg">
                            <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, is the Lorem card.</p>
                            <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 7 Love</a>
                            <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2"><i className="fa fa-comments" /> 1 Comment</a>
                            <div className="collapse p-4 section-gray mt-2" id="collapseExample2">
                              <form className="well">
                                <div className="form-group">
                                  <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                                </div>
                                <button className="btn btn-primary">Submit</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="Student-add">
                <div className="row clearfix">
                  <div className="col col-md-12 col-sm-12">
                    <div className={"card " + (this.state.submitAdmissionFee ? "" : "d-none")} id="fee-card-admission">
                      <div className="card-header">
                        <h3 className="card-title">Fee Info</h3>
                        <div className="card-options ">
                          <button className="btn card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></button>
                          {/* <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a> */}
                        </div>
                      </div>
                      <div className="d-flex card-body">
                        <div className="table-responsive card">
                          <div className="form-group row">
                            <div className="col-6">
                              <div className="form-check m-4">
                                <input className="form-check-input" type="checkbox" id="avail-hostel-fee"
                                  onChange={event => this.feeToggle(event, 'hostel')} />
                                <label className="form-check-label" htmlFor="avail-hostel-fee">
                                  Avail Hostel Fee
                                    </label>
                              </div>
                              <div className="form-check m-4 mb-2">
                                <input className="form-check-input" type="checkbox" id="avail-transport-fee"
                                  onChange={event => this.feeToggle(event, 'transport')} />
                                <label className="form-check-label" htmlFor="avail-transport-fee">
                                  Avail Transport Fee
                                    </label>
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <form className="form-group m-3" id="fee-submitter" onSubmit={this.handleSubmitFee}>
                                <label htmlFor="fee-to-pay" className="pl-2">Capture fee:</label>
                                <div className="d-flex">
                                  <input type="text" className="form-control" onChange={this.checkFeeValidity}
                                    value={this.state.feeToPay}
                                    min={1} required id="fee-to-pay" placeholder="Enter amount to pay"
                                  />
                                  <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                              </form>
                            </div>
                          </div>
                          <table className="table table-hover table-vcenter table-striped mb-0 text-nowrap border-top">
                            <thead>
                              <tr>
                                <th>Particular</th>
                                <th>Current Year Total Amount</th>
                                <th>Paid Amount</th>
                                <th>Balance(To Be Paid)</th>
                              </tr>
                            </thead>
                            <tbody id="fee-after-admission">
                              {this.state.feeList.map((feeItem, index) => {
                                return (
                                  <tr key={index} data-amount={feeItem.amount} class={feeItem.include ? '' : 'd-none'}>
                                    <td>{feeItem.particular}</td>
                                    <td>{feeItem.amount}</td>
                                    <td>0</td>
                                    <td>{feeItem.amount}</td>
                                  </tr>
                                );
                              })}
                              <tr>
                                <td class="font-weight-bold">Total:</td>
                                <td class="font-weight-bold total-fee">{this.getTotalFee()}</td>
                                <td class="font-weight-bold">0</td>
                                <td class="font-weight-bold total-fee">{this.getTotalFee()}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <button type="button" onClick={this.toggleFeeCard}
                        className="btn btn-primary btn-lg btn-block">Continue</button>
                    </div>
                    <div className="card" id="admission-card" class={this.state.submitAdmissionFee ? "d-none" : ""}>
                      <div className="card-header">
                        <h3 className="card-title">Basic Information</h3>
                        <div className="card-options ">
                          <button className="btn card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></button>
                          {/* <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a> */}
                        </div>
                      </div>
                      <div className="container">
                        <div className={"alert alert-danger " + (this.state.admissionFormErrors.length ? '' : 'd-none')}
                          id="student-form-alert">
                          <ul className="mb-0">
                            {this.state.admissionFormErrors.map((error, index) => {
                              return (
                                <li key={index}>{error}</li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      <form onSubmit={this.handleAdmissionFormSubmit} noValidate="novalidate" id="admission-form">
                        <div className="d-flex card-body">
                          <div className="col-12 col-md-6">
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">First Name <span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input type="text" name="first-name" value={this.state.studentForm.firstName}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.firstName')}
                                  className="form-control" placeholder="Enter First name" required />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Last Name <span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input type="text" name="last-name"
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.lastName')}
                                  value={this.state.studentForm.lastName}
                                  className="form-control" placeholder="Enter Last name" required />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Admission Sought for Class <span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <SelectClass classes={this.state.classes} id="admission-for-class"
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.admissionForClass')}
                                  disabledFirst={true} value={this.state.studentForm.admissionForClass} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Class Section</label>
                              <div className="col-md-9">
                                <SelectClassSection classes={this.state.classes} selectedClass={this.state.studentForm.admissionForClass}
                                  handleInputChange={this.handleInputChange} value={this.state.studentForm.classSection} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Academic Year</label>
                              <div className="col-md-4">
                                <AcademicYear name="start_year"></AcademicYear>
                              </div>
                              <div className="col-md-4">
                                <AcademicYear name="end_year"></AcademicYear>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Date of Birth&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input value={this.state.studentForm.dateOfBirth}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.dateOfBirth')}
                                  name="dob" data-date-autoclose="true" className="form-control datepicker" placeholder="DD/MM/YYYY" required />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Place of Birth</label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" value={this.state.studentForm.placeOfBirth}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.placeOfBirth')}
                                  name="birth-place" placeholder="Enter Place of Birth" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Nationality&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" value={this.state.studentForm.nationality}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.nationality')}
                                  name="nationality" placeholder="Enter Nationality" required />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Gender&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <select className="form-control input-height" value={this.state.studentForm.gender}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.gender')}
                                  name="gender" required>
                                  <option value>Select...</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Permanent Address&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <textarea rows={3} className="form-control"
                                  value={this.state.studentFormResources.permanentAddress}
                                  onChange={(event) => this.handleInputChange(event, 'studentFormResources.permanentAddress')}
                                  name="permanent-address" required placeholder="Street, City" defaultValue={""} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">State&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                {/* <input type="text" className="form-control" name="permanent-state" required placeholder="Enter State" /> */}
                                <StateDropdown name="permanent-state" value={this.state.studentForm.permanentAddress.state}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.permanentAddress.state')}>
                                </StateDropdown>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Pincode&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input type="text" className="form-control"
                                  value={this.state.studentForm.permanentAddress.pincode}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.permanentAddress.pincode')}
                                  name="permanent-pincode" required placeholder="Enter Pincode" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Caste&nbsp;<span className="text-danger">*</span></label>
                              <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" value="General" id="generalCaste" name="caste"
                                  checked={this.state.studentForm.caste === 'General'}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.caste')} />
                                <label className="custom-control-label" htmlFor="generalCaste">General</label>
                              </div>
                              {/* Default inline 2*/}
                              <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" value="OBC" id="obcCaste" name="caste"
                                  checked={this.state.studentForm.caste === 'OBC'}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.caste')} />
                                <label className="custom-control-label" htmlFor="obcCaste">OBC</label>
                              </div>
                              {/* Default inline 3*/}
                              <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" value="SC/ST" id="scstCaste" name="caste"
                                  checked={this.state.studentForm.caste === 'SC/ST'}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.caste')} />
                                <label className="custom-control-label" htmlFor="scstCaste">SC/ST</label>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Mother Tounge&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" value={this.state.studentForm.motherTongue}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.motherTongue')}
                                  name="mother-tongue" placeholder="Enter Mother Tongue" required />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Student Photo</label>
                              <div className="col-md-5 height-100">
                                <input type="file" className name="student-photo" id="student-photo" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Aadhar Number&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input type="text" className="form-control" name="aadhar-number"
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.aadharNo')}
                                  required placeholder="Enter Aadhar Number" value={this.state.studentForm.aadharNo} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Religion&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <select className="form-control input-height" value={this.state.studentForm.relegion}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.relegion')}
                                  name="religion" required>
                                  <option value="" disabled selected>Select Religion</option>
                                  <option value="Hindu">Hindu</option>
                                  <option value="mMslim">Muslim</option>
                                  <option value="Christian">Christian</option>
                                  <option value="Sikh">Sikh</option>
                                  <option value="Buddhist/Jain">Buddhist / Jain</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Blood Group&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <select className="form-control input-height" value={this.state.studentForm.bloodGroup}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.bloodGroup')}
                                  name="blood_group" required>
                                  <option value="A+" selected>A+</option><option value="A-">A-</option>
                                  <option value="B+">B+</option><option value="B-">B-</option>
                                  <option value="O+">O+</option><option value="O-">O-</option>
                                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                                </select>
                              </div>
                            </div>
                            <br />
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input"
                                checked={this.state.studentFormResources.permanentAndPresentAddressSame}
                                onChange={(event) => this.handleInputChange(event, 'studentFormResources.permanentAndPresentAddressSame')}
                                id="same-address" />
                              <label className="form-check-label" htmlFor="same-address">Present Address Same as Permanent Address</label>
                            </div>
                            {!this.state.studentFormResources.permanentAndPresentAddressSame ?
                              <>
                                <div className="form-group row present-address">
                                  <label className="col-md-3 col-form-label">Present Address&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <textarea rows={3} className="form-control"
                                      value={this.state.studentFormResources.presentAddress}
                                      onChange={(event) => this.handleInputChange(event, 'studentFormResources.presentAddress')}
                                      name="present-address" required placeholder="Street, City" defaultValue={""} />
                                  </div>
                                </div>
                                <div className="form-group row present-address">
                                  <label className="col-md-3 col-form-label">State&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <StateDropdown name="present-state" value={this.state.studentForm.presentAddress.state}
                                      onChange={(event) => this.handleInputChange(event, 'studentForm.presentAddress.state')}>
                                    </StateDropdown>
                                  </div>
                                </div>
                                <div className="form-group row present-address">
                                  <label className="col-md-3 col-form-label">Pincode&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input type="text" className="form-control" name="present-pincode"
                                      value={this.state.studentForm.presentAddress.pincode}
                                      onChange={(event) => this.handleInputChange(event, 'studentForm.presentAddress.pincode')}
                                      required placeholder="Enter Pincode" />
                                  </div>
                                </div>
                              </> : null
                            }
                          </div>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">Parent's/Guardian's Information</h3>
                          <div className="row">
                            <div className="col-12 col-md-12">
                              <div className="row">
                                <div className="form-group row col-6">
                                  <label className="col-md-4 col-form-label">Enter Information for: </label>
                                  <div className="col-md-8">
                                    <select value={this.state.studentFormResources.parentOrGuardian}
                                      onChange={(event) => this.handleInputChange(event, 'studentFormResources.parentOrGuardian')}
                                      className="form-control custom-select" required>
                                      <option selected value="Parents">Parents</option>
                                      <option value="Guardian">Guardian</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {this.state.studentFormResources.parentOrGuardian === 'Parents' ?
                                <>
                                  <div className="row parent-info">
                                    <div className="form-group row col-6">
                                      <label className="col-md-3 col-form-label">Father's Photo</label>
                                      <div className="col-md-5 height-100">
                                        <input type="file" name="father-photo" id="father-photo" className />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Father's Name&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input type="text" name="father-name" value={this.state.studentFormResources.father.name}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.name')}
                                            className="form-control" required placeholder="Enter Name" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input type="text" name="father-quanlification"
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.qualification')}
                                            value={this.state.studentFormResources.father.qualification}
                                            className="form-control" required placeholder="Enter Qualification" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input type="text" name="father-occupation"
                                            value={this.state.studentFormResources.father.occupation}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.occupation')}
                                            className="form-control" required placeholder="Enter Occupation" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input type="text" name="father-mobile"
                                            value={this.state.studentFormResources.father.mobileNo}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.mobileNo')}
                                            className="form-control" required placeholder="Enter Mobile No." />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Email</label>
                                        <div className="col-md-9">
                                          <input type="text" name="father-email"
                                            value={this.state.studentFormResources.father.email}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.email')}
                                            className="form-control" required placeholder="Enter Email" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-3 row parent-info">
                                    <div className="form-group row col-6">
                                      <label className="col-md-3 col-form-label">Mother's Photo</label>
                                      <div className="col-md-5 height-100">
                                        <input type="file" name="mother-photo" id="mother-photo" className />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Mother's Name&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input type="text" name="mother-name"
                                            value={this.state.studentFormResources.mother.name}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.name')}
                                            className="form-control" required placeholder="Enter Name" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input type="text" name="mother-qualification"
                                            value={this.state.studentFormResources.mother.qualification}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.qualification')}
                                            className="form-control" required placeholder="Enter Qualification" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input type="text" name="mother-occupation"
                                            value={this.state.studentFormResources.mother.occupation}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.occupation')}
                                            className="form-control" required placeholder="Enter Occupation" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input type="text" name="mother-mobile"
                                            value={this.state.studentFormResources.mother.mobileNo}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.mobileNo')}
                                            className="form-control" required placeholder="Enter Mobile No." />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Email</label>
                                        <div className="col-md-9">
                                          <input type="text" name="mother-email"
                                            value={this.state.studentFormResources.mother.email}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.email')}
                                            className="form-control" required placeholder="Enter Email" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </> :
                                <div className="mt-3 row guardian-info">
                                  <div className="form-group row col-6">
                                    <label className="col-md-3 col-form-label">Guardian's Photo</label>
                                    <div className="col-md-5 height-100">
                                      <input type="file" name="guardian-photo"
                                        id="guardian-photo" />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Guardian's Name&nbsp;<span className="text-danger">*</span></label>
                                      <div className="col-md-9">
                                        <input type="text" name="guardian-name"
                                          value={this.state.studentFormResources.guardian.name}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.name')}
                                          className="form-control" placeholder="Enter Name" />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                      <div className="col-md-9">
                                        <input type="text" name="guardian-qualification"
                                          value={this.state.studentFormResources.guardian.qualification}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.qualification')}
                                          className="form-control" placeholder="Enter Qualification" />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                      <div className="col-md-9">
                                        <input type="text" name="guardian-occupation"
                                          value={this.state.studentFormResources.guardian.occupation}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.occupation')}
                                          className="form-control" placeholder="Enter Occupation" />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                      <div className="col-md-9">
                                        <input type="text" name="guardian-mobile"
                                          value={this.state.studentFormResources.guardian.mobileNo}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.mobileNo')}
                                          className="form-control" placeholder="Enter Mobile No." />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Email</label>
                                      <div className="col-md-9">
                                        <input type="text" name="guardian-email"
                                          value={this.state.studentFormResources.guardian.email}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.email')}
                                          className="form-control" placeholder="Enter Email" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary btn-lg btn-block">Submit Your Admission Form</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
}

export default Students;
export { AcademicYear, StateDropdown };