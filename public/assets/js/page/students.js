$(document).ready(function(){
    $('#admission-form').validate();
    $('.datepicker').each((index, picker) => {
        $(picker).datepicker();
    });
});

function addStudentToTable(student) {
    $('#no-student-data').removeClass('d-flex');
    $('#no-student-data').addClass('d-none');
    $('#student-table').removeClass('d-none');
    document.getElementById('student-table-content').innerHTML += `<tr>
        <td class="w60">
            <img class="avatar" src="${student.photo ? student.photo : baseUrl+'uploads/default.jpg'}" alt="">
        </td>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.className} ${student.sectionName?('('+student.sectionName+')'):''}</td>
        <td>${new Date(student.dateOfBirth).toDateString()}</td>
        <td>${student.gender}</td>
        <td>${new Date(student.dateOfAdmission).toDateString()}</td>
        <td>
            <button type="button" class="btn btn-icon btn-sm" title="View"><i class="fa fa-eye"></i></button>
            <button type="button" class="btn btn-icon btn-sm" title="Edit"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm"><i class="fa fa-trash-o text-danger"></i></button>
        </td>
    </tr>`;
}

function togglePresentAddress(event) {
    const addressSame = event.target.checked;
    const presentAddress = $('.present-address');
    if(!addressSame) {
        presentAddress.removeClass('d-none');
        presentAddress.find('input').attr({required: 'required'});
        presentAddress.find('textarea').attr({required: 'required'});
    } else {
        presentAddress.addClass('d-none');
        presentAddress.find('input').removeAttr('required');
        presentAddress.find('textarea').removeAttr('required');
    }
}

function toggleParentsInfo(event) {
    const value = event.target.value;
    const parentsInfo = $('.parent-info');
    const guardianInfo = $('.guardian-info');
    if(value === 'Parents') {
        parentsInfo.removeClass('d-none');
        parentsInfo.find('input').attr({required: 'required'});
        guardianInfo.addClass('d-none');
        guardianInfo.find('input').removeAttr('required');
    } else if(value === 'Guardian') {
        parentsInfo.addClass('d-none');
        parentsInfo.find('input').removeAttr('required');
        guardianInfo.removeClass('d-none');
        guardianInfo.find('input').attr({required: 'required'});
    }
}

function handleAdmissionFormSubmit(event) {
    event.preventDefault();
    if(!$('#admission-form').valid()) {
        return;
    }
    toggleLoading(true);
    $('#student-form-alert').addClass('d-none');
    const form = event.target;
    let index=0;
    const permanentAddress = form[9].value.split(',');
    const admissionFormResources = {
        firstName: form[index].value,
        lastName: form[++index].value,
        admissionForClass: form[++index].value,
        classSection: Number(form[++index].value),
        dateOfBirth: formatDate(form[index+=2].value),
        placeOfBirth: form[++index].value,
        nationality: form[++index].value,
        gender: form[++index].value,
        permanentAddress: {
            street: (permanentAddress.length>1 ? 
                permanentAddress.slice(0, permanentAddress.length-1).join(',').trim()
                : permanentAddress.join(',').trim()),
            city: (permanentAddress.length>1 ? 
                permanentAddress[permanentAddress.length-1].trim()
                : null),
            state: form[index+=2].value,
            pincode: form[++index].value
        },
        caste: (form[++index].checked ? (form[index++].value + (index++ ? '' : '')) : 
            (form[++index].checked ? (form[index++].value) : 
                (form[++index].checked ? form[index].value : null))),
        motherTongue: form[++index].value,
        aadharNo: form[index+=2].value,
        relegion: form[++index].value,
        bloodGroup: form[++index].value
    };
    if(form[++index].checked) {
        admissionFormResources.presentAddress = admissionFormResources.permanentAddress;
        index+=3;
    } else {
        const presentAddress = form[++index].value.split(',');
        admissionFormResources.presentAddress = {
            street: (presentAddress.length>1 ? 
                presentAddress.slice(0, presentAddress.length-1).join(',').trim()
                : presentAddress.join(',').trim()),
            city: (presentAddress.length>1 ? 
                presentAddress[presentAddress.length-1].trim()
                : null),
            state: form[++index].value,
            pincode: form[++index].value
        }
    }

    // const aadharNo = admissionFormResources.aadharNo;
    var photos = new FormData();
    if(form[16].files && form[16].files[0]) {
        photos.append('student', form[16].files[0]);
    }
    const parents = [];
    const typeOfParent = form[++index].value;
    if(typeOfParent === 'Parents') {
        if(form[++index].files && form[index].files[0]) {
            photos.append('Father', form[index].files[0]);
        }
        parents.push({
            firstName: form[++index].value.split(' ')[0],
            lastName: form[index].value.split(' ')[1],
            qualification: form[++index].value,
            occupation: form[++index].value,
            mobileNo: form[++index].value,
            email: form[++index].value,
            relationToStudent: 'Father'
        });
        if(form[++index].files && form[index].files[0]) {
            photos.append('Mother', form[index].files[0]);
        }
        parents.push({
            firstName: form[++index].value.split(' ')[0],
            lastName: form[index].value.split(' ')[1],
            qualification: form[++index].value,
            occupation: form[++index].value,
            mobileNo: form[++index].value,
            email: form[++index].value,
            relationToStudent: 'Mother'
        });
    } else if(typeOfParent === 'Guardian') {
        index += 12;
        if(form[++index].files && form[index].files[0]) {
            photos.append('Guardian', form[index].files[0]);
        }
        parents.push({
            firstName: form[++index].value.split(' ')[0],
            lastName: form[index].value.split(' ')[1],
            qualification: form[++index].value,
            occupation: form[++index].value,
            mobileNo: form[++index].value,
            email: form[++index].value,
            relationToStudent: 'Guardian'
        });
    }

    admissionFormResources.parents = parents;
    admissionFormResources.dateOfBirth = new Date(admissionFormResources.dateOfBirth);
    // console.log(admissionFormResources);

    fetch(apiUrl+'student/validate-admission-form-resources', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(admissionFormResources)
    }).then(res => res.json())
    .then(res => {
        toggleLoading(false);
        if(typeof res === 'boolean') {
            if(res) {
                toggleLoading(true);
                fetch(apiUrl+'fileupload', {
                    method: 'POST',
                    body: photos
                }).then(res => res.json())
                .then(urls => {
                    admissionFormResources.photo = urls.student;
                    for (let index = 0; index < admissionFormResources.parents.length; index++) {
                        admissionFormResources.parents[index].photo = urls[admissionFormResources.parents[index].relationToStudent];
                    }
                    return fetch(apiUrl+'student/admission', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(admissionFormResources)
                    })
                }).then(res => res.json())
                .then(res => {
                    // console.log(res);
                    toggleLoading(false);
                    if(res.success) {
                        swal('Form Submittes', 'Form is successfully submitted', 'success');
                        showFeeForClass(admissionFormResources.admissionForClass, res.payload);
                        addStudentToTable({
                            firstName: admissionFormResources.firstName,
                            lastName: admissionFormResources.lastName,
                            className: form[2].options[form[2].selectedIndex].text,
                            dateOfBirth: admissionFormResources.dateOfBirth,
                            gender: admissionFormResources.gender,
                            dateOfAdmission: new Date().toUTCString(),
                            photo: admissionFormResources.photo
                        });
                        resetAdmissionForm(form);
                    } else {
                        let listErrors = '';
                        if(res.message) {
                            listErrors += `<li>${res.message}</li>`;
                        } else {
                            for (let key in res) {
                                res[key]._errors.forEach(msg => {
                                    listErrors += `<li>${msg['<ErrorMessage>k__BackingField']}</li>`;
                                });
                            }
                        }
                        populateAdmissionAlert(listErrors);
                    }
                }).catch(err => {
                    toggleLoading(false);
                    swal('Something went wrong!', (err.message ? err.message : err),'error');
                });
            } else {
                populateAdmissionAlert(`<li>Aadhar Number ${admissionFormResources.aadharNo} already exists.</li>`);
            }
        } else {
            let listErrors = '';
            if(res.message) {
                listErrors += `<li>${res.message}</li>`;
            } else {

                for(let key in res) {
                    res[key]._errors.forEach(msg => {
                        listErrors += `<li>${msg['<ErrorMessage>k__BackingField']}</li>`;
                    });
                }
            }
            populateAdmissionAlert(listErrors);
        }
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function resetAdmissionForm(form) {
    for(let index=0;index<form.length;index++) {
        if(form[index].name) {
            $(form[index]).val('');
        }
    }
    $(form).find('.dropify-preview').hide();
    $('#class-section-select').html('<option disabled selected value="">Select</option>');
}

function populateAdmissionAlert(listErrors) {
    $('#student-form-alert').find('ul').html(listErrors);
    $('#student-form-alert').removeClass('d-none');
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#student-form-alert").offset().top
    }, 500);
}

function showFeeForClass(classId, studentId) {
    toggleLoading(true);
    fetch(apiUrl+'feestructure/'+classId)
    .then(res => res.json())
    .then(res => {
        toggleLoading(false);
        $('#fee-card-admission').removeClass('d-none');
        $('#admission-card').addClass('d-none');
        let feeList = '';
        let totalFee = 0;
        // console.log(res);
        res.forEach(feeItem => {
            const particular = feeItem.particular.toLowerCase();
            feeList += `<tr data-amount="${feeItem.amount}" ${particular.includes('hostel') ? 'class="d-none" id="hostel-fee"':''}${particular.includes('transport') ? 'class="d-none" id="transport-fee"':''}>
                <td>${feeItem.particular}</td>
                <td>${feeItem.amount}</td>
                <td>0</td>
                <td>${feeItem.amount}</td>
            </tr>`;
            if(!particular.includes('transport') && !particular.includes('hostel')) {
                totalFee += feeItem.amount;
            }
        });
        feeList += `<tr>
            <td class="font-weight-bold">Total:</td>
            <td class="font-weight-bold total-fee">${totalFee}</td>
            <td class="font-weight-bold">0</td>
            <td class="font-weight-bold total-fee">${totalFee}</td>
        </tr>`;
        $('#fee-after-admission').html(feeList);
        $('#fee-submitter').data('total-fee', totalFee);
        $('#fee-submitter').data('class-id', classId);
        $('#fee-submitter').data('student-id', studentId);
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function checkFeeValidity(event) {
    const totalFee = Number($('#fee-submitter').data('total-fee'));
    const feeToPay = Number(event.target.value);
    event.target.setCustomValidity((feeToPay > totalFee) ? "Fee amount is greate than "+totalFee+"!": "");
}

function toggleFeeCard() {
    $('#fee-card-admission').addClass('d-none');
    $('#admission-card').removeClass('d-none');
}

function feeToggle(event) {
    const entity = $(event.target).data('entity');
    const id = '#'+entity+'-fee';
    const amount = $(id).data('amount');
    const totalFee = Number(document.getElementsByClassName('total-fee')[0].innerHTML);
    const newTotal = totalFee + amount * (event.target.checked ? 1 : -1);
    $('.total-fee').html(newTotal);
    event.target.checked ? $(id).removeClass('d-none') : $(id).addClass('d-none');
    $('#fee-submitter').data('total-fee', newTotal);
}

function handleSubmitFee(event) {
    event.preventDefault();

    const classId = $(event.target).data('class-id');
    const studentId = $(event.target).data('student-id');
    const hostel = document.getElementById('avail-hostel-fee').checked;
    const transport = document.getElementById('avail-transport-fee').checked;
    const feeToPay = Number(event.target[0].value);
    toggleLoading(true);
    fetch(apiUrl+'payfee',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId: classId,
            studentId: studentId,
            hostel: hostel,
            transport: transport,
            amount: feeToPay,
            year: new Date().getFullYear().toString()
        })
    }).then(res => res.json())
    .then(res => {
        toggleLoading(false);
        swal('Pay Successful!', res.message, 'success');
        toggleFeeCard();
        event.target[0].value='';
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function handleStudentSearch(event) {
    event.preventDefault();
    const form = event.target;
    $(form).next().removeClass('d-none');
    $('#id-card').addClass('d-none');
    document.getElementById('student-table-content-2').innerHTML = '';
    $('#no-student-data-2').addClass('d-flex');
    $('#no-student-data-2').removeClass('d-none');
    $('#student-table-2').addClass('d-none');
    $('#no-student-data-2').html(`<div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>`);
    const name = (form[0].value ? form[0].value : null);
    const classId = (form[1].value ? form[1].value : null);
    fetch(apiUrl+'student/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            classId: classId
        })
    }).then(res => res.json())
    .then(res => {
        if(!res || !res.length) {
            $('#no-student-data-2').html('No Student Found');
        }
        res.forEach(student => {
            addStudentToSearchTable(student);
        });
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function addStudentToSearchTable(student) {
    $('#no-student-data-2').removeClass('d-flex');
    $('#no-student-data-2').addClass('d-none');
    $('#student-table-2').removeClass('d-none');
    document.getElementById('student-table-content-2').innerHTML += `<tr>
        <td class="w60">
            <img class="avatar" src="${student.photo ? student.photo : baseUrl+'uploads/default.jpg'}" alt="">
        </td>
        <td>${student.firstName} ${student.lastName}</td>
        <td>${student.className} ${student.sectionName?('('+student.sectionName+')'):''}</td>
        <td>${new Date(student.dateOfBirth).toDateString()}</td>
        <td>${student.gender}</td>
        <td>${new Date(student.dateOfAdmission).toDateString()}</td>
        <td class="d-flex">
            <button class="btn btn-primary mx-auto" onclick="return generateIdCard(${student.id})">Generate</button>
        </td>
    </tr>`;
}

function generateIdCard(studentId) {
    $('#student-table-2').parent().addClass('d-none');
    $('#id-card').removeClass('d-none');
    $('#id-card-loading').removeClass('d-none');
    $('#id-card-wrapper').addClass('d-none');
    fetch(apiUrl+'student/'+studentId)
    .then(res => res.json())
    .then(res => {
        $('#id-card-loading').addClass('d-none');
        const wrapper = $('#id-card-wrapper');
        wrapper.removeClass('d-none');
        let content = wrapper.html();
        content = content.replace('{fullname}', res.firstName+' '+res.lastName);
        content = content.replace('{class section}', res.className+(res.sectionName ? ' ('+res.sectionName+')' : ''));
        content = content.replace('{gender}', res.gender);
        content = content.replace('{birthDate}', new Date(res.dateOfBirth).toDateString());
        content = content.replace('{bloodGroup}', res.bloodGroup);
        content = content.replace('{photo}', res.photo ? res.photo : baseUrl+'uploads/default.jpg');
        content = content.replace('{dateOfAdmission}', new Date(res.dateOfAdmission).toDateString());
        wrapper.html(content);
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function handleStudentSearchMain(event) {
    event.preventDefault();
    const form = event.target;
    $(form).next().removeClass('d-none');
    document.getElementById('student-table-content').innerHTML = '';
    $('#no-student-data').addClass('d-flex');
    $('#no-student-data').removeClass('d-none');
    $('#student-table').addClass('d-none');
    $('#no-student-data').html(`<div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>`);
    const name = (form[0].value ? form[0].value : null);
    const classId = (form[1].value ? form[1].value : null);
    fetch(apiUrl+'student/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            classId: classId
        })
    }).then(res => res.json())
    .then(res => {
        if(!res || !res.length) {
            $('#no-student-data').html('No Student Found');
        }
        res.forEach(student => {
            addStudentToTable(student);
        });
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function printIdCard() {
    const header = `<!doctype html>
    <html lang="en" dir="ltr">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="favicon.ico" type="image/x-icon"/>
    <title>:: Ericsson :: Fees</title>
    
    <!-- Bootstrap Core and vandor -->
    <link rel="stylesheet" href="../assets/plugins/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
    <link rel="stylesheet" href="../assets/plugins/datatable/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="../assets/plugins/sweetalert/sweetalert.css">
    
    <!-- Core css -->
    <link rel="stylesheet" href="../assets/css/style.min.css"/>
    <link rel="stylesheet" href="assets/css/styles.css"/>
    </head>
    
    <body class="font-muli theme-cyan gradient">`;
    const footer = `<!-- Start Main project js, jQuery, Bootstrap -->
    <script src="../assets/bundles/lib.vendor.bundle.js"></script>
    
    <!-- Start Plugin Js -->
    <script src="../assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="../assets/bundles/dataTables.bundle.js"></script>
    <script src="../assets/plugins/sweetalert/sweetalert.min.js"></script>
    
    <!-- Start project main js  and page js -->
    <script src="../assets/js/core.js"></script>
    <script src="assets/js/table/datatable.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/page/payments.js"></script>
    </body>
    </html>`;
    let ifram = document.createElement("iframe");
    ifram.style = "display:none";
    document.body.appendChild(ifram);
    pri = ifram.contentWindow;
    pri.document.open();
    pri.document.write(header+$('#id-card-wrapper').html()+footer);
    pri.document.close();
    pri.focus();
    pri.print();
}