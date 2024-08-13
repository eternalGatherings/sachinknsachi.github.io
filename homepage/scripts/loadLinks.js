function getQueryParams() {
    const params = {};
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            const pair = item.split("=");
            params[pair[0]] = decodeURIComponent(pair[1]);
        });
    return params;
}

function changeCSSVariable(variableName, value) {
    document.documentElement.style.setProperty(variableName, value);
}

// Function to create link elements
function createLinkElement(link) {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = "_blank";
    a.textContent = link.text;

    return a;
}

// Function to load links from the JSON file
function loadLinks() {

    const queryParams = getQueryParams();

    fetch(`../FlatFiles/${queryParams.user}.json`)
        .then(response => response.json())
        .then(data => {

            // Rendering Title
            document.querySelector('title').innerHTML = data.title;

            // Rendering theme
            const switchCase = queryParams.theme === undefined 
                ? data.defaultTheme === undefined 
                    ? '1' : data.defaultTheme : queryParams.theme;

            console.log(queryParams.theme);
            console.log(data.defaultTheme);
            console.log(switchCase);

            switch(switchCase) {
                case '3':
                    var theme = '#d0d8db';
                    var image = 'lambo-2.jpg';
                    var position = 'bottom';
                    break;
                case '2':
                    var theme = '#074888';
                    var image = 'cruise-2.jpg';
                    var position = 'top';
                    break;
                case '1':
                default:
                    var theme = '#573718';
                    var image = 'lambo-1.jpg';
                    var position = 'top';
                    break;
            }

            changeCSSVariable('--theme', theme);
            changeCSSVariable('--image', `url("../images/${image}")`);
            changeCSSVariable('--background-position', position);

            // Rendering links
            const sectionsDiv = document.getElementById('sections');

            data.sections.forEach(section => {
                const sectionElement = document.createElement('section');
                sectionElement.classList.add('links');

                section.links.forEach((link, index) => {
                    sectionElement.appendChild(createLinkElement(link));

                    // Add separator except for the last link
                    if (index < section.links.length - 1) {
                        const separator = document.createElement('span');
                        separator.classList.add('pipe-separater');
                        separator.textContent = '|';
                        sectionElement.appendChild(separator);
                    }
                });

                sectionsDiv.appendChild(sectionElement);
            });
        })
        .catch(error => {
            console.error('Error loading links:', error);
        });
}

// Load links when the page is loaded
document.addEventListener('DOMContentLoaded', loadLinks);