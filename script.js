//18222036 - Olivia Christy Lismanto
// Inisialisasi Firebase
// Firebase SDK Imports

// Menambahkan event listener pada setiap elemen input
document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', updateProgressBar); // Menggunakan 'change' agar langsung terdeteksi saat memilih jawaban
});

// Panggil updateProgressBar saat halaman dimuat untuk set nilai awal progress bar
document.addEventListener('DOMContentLoaded', updateProgressBar);


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