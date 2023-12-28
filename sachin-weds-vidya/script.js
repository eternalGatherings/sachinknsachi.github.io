function toggleLang() {
    var langSwitch = document.getElementById('lang-switch');
    var enText = document.getElementsByClassName('en-text');
    var knText = document.getElementsByClassName('kn-text');
    if (enText.length === knText.length) {
        for (var i = 0; i < enText.length; i++) {
            if (langSwitch.checked) {
                enText[i].style.display = 'none';
                knText[i].style.display = 'flex';
            } else {
                enText[i].style.display = 'flex';
                knText[i].style.display = 'none';
            }
        }
    }
}
