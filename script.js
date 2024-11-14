//18222036 - Olivia Christy Lismanto
// Inisialisasi Firebase
// Firebase SDK Imports

// Jawaban Benar (untuk 10 pertanyaan)
const correctAnswers = ['D', 'A', 'C', 'B', 'A', 'D', 'B', 'A', 'B', 'B'];

// Update progress bar dan cek jawaban
quizForm.addEventListener('change', () => {
  const filledAnswers = Array.from(quizForm.elements).filter(el => el.checked).length;
  progressBar.value = (filledAnswers / 10) * 100;
});

// Submit button
document.getElementById('submitButton').addEventListener('click', function() {
  let score = 0;
  for (let i = 1; i <= 10; i++) {
    const userAnswer = quizForm['q' + i].value;
    if (userAnswer === correctAnswers[i - 1]) {
      score++;
    }
  }
  document.getElementById('result').innerText = `Nilai Anda: ${score} dari 10`;
});

function openOhmLab() {
    document.querySelector(".topic-section").classList.add("hidden");
    document.getElementById("ohm-lab").classList.remove("hidden");
  }
  
  function comingSoon() {
    alert("Topik lainnya akan tersedia segera!");
  }
  
  function calculateCurrent() {
    const voltage = parseFloat(document.getElementById("voltage").value);
    const resistance = parseFloat(document.getElementById("resistance").value);

    if (isNaN(voltage) || isNaN(resistance) || resistance <= 0 || voltage < 0 || voltage > 1000 || resistance > 1000) {
        alert("Masukkan nilai yang valid untuk voltase dan hambatan.");
        return;
    }

    // Hitung arus (I = V / R)
    const current = (voltage / resistance) // dalam A
    document.getElementById("current").textContent = current.toFixed(2);

    // Update grafik setelah arus dihitung
    updateCharts(voltage, resistance, current);
}
  
  function updateCharts(voltage, resistance, current) {
    // Update grafik antara Arus dan Hambatan
    const resistanceRange = Array.from({ length: 10 }, (_, i) => 1 + i * 100); 
    charts.currentResistance.data.labels = resistanceRange;
    charts.currentResistance.data.datasets[0].data = resistanceRange.map(
      (r) => (voltage / r) // Menghitung arus untuk tiap hambatan
    );
    charts.currentResistance.update();
  
    // Update grafik antara Voltase dan Arus
    const voltageRange = Array.from({ length: 10 }, (_, i) => 0 + i * 100); // Menambahkan variasi voltase
    charts.voltCurrent.data.labels = voltageRange;
    charts.voltCurrent.data.datasets[0].data = voltageRange.map(
      (v) => (v / resistance) // Menghitung arus berdasarkan voltase dan hambatan tetap
    );
    charts.voltCurrent.update();
  
    // Update grafik antara Voltase dan Hambatan
    charts.voltResistance.data.labels = voltageRange;
    charts.voltResistance.data.datasets[0].data = voltageRange.map(
      () => resistance // Hambatan tetap pada setiap titik voltase
    );
    charts.voltResistance.update();
  }

  // Fungsi untuk memperbarui input voltase saat slider diubah
// Fungsi untuk memperbarui input voltase saat slider diubah
// Fungsi update nilai pada input saat slider voltase digeser
function updateVoltageInput() {
    const voltageSlider = document.getElementById("voltage-slider");
    const voltageInput = document.getElementById("voltage");

    voltageInput.value = voltageSlider.value;
}

// Fungsi update nilai pada input saat slider hambatan digeser
function updateResistanceInput() {
    const resistanceSlider = document.getElementById("resistance-slider");
    const resistanceInput = document.getElementById("resistance");

    resistanceInput.value = resistanceSlider.value;
}

// Fungsi update slider saat input voltase diubah
function updateVoltageSlider() {
    const voltageInput = document.getElementById("voltage");
    const voltageSlider = document.getElementById("voltage-slider");

    voltageSlider.value = voltageInput.value;
}

// Fungsi update slider saat input hambatan diubah
function updateResistanceSlider() {
    const resistanceInput = document.getElementById("resistance");
    const resistanceSlider = document.getElementById("resistance-slider");

    resistanceSlider.value = resistanceInput.value;
}