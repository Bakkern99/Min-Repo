document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        console.error("No file selected");
        return;
    }

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function(results){
            const data = results.data;
            createTimeline(data);
            populateYearFilter();
        },
        error: function(error){
            console.error("Error parsing CSV:", error.message);
        }
    });
});


function createTimeline(data) {
    const container = document.getElementById('timelineContainer');
    container.innerHTML = '';

    data.forEach(item => {
        const year = item['Year'];
        const event = item['Event'];
        const description = item['Description'];

        if ( year && event && description){
        const eventDiv = document.createElement('div');
        eventDiv.className = 'timeline-event';

        const yearDiv = document.createElement('div');
        yearDiv.className = 'timeline-year';
        yearDiv.textContent = year;

        const eventTitleDiv = document.createElement('div');
        eventTitleDiv.className = 'timeline-event-title';
        eventTitleDiv.textContent = event;

        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'timeline-description';
        descriptionDiv.textContent = description;

        eventDiv.appendChild(yearDiv);
        eventDiv.appendChild(eventTitleDiv);
        eventDiv.appendChild(descriptionDiv);

        container.appendChild(eventDiv);
        }
    });  
    addSearchFunctionality();   
}

function addSearchFunctionality() {
    document.getElementById('searchInput').addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const timelineEvents = document.getElementsByClassName('timeline-event');

        for (let i = 0; i < timelineEvents.length; i++) {
            const eventDiv = timelineEvents[i];
            const eventTitle = eventDiv.getElementsByClassName('timeline-event-title')[0].textContent.toLowerCase();
            const description = eventDiv.getElementsByClassName('timeline-description')[0].textContent.toLowerCase();

            // Match search value with either event title or description
            if (eventTitle.includes(searchValue) || description.includes(searchValue)) {
                eventDiv.style.display = 'block';
            } else {
                eventDiv.style.display = 'none';
            }
        }
    });
}


function populateYearFilter() {
    const yearFilter = document.getElementById('yearFilter');

    yearFilter.addEventListener('change', function() {
        const selectedPeriod = yearFilter.value;
        filterTimeline(selectedPeriod);
    });
}


function filterTimeline(selectedPeriod) {
    const timelineEvents = document.getElementsByClassName('timeline-event');
    
    for (let i = 0; i < timelineEvents.length; i++) {
        const eventDiv = timelineEvents[i];
        const yearText = eventDiv.getElementsByClassName('timeline-year')[0].textContent.trim();

        let showEvent = false;

        // Handle year ranges
        let yearRange = yearText.split("-");
        let startYear = parseYear(yearRange[0].trim());
        let endYear = yearRange.length > 1 ? parseYear(yearRange[1].trim()) : startYear;

        if (startYear > endYear) {
            [startYear, endYear] = [endYear, startYear];
        }

        
        // Filtering logic based on the selected time period
       switch (selectedPeriod) {
            case "all":
                showEvent = true;
                break;
            case "500BC-0":
                if (startYear <= -500 && startYear <= 0 && endYear < 1){
                    showEvent = true;
                }
                break;
            case "0-1000AD":
                if (startYear >= 0 && endYear <= 1000){
                    showEvent = true;
                }
                break;
            case "1000AD-1500AD":
                if (startYear >= 1000 && endYear <= 1500) {
                    showEvent = true;
                }
                break;
            case "1500AD-1800AD":
                if (startYear >= 1500 && endYear <= 1800) {
                    showEvent = true;
                }
                break;
            case "1800AD-present":
                if (startYear >= 1800 || endYear >= 1800) {
                    showEvent = true;
                }
                break;
            default:
                showEvent = false;
                break;
            }
        
        eventDiv.style.display = showEvent ? 'block' : 'none';
    }
}

//Helper function to parse year values considering BC and AD
function parseYear(yearText) {
    let year = parseInt(yearText.replace(/[^0-9]/g, '')); //Extract numeric part
    if (yearText.toUpperCase().includes('BC')) {
        year = -year; //Represent BC years as negative for easier comparison
    }
    return year;
}

console.log(`Year Range: ${yearText}, Parsed Start Year: ${startYear}, Parsed End Year: ${endYear}, Selected Period: ${selectedPeriod}`);



document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const timelineEvents = document.getElementsByClassName('timeline-event');

    for (let i = 0; i < timelineEvents.length; i++) {
        const eventDiv = timelineEvents[i];
        const eventTitle = eventDiv.getElementsByClassName('timeline-event-title')[0].textContent.toLocaleLowerCase();
        const description = eventDiv.getElementsByClassName('timeline-description')[0].textContent.toLocaleLowerCase();

        if (eventTitle.includes(searchValue) || description.includes(searchValue)) {
            eventDiv.style.display = 'block';
        } else {
            eventDiv.style.display = 'none';
        }
    }
});



const timelineContainer = document.getElementById('timelineContainer');

let isDown = false;
let startX;
let scrollLeft;
let velocity = 0;
let raf;

// Add eventlistener for mouse down
timelineContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    timelineContainer.classList.add('active');
    startX = e.pageX - timelineContainer.offsetLeft;
    scrollLeft = timelineContainer.scrollLeft;
    cancelAnimationFrame(raf);
    e.preventDefault();
});

// Add event listener for mouse leave
timelineContainer.addEventListener('mouseleave', () => {
    if (isDown) {
        isDown = false;
        timelineContainer.classList.remove('active');
        startInertia();
    }  
});

// Add event listener for mouse up
timelineContainer.addEventListener('mouseup', () => {
    if (isDown) {
        isDown = false;
        timelineContainer.classList.remove('active');
        startInertia();
    }
});

// Add event listener for mouse move
timelineContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timelineContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    timelineContainer.scrollLeft = scrollLeft - walk;
    velocity = -(x - startX) * 0.1;
});

function startInertia() {
    if (Math.abs(velocity) > 0.5) {
        timelineContainer.scrollLeft += velocity;
        velocity *= 0.95;
        raf = requestAnimationFrame(startInertia);
    }
}

// Add smooth scrolling for the automatic scroll
timelineContainer.style.scrollBehavior = 'smooth';


