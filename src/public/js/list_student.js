async function showListStudent(value) {
    window.location.href = `/list_student?course_id=${encodeURIComponent(value)}`;
}

function update(selectedItem) {
    document.getElementById('dropdownMenuButton').innerText = selectedItem;
    var list_student = []
    var tbody = document.getElementById("list_student");

    for (var i = 0; i < tbody.rows.length; i++) {
        var cells = tbody.rows[i].cells;
        var data = {
            mssv: cells[0].innerText,
            name: cells[1].innerText,
            email: cells[2].innerText,
            finalscore: cells[3].innerText,
        };
        list_student.push(data);
    }

    if (selectedItem === 'ID') {
        list_student.sort(function (a, b) {
            var mssv_a = parseInt(a.mssv, 10);
            var mssv_b = parseInt(b.mssv, 10);

            return mssv_a - mssv_b;
        });
    }

    if (selectedItem === 'Name') {
        list_student.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            nameA = nameA.split(' ');
            nameB = nameB.split(' ');
            if (nameA.length > 0) {
                nameA = nameA[nameA.length - 1];
            }
            else {
                nameA = '';
            }
            if (nameB.length > 0) {
                nameB = nameB[nameB.length - 1];
            }
            else {
                nameB = '';
            }

            const collator = new Intl.Collator('vi');
            return collator.compare(nameA, nameB);
        });
    }

    if (selectedItem === 'Final Score') {
        list_student.sort(function (a, b) {
            var score_a = 0;
            var score_b = 0;
            if (a.finalscore !== '') {
                score_a = parseInt(a.finalscore, 10);
            }
            if (b.finalscore !== '') {
                score_b = parseInt(b.finalscore, 10);
            }
            return score_a - score_b;
        });
    }

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    for (const student of list_student) {
        // Tạo một hàng mới (<tr>)
        var newRow = document.createElement("tr");

        // Tạo các ô mới (<td>) và đặt giá trị
        var cellId = document.createElement("td");
        cellId.textContent = student.mssv;

        var cellName = document.createElement("td");
        cellName.textContent = student.name;

        var cellEmail = document.createElement("td");
        cellEmail.textContent = student.email;
        var cellScore = document.createElement("td");
        cellScore.textContent = (student.finalscore);

        // Thêm các ô vào hàng
        newRow.appendChild(cellId);
        newRow.appendChild(cellName);
        newRow.appendChild(cellEmail);
        newRow.appendChild(cellScore);

        // Thêm hàng vào tbody
        tbody.appendChild(newRow);
    }

}
async function updateFinalScore(course_id, user_id, score) {

    const data = {
        course_id: course_id,
        user_id: user_id,
        score: score
    };
    const response = await fetch('/list_student/updateFinalScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    });

    if (response.ok) {
        const result = await response.json();
    } else {
        console.error('Failed to send data to server');
    }

    location.reload();
}

function updateAllScores(event) {
    if (event.key === 'Enter') {
        const inputElements = document.querySelectorAll('.score');
        inputElements.forEach(inputElement => {
            const courseId = inputElement.getAttribute('data-course-id');
            const userId = inputElement.getAttribute('data-student-id');
            let score = inputElement.value;
            if (score === '') {
                score = null;
            }
            updateFinalScore(courseId, userId, score);
        });
    }
}

$(document).ready(function() {
    $("#logo").click(function() {
        window.location.href = `/`;
    });
});
