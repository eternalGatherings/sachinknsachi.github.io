function toggleLang() {
    var langSwitch = document.getElementById('lang-switch');
    var enText = document.querySelector('.en-text');
    var knText = document.querySelector('.kn-text');

    if (langSwitch.checked) {
        enText.style.display = 'none';
        knText.style.display = 'block';
    } else {
        enText.style.display = 'block';
        knText.style.display = 'none';
    }
}