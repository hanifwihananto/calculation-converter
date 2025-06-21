// FORM
const formInput = document.querySelector("#formInput");
const formOutput = document.querySelector("#formOutput");
const reset = document.querySelector("#reset");
const set = document.querySelector("#set");
const cal = document.querySelector("#cal");

// BTN RESET
reset.addEventListener("click", () => {
  formInput.reset();
  formOutput.reset();
});

// INPUT
let vsMax = document.querySelector("#vsMax");
let vsMin = document.querySelector("#vsMin");
let voutV = document.querySelector("#vout");
let ioutV = document.querySelector("#iout");
let fsV = document.querySelector("#fs"); // Convert kHz to Hz
let vfV = document.querySelector("#vf");
let bmaxV = document.querySelector("#bmax");
let acV = document.querySelector("#ac");
let tfallV = document.querySelector("#tfall");
let splitV = document.querySelector("#split");
let riV = document.querySelector("#ri");
let kgrefV = document.querySelector("#kgref");

// OUTPUT
let j = 4.5;
let dbob = 1.7;
let duty = document.querySelector("#duty");
let delIl = document.querySelector("#delIl");
let L = document.querySelector("#L");
let R = document.querySelector("#R");
let ilAvg = document.querySelector("#ilAvg");
let ilMax = document.querySelector("#ilMax");
let N = document.querySelector("#n");
let ilRms = document.querySelector("#ilRms");
let qwT = document.querySelector("#qwt");
let dwT = document.querySelector("#dwt");
let ilRmsSplit = document.querySelector("#ilRmsSplit");
let qwTSplit = document.querySelector("#qwtsplit");
let dwTSplit = document.querySelector("#dwtsplit");
let kBob = document.querySelector("#kbob");
let totalWire = document.querySelector("#totalWire");
let KGcal = document.querySelector("#kgcal");
let KGKGcal = document.querySelector("#kgkal");
let Lg = document.querySelector("#lg");
let Ion = document.querySelector("#ion");
let Voff = document.querySelector("#voff");
let delVo = document.querySelector("#delVo");
let Co = document.querySelector("#Co");
let Cs = document.querySelector("#cs");
let Rs = document.querySelector("#rs");

let currentMode = "buck"; // default mode

// BTN DEFAULT
set.addEventListener("click", () => {
  if (currentMode === "buck") {
    vsMax.value = 36;
    vsMin.value = 25;
    voutV.value = 15;
    ioutV.value = 2.2;
    splitV.value = 10;
  } else if (currentMode === "boost") {
    vsMax.value = 15;
    vsMin.value = 12;
    voutV.value = 30;
    ioutV.value = 2;
    splitV.value = 16;
  } else if (currentMode === "buckboost") {
    vsMax.value = 30;
    vsMin.value = 20;
    voutV.value = -24;
    ioutV.value = 1.45;
    splitV.value = 26;
  }

  fsV.value = 40;
  vfV.value = 1.5;
  tfallV.value = 58;
  bmaxV.value = 0.25;
  acV.value = 1.96;
  riV.value = 20;
  kgrefV.value = 0.82;
});

// BTN CALCULATION
cal.addEventListener("click", () => {
  if (
    vsMax.value == "" &&
    voutV.value == "" &&
    ioutV.value == "" &&
    fsV.value == "" &&
    vfV.value == "" &&
    tfallV.value == ""
  ) {
    swal.fire({
      icon: "error",
      title: "Form Kosong",
      text: "Form masih kosong !",
    });
  }

  // RUMUS
  let vsmax = parseFloat(vsMax.value);
  let vsmin = parseFloat(vsMin.value);
  let vout = parseFloat(voutV.value);
  let iout = parseFloat(ioutV.value);
  let fs = parseFloat(fsV.value) * 1000;
  let vf = parseFloat(vfV.value);
  let tfall = parseFloat(tfallV.value) / 1000000000;
  let bmax = parseFloat(bmaxV.value);
  let ac = parseFloat(acV.value);
  let split = parseFloat(splitV.value);
  let ri = parseFloat(riV.value) / 100;
  let p = 1.74 * Math.pow(10, -6);
  let u0 = 4 * Math.PI * Math.pow(10, -7);
  let Ku = 0.5;
  let pcu = 1.5;
  let kgref = parseFloat(kgrefV.value);

  let r = vout / iout;
  let dvo = 0.001 * vout;

  let d, ilavg, l, co, ion, voff;
  if (currentMode === "buck") {
    d = vout / vsmax;
    ilavg = vout / r;
    dil = ri * ilavg;
    l =
      (1 / fs) *
      (vsmax - vout) *
      ((vout + vf) / (vsmax + vf)) *
      (1 / dil) *
      1000000;
    co = (dil / (8 * fs * dvo)) * 1000000;
    ion = iout;
    voff = vsmax;
  } else if (currentMode === "boost") {
    d = 1 - vsmin / vout;
    ilavg = vsmin / (Math.pow(1 - d, 2) * r);
    dil = ri * ilavg;
    l =
      (1 / fs) *
      (vout + vf - vsmin) *
      (vsmin / (vout + vf)) *
      (1 / dil) *
      1000000;
    co = ((vout * d) / (r * dvo * fs)) * 1000000;
    ion = iout * (vout / vsmin);
    voff = vout;
  } else if (currentMode === "buckboost") {
    d = -vout / vsmin / (1 + -vout / vsmin);
    r = -vout / iout;
    ilavg = (vsmin * d) / (r * Math.pow((1 - d), 2));
    dil = ri * ilavg;
    l =
      (1 / fs) *
      (-vout + vf) *
      (vsmin / ((-vout + vf) + vsmin)) *
      (1 / dil) *
      1000000;
  }

  let ilmax = ilavg + dil / 2;
  let n = (((l / 1000000) * ilmax) / (bmax * ac)) * Math.pow(10, 4);
  let ilrms = Math.sqrt(
    Math.pow(ilavg, 2) + Math.pow(dil / 2 / Math.sqrt(3), 2)
  );
  let qwt = ilrms / j;
  let dwt = Math.sqrt((4 / Math.PI) * qwt);
  let ilrmssplit = ilrms / split;
  let qwtsplit = ilrmssplit / j;
  let dwtsplit = Math.sqrt((4 / Math.PI) * qwtsplit);
  let kbob = Math.PI * dbob;
  let totalwire =
    ((Math.ceil(n) * kbob) / 100) * split + 0.4 * (((n * kbob) / 100) * split);
  let Rkg = pcu / Math.pow(ilrms, 2);
  let kgcal =
    ((p * Math.pow(l * Math.pow(10, -6), 2) * Math.pow(ilmax, 2)) /
      (Math.pow(bmax, 2) * Rkg * Ku)) *
    Math.pow(10, 8);
  let kgkgcal = kgref / kgcal;
  let lg =
    ((u0 * (l * Math.pow(10, -6)) * Math.pow(ilmax, 2)) /
      (Math.pow(bmax, 2) * ac)) *
    Math.pow(10, 4) *
    Math.pow(10, 3);

  let cs = ((ion * tfall) / (2 * voff)) * Math.pow(10, 9);
  let rs = (d * (1 / fs)) / (2 * (cs / Math.pow(10, 9)));

  duty.value = d.toFixed(2) * 100;
  delIl.value = dil.toFixed(2);
  L.value = l.toFixed(1);
  R.value = r.toFixed(2);
  ilAvg.value = ilavg.toFixed(2);
  ilMax.value = ilmax.toFixed(2);
  N.value = Math.ceil(n.toFixed(2));
  ilRms.value = ilrms.toFixed(2);
  qwT.value = qwt.toFixed(2);
  dwT.value = dwt.toFixed(2);
  ilRmsSplit.value = ilrmssplit.toFixed(2);
  qwTSplit.value = qwtsplit.toFixed(2);
  dwTSplit.value = dwtsplit.toFixed(2);
  kBob.value = kbob.toFixed(2);
  totalWire.value = totalwire.toFixed(2);
  KGcal.value = kgcal.toFixed(2);
  KGKGcal.value = kgkgcal.toFixed(2);
  Lg.value = lg.toFixed(2);
  Ion.value = ion.toFixed(2);
  Voff.value = voff.toFixed(2);
  delVo.value = dvo.toFixed(2);
  Co.value = co.toFixed(2);
  Cs.value = cs.toFixed(2);
  Rs.value = rs.toFixed(2);
});

// Menangani klik menu navbar
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Tidak reload halaman

      // Ganti kelas 'active' untuk highlight link aktif
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // Ganti mode berdasarkan text link
      const mode = this.textContent.trim().toLowerCase().replace("-", "");
      currentMode = mode;
    });
  });
});
