var classIdToSectionMap = {};
var defaultReceipt;
$(document).ready(function(){
    // toggleLoading(true);
    defaultReceipt = $('#receipt').html();
    fetch(apiUrl+'student/due-fees',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId: null,
            name: null
        })
    }).then(res => res.json())
    .then(res => {
        toggleLoading(false);
        if(!res || !res.length) {
            $('#no-student-data').html('No Data Available');
        }
        res.forEach(student => {
            addStudentToTable(student);
        });
        populateClassPicklist();
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
        populateClassPicklist();
    });
});

function handleStudentSearch(event) {
    event.preventDefault();
    const form = event.target;
    $(form).next().removeClass('d-none');
    document.getElementById('student-table-content').innerHTML = '';
    $('#no-student-data').addClass('d-flex');
    $('#no-student-data').removeClass('d-none');
    $('#pay-fee').addClass('d-none');
    $('#receipt').addClass('d-none');
    $('#receipt').html(defaultReceipt);
    $('#student-table').addClass('d-none');
    $('#no-student-data').html(`<div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>`);
    const name = (form[0].value ? form[0].value : null);
    const classId = (form[1].value ? form[1].value : null);
    fetch(apiUrl+'student/due-fees', {
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

function addStudentToTable(student) {
    $('#no-student-data').removeClass('d-flex');
    $('#no-student-data').addClass('d-none');
    $('#student-table').removeClass('d-none');
    document.getElementById('student-table-content').innerHTML += `<tr>
        <td class="w60">
            <img class="avatar" src="${student.photo ? student.photo : baseUrl+'uploads/default.jpg'}" alt="">
        </td>
        <td>${student.fullName}</td>
        <td>${student.className}</td>
        <td>${student.fee}</td>
        <td>
            <button type="button" ${(student.fee) ? '': 'disabld'} class="btn btn-primary" onclick="return openPayFeeScreen(${student.studentId}, ${student.classId})">
                Collect
            </button>
        </td>
    </tr>`;
}

function openPayFeeScreen(studentId, classId) {
    $('#student-table').parent().addClass('d-none');
    $('#pay-fee').removeClass('d-none');
    $('#pay-fee-loading').removeClass('d-none');
    $('#pay-fee-wrapper').addClass('d-none');
    fetch(apiUrl+'student/'+studentId+'/'+classId+'/fee-info')
    .then(res => res.json())
    .then(res => {
        const student = res.student;
        const feeStructures = res.feeStructures;
        const paidFees = res.paidFees;
        $('#pay-fee-loading').addClass('d-none');
        const wrapper = $('#pay-fee-wrapper');
        let totals = [0,0,0];
        wrapper.html(`<div class="d-flex card-body">
            <div class="col-12 col-md-5">
                    <div class="form-group row">
                        <label class="col-md-4 font-weight-bold col-form-label">ID Number</label>
                        <div class="col-md-8">
                            ${student.id}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-4 font-weight-bold col-form-label">Class</label>
                        <div class="col-md-8">
                            ${student.className}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-4 font-weight-bold col-form-label">Section</label>
                        <div class="col-md-8">
                            ${student.sectionName}
                        </div>
                    </div>
                </div>    
                <div class="col-12 col-md-5">   
                    <div class="form-group row">
                        <label class="col-md-4 font-weight-bold col-form-label">Student Name </label>
                        <div class="col-md-8">
                            ${student.firstName} ${student.lastName}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-4 font-weight-bold col-form-label">Gender</label>
                        <div class="col-md-8">
                            ${student.gender}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-4 font-weight-bold col-form-label">Date Of Admission </label>
                        <div class="col-md-8">
                            ${new Date(student.dateOfAdmission).toDateString()}
                        </div>
                    </div>                            
            </div>
            <div class="col-12 col-md-2">
                <div class="col-md-9">
                    <img src="${student.photo}" class="rounded float-left" alt="Profile Picture">
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
                ${feeStructures.map(structure => {
                    const amount = structure.amount;
                    const paid = (paidFees[structure.id] ? paidFees[structure.id].paidAmount : 0);
                    let availed = paid!=null;
                    if(availed) {
                        if(structure.particular.toLowerCase().includes('hostel') || structure.particular.toLowerCase().includes('transport')) {
                            availed = false;
                        }
                    }
                    if(availed) {
                        totals[0] += amount;
                        totals[1] += paid;
                        totals[2] += (amount-paid);
                    }
                    return `<tr>
                        <td>${structure.particular}</td>
                        <td>${amount}</td>
                        <td>${paid ? paid : 0}</td>
                        <td>${availed ? amount-paid: 0}</td>
                        <td><input type="checkbox" class="form-check" ${availed ? 'disabled checked' : ''}
                            id="${structure.particular.toLowerCase().includes('hostel') ? 'avail-hostel-fee' : ''}${structure.particular.toLowerCase().includes('transport') ? 'avail-transport-fee' : ''}"
                            onchange="return refreshAmount(event)" />
                        </td>
                    </tr>`
                })}
                    <tr>
                        <td class="font-weight-bold">Total</td>
                        <td>${totals[0]}</td>
                        <td>${totals[1]}</td>
                        <td id="total-fee">${totals[2]}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <form class="form-group m-3" id="fee-submitter" data-class-id="${classId}" data-student-id="${studentId}" onsubmit="return handleSubmitFee(event)">
                <label for="fee-to-pay" class="pl-2">Capture fee:</label>
                <div class="d-flex">
                    <input type="number" class="form-control" oninput="return checkFeeValidity(event)" min="1" required id="fee-to-pay" placeholder="Enter amount to pay">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        `);
        wrapper.removeClass('d-none');
        let receipt = defaultReceipt;
        receipt = receipt.replaceAll('{fullName}', `${student.firstName} ${student.lastName}`);
        receipt = receipt.replaceAll('{className}', student.className);
        $('#receipt').html(receipt);
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function checkFeeValidity(event) {
    const totalFee = Number($('#total-fee').html());
    const feeToPay = Number(event.target.value);
    event.target.setCustomValidity((feeToPay > totalFee) ? "Fee amount is greate than "+totalFee+"!": "");
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
        // toggleFeeCard();
        let receipt = $('#receipt').html();
        receipt = receipt.replaceAll('{invoiceDate}', new Date().toDateString());
        receipt = receipt.replaceAll('{amount}', 'Rs '+res.payload);
        event.target[0].value='';
        $('#pay-fee').addClass('d-none');
        $('#receipt').html(receipt);
        $('#receipt').removeClass('d-none');
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function refreshAmount(event) {
    const root = $(event.target).parent().parent();
    const branches = root.children();
    const amount = Number(branches.eq(1).html());
    const paid = Number(branches.eq(2).html());
    const balance = Number(branches.eq(3).html())
    const diff = (amount-paid) * (event.target.checked ? 1 : -1);
    branches.eq(3).html(balance+diff);
    const totalFee = Number($('#total-fee').html());
    $('#total-fee').html(totalFee+diff);
}

function handleFeeStructureRequest(event) {
    const classId = event.target.value;
    $('#fee-structure-loading').removeClass('d-none');
    fetch(apiUrl+'feestructure/'+classId)
    .then(res => res.json())
    .then(res => {
        $('#fee-structure-loading').addClass('d-none');
        const structureForm = $('#structure-form');
        let formContent = `<input type="hidden" name="classId" value="${classId}" />`;
        res.forEach(structure => {
            formContent += `<div class="form-group row">
                            <label class="col-4 font-weight-bold">${structure.particular}</label>
                            <input type="number" name="${structure.particularId}-${(structure.id ? structure.id : '')}" value="${structure.amount}" class="col form-control" required min="0" />
                        </div>`;
        });
        formContent += `<button type="submit" class="btn btn-primary">Save Changes</button>`;
        structureForm.html(formContent);
        structureForm.removeClass('d-none');
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function handleFeeStructureUpdate(event) {
    event.preventDefault();
    const feeStructures = {};
    for(let index=0;index<event.target.length;index++) {
        const field = event.target[index];
        feeStructures[field.name] = field.value;
    }
    toggleLoading(true);
    fetch(apiUrl+'feestructure/update-structures', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feeStructures)
    }).then(res => res.json())
    .then(res => {
        toggleLoading(false);
        swal('Success', 'Fee information updated successfully!', 'success');
        const structureForm = $('#structure-form');
        let formContent = `<input type="hidden" name="classId" value="${feeStructures.classId}" />`;
        res.forEach(structure => {
            formContent += `<div class="form-group row">
                            <label class="col-4 font-weight-bold">${structure.particular}</label>
                            <input type="number" name="${structure.particularId}-${(structure.id ? structure.id : '')}" value="${structure.amount}" class="col form-control" required min="0" />
                        </div>`;
        });
        formContent += `<button type="submit" class="btn btn-primary">Save Changes</button>`;
        structureForm.html(formContent);
    }).catch(err => {
        toggleLoading(false);
        swal('Something went wrong!', (err.message ? err.message : err),'error');
    });
}

function printInvoice() {
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
    pri.document.write(header+$('#invoice').html()+footer);
    pri.document.close();
    pri.focus();
    pri.print();
}