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
        const grid = document.getElementById('raag-grid');
        grid.innerHTML = '';
        
        if (raags.length === 0) {
            grid.innerHTML = '<p class="loader">No Raags found.</p>';
            return;
        }

        raags.forEach(raag => {
            const card = document.createElement('div');
            card.className = 'card';
            
            let html = `<h3>${raag.name}</h3>`;
            if (raag.thaat) html += `<div><span class="tag">${raag.thaat} Thaat</span></div>`;
            if (raag.time) html += `<p><strong>Time:</strong> ${raag.time}</p>`;
            if (raag.details) html += `<p><strong>Info:</strong> ${raag.details}</p>`;
            if (raag.notes) html += `<p><strong>Notes/Mood:</strong> ${raag.notes}</p>`;
            
            card.innerHTML = html;
            grid.appendChild(card);
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
