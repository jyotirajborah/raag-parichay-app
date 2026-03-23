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
        // Hindi to English thaat name mapping
        const thaatMap = {
            'बिलावल': 'Bilaval',
            'कल्याण': 'Kalyan',
            'काफी': 'Kafi',
            'खमाज': 'Khamaj',
            'भैरव': 'Bhairav',
            'भैरवी': 'Bhairavi',
            'आसावरी': 'Asavari',
            'तोड़ी': 'Todi',
            'पूर्वी': 'Poorvi',
            'मारवा': 'Marva'
        };

        // Thaat swaras (notes) for each thaat
        const thaatSwaras = {
            'Bilaval': 'Sa Re Ga Ma Pa Dha Ni',
            'Kalyan': 'Sa Re Ga Ma\u0301 Pa Dha Ni',
            'Kafi': 'Sa Re ga Ma Pa Dha ni',
            'Khamaj': 'Sa Re Ga Ma Pa Dha ni',
            'Bhairav': 'Sa re Ga Ma Pa dha Ni',
            'Bhairavi': 'Sa re ga Ma Pa dha ni',
            'Asavari': 'Sa Re ga Ma Pa dha ni',
            'Todi': 'Sa re ga Ma\u0301 Pa dha Ni',
            'Poorvi': 'Sa re Ga Ma\u0301 Pa dha Ni',
            'Marva': 'Sa re Ga Ma\u0301 Pa Dha Ni'
        };

        // Build lookup from Raag sheet for extra details (time, jati, notes)
        const raagDetailsLookup = {};
        if (appData.Raag && appData.Raag.data) {
            let currentThaat = '';
            appData.Raag.data.forEach(row => {
                const thaat = cleanString(row['Thaat (T)']);
                if (thaat) currentThaat = thaat;
                const raagName = cleanString(row['Raag (R) (13)']);
                if (raagName && !raagName.includes('blue =')) {
                    raagDetailsLookup[raagName.toLowerCase()] = {
                        time: cleanString(row['Time (Gayan/Badan Samay)']),
                        details: cleanString(row[' [A|Ab: Varjit] - [Jati] - [B: Badi -Sb: Sambadi] [Similarity with raag]']),
                        swaras: cleanString(row['Sa Ṟe Re Ga Ma Ḿa Pa Dẖa Dha Ṉi Ni Ṡa']),
                        thaat: currentThaat
                    };
                }
            });
        }

        // Use bandish sheet as PRIMARY source (contains all 112+ raags under 10 thaats)
        if (appData.bandish && appData.bandish.data) {
            const seen = new Set(); // avoid duplicates
            appData.bandish.data.forEach(row => {
                const thaatHindi = cleanString(row['थाट']);
                const raagName = cleanString(row['राग']);
                
                // Skip non-raag entries
                if (!raagName || raagName === 'Thaat' || raagName.includes('Reasearch') || raagName.includes('Note:')) return;
                
                // Get English thaat name
                const thaatEng = thaatMap[thaatHindi] || thaatHindi || 'Uncategorized';
                
                // Dedup key
                const dedupKey = raagName.toLowerCase() + '|' + thaatEng.toLowerCase();
                if (seen.has(dedupKey)) return;
                seen.add(dedupKey);

                // Get bandish info
                const vilambit = cleanString(row['विलंबित लय (धीमा टेम्पो) - आम बंदिश']);
                const drut = cleanString(row['द्रुत लय (तेज टेम्पो) - आम बंदिश']);
                
                // Look up additional info from Raag sheet
                const lookup = raagDetailsLookup[raagName.toLowerCase()] || {};
                
                let details = lookup.details || '';
                let bandishInfo = '';
                if (vilambit) bandishInfo += `Vilambit: ${vilambit}`;
                if (drut) bandishInfo += `${bandishInfo ? ' | ' : ''}Drut: ${drut}`;
                
                raagsData.push({
                    name: raagName,
                    thaat: thaatEng,
                    thaatSwaras: thaatSwaras[thaatEng] || '',
                    time: lookup.time || '',
                    details: details,
                    bandish: bandishInfo,
                    swaras: lookup.swaras || ''
                });
            });
        }

        // Also add any raags from the Raag sheet that weren't in bandish
        if (appData.Raag && appData.Raag.data) {
            const existingNames = new Set(raagsData.map(r => r.name.toLowerCase()));
            let currentThaat = '';
            appData.Raag.data.forEach(row => {
                const thaat = cleanString(row['Thaat (T)']);
                if (thaat) currentThaat = thaat;
                const raagName = cleanString(row['Raag (R) (13)']);
                if (raagName && !raagName.includes('blue =') && !existingNames.has(raagName.toLowerCase())) {
                    existingNames.add(raagName.toLowerCase());
                    raagsData.push({
                        name: raagName,
                        thaat: currentThaat,
                        thaatSwaras: thaatSwaras[currentThaat] || '',
                        time: cleanString(row['Time (Gayan/Badan Samay)']),
                        details: cleanString(row[' [A|Ab: Varjit] - [Jati] - [B: Badi -Sb: Sambadi] [Similarity with raag]']),
                        bandish: '',
                        swaras: cleanString(row['Sa Ṟe Re Ga Ma Ḿa Pa Dẖa Dha Ṉi Ni Ṡa'])
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

        // Define a preferred thaat order (the standard 10 thaats)
        const thaatOrder = ['Bilaval', 'Kalyan', 'Khamaj', 'Bhairav', 'Poorvi', 'Marva', 'Kafi', 'Asavari', 'Bhairavi', 'Todi'];
        const sortedKeys = Object.keys(grouped).sort((a, b) => {
            const ia = thaatOrder.indexOf(a);
            const ib = thaatOrder.indexOf(b);
            if (ia === -1 && ib === -1) return a.localeCompare(b);
            if (ia === -1) return 1;
            if (ib === -1) return -1;
            return ia - ib;
        });

        sortedKeys.forEach(thaat => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'thaat-category';
            
            // Get thaat swaras from first raag in the group
            const swaras = grouped[thaat][0].thaatSwaras || '';
            const swarasHtml = swaras ? `<span class="thaat-swaras">${swaras}</span>` : '';
            
            const titleHtml = `<h2 class="thaat-title">${thaat === 'Uncategorized' ? 'Other Raags' : thaat + ' Thaat'} <span class="count-badge">${grouped[thaat].length}</span>${swarasHtml}</h2>`;
            
            let gridHtml = '<div class="grid-container">';
            
            grouped[thaat].forEach(raag => {
                let cardHtml = `<div class="card">
                    <h3>${raag.name}</h3>`;
                if (raag.time) cardHtml += `<p><strong>🕐 Time:</strong> ${raag.time}</p>`;
                if (raag.details) cardHtml += `<p><strong>📋 Info:</strong> ${raag.details}</p>`;
                if (raag.bandish) cardHtml += `<p><strong>🎵 Bandish:</strong> ${raag.bandish}</p>`;
                if (raag.swaras) cardHtml += `<p><strong>🎶 Swaras:</strong> ${raag.swaras}</p>`;
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
