let wasmInstance;

(async () => {
  const response = await fetch('add.wat');
  const text = await response.text();
  const wasmModule = await WebAssembly.compileStreaming(fetch('data:application/wasm;base64,' + btoa(text)));
  wasmInstance = await WebAssembly.instantiate(wasmModule);
})();

function calc() {
  const a = parseInt(document.getElementById("a").value, 10);
  const b = parseInt(document.getElementById("b").value, 10);
  const result = wasmInstance.exports.add(a, b);
  document.getElementById("result").textContent = "Result: " + result;
}
