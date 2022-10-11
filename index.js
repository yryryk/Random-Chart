const input = document.querySelector('.yryry');
const text = document.querySelector('.yryr');
const button = document.querySelector('.yry');

const random = () => {
    text.textContent = Math.ceil (Math.random()*input.value);
    // input.value = '';
}

button.addEventListener('click', random)

