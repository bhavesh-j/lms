import { toast } from 'toast-notification-alert';
import AbstractComponent from '../abstract/abstract.component';
import SelectClass from '../selectclass/selectclass.component';

class AddClass extends AbstractComponent {
    constructor() {
        super();
        this.state = {
            classes: [],
            className: '',
            classAbbr: '',
            sectionClass: '',
            sectionName: '',
            sectionAbbr: ''
        }
        this.handleAddClass = this.handleAddClass.bind(this);
        this.handleAddSection = this.handleAddSection.bind(this);
    }

    handleAddClass(event) {
        event.preventDefault();
        this.toggleLoading(true);
        const classRecord = {
            name: this.state.className,
            abbreviation: this.state.classAbbr
        };
        this.callServerMethod('class', 'POST', {
            'Content-Type': 'application/json'
        }, JSON.stringify(classRecord))
        .then(classItem => {
            if(this.isErrorPresent(classItem)) {
                return;
            }
            classItem.sections = [];
            this.setState({classes: [...this.state.classes, classItem]});
            this.setState({className: '', classAbbr: ''});
            toast.show({title: classRecord.name+' added successfully!', position: 'bottomright', type: 'success'});
        }).catch(err => console.log(err));
    }

    handleAddSection(event) {
        event.preventDefault();
        this.toggleLoading(true);
        const sectionRecord = {
            classId: this.state.sectionClass,
            name: this.state.sectionName,
            abbreviation: this.state.sectionAbbr
        };
        this.callServerMethod('classsection', 'POST', {
            'Content-Type': 'application/json'
        }, JSON.stringify(sectionRecord))
        .then(section => {
            if(this.isErrorPresent(section)) {
                return;
            }
            this.setState({sectionClass: '', sectionName: '', sectionAbbr: ''});
            toast.show({title: section.name+' added successfully!', position: 'bottomright', type: 'success'});
        }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchClasses()
        .then(classes => {
        if(this.isErrorPresent(classes)){
            return;
        }
        this.setState({ classes: classes });
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="tab-pane" id="Courses-add">
                <div className="d-flex">
                <div className="card col-6">
                    <div className="card-header">
                    <h3 className="card-title">Add Class</h3>
                    <div className="card-options ">
                        {/* <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a> */}
                        {/* <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a> */}
                    </div>
                    </div>
                    <div className="card-body">
                    <form className="row clearfix" id="addClassForm" onSubmit={this.handleAddClass} noValidate>
                        <div className="col-sm-12">
                        <div className="form-group">
                            <input type="text" className="form-control" name="class-name" placeholder="Class Name" required
                                value={this.state.className} onChange={(event) => this.handleInputChange(event, 'className')} />
                        </div>
                        </div>
                        <div className="col-sm-12">
                        <div className="form-group">
                            <input type="text" className="form-control" name="abbr" placeholder="Abbreviation" required
                                value={this.state.classAbbr} onChange={(event) => this.handleInputChange(event, 'classAbbr')} />
                        </div>
                        </div>
                        <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        {/* <button type="button" className="btn btn-outline-secondary btn-default">Cancel</button> */}
                        </div>
                    </form>
                    </div>
                </div>
                <div className="card col-6">
                    <div className="card-header">
                    <h3 className="card-title">Add Class Section</h3>
                    <div className="card-options ">
                        {/* <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                        <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a> */}
                    </div>
                    </div>
                    <div className="card-body">
                    <form className="row clearfix" id="addSectionForm" onSubmit={this.handleAddSection} noValidate>
                        <div className="col-sm-12">
                        <div className="form-group">
                            <SelectClass classes={this.state.classes} disabledFirst={false}
                                value={this.state.sectionClass}
                                onChange={event => this.handleInputChange(event, 'sectionClass')} />
                        </div>
                        </div>
                        <div className="col-sm-12">
                        <div className="form-group">
                            <input type="text" className="form-control" name="section-name" placeholder="Section Name" required
                              value={this.state.sectionName} onChange={(event) => this.handleInputChange(event, 'sectionName')} />
                        </div>
                        </div>
                        <div className="col-sm-12">
                        <div className="form-group">
                            <input type="text" className="form-control" name="abbr" placeholder="Abbreviation" required
                                value={this.state.sectionAbbr} onChange={(event) => this.handleInputChange(event, 'sectionAbbr')} />
                        </div>
                        </div>
                        <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        {/* <button type="submit" className="btn btn-outline-secondary btn-default">Cancel</button> */}
                        </div>
                    </form>                        
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default AddClass;