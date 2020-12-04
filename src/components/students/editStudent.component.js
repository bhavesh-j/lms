import AbstractComponent from '../abstract/abstract.component';
import { baseurl } from '../../shared/baseurl';
import SelectClass, {SelectClassSection} from '../selectclass/selectclass.component';
// import { Link } from 'react-router-dom';
import {StateDropdown} from "../students/students.component";
import Header from '../header/header.component';
import Footer from '../footer/footer.component';

class EditStudent extends AbstractComponent {
    constructor(){
        super();
        this.state = {
          classes: [],
          studentForm: {
            id: '',
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
              relationToStudent: 'Father',
              photo: 'uploads/default.jpg'
            },
            mother: {
              name: '',
              qualification: '',
              occupation: '',
              mobileNo: '',
              email: '',
              relationToStudent: 'Mother',
              photo: 'uploads/default.jpg'
            },
            guardian: {
              name: '',
              qualification: '',
              occupation: '',
              mobileNo: '',
              email: '',
              relationToStudent: 'Guardian',
              photo: 'uploads/default.jpg'
            },
            parentOrGuardian: 'Parents',
            studentId: null,
            prevAadharNo: null
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
          selectedStudentForIdCard: null,
        };
        this.handleStudentUpdate = this.handleStudentUpdate.bind(this);
    }

    componentDidMount() {
      const studentId = this.props.match.params.studentId;
      this.toggleLoading(true);
      this.fetchClasses()
      .then(classes => {
        this.setState({classes: classes});
        this.callServerMethod('student/'+studentId+'/details')
        .then(student => {
          setTimeout(() => this.toggleLoading(false), 1);
          if(!student.Message) {
            const father = student.parents.filter(parent => parent.relationToStudent==='Father')[0];
            const mother = student.parents.filter(parent => parent.relationToStudent==='Mother')[0];
            const guardian = student.parents.filter(parent => parent.relationToStudent==='Guardian')[0];
            this.setState({
              studentForm: {
                id: this.props.match.params.studentId,
                firstName: student.firstName,
                lastName: student.lastName,
                admissionForClass: student.admissionForClass,
                classSection: student.classSection,
                dateOfBirth: student.dateOfBirth.split('T')[0],
                placeOfBirth: student.placeOfBirth,
                nationality: student.nationality,
                gender: student.gender,
                permanentAddress: student.permanentAddress,
                caste: student.caste,
                relegion: student.relegion,
                presentAddress: student.presentAddress,
                motherTongue: student.motherTongue,
                aadharNo: student.aadharNo,
                photo: student.photo,
                bloodGroup: student.bloodGroup,
                parents: student.parents
              },
              studentFormResources: {
                permanentAddress: student.permanentAddress.street+' '+student.permanentAddress.city,
                presentAddress: student.presentAddress.street+' '+student.presentAddress.city,
                permanentAndPresentAddressSame: JSON.stringify(student.permanentAddress)===JSON.stringify(student.presentAddress),
                father: {
                  name: father ? father.firstName+' '+father.lastName : null,
                  qualification: father ? father.qualification : null,
                  occupation: father ? father.occupation : null,
                  mobileNo: father ? father.mobileNo : null,
                  email: father ? father.email : null,
                  relationToStudent: 'Father',
                  photo: father ? father.photo : null,
                },
                mother: {
                  name: mother ? mother.firstName+' '+mother.lastName : null,
                  qualification: mother ? mother.qualification : null,
                  occupation: mother ? mother.occupation : null,
                  mobileNo: mother ? mother.mobileNo : null,
                  email: mother ? mother.email : null,
                  relationToStudent: 'Mother',
                  photo: mother ? mother.photo : null,
                },
                guardian: {
                  name: guardian ? guardian.firstName+' '+guardian.lastName : null,
                  qualification: guardian ? guardian.qualification : null,
                  occupation: guardian ? guardian.occupation : null,
                  mobileNo: guardian ? guardian.mobileNo : null,
                  email: guardian ? guardian.email : null,
                  relationToStudent: 'Gaurdian',
                  photo: guardian ? guardian.photo : null,
                },
                parentOrGuardian: (student.parents[0].relationToStudent !== 'Guardian' ? 'Parents' : 'Guardian'),
                studentId: studentId
              }
            },() => this.toggleLoading(true));
          }
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }

    handleStudentUpdate(event) {
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
      admissionForm.parents = [];
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
              if(urls.student) admissionForm.photo = urls.student;
              for (let index = 0; index < admissionForm.parents.length; index++) {
                if(urls[admissionForm.parents[index].relationToStudent])
                  admissionForm.parents[index].photo = urls[admissionForm.parents[index].relationToStudent];
              }
              return this.callServerMethod('student/edit', 'POST', {
                'Content-Type': 'application/json'
              }, JSON.stringify(admissionForm));
            }).then(res => {
              this.toggleLoading(false);
              console.log(res);
              if (res.success) {
                alert('Form Submittes Form is successfully submitted success');
                this.props.history.goBack();
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
                <h1 className="page-title">Students</h1>
                <ol className="breadcrumb page-breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Ericsson</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Students</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="section-body mt-4">
          <div className="container-fluid">
            <div className="tab-content">
            <div className="tab-pane active" id="Student-add">
                <div className="row clearfix">
                  <div className="col col-md-12 col-sm-12">
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
                      <form onSubmit={this.handleStudentUpdate} noValidate="novalidate" id="admission-form">
                        <div className="d-flex card-body">
                          <div className="col-12 col-md-6">
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">First Name <span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input readOnly={this.props.readOnly} type="text" name="first-name" value={this.state.studentForm.firstName}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.firstName')}
                                  className="form-control" placeholder="Enter First name" required />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Last Name <span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input readOnly={this.props.readOnly} type="text" name="last-name"
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.lastName')}
                                  value={this.state.studentForm.lastName}
                                  className="form-control" placeholder="Enter Last name" required />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Admission Sought for Class <span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <SelectClass readOnly={this.props.readOnly} classes={this.state.classes} id="admission-for-class"
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.admissionForClass')}
                                  disabledFirst={true} value={this.state.studentForm.admissionForClass} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Class Section</label>
                              <div className="col-md-9">
                                <SelectClassSection classes={this.state.classes} selectedClass={this.state.studentForm.admissionForClass}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.classSection')}
                                  readOnly={this.props.readOnly} value={this.state.studentForm.classSection} />
                              </div>
                            </div>
                            {/* <div className="form-group row">
                              <label className="col-md-3 col-form-label">Academic Year</label>
                              <div className="col-md-4">
                                <AcademicYear readOnly ={this.props.readOnly} name="start_year"></AcademicYear>
                              </div>
                              <div className="col-md-4">
                                <AcademicYear readOnly ={this.props.readOnly} name="end_year"></AcademicYear>
                              </div>
                            </div> */}
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Date of Birth&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input readOnly={this.props.readOnly} value={this.state.studentForm.dateOfBirth}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.dateOfBirth')}
                                  name="dob" data-date-autoclose="true" className="form-control datepicker" placeholder="DD/MM/YYYY" required />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Place of Birth</label>
                              <div className="col-md-9">
                                <input readOnly={this.props.readOnly} type="text" className="form-control" value={this.state.studentForm.placeOfBirth}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.placeOfBirth')}
                                  name="birth-place" placeholder="Enter Place of Birth" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Nationality&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input readOnly={this.props.readOnly} type="text" className="form-control" value={this.state.studentForm.nationality}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.nationality')}
                                  name="nationality" placeholder="Enter Nationality" required />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Gender&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <select disabled={this.props.readOnly} className="form-control input-height" value={this.state.studentForm.gender}
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
                                <textarea readOnly={this.props.readOnly} rows={3} className="form-control"
                                  value={this.state.studentFormResources.permanentAddress}
                                  onChange={(event) => this.handleInputChange(event, 'studentFormResources.permanentAddress')}
                                  name="permanent-address" required placeholder="Street, City" defaultValue={""} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">State&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                {/* <input type="text" className="form-control" name="permanent-state" required placeholder="Enter State" /> */}
                                <StateDropdown readOnly ={this.props.readOnly} name="permanent-state" value={this.state.studentForm.permanentAddress.state}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.permanentAddress.state')}>
                                </StateDropdown>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Pincode&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input readOnly={this.props.readOnly} type="text" className="form-control"
                                  value={this.state.studentForm.permanentAddress.pincode}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.permanentAddress.pincode')}
                                  name="permanent-pincode" required placeholder="Enter Pincode" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Caste&nbsp;<span className="text-danger">*</span></label>
                              <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" value="General" id="generalCaste" name="caste"
                                  checked={this.state.studentForm.caste === 'General'} disabled={this.props.readOnly}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.caste')} />
                                <label className="custom-control-label" htmlFor="generalCaste">General</label>
                              </div>
                              {/* Default inline 2*/}
                              <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" value="OBC" id="obcCaste" name="caste"
                                  checked={this.state.studentForm.caste === 'OBC'} disabled={this.props.readOnly}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.caste')} />
                                <label className="custom-control-label" htmlFor="obcCaste">OBC</label>
                              </div>
                              {/* Default inline 3*/}
                              <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" className="custom-control-input" value="SC/ST" id="scstCaste" name="caste"
                                  checked={this.state.studentForm.caste === 'SC/ST'} disabled={this.props.readOnly}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.caste')} />
                                <label className="custom-control-label" htmlFor="scstCaste">SC/ST</label>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Mother Tounge&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input readOnly={this.props.readOnly} type="text" className="form-control" value={this.state.studentForm.motherTongue}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.motherTongue')}
                                  name="mother-tongue" placeholder="Enter Mother Tongue" required />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Student Photo</label>
                              <div className="col-md-5 height-100">
                                <img src={baseurl + (this.state.studentForm.photo ? this.state.studentForm.photo : 'uploads/default.jpg')} className="img-responsive img-thumbnail" alt="Profile" />
                                <input type="file" className="mt-2 ml-1" name="student-photo" id="student-photo" disabled={this.props.readOnly} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Aadhar Number&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <input readOnly={this.props.readOnly} type="text" className="form-control" name="aadhar-number"
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.aadharNo')}
                                  required placeholder="Enter Aadhar Number" value={this.state.studentForm.aadharNo} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-md-3 col-form-label">Religion&nbsp;<span className="text-danger">*</span></label>
                              <div className="col-md-9">
                                <select disabled={this.props.readOnly} className="form-control input-height" value={this.state.studentForm.relegion}
                                  onChange={(event) => this.handleInputChange(event, 'studentForm.relegion')}
                                  name="religion" required>
                                  <option>Select Religion</option>
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
                                <select disabled={this.props.readOnly} className="form-control input-height" value={this.state.studentForm.bloodGroup}
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
                              <input type="checkbox" className="form-check-input" disabled={this.props.readOnly}
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
                                    <textarea readOnly={this.props.readOnly} rows={3} className="form-control"
                                      value={this.state.studentFormResources.presentAddress}
                                      onChange={(event) => this.handleInputChange(event, 'studentFormResources.presentAddress')}
                                      name="present-address" required placeholder="Street, City" defaultValue={""} />
                                  </div>
                                </div>
                                <div className="form-group row present-address">
                                  <label className="col-md-3 col-form-label">State&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <StateDropdown readOnly ={this.props.readOnly} name="present-state" value={this.state.studentForm.presentAddress.state}
                                      onChange={(event) => this.handleInputChange(event, 'studentForm.presentAddress.state')}>
                                    </StateDropdown>
                                  </div>
                                </div>
                                <div className="form-group row present-address">
                                  <label className="col-md-3 col-form-label">Pincode&nbsp;<span className="text-danger">*</span></label>
                                  <div className="col-md-9">
                                    <input readOnly={this.props.readOnly} type="text" className="form-control" name="present-pincode"
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
                                {/* <label className="col-md-4 col-form-label">Enter Information for: </label> */}
                                  {/* <div className="col-md-8">
                                    <select value={this.state.studentFormResources.parentOrGuardian}
                                      onChange={(event) => this.handleInputChange(event, 'studentFormResources.parentOrGuardian')}
                                      className="form-control custom-select" required>
                                      <option selected value="Parents">Parents</option>
                                      <option value="Guardian">Guardian</option>
                                    </select>
                                  </div> */}
                                </div> <div className="form-group row col-6">
                                 
                              </div>
                              {this.state.studentFormResources.parentOrGuardian === 'Parents' ?
                                <>
                                  <div className="row parent-info">
                                    <div className="form-group row col-6">
                                      <label className="col-md-3 col-form-label">Father's Photo</label>
                                      <div className="col-md-5 height-100">
                                      <img src={baseurl + (this.state.studentFormResources.father.photo 
                                          ? this.state.studentFormResources.father.photo : 'uploads/default.jpg')}
                                          className="img-responsive img-thumbnail" alt="Profile" />
                                        <input type="file" name="father-photo" id="father-photo" disabled={this.props.readOnly} className="mt-2 ml-1" />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Father's Name&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="father-name" value={this.state.studentFormResources.father.name}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.name')}
                                            className="form-control" required placeholder="Enter Name" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="father-quanlification"
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.qualification')}
                                            value={this.state.studentFormResources.father.qualification}
                                            className="form-control" required placeholder="Enter Qualification" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="father-occupation"
                                            value={this.state.studentFormResources.father.occupation}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.occupation')}
                                            className="form-control" required placeholder="Enter Occupation" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="father-mobile"
                                            value={this.state.studentFormResources.father.mobileNo}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.father.mobileNo')}
                                            className="form-control" required placeholder="Enter Mobile No." />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Email</label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="father-email"
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
                                        <img src={baseurl + (this.state.studentFormResources.mother.photo 
                                          ? this.state.studentFormResources.mother.photo : 'uploads/default.jpg')}
                                          className="img-responsive img-thumbnail" alt="Profile" />
                                        <input type="file" name="mother-photo" id="mother-photo" disabled={this.props.readOnly} className="mt-2 ml-1" />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Mother's Name&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="mother-name"
                                            value={this.state.studentFormResources.mother.name}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.name')}
                                            className="form-control" required placeholder="Enter Name" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="mother-qualification"
                                            value={this.state.studentFormResources.mother.qualification}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.qualification')}
                                            className="form-control" required placeholder="Enter Qualification" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="mother-occupation"
                                            value={this.state.studentFormResources.mother.occupation}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.occupation')}
                                            className="form-control" required placeholder="Enter Occupation" />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="mother-mobile"
                                            value={this.state.studentFormResources.mother.mobileNo}
                                            onChange={(event) => this.handleInputChange(event, 'studentFormResources.mother.mobileNo')}
                                            className="form-control" required placeholder="Enter Mobile No." />
                                        </div>
                                      </div>
                                      <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Email</label>
                                        <div className="col-md-9">
                                          <input readOnly={this.props.readOnly} type="text" name="mother-email"
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
                                        <img src={baseurl + (this.state.studentFormResources.guardian.photo 
                                          ? this.state.studentFormResources.guardian.photo : 'uploads/default.jpg')}
                                          className="img-responsive img-thumbnail" alt="Profile" />
                                      <input type="file" name="guardian-photo" disabled={this.props.readOnly}
                                        id="guardian-photo" className="mt-2 ml-1" />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Guardian's Name&nbsp;<span className="text-danger">*</span></label>
                                      <div className="col-md-9">
                                        <input readOnly={this.props.readOnly} type="text" name="guardian-name"
                                          value={this.state.studentFormResources.guardian.name}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.name')}
                                          className="form-control" placeholder="Enter Name" />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Qualification&nbsp;<span className="text-danger">*</span></label>
                                      <div className="col-md-9">
                                        <input readOnly ={this.props.readOnly} type="text" name="guardian-qualification"
                                          value={this.state.studentFormResources.guardian.qualification}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.qualification')}
                                          className="form-control" placeholder="Enter Qualification" />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Occupation&nbsp;<span className="text-danger">*</span></label>
                                      <div className="col-md-9">
                                        <input readOnly ={this.props.readOnly} type="text" name="guardian-occupation"
                                          value={this.state.studentFormResources.guardian.occupation}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.occupation')}
                                          className="form-control" placeholder="Enter Occupation" />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Mobile No.&nbsp;<span className="text-danger">*</span></label>
                                      <div className="col-md-9">
                                        <input readOnly ={this.props.readOnly} type="text" name="guardian-mobile"
                                          value={this.state.studentFormResources.guardian.mobileNo}
                                          onChange={(event) => this.handleInputChange(event, 'studentFormResources.guardian.mobileNo')}
                                          className="form-control" placeholder="Enter Mobile No." />
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label className="col-md-3 col-form-label">Email</label>
                                      <div className="col-md-9">
                                        <input readOnly ={this.props.readOnly} type="text" name="guardian-email"
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
                          {!this.props.readOnly ?
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Update Info</button>
                          : null}
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
        <Footer />
      </div>
        );
    }
};

export default EditStudent;