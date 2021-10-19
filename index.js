let passwordLayer = document.getElementById('passwordId');
let array = ['1'];
function btnplus() {
    let v = passwordLayer.value;
    passwordLayer.value = v+'a';
}

function addArr() {
    array.push('a');
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}
