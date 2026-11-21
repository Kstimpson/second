/*Web Project Calabar High school

Group Members
1)Name: Lescene Edwards #2504351
2)Name: Nickaloy Ranglin #2409481
3)Name: Stephawn Stimpson #2505180
4)Name: Theo Wright #2505286
Tutorial Class Time: Thursday 1pm-2:50pm
Calabar High school adresss: 61 Red Hills Road, Kingston 20, Jamaica
*/

document.addEventListener("DOMContentLoaded", () => 
    {
        //for forms
        const student = document.getElementById("studentform");
        const teacher = document.getElementById("addteacherform");
        const finance = document.getElementById("financialform"); 
        const record = document.getElementById("teacherform");
        const updatestudentform = document.getElementById("updatestudentform");
        const updateteacherform = document.getElementById("updateteacherform");
        const deletestudentform = document.getElementById("deletestudentform");
        const deleteteacherform = document.getElementById("deleteteacherform");
        const login = document.getElementById("loginform");
        const contact = document.getElementById("registration-form");

        //for local storage
        let finances = JSON.parse(localStorage.getItem("finances")) || [];
        let students = JSON.parse(localStorage.getItem("students")) || []; 
        let records = JSON.parse(localStorage.getItem("records")) || [];
        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

        let studentcounter = Number(localStorage.getItem("studentcounter")) || 0;
        let teachercounter = Number(localStorage.getItem("teachercounter")) || 0;
        let paymentcounter = Number(localStorage.getItem("paymentcounter")) || 0;

        //login
        login?.addEventListener("submit", function(event) {

            event.preventDefault();
            const userid = document.getElementById("userid").value;
            const password = document.getElementById("password").value;
            const selectedrole = document.querySelector('input[name="role"]:checked');

            if (!selectedrole) 
                {
                    alert("Please select a login role.");
                    return;
                }

            const role = selectedrole.value;
            const students = JSON.parse(localStorage.getItem("students")) || [];
            const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

            // Admin credentials
            const adminID = "Ad01";
            const adminPassword = "admin123";

            if (role === "admin") 
            {
                if (userid === adminID && password === adminPassword) 
                    {
                        window.location.href = "admin_dashboard.html";
                    }
                else 
                    {
                        alert("Invalid Admin ID or Password.");
                    }
            }

            // Check Student login
            else if (role === "student") 
            {
                const foundstudent = students.find(function(student) {return student.id === userid && student.password === password;});

                if (foundstudent) 
                    {
                        localStorage.setItem("loggedInStudentId", foundstudent.id);
                        window.location.href = "student_dashboard.html";
                    }
                else 
                    {
                        alert("Invalid Student ID or Password.");
                    }
            }

            // Check Teacher login
            else if (role === "teacher") 
            {

                const foundteacher = teachers.find(function(teacher) {return teacher.id === userid && teacher.password === password;});

                if (foundteacher) 
                    {
                        window.location.href = "teacher_dashboard.html";
                    }
                else 
                    {
                        alert("Invalid Teacher ID or Password.");
                    }
            }
        });

        //register.html
        //student
        function generatestudentid() 
        {
            studentcounter++
            localStorage.setItem("studentcounter", studentcounter);
            return "ST" + String(studentcounter).padStart(3, "0");
        }
        function generatepassword() 
        {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
            let password = "";
            for (let i = 0; i < 8; i++)
                {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    password += characters[randomIndex];
                }
            return password;
        }
        function displaystudents()
        {
            const stureg = document.getElementById("students-reg-info");
            if (!stureg) return;
            stureg.replaceChildren();

            students.forEach(function(student)
            {
                const row = stureg.insertRow();

                row.insertCell(0).textContent = student.id;
                row.insertCell(1).textContent = student.firstname;
                row.insertCell(2).textContent = student.lastname;
                row.insertCell(3).textContent = student.age;
                row.insertCell(4).textContent = student.gender;
                row.insertCell(5).textContent = student.grade;
                row.insertCell(6).textContent = student.password;
            });
        }
        student?.addEventListener("submit", function(event) 
        {
            event.preventDefault();
            const firstName = document.getElementById("firstname").value;
            const lastName = document.getElementById("lastname").value;
            const age = Number(document.getElementById("age").value);

            if (!/^[a-zA-Z -]+$/.test(firstName) || !/^[a-zA-Z -]+$/.test(lastName)) 
                {
                    alert("Names must contain letters only.");
                    return;
                }

            if (age < 12 || age > 18)
                {
                    alert("Invalid age. Student must be between 12 and 18 years old.");
                    return;
                }

            const newstudent = {
                
                id: generatestudentid(),
                firstname: document.getElementById("firstname").value,
                lastname: document.getElementById("lastname").value,
                age: document.getElementById("age").value,
                gender: document.getElementById("gender").value,
                grade: document.getElementById("studentclass").value,
                password: generatepassword()
            };
            
            students.push(newstudent);
            localStorage.setItem("students", JSON.stringify(students));
            displaystudents();
        });
        updatestudentform?.addEventListener("submit", function(event) 
        {
            event.preventDefault();
            const firstname = document.getElementById("updatefirstname").value;
            const lastname = document.getElementById("updatelastname").value;
            const age = Number(document.getElementById("updateage").value);

            if (!/^[a-zA-Z -]+$/.test(firstname) || !/^[a-zA-Z -]+$/.test(lastname))
                {
                    alert("Names must contain letters only.");
                    return;
                }

            if (age < 12 || age > 18) 
                {
                    alert("Invalid age. Student must be between 12 and 18 years old.");
                    return;
                }

            const studentid = document.getElementById("updateStudentID").value;
            const foundstudent = students.find(function(student) {return student.id === studentid;});

            if (!foundstudent) 
                {
                    alert("Student ID not found.");
                    return;
                }

            foundstudent.firstname = document.getElementById("updatefirstname").value;
            foundstudent.lastname = document.getElementById("updatelastname").value;
            foundstudent.age = Number(document.getElementById("updateage").value);
            foundstudent.gender = document.getElementById("updategender").value;
            foundstudent.grade = document.getElementById("updateclass").value;
            localStorage.setItem("students", JSON.stringify(students));
            displaystudents();
            alert("Student information updated successfully.");
        });
        deletestudentform?.addEventListener("submit", function(event)
        {
            event.preventDefault();
            const studentid = document.getElementById("deletestudentid").value;
            const studentindex = students.findIndex(function(student) {return student.id === studentid;});

            if (studentindex === -1) 
                {
                    alert("Student ID not found.");
                    return;
                }

            const confirmDelete = confirm("Are you sure you want to remove this student?");

            if (!confirmDelete) {return;}
            students.splice(studentindex, 1);
            localStorage.setItem("students", JSON.stringify(students));
            displaystudents();
            alert("Student removed successfully.");
        });
        displaystudents();

        //teacher
        function generateteacherid() 
        {
            teachercounter++;
            localStorage.setItem("teachercounter", teachercounter);
            return "T" + String(teachercounter).padStart(3, "0");
        }
        function displayteachers()
        {
            const teachreg = document.getElementById("teachers-reg-info");
            if (!teachreg) return;
            teachreg.replaceChildren();

            teachers.forEach(function(teacher)
            {
                const row = teachreg.insertRow();
                row.insertCell(0).textContent = teacher.id;
                row.insertCell(1).textContent = teacher.firstname;
                row.insertCell(2).textContent = teacher.lastname;
                row.insertCell(3).textContent = teacher.subject;
                row.insertCell(4).textContent = teacher.password;
            });
        }
        teacher?.addEventListener("submit", function(event)
        {
            event.preventDefault();

            const firstname = document.getElementById("teacherfirstname").value;
            const lastname = document.getElementById("teacherlastname").value;

            if (!/^[a-zA-Z -]+$/.test(firstname) || !/^[a-zA-Z -]+$/.test(lastname)) 
                {
                    alert("Names must contain letters only.");
                    return;
                }

            const newteacher = {
                id: generateteacherid(),
                firstname: firstname,
                lastname: lastname,
                subject: document.getElementById("teachersubject").value,
                password: generatepassword()
            };
            teachers.push(newteacher);
            localStorage.setItem("teachers", JSON.stringify(teachers));
            displayteachers();
            alert("Teacher registered successfully.");
        });
        updateteacherform?.addEventListener("submit", function(event)
        {
            event.preventDefault();
            const firstname = document.getElementById("updateteacherfirstname").value;
            const lastname = document.getElementById("updateteacherlastname").value;

            if (!/^[a-zA-Z -]+$/.test(firstname) || !/^[a-zA-Z -]+$/.test(lastname)) 
                {
                    alert("Names must contain letters only.");
                    return;
                }

            const teacherid = document.getElementById("updateteacherid").value;
            const foundteacher = teachers.find(function(teacher) {
                return teacher.id === teacherid;
            });

            if (!foundteacher) 
                {
                    alert("Teacher ID not found.");
                    return;
                }

            foundteacher.firstname = firstname;
            foundteacher.lastname = lastname;
            foundteacher.subject = document.getElementById("updateteachersubject").value;

            localStorage.setItem("teachers", JSON.stringify(teachers));
            displayteachers();
            alert("Teacher information updated successfully.");
        });
        deleteteacherform?.addEventListener("submit", function(event)
        {
            event.preventDefault();
            const teacherid = document.getElementById("deleteteacherid").value;
            const teacherindex = teachers.findIndex(function(teacher) {return teacher.id === teacherid;});

            if (teacherindex === -1) 
                {
                    alert("Teacher ID not found.");
                    return;
                }

            teachers.splice(teacherindex, 1);
            localStorage.setItem("teachers", JSON.stringify(teachers));
            displayteachers();
            alert("Teacher removed successfully.");
        });
        displayteachers();        

        //finance.html
        function displayFinances()
        {
            const financetable = document.getElementById("financetablebody");
            const feetable = document.getElementById("feetable");
            const studentfeetable = document.getElementById("studentfeetable");
            const loggedinstudentid = localStorage.getItem("loggedInStudentId");

            if (financetable)
                {
                    financetable.replaceChildren();
                }
            if (feetable)
                {
                    feetable.replaceChildren();
                }
            if (studentfeetable)
                {
                    studentfeetable.replaceChildren();
                }

            finances.forEach(function(finance)
            {
                if (studentfeetable && loggedinstudentid && finance.studentid !== loggedinstudentid)return;

                if (financetable)
                    {
                        const row = financetable.insertRow();
                        row.insertCell(0).textContent = finance.studentid;
                        row.insertCell(1).textContent = finance.studentName;
                        row.insertCell(2).textContent = finance.totalFee;
                        row.insertCell(3).textContent = finance.amountPaid;
                        row.insertCell(4).textContent = finance.balance;
                        row.insertCell(5).textContent = finance.paymentstatus;
                    }

                if (feetable)
                    {
                        const row = feetable.insertRow();
                        row.insertCell(0).textContent = finance.studentid;
                        row.insertCell(1).textContent = finance.studentName;
                        row.insertCell(2).textContent = finance.totalFee;
                        row.insertCell(3).textContent = finance.amountPaid;
                        row.insertCell(4).textContent = finance.balance;
                        row.insertCell(5).textContent = finance.paymentstatus;
                    }

                if (studentfeetable)
                    {
                        const row = studentfeetable.insertRow();
                        row.insertCell(0).textContent = finance.studentid;
                        row.insertCell(1).textContent = finance.studentName;
                        row.insertCell(2).textContent = finance.totalFee;
                        row.insertCell(3).textContent = finance.amountPaid;
                        row.insertCell(4).textContent = finance.balance;
                        row.insertCell(5).textContent = finance.paymentstatus;
                    }
            });
        }

        function displayacademicrecords()
        {
            const studenttable = document.getElementById("studenttable");
            if (!studenttable) return;

            const studentfeetable = document.getElementById("studentfeetable");
            const loggedinstudentid = localStorage.getItem("loggedInStudentId");

            studenttable.replaceChildren();
            records.forEach(function(record)
            {
                if (studentfeetable && loggedinstudentid && record.studentid !== loggedinstudentid)return;

                const student = students.find(function(item) {return item.id === record.studentid;});
                const row = studenttable.insertRow();
                row.insertCell(0).textContent = record.studentid;
                row.insertCell(1).textContent = record.studentname;
                row.insertCell(2).textContent = student ? student.grade : "—";
                row.insertCell(3).textContent = record.subject;
                row.insertCell(4).textContent = record.grade;
                row.insertCell(5).textContent = record.term;
                const headerCount = studenttable.closest("table").querySelectorAll("thead th").length;
                    if (headerCount === 7)
                    {
                        row.insertCell(6).textContent = "—";
                    }
            });
        }

        finance?.addEventListener("submit", function(event) 
        {
            event.preventDefault();

            const feestudentid = document.getElementById("feestudentid").value;
            const student = students.find(function(student) {return student.id === feestudentid;});
            
            if (!student) 
                {
                    alert("Student ID does not exist. Please enter a valid Student ID.");
                    return;
                }
            
            const studentname = student.firstname + " " + student.lastname;
            const studentid = feestudentid;            
            const fee = Number(document.getElementById("totalfee").value);
            const amountpaid = Number(document.getElementById("amountpaid").value);
            const balance = fee - amountpaid;
            const paymentstatus = document.getElementById("paymentstatus").value;

            if (amountpaid > fee)
                {
                    alert("Amount paid cannot be greater than the total fee.");
                    return;
                }

            if (!paymentstatus)
                {
                    alert("Please select a payment status.");
                    return;
                }

            const newFinance = {
                studentid: studentid,
                studentName: studentname,
                totalFee: fee,
                amountPaid: amountpaid,
                balance: balance,
                paymentstatus: paymentstatus
            };
            finances.push(newFinance);
            paymentcounter++;
            localStorage.setItem("paymentcounter", paymentcounter);
            localStorage.setItem("finances", JSON.stringify(finances));
            displayFinances();
            finance.reset();
            alert("Payment recorded successfully.");
        });
        displayFinances();
        displayacademicrecords();

        //teacher_dashboard.html
        function displaygraderecords(studentid)
        {
            const gradetable = document.getElementById("gradetablebody");
            const reporttable = document.getElementById("reportcardtablebody");
            if (!gradetable) return;

            gradetable.replaceChildren();
            records.forEach(function(record)
            {
                const row = gradetable.insertRow();
                row.insertCell(0).textContent = record.studentid;
                row.insertCell(1).textContent = record.studentname;
                row.insertCell(2).textContent = record.subject;
                row.insertCell(3).textContent = record.grade;
                row.insertCell(4).textContent = record.term;
            });

            if (!reporttable || !studentid) return;

            const student = students.find(function(student) {return student.id === studentid;});
            const studentrecords = records.filter(function(record) {return record.studentid === studentid;});

            reporttable.replaceChildren();
            const reportdetails = document.querySelectorAll(".report-details dd");
            if (reportdetails.length === 4)
                {
                    reportdetails[0].textContent = studentid;
                    reportdetails[1].textContent = student? student.firstname + " " + student.lastname : "—";
                    reportdetails[2].textContent = student ? student.grade : "—";
                    reportdetails[3].textContent = studentrecords.length? studentrecords[studentrecords.length - 1].term : "—";
                }

            studentrecords.forEach(function(record)
            {
                const row = reporttable.insertRow();
                row.insertCell(0).textContent = record.subject;
                row.insertCell(1).textContent = record.grade;
            });
        }

        record?.addEventListener("submit", function(event)
        {
            event.preventDefault();

            const feestudentid = document.getElementById("studentid").value;
            const student = students.find(function(student) {return student.id === feestudentid;});

            if (!student) 
                {
                    alert("Student ID does not exist. Please enter a valid Student ID.");
                    return;
                }
            const studentname = student.firstname + " " + student.lastname;
            const gstudent = {
            studentid: feestudentid,
            studentname: studentname,
            subject: document.getElementById("subject").value,
            grade: document.getElementById("grade").value,
            term: document.getElementById("Term").value
            };

            records.push(gstudent);
            localStorage.setItem("records", JSON.stringify(records));
            displaygraderecords(feestudentid);
            alert("Grade recorded successfully.");
        });
        displaygraderecords();

        //contact
        contact?.addEventListener("submit", function(event)
        {
            event.preventDefault();

            const fullname = document.getElementById("fullname");
            const phone = document.getElementById("phone");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            const fullnameerror = document.getElementById("fullname-error");
            const phoneerror = document.getElementById("phone-error");
            const emailerror = document.getElementById("email-error");
            const messageerror = document.getElementById("message-error");

            fullnameerror.textContent = fullname.value.trim() ? "" : "Please enter your full name.";
            emailerror.textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? "" : "Please enter a valid email address.";
            messageerror.textContent = message.value.trim() ? "" : "Please enter your inquiry.";
            phoneerror.textContent = !phone.value || /^[0-9+(). -]{7,20}$/.test(phone.value) ? "" : "Please enter a valid phone number.";

            if (fullnameerror.textContent || phoneerror.textContent || emailerror.textContent || messageerror.textContent)return;

            alert("Thank you. Your inquiry has been submitted.");
            contact.reset();
        });
    });