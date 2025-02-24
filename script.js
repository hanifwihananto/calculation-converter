// FORM
const formInput = document.querySelector('#formInput');
const formOutput = document.querySelector('#formOutput');
const reset = document.querySelector('#reset');
const set = document.querySelector('#set');
const cal = document.querySelector('#cal');

// BTN RESET
reset.addEventListener("click", () => {
  formInput.reset();
});

// INPUT
let vin = document.querySelector('#vin');
let vout = document.querySelector('#vout');
let iout = document.querySelector('#iout');
let fs = document.querySelector('#fs'); // Convert kHz to Hz
let vf = document.querySelector('#vf');
let tfall = document.querySelector('#tfall');

// OUTPUT
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
cal.addEventListener("click", () => {
  vin.value = 36;
  vout.value = 15;
  iout.value = 2.2;
  fs.value = 40;
  vf.value = 1.5;
  tfall.value = 25;
  //duty.value = 100;
});


// RUMUS
// let d = (vout.value / vin.value ) * 100;
// let r = vout / iout;
// let ilavg = vout / r;
// let dil = 0.2 * ilavg;
// let l = (1/fs) * (vin - vout) * ((vout+vf)/(vin+vf)) * (1/dil) * 1000000;
// let ilmax = ilavg + (dil / 2);
// let n = (((l / 1000000) * ilmax)/(bmax * ac)) * 10**4;
// let ilrms = math.sqrt((ilavg**2)+(((dil/2)/math.sqrt(3))**2));
// let qwt = ilrms / j;
// let dwt = math.sqrt((4/3.14)*qwt);
// let ilrmssplit = ilrms/split;
// let qwtsplit = ilrmssplit / j;
// let dwtsplit = math.sqrt((4/3.14)*qwtsplit);
// let kbob = 3.14 * dbob;
// let totalwire = (n * kbob * split) + 0.4 *(n * kbob * split);
// let dvo = 0.001 * vout;
// let co = (dil/(8 * fs * dvo)) * 1000000;
// let cs = ((iout * tfall)/(2*vin)) * 100000000000;
// let rs = (((d / 10) * (1/fs))/(2 * (cs/100000000000)));

// BTN CALCULATION
set.addEventListener("click", () => {
  duty.value = 100;
  // delIl.value = dil;
  // L.value = l;
  // R.value = r;
  // ilAvg.value = ilavg;
  // ilMax.value = ilmax;
  // N.value = n;
  // ilRms.value = ilrms;
  // qwT.value = qwt;
  // dwT.value = dwt;
  // ilRmsSplit.value = ilrmssplit;
  // qwTSplit.value = qwtsplit;
  // dwTSplit.value = dwtsplit;
  // kBob.value = kbob;
  // totalWire.value = totalwire;
  // delVo.value = dvo;
  // Co.value = co;
  // Cs.value = cs;
  // Rs.value = rs;
});