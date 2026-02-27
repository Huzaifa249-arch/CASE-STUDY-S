// ==================== AUTHENTICATION FUNCTIONS ====================

// Signup function
function signup() {
    const sname = document.getElementById('sname');
    const semail = document.getElementById('semail');
    const spass = document.getElementById('spass');
    const scpass = document.getElementById('scpass');
    const srole = document.getElementById('srole');
    const sphone = document.getElementById('sphone');
    const smsg = document.getElementById('smsg');

    // Validation
    if (!sname.value || !semail.value || !spass.value || !scpass.value || !srole.value || !sphone.value) {
        showMessage(smsg, "Please fill all required fields", "error");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(semail.value)) {
        showMessage(smsg, "Please enter a valid email address", "error");
        return;
    }

    // Password validation
    if (spass.value.length < 6) {
        showMessage(smsg, "Password must be at least 6 characters", "error");
        return;
    }

    if (spass.value !== scpass.value) {
        showMessage(smsg, "Passwords do not match", "error");
        return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(sphone.value.replace(/\D/g, ''))) {
        showMessage(smsg, "Please enter a valid 10-digit phone number", "error");
        return;
    }

    // Create user object
    let user = {
        id: Date.now(),
        name: sname.value.trim(),
        email: semail.value.trim().toLowerCase(),
        pass: spass.value,
        role: srole.value,
        phone: sphone.value.trim(),
        department: document.getElementById('sdepartment')?.value || '',
        date: new Date().toLocaleDateString(),
        status: "Active"
    };

    // Get existing users
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === user.email)) {
        showMessage(smsg, "Email already registered", "error");
        return;
    }

    // Save user
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Success message
    showMessage(smsg, "Registration Successful! Redirecting to login...", "success");
    
    // Clear form
    sname.value = '';
    semail.value = '';
    spass.value = '';
    scpass.value = '';
    sphone.value = '';
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Login function
function login() {
    const lemail = document.getElementById('lemail');
    const lpass = document.getElementById('lpass');
    const lmsg = document.getElementById('lmsg');

    if (!lemail.value || !lpass.value) {
        showMessage(lmsg, "Please enter email and password", "error");
        return;
    }

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    let user = users.find(x => x.email === lemail.value.toLowerCase() && x.pass === lpass.value);
    
    if (!user) {
        showMessage(lmsg, "Invalid email or password", "error");
        return;
    }

    // Set login status
    localStorage.setItem('login', 'yes');
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Success message
    showMessage(lmsg, "Login Successful! Redirecting to dashboard...", "success");
    
    // Clear form
    lemail.value = '';
    lpass.value = '';
    
    // Redirect to home after 1 second
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Logout function
function logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ==================== EMPLOYEE MANAGEMENT FUNCTIONS ====================

// Add Employee
function addEmp() {
    const ename = document.getElementById('ename');
    const eid = document.getElementById('eid');
    const edept = document.getElementById('edept');
    const erole = document.getElementById('erole');
    const eemail = document.getElementById('eemail');
    const ephone = document.getElementById('ephone');
    const ejdate = document.getElementById('ejdate');
    const estatus = document.getElementById('estatus');
    const eaddress = document.getElementById('eaddress');

    // Validation
    if (!ename.value || !edept.value || !erole.value || !eemail.value || !ephone.value) {
        alert("Please fill all required fields");
        return;
    }

    // Create employee object
    let employee = {
        id: eid.value || Date.now(),
        name: ename.value.trim(),
        dept: edept.value.trim(),
        role: erole.value.trim(),
        email: eemail.value.trim(),
        phone: ephone.value.trim(),
        jdate: ejdate.value || new Date().toISOString().split('T')[0],
        status: estatus.value,
        address: eaddress.value.trim(),
        dateAdded: new Date().toLocaleDateString()
    };

    // Get existing employees
    let emps = JSON.parse(localStorage.getItem('emps') || '[]');
    emps.push(employee);
    localStorage.setItem('emps', JSON.stringify(emps));
    
    // Clear form
    ename.value = '';
    eid.value = '';
    edept.value = '';
    erole.value = '';
    eemail.value = '';
    ephone.value = '';
    eaddress.value = '';
    
    // Refresh employee list
    loadEmp();
    
    // Show success message
    alert("Employee added successfully!");
}

// Load Employees
function loadEmp() {
    let emps = JSON.parse(localStorage.getItem('emps') || '[]');
    let empTable = document.getElementById('empTable');
    let empCount = document.getElementById('empCount');
    
    if (!empTable) return;
    
    empTable.innerHTML = "";
    
    if (emps.length === 0) {
        empTable.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px;">No employees found. Add your first employee!</td></tr>`;
        if (empCount) empCount.innerText = "Total Employees: 0";
        return;
    }
    
    emps.forEach((emp, index) => {
        let statusClass = emp.status.toLowerCase().replace(' ', '-');
        let row = `<tr>
            <td>${emp.id}</td>
            <td><strong>${emp.name}</strong><br><small>${emp.email}</small></td>
            <td>${emp.dept}</td>
            <td>${emp.role}</td>
            <td>${emp.phone}</td>
            <td><span class="status-badge ${statusClass}">${emp.status}</span></td>
            <td>
                <button onclick="editEmp(${index})" class="btn-edit">Edit</button>
                <button onclick="deleteEmp(${index})" class="btn-delete">Delete</button>
            </td>
        </tr>`;
        empTable.innerHTML += row;
    });
    
    if (empCount) empCount.innerText = `Total Employees: ${emps.length}`;
}

// Delete Employee
function deleteEmp(index) {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    
    let emps = JSON.parse(localStorage.getItem('emps'));
    emps.splice(index, 1);
    localStorage.setItem('emps', JSON.stringify(emps));
    loadEmp();
}

// Edit Employee (placeholder function)
function editEmp(index) {
    alert("Edit functionality will be implemented in the next version!");
}

// Search Employees
function searchEmployees() {
    let searchTerm = document.getElementById('searchEmp').value.toLowerCase();
    let emps = JSON.parse(localStorage.getItem('emps') || '[]');
    let empTable = document.getElementById('empTable');
    
    if (!empTable) return;
    
    empTable.innerHTML = "";
    
    let filteredEmps = emps.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm) ||
        emp.dept.toLowerCase().includes(searchTerm) ||
        emp.role.toLowerCase().includes(searchTerm) ||
        emp.email.toLowerCase().includes(searchTerm)
    );
    
    if (filteredEmps.length === 0) {
        empTable.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px;">No employees found matching your search.</td></tr>`;
        return;
    }
    
    filteredEmps.forEach((emp, index) => {
        let statusClass = emp.status.toLowerCase().replace(' ', '-');
        let row = `<tr>
            <td>${emp.id}</td>
            <td><strong>${emp.name}</strong><br><small>${emp.email}</small></td>
            <td>${emp.dept}</td>
            <td>${emp.role}</td>
            <td>${emp.phone}</td>
            <td><span class="status-badge ${statusClass}">${emp.status}</span></td>
            <td>
                <button onclick="editEmp(${index})" class="btn-edit">Edit</button>
                <button onclick="deleteEmp(${index})" class="btn-delete">Delete</button>
            </td>
        </tr>`;
        empTable.innerHTML += row;
    });
}

// Filter Employees by Department
function filterEmployees() {
    let filterDept = document.getElementById('filterDept').value;
    let emps = JSON.parse(localStorage.getItem('emps') || '[]');
    let empTable = document.getElementById('empTable');
    
    if (!empTable) return;
    
    empTable.innerHTML = "";
    
    let filteredEmps = filterDept ? 
        emps.filter(emp => emp.dept === filterDept) : 
        emps;
    
    if (filteredEmps.length === 0) {
        empTable.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px;">No employees found in this department.</td></tr>`;
        return;
    }
    
    filteredEmps.forEach((emp, index) => {
        let statusClass = emp.status.toLowerCase().replace(' ', '-');
        let row = `<tr>
            <td>${emp.id}</td>
            <td><strong>${emp.name}</strong><br><small>${emp.email}</small></td>
            <td>${emp.dept}</td>
            <td>${emp.role}</td>
            <td>${emp.phone}</td>
            <td><span class="status-badge ${statusClass}">${emp.status}</span></td>
            <td>
                <button onclick="editEmp(${index})" class="btn-edit">Edit</button>
                <button onclick="deleteEmp(${index})" class="btn-delete">Delete</button>
            </td>
        </tr>`;
        empTable.innerHTML += row;
    });
}

// ==================== ATTENDANCE FUNCTIONS ====================

// Mark Attendance
function markAttendance() {
    const attName = document.getElementById('attName');
    const attStatus = document.getElementById('attStatus');
    const attDate = document.getElementById('attDate');
    const attInTime = document.getElementById('attInTime');
    const attOutTime = document.getElementById('attOutTime');
    const attRemarks = document.getElementById('attRemarks');

    if (!attName.value || !attStatus.value) {
        alert("Please fill employee name and status");
        return;
    }

    // Create attendance record
    let attendance = {
        id: Date.now(),
        name: attName.value.trim(),
        status: attStatus.value,
        date: attDate.value || new Date().toISOString().split('T')[0],
        inTime: attInTime.value || "09:00",
        outTime: attOutTime.value || "18:00",
        remarks: attRemarks.value.trim(),
        timestamp: new Date().toLocaleString()
    };

    // Get existing attendance
    let att = JSON.parse(localStorage.getItem('att') || '[]');
    att.push(attendance);
    localStorage.setItem('att', JSON.stringify(att));
    
    // Clear form
    attName.value = '';
    attRemarks.value = '';
    
    // Refresh attendance list
    loadAtt();
    
    // Show success message
    alert(`Attendance marked as ${attendance.status} for ${attendance.name}`);
}

// Load Attendance
function loadAtt() {
    let att = JSON.parse(localStorage.getItem('att') || '[]');
    let attTable = document.getElementById('attTable');
    let todayCount = document.getElementById('todayCount');
    
    if (!attTable) return;
    
    attTable.innerHTML = "";
    
    if (att.length === 0) {
        attTable.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px;">No attendance records found.</td></tr>`;
        if (todayCount) todayCount.innerText = "Today's Present: 0";
        return;
    }
    
    // Sort by date (newest first)
    att.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Count today's present employees
    let today = new Date().toISOString().split('T')[0];
    let todayPresent = att.filter(a => a.date === today && a.status === 'Present').length;
    if (todayCount) todayCount.innerText = `Today's Present: ${todayPresent}`;
    
    // Display records
    att.forEach((record, index) => {
        let statusClass = record.status.toLowerCase().replace(' ', '-');
        let row = `<tr>
            <td>${formatDate(record.date)}</td>
            <td><strong>${record.name}</strong></td>
            <td><span class="status-badge ${statusClass}">${record.status}</span></td>
            <td>${record.inTime}</td>
            <td>${record.outTime}</td>
            <td>${record.remarks || '-'}</td>
            <td>
                <button onclick="deleteAttendance(${index})" class="btn-delete">Delete</button>
            </td>
        </tr>`;
        attTable.innerHTML += row;
    });
}

// Delete Attendance Record
function deleteAttendance(index) {
    if (!confirm("Are you sure you want to delete this attendance record?")) return;
    
    let att = JSON.parse(localStorage.getItem('att'));
    att.splice(index, 1);
    localStorage.setItem('att', JSON.stringify(att));
    loadAtt();
}

// Filter Attendance
function filterAttendance() {
    let filterDate = document.getElementById('filterDate').value;
    let filterStatus = document.getElementById('filterStatus').value;
    let att = JSON.parse(localStorage.getItem('att') || '[]');
    let attTable = document.getElementById('attTable');
    
    if (!attTable) return;
    
    attTable.innerHTML = "";
    
    let filteredAtt = att.filter(record => {
        let dateMatch = filterDate ? record.date === filterDate : true;
        let statusMatch = filterStatus ? record.status === filterStatus : true;
        return dateMatch && statusMatch;
    });
    
    if (filteredAtt.length === 0) {
        attTable.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px;">No attendance records found.</td></tr>`;
        return;
    }
    
    filteredAtt.forEach((record, index) => {
        let statusClass = record.status.toLowerCase().replace(' ', '-');
        let row = `<tr>
            <td>${formatDate(record.date)}</td>
            <td><strong>${record.name}</strong></td>
            <td><span class="status-badge ${statusClass}">${record.status}</span></td>
            <td>${record.inTime}</td>
            <td>${record.outTime}</td>
            <td>${record.remarks || '-'}</td>
            <td>
                <button onclick="deleteAttendance(${att.findIndex(r => r.id === record.id)})" class="btn-delete">Delete</button>
            </td>
        </tr>`;
        attTable.innerHTML += row;
    });
}

// ==================== PAYROLL FUNCTIONS ====================

// Calculate Salary
function calcSalary() {
    const pname = document.getElementById('pname');
    const ppaymonth = document.getElementById('ppaymonth');
    const pbasic = document.getElementById('pbasic');
    const phra = document.getElementById('phra');
    const pda = document.getElementById('pda');
    const pca = document.getElementById('pca');
    const ptax = document.getElementById('ptax');
    const ppf = document.getElementById('ppf');
    const potherallow = document.getElementById('potherallow');
    const potherded = document.getElementById('potherded');

    if (!pname.value || !ppaymonth.value || !pbasic.value) {
        alert("Please fill employee name, pay month, and basic salary");
        return;
    }

    // Calculate totals
    let basic = parseFloat(pbasic.value) || 0;
    let hra = parseFloat(phra.value) || 0;
    let da = parseFloat(pda.value) || 0;
    let ca = parseFloat(pca.value) || 0;
    let otherAllow = parseFloat(potherallow.value) || 0;
    let tax = parseFloat(ptax.value) || 0;
    let pf = parseFloat(ppf.value) || 0;
    let otherDed = parseFloat(potherded.value) || 0;

    let totalAllowances = hra + da + ca + otherAllow;
    let totalDeductions = tax + pf + otherDed;
    let netSalary = basic + totalAllowances - totalDeductions;

    // Display summary
    let summary = document.getElementById('salarySummary');
    let sumBasic = document.getElementById('sumBasic');
    let sumAllow = document.getElementById('sumAllow');
    let sumDed = document.getElementById('sumDed');
    let sumNet = document.getElementById('sumNet');

    if (summary && sumBasic && sumAllow && sumDed && sumNet) {
        sumBasic.textContent = `₹${basic.toLocaleString()}`;
        sumAllow.textContent = `₹${totalAllowances.toLocaleString()}`;
        sumDed.textContent = `₹${totalDeductions.toLocaleString()}`;
        sumNet.textContent = `₹${netSalary.toLocaleString()}`;
        summary.style.display = 'block';
    }

    // Store in temporary variable for saving
    window.tempPayrollData = {
        name: pname.value.trim(),
        month: ppaymonth.value,
        basic: basic,
        allowances: totalAllowances,
        deductions: totalDeductions,
        net: netSalary,
        details: {
            hra: hra,
            da: da,
            ca: ca,
            otherAllowances: otherAllow,
            tax: tax,
            pf: pf,
            otherDeductions: otherDed
        }
    };
}

// Save Salary to Payroll
function saveSalary() {
    if (!window.tempPayrollData) {
        alert("Please calculate salary first");
        return;
    }

    let payroll = {
        id: Date.now(),
        ...window.tempPayrollData,
        date: new Date().toLocaleDateString(),
        status: "Paid"
    };

    // Get existing payroll
    let pay = JSON.parse(localStorage.getItem('pay') || '[]');
    pay.push(payroll);
    localStorage.setItem('pay', JSON.stringify(pay));
    
    // Clear form
    document.getElementById('pname').value = '';
    document.getElementById('pbasic').value = '';
    document.getElementById('phra').value = '0';
    document.getElementById('pda').value = '0';
    document.getElementById('pca').value = '0';
    document.getElementById('ptax').value = '0';
    document.getElementById('ppf').value = '0';
    document.getElementById('potherallow').value = '0';
    document.getElementById('potherded').value = '0';
    
    // Hide summary
    let summary = document.getElementById('salarySummary');
    if (summary) summary.style.display = 'none';
    
    // Refresh payroll list
    loadPay();
    
    // Show success message
    alert(`Payroll saved for ${payroll.name} - Net Salary: ₹${payroll.net.toLocaleString()}`);
}

// Load Payroll
function loadPay() {
    let pay = JSON.parse(localStorage.getItem('pay') || '[]');
    let payTable = document.getElementById('payTable');
    let totalSalary = document.getElementById('totalSalary');
    
    if (!payTable) return;
    
    payTable.innerHTML = "";
    
    if (pay.length === 0) {
        payTable.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px;">No payroll records found.</td></tr>`;
        if (totalSalary) totalSalary.innerText = "Total Salary Paid: ₹0";
        return;
    }
    
    // Sort by month (newest first)
    pay.sort((a, b) => new Date(b.month) - new Date(a.month));
    
    // Calculate total salary paid
    let totalNet = pay.reduce((sum, record) => sum + record.net, 0);
    if (totalSalary) totalSalary.innerText = `Total Salary Paid: ₹${totalNet.toLocaleString()}`;
    
    // Display records
    pay.forEach((record, index) => {
        let statusClass = record.status.toLowerCase().replace(' ', '-');
        let row = `<tr>
            <td>${formatMonth(record.month)}</td>
            <td><strong>${record.name}</strong></td>
            <td>₹${record.basic.toLocaleString()}</td>
            <td>₹${record.allowances.toLocaleString()}</td>
            <td>₹${record.deductions.toLocaleString()}</td>
            <td><strong>₹${record.net.toLocaleString()}</strong></td>
            <td><span class="status-badge ${statusClass}">${record.status}</span></td>
        </tr>`;
        payTable.innerHTML += row;
    });
}

// Filter Payroll
function filterPayroll() {
    let filterMonth = document.getElementById('filterMonth').value;
    let searchTerm = document.getElementById('searchPayroll').value.toLowerCase();
    let pay = JSON.parse(localStorage.getItem('pay') || '[]');
    let payTable = document.getElementById('payTable');
    let totalSalary = document.getElementById('totalSalary');
    
    if (!payTable) return;
    
    payTable.innerHTML = "";
    
    let filteredPay = pay.filter(record => {
        let monthMatch = filterMonth ? record.month === filterMonth : true;
        let nameMatch = searchTerm ? record.name.toLowerCase().includes(searchTerm) : true;
        return monthMatch && nameMatch;
    });
    
    if (filteredPay.length === 0) {
        payTable.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px;">No payroll records found.</td></tr>`;
        if (totalSalary) totalSalary.innerText = "Total Salary Paid: ₹0";
        return;
    }
    
    let totalNet = filteredPay.reduce((sum, record) => sum + record.net, 0);
    if (totalSalary) totalSalary.innerText = `Total Salary Paid: ₹${totalNet.toLocaleString()}`;
    
    filteredPay.forEach(record => {
        let statusClass = record.status.toLowerCase().replace(' ', '-');
        let row = `<tr>
            <td>${formatMonth(record.month)}</td>
            <td><strong>${record.name}</strong></td>
            <td>₹${record.basic.toLocaleString()}</td>
            <td>₹${record.allowances.toLocaleString()}</td>
            <td>₹${record.deductions.toLocaleString()}</td>
            <td><strong>₹${record.net.toLocaleString()}</strong></td>
            <td><span class="status-badge ${statusClass}">${record.status}</span></td>
        </tr>`;
        payTable.innerHTML += row;
    });
}

// ==================== CONTACT FORM FUNCTION ====================

// Contact Form Submission
function contact() {
    const cname = document.getElementById('cname');
    const cemail = document.getElementById('cemail');
    const csubject = document.getElementById('csubject');
    const cmsg = document.getElementById('cmsg');
    const cstatus = document.getElementById('cstatus');

    if (!cname.value || !cemail.value || !csubject.value || !cmsg.value) {
        showMessage(cstatus, "Please fill all fields", "error");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cemail.value)) {
        showMessage(cstatus, "Please enter a valid email address", "error");
        return;
    }

    // Create contact message
    let contactMsg = {
        id: Date.now(),
        name: cname.value.trim(),
        email: cemail.value.trim(),
        subject: csubject.value,
        message: cmsg.value.trim(),
        date: new Date().toLocaleString(),
        status: "New"
    };

    // Get existing messages
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(contactMsg);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    // Success message
    showMessage(cstatus, "Message sent successfully! We'll get back to you soon.", "success");
    
    // Clear form
    cname.value = '';
    cemail.value = '';
    csubject.value = '';
    cmsg.value = '';
    
    // Auto-clear success message after 5 seconds
    setTimeout(() => {
        cstatus.innerText = '';
        cstatus.className = 'message';
    }, 5000);
}

// ==================== UTILITY FUNCTIONS ====================

// Show Message Helper
function showMessage(element, message, type) {
    if (!element) return;
    
    element.innerText = message;
    element.className = 'message';
    
    if (type === 'success') {
        element.style.color = '#059669';
        element.style.backgroundColor = '#d1fae5';
        element.style.border = '1px solid #a7f3d0';
    } else if (type === 'error') {
        element.style.color = '#dc2626';
        element.style.backgroundColor = '#fee2e2';
        element.style.border = '1px solid #fecaca';
    }
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return '-';
    try {
        let date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString;
        }
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

// Format Month
function formatMonth(monthString) {
    if (!monthString) return '-';
    try {
        let [year, month] = monthString.split('-');
        let date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    } catch (e) {
        return monthString;
    }
}

// Populate Employee Names for Dropdowns
function populateEmployeeNames() {
    let emps = JSON.parse(localStorage.getItem('emps') || '[]');
    
    // For attendance page
    let attDatalist = document.getElementById('empNames');
    if (attDatalist) {
        attDatalist.innerHTML = '';
        emps.forEach(emp => {
            let option = document.createElement('option');
            option.value = emp.name;
            attDatalist.appendChild(option);
        });
    }
    
    // For payroll page
    let payDatalist = document.getElementById('payEmpNames');
    if (payDatalist) {
        payDatalist.innerHTML = '';
        emps.forEach(emp => {
            let option = document.createElement('option');
            option.value = emp.name;
            payDatalist.appendChild(option);
        });
    }
}

// ==================== APPLICATION INITIALIZATION ====================

// Initialize Application
function initApp() {
    // Check login status
    if (localStorage.getItem('login')) {
        let loginBtn = document.getElementById('loginBtn');
        let signupBtn = document.getElementById('signupBtn');
        let logoutBtn = document.getElementById('logoutBtn');
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline';
    }
    
    // Load data for current page
    if (document.getElementById('empTable')) loadEmp();
    if (document.getElementById('attTable')) loadAtt();
    if (document.getElementById('payTable')) loadPay();
    
    // Add CSS for status badges if not already present
    if (!document.getElementById('statusBadgeCSS')) {
        let style = document.createElement('style');
        style.id = 'statusBadgeCSS';
        style.textContent = `
            .status-badge {
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                display: inline-block;
            }
            .status-badge.active,
            .status-badge.present,
            .status-badge.paid {
                background: #d1fae5;
                color: #059669;
            }
            .status-badge.inactive,
            .status-badge.absent {
                background: #fee2e2;
                color: #dc2626;
            }
            .status-badge.late {
                background: #fef3c7;
                color: #d97706;
            }
            .status-badge.half-day {
                background: #dbeafe;
                color: #2563eb;
            }
            .status-badge.leave {
                background: #f3e8ff;
                color: #7c3aed;
            }
            .btn-edit {
                background: #3b82f6;
                color: white;
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                margin-right: 5px;
                font-size: 12px;
            }
            .btn-edit:hover {
                background: #2563eb;
            }
            .btn-delete {
                background: #ef4444;
                color: white;
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            }
            .btn-delete:hover {
                background: #dc2626;
            }
        `;
        document.head.appendChild(style);
    }
}

// Load Home Page Stats
function loadHomeStats() {
    // Load employee count
    let emps = JSON.parse(localStorage.getItem('emps') || '[]');
    let empCount = document.getElementById('empCount');
    if (empCount) empCount.textContent = emps.length;
    
    // Load today's attendance count
    let today = new Date().toISOString().split('T')[0];
    let att = JSON.parse(localStorage.getItem('att') || '[]');
    let todayAtt = att.filter(a => a.date === today && a.status === 'Present');
    let attCount = document.getElementById('attCount');
    if (attCount) attCount.textContent = todayAtt.length;
    
    // Load payroll count
    let pay = JSON.parse(localStorage.getItem('pay') || '[]');
    let payCount = document.getElementById('payCount');
    if (payCount) payCount.textContent = pay.length;
}

// ==================== PAGE-SPECIFIC INITIALIZATION ====================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    // If on home page, load stats
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname.endsWith('/') ||
        window.location.pathname === '') {
        loadHomeStats();
    }
    
    // If on attendance or payroll page, populate employee names
    if (window.location.pathname.includes('attendance.html') || 
        window.location.pathname.includes('payroll.html')) {
        populateEmployeeNames();
    }
    
    // Set current month for payroll if available
    let payMonthInput = document.getElementById('ppaymonth');
    let filterMonthInput = document.getElementById('filterMonth');
    if (payMonthInput) {
        const now = new Date();
        const currentMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
        payMonthInput.value = currentMonth;
    }
    if (filterMonthInput) {
        const now = new Date();
        const currentMonth = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
        filterMonthInput.value = currentMonth;
    }
    
    // Set today's date for attendance if available
    let attDateInput = document.getElementById('attDate');
    if (attDateInput) {
        attDateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Set default times for attendance if available
    let attInTimeInput = document.getElementById('attInTime');
    let attOutTimeInput = document.getElementById('attOutTime');
    if (attInTimeInput && !attInTimeInput.value) {
        attInTimeInput.value = '09:00';
    }
    if (attOutTimeInput && !attOutTimeInput.value) {
        attOutTimeInput.value = '18:00';
    }
});

// ==================== GLOBAL FUNCTION EXPORTS ====================

// Make functions available globally
window.signup = signup;
window.login = login;
window.logout = logout;
window.addEmp = addEmp;
window.loadEmp = loadEmp;
window.deleteEmp = deleteEmp;
window.editEmp = editEmp;
window.searchEmployees = searchEmployees;
window.filterEmployees = filterEmployees;
window.markAttendance = markAttendance;
window.loadAtt = loadAtt;
window.deleteAttendance = deleteAttendance;
window.filterAttendance = filterAttendance;
window.calcSalary = calcSalary;
window.saveSalary = saveSalary;
window.loadPay = loadPay;
window.filterPayroll = filterPayroll;
window.contact = contact;
window.showMessage = showMessage;
window.formatDate = formatDate;
window.formatMonth = formatMonth;
window.populateEmployeeNames = populateEmployeeNames;