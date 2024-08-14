document.addEventListener("DOMContentLoaded", function() {
    fetch('FlatFiles/odysol.json')
        .then(response => response.json())
        .then(data => {
            const containerLinks = document.querySelector('.links');
            const links = data.links;

            let linksHtml = '';
            links.forEach(link => {
                linksHtml += `<div class="link">
                    <a href="${link.url}" target="_blank">
                        <div class="link-icon">
                            <img src="icons/${link.text.replace(/\s/g, "").split("-")[0].trim()}.png" alt="icon">
                        </div>
                        <div class="link-text">${link.text}</div>
                    </a>
                </div>`
            });
            containerLinks.innerHTML = linksHtml;

            links.forEach(link => {
                console.log(link.text.replace(/\s/g, "").split("-")[0].trim())
            });

        })
        .catch(error => console.error('Error loading links:', error));
});