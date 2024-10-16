// ดึงข้อมูลจาก Local Storage และแสดงในตาราง
function displayAssessmentHistory() {
    const history = JSON.parse(localStorage.getItem('assessmentHistory')) || [];
    const tableBody = document.getElementById('historyTableBody');
  
    // ล้างตารางก่อน
    tableBody.innerHTML = '';
  
    history.forEach(record => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${record.date}</td>
        <td>${record.time}</td>
        <td>${record.results}</td>
      `;
      tableBody.appendChild(row);
    });
  }


// เรียกฟังก์ชันเมื่อโหลดหน้า
window.onload = function() {
    displayAssessmentHistory(); // แสดงประวัติการประเมิน
    populateDateDropdown(); // เพิ่มตัวเลือกวันที่ใน dropdown
};