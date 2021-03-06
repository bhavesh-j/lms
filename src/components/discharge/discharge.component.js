import AbstractComponent from '../abstract/abstract.component';
import SelectClass from '../selectclass/selectclass.component';
import LeaveCerti from '../leavingCertificate/leaveCerti.component';
import { baseurl } from '../../shared/baseurl';

class Discharge extends AbstractComponent {
    constructor(){
        super()
        this.state={
            students: [],
            classes: [],
            isStudentsLoading: false,
            studentsSearchParam: {
                name: '',
                classId: ''
            },
            showLeavingCertificate: false,
            selectedStudentForLeaveCerti: null
        };
        this.printLeaveCerti = this.printLeaveCerti.bind(this); 
    }
    

    generateLeaveCerti(studentIndex){
      const studentId = this.state.students[studentIndex].id;
      this.setState({showLeavingCertificate: false});
      this.callServerMethod('student/'+studentId)
      .then(student => {
        if(this.isErrorPresent(student)) {
          return;
        }
        this.setState({
          selectedStudentForLeaveCerti: student,
          showLeavingCertificate: true
        });
      }).catch(err => console.log(err));
    }

    printLeaveCerti(){
        this.printDocument('leave-certi');
    }

    componentDidMount(){
        this.setState({isStudentsLoading: true});
        this.fetchClasses()
    .then(classes => {
      this.callServerMethod('student')
      .then(students => {
        if(this.isErrorPresent(students)) {
          return;
        }
        this.setState({
          isStudentsLoading: false,
          students: students
        });
      });
      this.setState({classes: classes});
    }).catch(err => console.log(err));
    } 

    render() {
        return (
        <div className="tab-pane" id="Student-discharge">
                <form className="card" onSubmit={event => {
                  this.setState({
                    showLeavingCertificate: false,
                    selectedStudentForLeaveCerti: null
                  });
                  this.handleStudentSearch(event, 'students');
                }}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Name"
                          value={this.state.studentsSearchParam.name}
                          onChange={event => this.handleInputChange(event, 'studentsSearchParam.name')}/>
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
                        onChange={event => this.handleInputChange(event, 'studentsSearchParam.classId')}  />
                      </div>
                      <div className="col-lg-2 col-md-9 col-sm-6">
                        <button type="submit" className="btn btn-sm btn-primary btn-block" title>Search</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="table-responsive card">
                  {!this.state.showLeavingCertificate ?
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
                    <tbody>
                        {this.state.students.map((student, index) => {
                          return (
                            <tr key={student.id}>
                                <td className="w-60">
                                    <img className="avatar" src={baseurl+(student.photo ? student.photo : 'uploads/default.jpg')} alt="Profile" />
                                </td>
                                <td>{student.id}</td>
                                <td>{student.firstName} {student.lastName}</td>
                                <td>{student.className}</td>
                                <td>{new Date(student.dateOfBirth).toDateString()}</td>
                                <td>{student.gender}</td>
                                <td>{student.emergencyContact.firstName} {student.emergencyContact.lastName}</td>
                                <td>{student.emergencyContact.mobileNo}</td>
                                <td>
                                    <button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye"></i></button>
                                    <button type="button" className="btn btn-icon btn-sm" title="Edit" onClick={() => this.generateLeaveCerti(index)}><i className="fa fa-edit"></i></button>                                    
                                </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table> : null}              
                </div>
              
              {this.state.showLeavingCertificate ? 
                this.state.selectedStudentForLeaveCerti ?
                  <LeaveCerti student={this.state.selectedStudentForLeaveCerti}></LeaveCerti>
                  : this.state.students.length ? null : <div class="h3">Loading ...</div> : null}
              </div>
        )};
}

export default Discharge;