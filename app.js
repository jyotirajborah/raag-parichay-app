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
            renderThaatSelector();
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
        // Thaat swaras (notes) for each thaat
        const thaatSwaras = {
            'Bilaval': 'Sa Re Ga Ma Pa Dha Ni',
            'Kalyan': 'Sa Re Ga Mā Pa Dha Ni',
            'Kafi': 'Sa Re ga Ma Pa Dha ni',
            'Khamaj': 'Sa Re Ga Ma Pa Dha ni',
            'Bhairav': 'Sa re Ga Ma Pa dha Ni',
            'Bhairavi': 'Sa re ga Ma Pa dha ni',
            'Asavari': 'Sa Re ga Ma Pa dha ni',
            'Todi': 'Sa re ga Mā Pa dha Ni',
            'Poorvi': 'Sa re Ga Mā Pa dha Ni',
            'Marva': 'Sa re Ga Mā Pa Dha Ni'
        };

        // Authoritative list: 120 raags under 10 thaats (from user's Excel data)
        const raagDirectory = [
            // Bilaval Thaat (16)
            { name: 'बिलावल', thaat: 'Bilaval' },
            { name: 'अल्हैया बिलावल', thaat: 'Bilaval' },
            { name: 'बिहाग', thaat: 'Bilaval' },
            { name: 'दुर्गा', thaat: 'Bilaval' },
            { name: 'शंकरा', thaat: 'Bilaval' },
            { name: 'Deshkar', thaat: 'Bilaval' },
            { name: 'Maluha Kedar', thaat: 'Bilaval' },
            { name: 'हंसध्वनि', thaat: 'Bilaval' },
            { name: 'Jaldhar Kedar', thaat: 'Bilaval' },
            { name: 'Sarparada', thaat: 'Bilaval' },
            { name: 'Gopika Basant', thaat: 'Bilaval' },
            { name: 'Devgiri Bilawal', thaat: 'Bilaval' },
            { name: 'Bhatiyar', thaat: 'Bilaval' },
            { name: 'Nat Bihag', thaat: 'Bilaval' },
            { name: 'Sukla Bilawal', thaat: 'Bilaval' },
            { name: 'Bihagara', thaat: 'Bilaval' },
            // Kalyan Thaat (18)
            { name: 'कल्याण', thaat: 'Kalyan' },
            { name: 'यमन', thaat: 'Kalyan' },
            { name: 'भूपाली', thaat: 'Kalyan' },
            { name: 'हमीर', thaat: 'Kalyan' },
            { name: 'केदार', thaat: 'Kalyan' },
            { name: 'Kamod', thaat: 'Kalyan' },
            { name: 'Hindol', thaat: 'Kalyan' },
            { name: 'Gaur Sarang', thaat: 'Kalyan' },
            { name: 'Chayanaut', thaat: 'Kalyan' },
            { name: 'Sudh Kalyan', thaat: 'Kalyan' },
            { name: 'मारु बिहाग', thaat: 'Kalyan' },
            { name: 'Nand', thaat: 'Kalyan' },
            { name: 'शुद्ध सारंग', thaat: 'Kalyan' },
            { name: 'Yamani Bilawal', thaat: 'Kalyan' },
            { name: 'Shyam Kalyan', thaat: 'Kalyan' },
            { name: 'Hemant', thaat: 'Kalyan' },
            { name: 'Jogkaunsh', thaat: 'Kalyan' },
            { name: 'Jaut Kalyan', thaat: 'Kalyan' },
            // Khamaj Thaat (16)
            { name: 'खमाज', thaat: 'Khamaj' },
            { name: 'देश', thaat: 'Khamaj' },
            { name: 'तिलंग', thaat: 'Khamaj' },
            { name: 'तिलक कामोद', thaat: 'Khamaj' },
            { name: 'Jaijaiwanti', thaat: 'Khamaj' },
            { name: 'Gur Malhar', thaat: 'Khamaj' },
            { name: 'रागेश्री/Rageswari', thaat: 'Khamaj' },
            { name: 'चंपकली', thaat: 'Khamaj' },
            { name: 'जोग', thaat: 'Khamaj' },
            { name: 'Narayani', thaat: 'Khamaj' },
            { name: 'Madhumad Sarang', thaat: 'Khamaj' },
            { name: 'Gara', thaat: 'Khamaj' },
            { name: 'गोरख कल्याण', thaat: 'Khamaj' },
            { name: 'Jinjhoti', thaat: 'Khamaj' },
            { name: 'Khambawati', thaat: 'Khamaj' },
            { name: 'सरस्वती', thaat: 'Khamaj' },
            // Kafi Thaat (28)
            { name: 'काफी', thaat: 'Kafi' },
            { name: 'वृंदावनी सारंग', thaat: 'Kafi' },
            { name: 'भीमपलासी', thaat: 'Kafi' },
            { name: 'बागेश्री', thaat: 'Kafi' },
            { name: 'Pilu', thaat: 'Kafi' },
            { name: 'पटदीप', thaat: 'Kafi' },
            { name: 'बहार', thaat: 'Kafi' },
            { name: 'Miya Malhar', thaat: 'Kafi' },
            { name: 'Malgunji', thaat: 'Kafi' },
            { name: 'चंद्रकौंस', thaat: 'Kafi' },
            { name: 'Abhogi Kanhra', thaat: 'Kafi' },
            { name: 'Sur Malhar', thaat: 'Kafi' },
            { name: 'Hanskinkani', thaat: 'Kafi' },
            { name: 'Dhanashree', thaat: 'Kafi' },
            { name: 'Bhim', thaat: 'Kafi' },
            { name: 'Dhani', thaat: 'Kafi' },
            { name: 'Sahana', thaat: 'Kafi' },
            { name: 'Jayant Malhar', thaat: 'Kafi' },
            { name: 'Megh Malhar', thaat: 'Kafi' },
            { name: 'Miya Ki Sarang', thaat: 'Kafi' },
            { name: 'Suha', thaat: 'Kafi' },
            { name: 'Nayaki Kanhara', thaat: 'Kafi' },
            { name: 'Ramdasi Malhar', thaat: 'Kafi' },
            { name: 'Sugharai', thaat: 'Kafi' },
            { name: 'Gauri', thaat: 'Kafi' },
            { name: 'Barwa', thaat: 'Kafi' },
            { name: 'Kafi Kanhra', thaat: 'Kafi' },
            { name: 'शिवरंजनी', thaat: 'Kafi' },
            // Asavari Thaat (7)
            { name: 'आसावरी', thaat: 'Asavari' },
            { name: 'जौनपुरी', thaat: 'Asavari' },
            { name: 'अड़ाना', thaat: 'Asavari' },
            { name: 'Darbari Kanhra', thaat: 'Asavari' },
            { name: 'Deshi', thaat: 'Asavari' },
            { name: 'Kaushi Kanhra', thaat: 'Asavari' },
            { name: 'दरबारी', thaat: 'Asavari' },
            // Bhairav Thaat (9)
            { name: 'भैरव', thaat: 'Bhairav' },
            { name: 'Kalingara', thaat: 'Bhairav' },
            { name: 'Vibhas', thaat: 'Bhairav' },
            { name: 'Ramkali', thaat: 'Bhairav' },
            { name: 'Ahir Bhairav', thaat: 'Bhairav' },
            { name: 'Bangal Bhairav', thaat: 'Bhairav' },
            { name: 'Anand Bhairav', thaat: 'Bhairav' },
            { name: 'Gunkali', thaat: 'Bhairav' },
            { name: 'Shivmat Bhairav', thaat: 'Bhairav' },
            // Bhairavi Thaat (6)
            { name: 'भैरवी', thaat: 'Bhairavi' },
            { name: 'मालकौश', thaat: 'Bhairavi' },
            { name: 'Chandrakaush', thaat: 'Bhairavi' },
            { name: 'Bhupal Todi', thaat: 'Bhairavi' },
            { name: 'कोमल ऋषभ आसावरी', thaat: 'Bhairavi' },
            { name: 'Bilaskhani Todi', thaat: 'Bhairavi' },
            // Poorvi Thaat (8)
            { name: 'पूर्वी', thaat: 'Poorvi' },
            { name: 'श्री', thaat: 'Poorvi' },
            { name: 'पूरिया धनाश्री', thaat: 'Poorvi' },
            { name: 'Basant', thaat: 'Poorvi' },
            { name: 'Paraj', thaat: 'Poorvi' },
            { name: 'ललित', thaat: 'Poorvi' },
            { name: 'Rewa', thaat: 'Poorvi' },
            { name: 'Jotashree', thaat: 'Poorvi' },
            // Marva Thaat (8)
            { name: 'मारवा', thaat: 'Marva' },
            { name: 'सोहनी', thaat: 'Marva' },
            { name: 'पूरिया', thaat: 'Marva' },
            { name: 'पूरिया कल्याण', thaat: 'Marva' },
            { name: 'Jaut', thaat: 'Marva' },
            { name: 'Bhankhar', thaat: 'Marva' },
            { name: 'Lalita Gauri', thaat: 'Marva' },
            { name: 'भाटिया', thaat: 'Marva' },
            // Todi Thaat (4)
            { name: 'तोड़ी', thaat: 'Todi' },
            { name: 'मुल्तानी', thaat: 'Todi' },
            { name: 'गुजरी तोड़ी', thaat: 'Todi' },
            { name: 'मधुवंती', thaat: 'Todi' }
        ];

        // Build lookup from bandish sheet for bandish compositions
        const bandishLookup = {};
        if (appData.bandish && appData.bandish.data) {
            appData.bandish.data.forEach(row => {
                const raagName = cleanString(row['राग']);
                if (raagName) {
                    const vilambit = cleanString(row['विलंबित लय (धीमा टेम्पो) - आम बंदिश']);
                    const drut = cleanString(row['द्रुत लय (तेज टेम्पो) - आम बंदिश']);
                    let bandishInfo = '';
                    if (vilambit) bandishInfo += `Vilambit: ${vilambit}`;
                    if (drut) bandishInfo += `${bandishInfo ? ' | ' : ''}Drut: ${drut}`;
                    if (bandishInfo) bandishLookup[raagName] = bandishInfo;
                }
            });
        }

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
                        swaras: cleanString(row['Sa Ṟe Re Ga Ma Ḿa Pa Dẖa Dha Ṉi Ni Ṡa'])
                    };
                }
            });
        }

        // Build raagsData from the authoritative directory
        raagDirectory.forEach(entry => {
            const lookup = raagDetailsLookup[entry.name.toLowerCase()] || {};
            const bandish = bandishLookup[entry.name] || '';

            raagsData.push({
                name: entry.name,
                thaat: entry.thaat,
                thaatSwaras: thaatSwaras[entry.thaat] || '',
                time: lookup.time || '',
                details: lookup.details || '',
                bandish: bandish,
                swaras: lookup.swaras || ''
            });
        });
    }

    // Thaat order and grouping
    const thaatOrder = ['Bilaval', 'Kalyan', 'Khamaj', 'Bhairav', 'Poorvi', 'Marva', 'Kafi', 'Asavari', 'Bhairavi', 'Todi'];

    // Thaat accent colors for visual distinction
    const thaatColors = {
        'Bilaval': '#4fc3f7',
        'Kalyan': '#ffd54f',
        'Khamaj': '#81c784',
        'Bhairav': '#e57373',
        'Poorvi': '#ce93d8',
        'Marva': '#ffb74d',
        'Kafi': '#aed581',
        'Asavari': '#90a4ae',
        'Bhairavi': '#f48fb1',
        'Todi': '#80cbc4'
    };

    function groupByThaat(raags) {
        const grouped = {};
        raags.forEach(raag => {
            const key = raag.thaat ? raag.thaat.trim() : 'Uncategorized';
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(raag);
        });
        return grouped;
    }

    function renderThaatSelector() {
        const selector = document.getElementById('thaat-selector');
        const grouped = groupByThaat(raagsData);
        selector.innerHTML = '';

        const sortedKeys = Object.keys(grouped).sort((a, b) => {
            const ia = thaatOrder.indexOf(a);
            const ib = thaatOrder.indexOf(b);
            if (ia === -1 && ib === -1) return a.localeCompare(b);
            if (ia === -1) return 1;
            if (ib === -1) return -1;
            return ia - ib;
        });

        sortedKeys.forEach((thaat, index) => {
            const color = thaatColors[thaat] || '#9d4edd';
            const card = document.createElement('div');
            card.className = 'thaat-card';
            card.style.setProperty('--thaat-color', color);
            card.style.animationDelay = `${index * 0.05}s`;
            
            // Create raag bubbles
            let raagBubblesHTML = '<div class="raag-bubbles">';
            grouped[thaat].forEach((raag, idx) => {
                raagBubblesHTML += `<span class="raag-bubble" style="animation-delay: ${(index * 0.05) + (idx * 0.02)}s">${raag.name}</span>`;
            });
            raagBubblesHTML += '</div>';
            
            card.innerHTML = `
                <div class="thaat-card-number">${thaatOrder.indexOf(thaat) + 1 || '•'}</div>
                <h3>${thaat} <span class="thaat-raag-count">(${grouped[thaat].length})</span></h3>
                ${raagBubblesHTML}
            `;
            card.addEventListener('click', () => showRaagPanel(thaat, grouped[thaat]));
            selector.appendChild(card);
        });
    }

    function showRaagPanel(thaat, raags) {
        const selector = document.getElementById('thaat-selector');
        const panel = document.getElementById('raag-panel');
        const header = document.getElementById('raag-panel-header');
        const grid = document.getElementById('raag-grid');
        const title = document.getElementById('directory-title');
        const color = thaatColors[thaat] || '#9d4edd';

        // Update header title
        title.textContent = thaat + ' Thaat';

        // Hide selector, show panel
        selector.classList.add('hidden');
        panel.classList.remove('hidden');

        // Build header
        const swaras = raags[0].thaatSwaras || '';
        header.innerHTML = `
            <div class="raag-panel-info" style="border-left: 3px solid ${color}; padding-left: 15px;">
                <h2 style="color: ${color};">${thaat} Thaat <span class="count-badge">${raags.length}</span></h2>
                ${swaras ? `<p class="thaat-swaras">${swaras}</p>` : ''}
            </div>
        `;

        // Build raag cards
        grid.innerHTML = '';
        raags.forEach((raag, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${i * 0.03}s`;
            card.style.borderTop = `2px solid ${color}`;
            
            let html = `<h3>${raag.name}</h3>`;
            if (raag.time) html += `<p><strong>🕐 Time:</strong> ${raag.time}</p>`;
            if (raag.details) html += `<p><strong>📋 Info:</strong> ${raag.details}</p>`;
            if (raag.bandish) html += `<p><strong>🎵 Bandish:</strong> ${raag.bandish}</p>`;
            if (raag.swaras) html += `<p><strong>🎶 Swaras:</strong> ${raag.swaras}</p>`;
            
            card.innerHTML = html;
            grid.appendChild(card);
        });
    }

    function showThaatSelector() {
        const selector = document.getElementById('thaat-selector');
        const panel = document.getElementById('raag-panel');
        const title = document.getElementById('directory-title');
        
        title.textContent = 'Raag Directory';
        panel.classList.add('hidden');
        selector.classList.remove('hidden');
        searchInput.value = '';
    }

    function showSearchResults(raags) {
        const selector = document.getElementById('thaat-selector');
        const panel = document.getElementById('raag-panel');
        const header = document.getElementById('raag-panel-header');
        const grid = document.getElementById('raag-grid');
        const title = document.getElementById('directory-title');

        title.textContent = 'Search Results';
        selector.classList.add('hidden');
        panel.classList.remove('hidden');

        header.innerHTML = `<div class="raag-panel-info"><h2>Found ${raags.length} Raag${raags.length !== 1 ? 's' : ''}</h2></div>`;

        grid.innerHTML = '';
        if (raags.length === 0) {
            grid.innerHTML = '<p class="loader">No Raags found.</p>';
            return;
        }
        raags.forEach((raag, i) => {
            const color = thaatColors[raag.thaat] || '#9d4edd';
            const card = document.createElement('div');
            card.className = 'card';
            card.style.animationDelay = `${i * 0.03}s`;
            card.style.borderTop = `2px solid ${color}`;
            
            let html = `<h3>${raag.name}</h3>`;
            html += `<div><span class="tag" style="background: ${color}22; color: ${color};">${raag.thaat} Thaat</span></div>`;
            if (raag.time) html += `<p><strong>🕐 Time:</strong> ${raag.time}</p>`;
            if (raag.details) html += `<p><strong>📋 Info:</strong> ${raag.details}</p>`;
            if (raag.bandish) html += `<p><strong>🎵 Bandish:</strong> ${raag.bandish}</p>`;
            
            card.innerHTML = html;
            grid.appendChild(card);
        });
    }

    // Back button handler
    document.getElementById('back-to-thaats').addEventListener('click', showThaatSelector);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        if (!term) {
            showThaatSelector();
            return;
        }
        const filtered = raagsData.filter(r => 
            r.name.toLowerCase().includes(term) || 
            (r.thaat && r.thaat.toLowerCase().includes(term))
        );
        showSearchResults(filtered);
    });

    function renderShrutis() {
        const container = document.getElementById('shruti-content');
        if (!appData['22 shrutis'] || !appData['22 shrutis'].data) {
            container.innerHTML = '<p>No Shruti data found.</p>';
            return;
        }

        const data = appData['22 shrutis'].data;
        let html = '<table class="data-table"><thead><tr><th>No.</th><th>Swara</th><th>Hindustani</th><th>Carnatic</th><th>Ratio</th><th>Frequency (Hz)</th><th>Western Note</th></tr></thead><tbody>';
        
        data.forEach(row => {
            const no = cleanString(row['No.']);
            const swara = cleanString(row['Swara']);
            const hindustani = cleanString(row['Hindustani Swara-sthana']);
            const carnatic = cleanString(row['Shruti Name (Carnatic)']);
            const ratio = cleanString(row['Frequency Ratio']);
            const freq = cleanString(row['Shruti Frequency (Hz) : Natural']);
            const western = cleanString(row['Western Note : Standardization']);
            
            if (no && swara) {
                html += `<tr>
                    <td><strong>${no}</strong></td>
                    <td><strong>${swara}</strong></td>
                    <td>${hindustani}</td>
                    <td>${carnatic}</td>
                    <td>${ratio}</td>
                    <td>${freq}</td>
                    <td>${western}</td>
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
