var classIdToSectionMap = {};
$(document).ready(function(){
    $('#addClassForm').validate();
    $('#addSectionForm').validate();
    fetch(apiUrl+'class', {
        method: 'GET'
    }).then(res => res.json())
    .then(classList => {
        classIdToSectionMap = Object.fromEntries(classList.map(classRecord => [classRecord.id, classRecord.sections]));
        let classOptions = '<option disabled selected value="">Select Class</option>\n';
        classList.forEach(classRecord => {
            classOptions += `<option value="${classRecord.id}">${classRecord.name}</option>\n`;
            addClassToTable(classRecord);
        });
        $('#class-select').html(classOptions);
        $('#class-select').removeAttr('disabled');
    })
    // .catch(err => swal('Something went wrong!', (err.message ? err.message : err),'error'));
    .catch(err => console.log('Failed to fetch classes! - '+err));
    // $('#admission-form').validate();
});

function addClassToTable(classRecord) {
    const classDeck = document.getElementById('class-deck');
    classDeck.innerHTML += `<div class="col-xl-4 col-lg-4 col-md-6">
    <div class="card">
        <div class="card-body d-flex flex-column">
            <h5><a href="courses-details.html">${classRecord.name} (${classRecord.abbreviation})</a></h5>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-vcenter mb-0">
                <tbody>
                    <tr>
                        <td class="w20"><i class="fa fa-calendar text-blue"></i></td>
                        <td class="tx-medium">Duration</td>
                        <td class="text-right">1 Year</td>
                    </tr>
                    <tr>
                        <td><i class="fa fa-cc-visa text-danger"></i></td>
                        <td class="tx-medium">Fees</td>
                        <td class="text-right">$1,674</td>
                    </tr>
                    <tr>
                        <td><i class="fa fa-users text-warning"></i></td>
                        <td class="tx-medium">Students</td>
                        <td class="text-right">125+</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card-footer">
            <div class="d-flex align-items-center mt-auto">
                <img class="avatar avatar-md mr-3" src="../assets/images/xs/avatar4.jpg" alt="avatar">
                <div>
                    <a href="#">Pro. Jane</a>
                    <small class="d-block text-muted">Class Teacher</small>
                </div>
                <div class="ml-auto text-muted">
                    <a href="javascript:void(0)" class="icon d-none d-md-inline-block ml-3"><i class="fe fe-heart mr-1"></i> 521</a>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

function handleAddClass(event) {
    event.preventDefault();
    if(!$('#addClassForm').valid()) {
        return;
    }
    toggleLoading(true);
    const classRecord = {
        name: event.target[0].value,
        abbreviation: event.target[1].value
    };

    fetch(apiUrl+'class',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classRecord)
    }).then(res => res.json())
    .then(classRecord => {
        toggleLoading(false);
        classIdToSectionMap[classRecord.id] = [];
        document.getElementById('class-select').innerHTML += `<option value="${classRecord.id}">${classRecord.name}</option>\n`;
        resetAddClassForm(event.target);
        addClassToTable(classRecord);
        swal('Successful', classRecord.name+' added successfully!', 'success');
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function resetAddClassForm(form) {
    form[0].value='';
    form[1].value='';
}

function handleAddSection(event) {
    event.preventDefault();
    if(!$('#addSectionForm').valid()) {
        return;
    }
    toggleLoading(true);
    const sectionRecord = {
        classId: event.target[0].value,
        name: event.target[1].value,
        abbreviation: event.target[2].value
    };

    fetch(apiUrl+'classsection',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sectionRecord)
    }).then(res => res.json())
    .then(sectionRecord => {
        toggleLoading(false);
        classIdToSectionMap[sectionRecord.classId].push(sectionRecord);
        resetAddSectionForm(event.target);
        swal('Successful', `${sectionRecord.name} added successfully!`, 'success');
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function resetAddSectionForm(form) {
    form[0].value='';
    form[1].value='';
    form[2].value='';
}