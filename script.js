// INPUT
let vin = document.getElementById("vin").value;
let vout = document.getElementById("vout").value;
let iout = document.getElementById("iout").value;
let fs = document.getElementById("fs").value *  1000; // Convert kHz to Hz
let vf = document.getElementById("vf").value;        
let tfall = document.getElementById("tfall").value;

// RUMUS
let dutyCycle = (vout + vf) / (vin + vf) * 100;
let deltaIL = (vin - vout) / (fs * 10e-6);
let inductor = (vin - vout) / (deltaIL * fs) * 1e6; // Convert to uH

// OUTPUT
