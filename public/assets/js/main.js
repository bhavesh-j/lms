const baseUrl = 'https://localhost:44399/';
const apiUrl = baseUrl+'api/';
var classIdToSectionMap = {};

function toggleLoading(showLoading) {
    if(showLoading) {
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("overlay").style.display = "none";
    }
}

function populateClassPicklist() {
    fetch(apiUrl+'class', {
        method: 'GET'
    }).then(res => res.json())
    .then(classList => {
        classIdToSectionMap = Object.fromEntries(classList.map(classRecord => [classRecord.id, classRecord.sections]));
        let classOptions = '<option disabled selected value="">Select...</option>\n';
        classList.forEach(classRecord => {
            classOptions += `<option value="${classRecord.id}">${classRecord.name}</option>\n`;
        });
        $('.class-select').html(classOptions);
        $('.class-select').removeAttr('disabled');
        $('.enabled-default option:first').removeAttr('disabled');
    })
    // .catch(err => swal('Something went wrong!', (err.message ? err.message : err),'error'));
    .catch(err => console.log('Failed to fetch classes! - '+err));
}

function populateClassSection(event) {
    const classId = event.target.value;
    const sectionSelect = $('#class-section-select');
    let sectionOptions = '<option disabled selected value="">Select</option>';
    classIdToSectionMap[classId].forEach(section => {
        sectionOptions += `<option value="${section.id}">${section.name}</option>`;
    });
    sectionSelect.html(sectionOptions);
}