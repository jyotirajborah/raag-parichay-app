document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');
    const searchInput = document.getElementById('search-input');
    
    let appData = null;
    let raagsData = [];

    // Tabs logic
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('data-tab');
            views.forEach(view => {
                view.classList.remove('active-view');
                if(view.id === targetId) {
                    view.classList.add('active-view');
                }
            });
        });
    });

    // Fetch and process data
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            appData = data;
            processData();
            renderRaags(raagsData);
            renderShrutis();
            renderTheory();
        })
        .catch(err => {
            console.error(err);
            document.querySelectorAll('.loader').forEach(l => l.innerText = 'Error loading data.');
        });

    function cleanString(str) {
        if (!str || str === 'nan' || str === 'NaN') return '';
        return str;
    }

    function processData() {
        if (!appData.Raag || !appData.Raag.data) return;
        
        // Extract Raags from Raag sheet
        const rawRaags = appData.Raag.data;
        
        let currentThaat = '';
        rawRaags.forEach(row => {
            const thaat = cleanString(row['Thaat (T)']);
            if (thaat) currentThaat = thaat;
            
            const raagName = cleanString(row['Raag (R) (13)']);
            if (raagName && !raagName.includes('blue =')) {
                raagsData.push({
                    name: raagName,
                    thaat: currentThaat,
                    time: cleanString(row['Time (Gayan/Badan Samay)']),
                    details: cleanString(row[' [A|Ab: Varjit] - [Jati] - [B: Badi -Sb: Sambadi] [Similarity with raag]']),
                    notes: cleanString(row['Sa Ṟe Re Ga Ma Ḿa Pa Dẖa Dha Ṉi Ni Ṡa'])
                });
            }
        });

        // Add subset of sarang family if available
        if (appData['sarang family'] && appData['sarang family'].data) {
            appData['sarang family'].data.forEach(row => {
                const name = cleanString(row['Raga Name']);
                if (name) {
                    raagsData.push({
                        name: name + ' (Sarang)',
                        thaat: 'Kafi/Khamaj', // typical for sarang
                        time: cleanString(row['Time of Performance']),
                        details: `Vadi: ${cleanString(row['Vadi'])} | Samvadi: ${cleanString(row['Samvadi'])}`,
                        notes: cleanString(row['Mood (Rasa)'])
                    });
                }
            });
        }
    }

    function renderRaags(raags) {
        const container = document.getElementById('raag-grid');
        container.innerHTML = '';
        
        if (raags.length === 0) {
            container.innerHTML = '<p class="loader">No Raags found.</p>';
            return;
        }

        // Group by thaat
        const grouped = {};
        raags.forEach(raag => {
            const thaatKey = raag.thaat ? raag.thaat.trim() : 'Uncategorized';
            if (!grouped[thaatKey]) {
                grouped[thaatKey] = [];
            }
            grouped[thaatKey].push(raag);
        });

        // Sort thaat keys alphabetically
        const thaatKeys = Object.keys(grouped).sort();

        thaatKeys.forEach(thaat => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'thaat-category';
            
            const titleHtml = `<h2 class="thaat-title">${thaat === 'Uncategorized' ? 'Other Raags' : thaat + ' Thaat'} <span class="count-badge">${grouped[thaat].length}</span></h2>`;
            
            let gridHtml = '<div class="grid-container">';
            
            grouped[thaat].forEach(raag => {
                let cardHtml = `<div class="card">
                    <h3>${raag.name}</h3>`;
                // we skip the thaat tag since they are grouped under thaat now
                if (raag.time) cardHtml += `<p><strong>Time:</strong> ${raag.time}</p>`;
                if (raag.details) cardHtml += `<p><strong>Info:</strong> ${raag.details}</p>`;
                if (raag.notes) cardHtml += `<p><strong>Notes/Mood:</strong> ${raag.notes}</p>`;
                cardHtml += `</div>`;
                gridHtml += cardHtml;
            });
            
            gridHtml += '</div>';
            
            categoryDiv.innerHTML = titleHtml + gridHtml;
            container.appendChild(categoryDiv);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = raagsData.filter(r => 
            r.name.toLowerCase().includes(term) || 
            (r.thaat && r.thaat.toLowerCase().includes(term))
        );
        renderRaags(filtered);
    });

    function renderShrutis() {
        const container = document.getElementById('shruti-content');
        if (!appData['recognizing shrutis'] || !appData['recognizing shrutis'].data) {
            container.innerHTML = '<p>No Shruti data found.</p>';
            return;
        }

        const data = appData['recognizing shrutis'].data;
        let html = '<table class="data-table"><thead><tr><th>Swara</th><th>Quality</th><th>Tanpura Lock</th></tr></thead><tbody>';
        
        data.forEach(row => {
            const swara = cleanString(row['Swara']);
            const quality = cleanString(row['Emotional Quality']);
            const lock = cleanString(row['How It Locks With Tanpura']);
            
            if (swara || quality) {
                html += `<tr>
                    <td><strong>${swara}</strong></td>
                    <td>${quality}</td>
                    <td>${lock}</td>
                </tr>`;
            }
        });
        
        html += '</tbody></table>';
        container.innerHTML = html;
    }

    function renderTheory() {
        const container = document.getElementById('theory-content');
        if (!appData['Diff - style'] || !appData['Diff - style'].data) {
            container.innerHTML = '<p>No Theory data found.</p>';
            return;
        }

        const data = appData['Diff - style'].data;
        let html = '<table class="data-table"><thead><tr><th>Feature</th><th>Hindustani</th><th>Carnatic</th><th>Western</th></tr></thead><tbody>';
        
        data.forEach(row => {
            const feature = cleanString(row['Feature']);
            const hin = cleanString(row['Hindustani Music (North India)']);
            const car = cleanString(row['Carnatic Music (South India)']);
            const wes = cleanString(row['Western Music']);
            
            if (feature) {
                html += `<tr>
                    <td><strong>${feature}</strong></td>
                    <td>${hin}</td>
                    <td>${car}</td>
                    <td>${wes}</td>
                </tr>`;
            }
        });
        
        html += '</tbody></table>';
        container.innerHTML = html;
    }
});
