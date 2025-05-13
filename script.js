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
let vinV = document.querySelector('#vsMax');
let vinMin = document.querySelector('#vsMin');
let voutV = document.querySelector('#vout');
let ioutV = document.querySelector('#iout');
let fsV = document.querySelector('#fs'); // Convert kHz to Hz
let vfV = document.querySelector('#vf');
let bmaxV = document.querySelector('#bmax');
let acV = document.querySelector('#ac');
let tfallV = document.querySelector('#tfall');
let splitV = document.querySelector('#split');
let riV = document.querySelector('#ri');
let kgrefV = document.querySelector('#kgref');

// OUTPUT
let j = 4.5;
let dbob = 1.7;
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
let KGcal = document.querySelector('#kgcal');
let KGKGcal = document.querySelector('#kgkal');
let Lg = document.querySelector('#lg');
let Ion = document.querySelector('#ion');
let Voff = document.querySelector('#voff');
let delVo = document.querySelector('#delVo');
let Co = document.querySelector('#Co');
let Cs = document.querySelector('#cs');
let Rs = document.querySelector('#rs');

// BTN DEFAULT
set.addEventListener("click", () => {
  vinV.value = 36;
  vinMin.value = 25;
  voutV.value = 15;
  ioutV.value = 2.2;
  fsV.value = 40;
  vfV.value = 1.5;
  tfallV.value = 58;
  bmaxV.value = 0.25;
  acV.value = 1.96;
  splitV.value = 10;
  riV.value = 20;
  kgrefV.value = 0.820;
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
  let bmax = parseFloat(bmaxV.value);
  let ac = parseFloat(acV.value);
  let split = parseFloat(splitV.value);
  let ri = parseFloat(riV.value)/100;
  let p = 1.74 * Math.pow(10, -6);
  let u0 = 4 * Math.PI * Math.pow(10, -7);
  let Ku = 0.5; 
  let pcu = 1.5;
  let kgref = parseFloat(kgrefV.value);

  let d = (vout / vin);
  let r = vout / iout;
  let ilavg = vout / r;
  let dil = ri * ilavg;
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
  let totalwire = ((n * kbob * split) + 0.4 * (n * kbob * split))/100;
  let Rkg = pcu / Math.pow(ilrms, 2)
  let kgcal = ((p * Math.pow((l * Math.pow(10, -6)), 2) * Math.pow(ilmax, 2))/(Math.pow(bmax, 2) * Rkg * Ku)) * Math.pow(10, 8);
  let kgkgcal = kgref / kgcal;
  let lg = ((u0 * (l * Math.pow(10, -6)) * Math.pow(ilmax, 2))/(Math.pow(bmax, 2) * ac)) * Math.pow(10, 4) * Math.pow(10, 3) ;
  let ion = iout;
  let voff = vin;
  let dvo = 0.001 * vout;
  let co = (dil / (8 * fs * dvo)) * 1000000;
  let cs = ((iout * tfall) / (2 * vin)) * Math.pow(10, 9);
  let rs = (((d) * (1 / fs)) / (2 * (cs / (Math.pow(10, 9)))));
  



  duty.value = d.toFixed(4) * 100;
  delIl.value = dil.toFixed(3);
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
  KGcal.value = kgcal.toFixed(4);
  KGKGcal.value = kgkgcal.toFixed(4);
  Lg.value = lg.toFixed(4);
  Ion.value = ion.toFixed(2);
  Voff.value = voff.toFixed(2);
  delVo.value = dvo.toFixed(4);
  Co.value = co.toFixed(4);
  Cs.value = cs.toFixed(2);
  Rs.value = rs.toFixed(2);
});