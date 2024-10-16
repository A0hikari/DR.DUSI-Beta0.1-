// ฟังก์ชันตรวจสอบปุ่ม Submit
function checkSubmitButton() {
  const sliderIds = [
    'headache', 'Tiredness', 'squeamish', 'Anxious',
    'Drowsy', 'Lossofappetite', 'Depressed', 'cough', 'bodyAche'
  ];

  // ตรวจสอบว่า slider อย่างน้อยหนึ่งตัวมีค่า > 0
  const isAnySliderSelected = sliderIds.some(id => {
    const slider = document.getElementById(id);
    return slider && parseInt(slider.value) > 0;
  });

  // ปิดใช้งานปุ่ม submit ถ้าไม่มีการประเมิน
  const submitButton = document.getElementById('submitBtn');
  if (submitButton) {
    submitButton.disabled = !isAnySliderSelected; // ตั้งค่า disabled ตามค่า isAnySliderSelected
  }
}

// ฟังก์ชันสำหรับอัปเดตค่า slider และเปลี่ยนสีตามระดับ
function updateValue(slider, outputId) {
  const value = slider.value;
  const outputElement = document.getElementById(outputId);
  if (outputElement) {
    outputElement.textContent = value;
    outputElement.style.color = getTextColor(value); // เปลี่ยนสีตัวเลข
  }

  slider.style.background = getSliderColor(value); // เปลี่ยนสีพื้นหลังของ slider
  checkSubmitButton(); // ตรวจสอบปุ่ม submit
}

// ฟังก์ชันสำหรับแสดงผลใน modal และส่งข้อมูลไปแสดง
function submitQuiz() {
  const symptomIds = [
    { id: 'headache', name: 'ปวดหัว' },
    { id: 'Tiredness', name: 'อาการเหนื่อย/เพลีย' },
    { id: 'squeamish', name: 'คลื่นไส้' },
    { id: 'Anxious', name: 'วิตกกังวล' },
    { id: 'Drowsy', name: 'ง่วงซึม' },
    { id: 'Lossofappetite', name: 'เบื่ออาหาร' },
    { id: 'Depressed', name: 'ซึมเศร้า' },
    { id: 'cough', name: 'ไอ' },
    { id: 'bodyAche', name: 'ปวดร่างกาย' }
  ];

  // สร้างรายการผลการประเมิน
  const results = symptomIds.map(({ id, name }) => {
    const slider = document.getElementById(id);
    const level = slider ? slider.value : '0';
    const textColor = getTextColor(level);
    return {
      symptom: name,
      level: level,
      color: textColor
    };
  });

  // เก็บข้อมูลประเมินลงใน Local Storage
  const dateTime = new Date();
  const dateStr = dateTime.toLocaleDateString(); // รูปแบบวัน/เดือน/ปี
  const timeStr = dateTime.toLocaleTimeString(); // รูปแบบเวลา

  // สร้างบันทึกการประเมิน
  const assessmentRecord = {
    date: dateStr,
    time: timeStr,
    results: results// เก็บข้อมูลผลเป็นอาร์เรย์ของอ็อบเจ็กต์
  };

   // ส่งข้อมูลไปยัง saveAssessment
  results.forEach(result => {
    saveAssessment(dateStr, timeStr, result.symptom, result.level);
  });

  // แสดงผลใน Modal
  const modalResult = document.getElementById('modalResult');
  if (modalResult) {
    modalResult.innerHTML = results.map(r => 
      `<span style="color: ${r.color};">${r.symptom}: ${r.level}/10</span>`
    ).join('<br>') + `<br><strong>วันที่: ${dateStr}</strong><br><strong>เวลา: ${timeStr}</strong>`;
  }

  // เปิด Modal
  openModal();
}

// ฟังก์ชันบันทึกข้อมูลการประเมินอาการ
function saveAssessment(date, time, results) {
  const history = JSON.parse(localStorage.getItem('assessmentHistory')) || [];
    
  // สร้างข้อมูลใหม่
  const newAssessment = {
      date: date,
      time: time,
      results: results// เปลี่ยนให้รองรับอาร์เรย์ของผลการประเมิน
  };

  // เพิ่มข้อมูลใหม่ลงในประวัติ
  history.push(newAssessment);
    
  // บันทึกกลับลง Local Storage
  localStorage.setItem('assessmentHistory', JSON.stringify(history));
}

// ฟังก์ชันเพื่อกำหนดสีข้อความตามระดับ
function getTextColor(value) {
  if (value <= 2) return 'white';
  if (value <= 4) return '#008000'; // สีเขียว
  if (value <= 6) return '#FFD700'; // สีเหลือง
  if (value <= 8) return '#FF69B4'; // สีชมพู
  return '#FF0000'; // สีแดง
}

// ฟังก์ชันเพื่อกำหนดสีพื้นหลังของ slider ตามระดับ
function getSliderColor(value) {
  if (value <= 2) return 'white'; // สีขาว
  if (value <= 4) return '#008000'; // สีเขียว
  if (value <= 6) return '#FFD700'; // สีเหลือง
  if (value <= 8) return '#FF69B4'; // สีชมพู
  return '#FF0000'; // สีแดง
}

// ฟังก์ชันเปิด modal
function openModal() {
  const modal = document.getElementById('myModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// ฟังก์ชันปิด modal
function closeModal() {
  const modal = document.getElementById('myModal');
  if (modal) {
      modal.style.display = 'none';

      // เปลี่ยนเส้นทางไปยังหน้าดูประวัติการประเมิน
      window.location.href = 'History.html'; // เปลี่ยนเส้นทางไปยังหน้าประวัติการประเมิน
  }
}
