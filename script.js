// FORM
const formInput = document.querySelector('#formInput');
const formOutput = document.querySelector('#formOutput');
const reset = document.querySelector('#reset');
const set = document.querySelector('#set');
const cal = document.querySelector('#cal');

// BTN RESET
reset.addEventListener("click", () => {
  formInput.reset();
  formOutput.reset();      
});

// INPUT
let vinV = document.querySelector('#vin');
let voutV = document.querySelector('#vout');
let ioutV = document.querySelector('#iout');
let fsV = document.querySelector('#fs'); // Convert kHz to Hz
let vfV = document.querySelector('#vf');
let tfallV = document.querySelector('#tfall');

// OUTPUT
let bmax = 0.25;
let ac = 1.96;
let j = 4.5;
let split = 1.5;
let dbob = 0.17;
let duty = document.querySelector('#duty');
let delIl = document.querySelector('#delIl');
let L = document.querySelector('#L');
let R = document.querySelector('#R');
let ilAvg = document.querySelector('#ilAvg');
let ilMax = document.querySelector('#ilMax');
let N = document.querySelector('#n');
let ilRms = document.querySelector('#ilRms');
let qwT = document.querySelector('#qwt');
let dwT = document.querySelector('#dwt');
let ilRmsSplit = document.querySelector('#ilRmsSplit');
let qwTSplit = document.querySelector('#qwtsplit');
let dwTSplit = document.querySelector('#dwtsplit');
let kBob = document.querySelector('#kbob');
let totalWire = document.querySelector('#totalWire');
let delVo = document.querySelector('#delVo');
let Co = document.querySelector('#Co');
let Cs = document.querySelector('#cs');
let Rs = document.querySelector('#rs');

// BTN DEFAULT
set.addEventListener("click", () => {
  vinV.value = 36;
  voutV.value = 15;
  ioutV.value = 2.2;
  fsV.value = 40;
  vfV.value = 1.5;
  tfallV.value = 25;
});

// BTN CALCULATION
cal.addEventListener("click", () => {
  if (vinV.value == "" && 
      voutV.value == "" &&
      ioutV.value == "" &&
      fsV.value == "" &&
      vfV.value == "" &&
      tfallV.value == ""){
    swal.fire({
      icon: 'error',
      title: 'Form Kosong',
      text: 'Form masih kosong !'
    });
  } 

  // RUMUS
  let vin = parseFloat(vinV.value);
  let vout = parseFloat(voutV.value);
  let iout = parseFloat(ioutV.value);
  let fs = parseFloat(fsV.value) * 1000;
  let vf = parseFloat(vfV.value);
  let tfall = parseFloat(tfallV.value) / 1000000000;

  let d = (vout / vin);
  let r = vout / iout;
  let ilavg = vout / r;
  let dil = 0.2 * ilavg;
  let l = (1 / fs) * (vin - vout) * ((vout + vf) / (vin + vf)) * (1 / dil) * 1000000;
  let ilmax = ilavg + (dil / 2);
  let n = (((l / 1000000) * ilmax) / (bmax * ac)) * Math.pow(10, 4);
  let ilrms = Math.sqrt((Math.pow(ilavg, 2)) + (Math.pow(((dil / 2) / Math.sqrt(3)), 2)));
  let qwt = ilrms / j;
  let dwt = Math.sqrt((4 / Math.PI) * qwt);
  let ilrmssplit = ilrms / split;
  let qwtsplit = ilrmssplit / j;
  let dwtsplit = Math.sqrt((4 / Math.PI) * qwtsplit);
  let kbob = Math.PI * dbob;
  let totalwire = (n * kbob * split) + 0.4 * (n * kbob * split);
  let dvo = 0.001 * vout;
  let co = (dil / (8 * fs * dvo)) * 1000000;
  let cs = ((iout * tfall) / (2 * vin)) * Math.pow(10, 9);
  let rs = (((d) * (1 / fs)) / (2 * (cs / (Math.pow(10, 9)))));



  duty.value = d.toFixed(4) * 100;
  delIl.value = dil.toFixed(2);
  L.value = l.toFixed(1);
  R.value = r.toFixed(4);
  ilAvg.value = ilavg.toFixed(2);
  ilMax.value = ilmax.toFixed(3);
  N.value = n.toFixed(4);
  ilRms.value = ilrms.toFixed(4);
  qwT.value = qwt.toFixed(4);
  dwT.value = dwt.toFixed(4);
  ilRmsSplit.value = ilrmssplit.toFixed(4);
  qwTSplit.value = qwtsplit.toFixed(4);
  dwTSplit.value = dwtsplit.toFixed(4);
  kBob.value = kbob.toFixed(4);
  totalWire.value = totalwire.toFixed(4);
  delVo.value = dvo.toFixed(4);
  Co.value = co.toFixed(4);
  Cs.value = cs.toFixed(2);
  Rs.value = rs.toFixed(4);
});