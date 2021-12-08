var upozorenje = {
  poruka: "Grad mora biti velikim slovima",
};

function proveraForme(forma) {
  let flag = true;

  const ime = forma.ime.value.trim();
  const prezime = forma.prezime.value.trim();
  const jmbg = forma.jmbg.value.trim();
  const grad = forma.grad.value.trim();

  if (ime === "" || prezime === "" || jmbg === "" || grad === "") {
    flag = false;
  }

  if (jmbg.length !== 13) {
    console.log(forma.jmbg);
    flag = false;
  }
  if (grad !== grad.toUpperCase()) {
    flag = false;
    callAlertFunction(upozorenje, ispisiPoruku);
  }

  return flag;
}

function callAlertFunction(obj, callback) {
  callback(obj);
}

function ispisiPoruku(poruka) {
  alert(poruka.poruka);
}

function proveraJmbg(jmbg) {
  const submitBtn = document.getElementById("submitBtn");

  if (jmbg.value.trim().length !== 13) {
    document.getElementById("jmbg_label").style.color = "red";
    submitBtn.disabled = true;
  } else {
    document.getElementById("jmbg_label").style.color = "";
    submitBtn.disabled = false;
  }
}

function proveraGrad(grad) {
  if (
    grad.value.trim() !== grad.value.trim().toUpperCase() ||
    grad.value.trim() === ""
  ) {
    document.getElementById("grad_label").style.color = "red";
  } else {
    document.getElementById("grad_label").style.color = "";
  }
}
