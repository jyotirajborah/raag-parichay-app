document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');
    const searchInput = document.getElementById('search-input');
    const shrutiSearchInput = document.getElementById('shruti-search-input');
    
    let appData = null;
    let raagsData = [];
    let shrutiExplanations = [];

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
            renderShrutiVisualizer();
            renderDNAGrid();
            renderShrutiExplanations();
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
    const thaatOrder = ['Bilaval', 'Kalyan', 'Khamaj', 'Kafi', 'Asavari', 'Bhairav', 'Bhairavi', 'Poorvi', 'Marva', 'Todi'];

    // Thaat names in Hindi
    const thaatNamesHindi = {
        'Bilaval': 'बिलावल',
        'Kalyan': 'कल्याण',
        'Khamaj': 'खमाज',
        'Kafi': 'काफी',
        'Asavari': 'आसावरी',
        'Bhairav': 'भैरव',
        'Bhairavi': 'भैरवी',
        'Poorvi': 'पूर्वी',
        'Marva': 'मारवा',
        'Todi': 'तोड़ी'
    };

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
            
            // Create raag bubbles with bilingual names
            let raagBubblesHTML = '<div class="raag-bubbles">';
            grouped[thaat].forEach((raag, idx) => {
                const bilingualName = appData.raag_bilingual_names && appData.raag_bilingual_names[raag.name] 
                    ? appData.raag_bilingual_names[raag.name] 
                    : raag.name;
                raagBubblesHTML += `<span class="raag-bubble" style="animation-delay: ${(index * 0.05) + (idx * 0.02)}s">${bilingualName}</span>`;
            });
            raagBubblesHTML += '</div>';
            
            const thaatHindi = thaatNamesHindi[thaat] || '';
            const thaatDisplay = thaatHindi ? `${thaat} / ${thaatHindi}` : thaat;
            
            card.innerHTML = `
                <div class="thaat-card-number">${thaatOrder.indexOf(thaat) + 1 || '•'}</div>
                <h3>${thaatDisplay} <span class="thaat-raag-count">(${grouped[thaat].length})</span></h3>
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
        const thaatHindi = thaatNamesHindi[thaat] || '';
        const thaatDisplay = thaatHindi ? `${thaat} / ${thaatHindi}` : thaat;
        title.textContent = thaatDisplay + ' Thaat';

        // Hide selector, show panel
        selector.classList.add('hidden');
        panel.classList.remove('hidden');

        // Build header
        const swaras = raags[0].thaatSwaras || '';
        header.innerHTML = `
            <div class="raag-panel-info" style="border-left: 3px solid ${color}; padding-left: 15px;">
                <h2 style="color: ${color};">${thaatDisplay} Thaat <span class="count-badge">${raags.length}</span></h2>
                ${swaras ? `<p class="thaat-swaras">${swaras}</p>` : ''}
            </div>
        `;

        // Check if detailed raag info exists
        const raagDetails = appData.raag_details && appData.raag_details[thaat];
        
        if (raagDetails) {
            // Build table with detailed information
            let tableHTML = '<table class="data-table"><thead><tr>';
            tableHTML += '<th>Raag Name</th>';
            tableHTML += '<th>Aroha (Ascending)</th>';
            tableHTML += '<th>Avaroha (Descending)</th>';
            tableHTML += '<th>Vadi / Samvadi</th>';
            tableHTML += '<th>Time</th>';
            tableHTML += '<th>Mood (Rasa)</th>';
            tableHTML += '<th>Key Notes</th>';
            tableHTML += '<th>🎵 Instrumental</th>';
            tableHTML += '<th>🎤 Vocal</th>';
            tableHTML += '</tr></thead><tbody>';
            
            raags.forEach((raag, i) => {
                const details = raagDetails[raag.name];
                if (details) {
                    const bilingualName = appData.raag_bilingual_names && appData.raag_bilingual_names[raag.name] 
                        ? appData.raag_bilingual_names[raag.name] 
                        : raag.name;
                    tableHTML += `<tr style="animation-delay: ${i * 0.03}s">`;
                    tableHTML += `<td><strong>${bilingualName}</strong></td>`;
                    tableHTML += `<td>${details.aroha || '-'}</td>`;
                    tableHTML += `<td>${details.avaroha || '-'}</td>`;
                    tableHTML += `<td>${details.vadi_samvadi || '-'}</td>`;
                    tableHTML += `<td>${details.time || '-'}</td>`;
                    tableHTML += `<td>${details.mood || '-'}</td>`;
                    tableHTML += `<td>${details.key_notes || '-'}</td>`;
                    tableHTML += `<td>${details.youtube_instrumental ? `<a href="${details.youtube_instrumental}" target="_blank" class="youtube-link">▶ Play</a>` : '-'}</td>`;
                    tableHTML += `<td>${details.youtube_vocal ? `<a href="${details.youtube_vocal}" target="_blank" class="youtube-link">▶ Play</a>` : '-'}</td>`;
                    tableHTML += '</tr>';
                }
            });
            
            tableHTML += '</tbody></table>';
            grid.innerHTML = tableHTML;
        } else {
            // Build raag cards (fallback for thaats without detailed info)
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

    function renderShrutiVisualizer() {
        // Audio context for playing frequencies
        let audioContext = null;
        let playingOscillators = {}; // Track multiple playing oscillators by index
        let sliderOscillator = null; // Track slider/checkbox oscillator
        let baseSa = 240; // Default middle Sa frequency
        
        function initAudio() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }
        
        function toggleContinuousPlay(frequency, index) {
            initAudio();
            
            // If already playing, stop it
            if (playingOscillators[index]) {
                playingOscillators[index].gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
                playingOscillators[index].oscillator.stop(audioContext.currentTime + 0.1);
                delete playingOscillators[index];
                return false; // Stopped
            }
            
            // Start continuous play
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            // Smooth fade in
            const now = audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
            
            oscillator.start(now);
            
            playingOscillators[index] = { oscillator, gainNode };
            return true; // Started
        }
        
        // Template for 22 shrutis
        const shrutiTemplate = [
            { symbol: 'S', name: 'Shadja', ratio: '1/1', freqRatio: 1.0 },
            { symbol: 'r1', name: 'Ati Komal Rishabh', ratio: '256/243', freqRatio: 1.053 },
            { symbol: 'r2', name: 'Komal Rishabh', ratio: '16/15', freqRatio: 1.067 },
            { symbol: 'R1', name: 'Shuddha Rishabh', ratio: '10/9', freqRatio: 1.111 },
            { symbol: 'R2', name: 'Teevra Shuddha Rishabh', ratio: '9/8', freqRatio: 1.125 },
            { symbol: 'g1', name: 'Ati Komal Gandhar', ratio: '32/27', freqRatio: 1.185 },
            { symbol: 'g2', name: 'Komal Gandhar', ratio: '6/5', freqRatio: 1.2 },
            { symbol: 'G1', name: 'Shuddha Gandhar', ratio: '5/4', freqRatio: 1.25 },
            { symbol: 'G2', name: 'Teevra Shuddha Gandhar', ratio: '81/64', freqRatio: 1.266 },
            { symbol: 'm1', name: 'Shuddha Madhyam', ratio: '4/3', freqRatio: 1.333 },
            { symbol: 'm2', name: 'Ek Shruti Madhyam', ratio: '27/20', freqRatio: 1.35 },
            { symbol: 'M1', name: 'Teevra Madhyam', ratio: '45/32', freqRatio: 1.406 },
            { symbol: 'M2', name: 'Teevratama Madhyam', ratio: '64/45', freqRatio: 1.422 },
            { symbol: 'P', name: 'Pancham', ratio: '3/2', freqRatio: 1.5 },
            { symbol: 'd1', name: 'Ati Komal Dhaivat', ratio: '128/81', freqRatio: 1.58 },
            { symbol: 'd2', name: 'Komal Dhaivat', ratio: '8/5', freqRatio: 1.6 },
            { symbol: 'D1', name: 'Shuddha Dhaivat', ratio: '5/3', freqRatio: 1.667 },
            { symbol: 'D2', name: 'Teevra Shuddha Dhaivat', ratio: '27/16', freqRatio: 1.688 },
            { symbol: 'n1', name: 'Ati Komal Nishad', ratio: '16/9', freqRatio: 1.778 },
            { symbol: 'n2', name: 'Komal Nishad', ratio: '9/5', freqRatio: 1.8 },
            { symbol: 'N1', name: 'Shuddha Nishad', ratio: '15/8', freqRatio: 1.875 },
            { symbol: 'N2', name: 'Teevra Shuddha Nishad', ratio: '243/128', freqRatio: 1.898 }
        ];

        // Calculate consonant partners (Ma +9, Pa +13)
        function getConsonantPartners(index) {
            const maPartner = ((index + 9 - 1) % 22) + 1;
            const paPartner = ((index + 13 - 1) % 22) + 1;
            return { ma: maPartner, pa: paPartner };
        }
        
        function generateShrutiData(saFreq) {
            const shrutiData = [];
            
            // Lower Octave
            shrutiTemplate.forEach((shruti, i) => {
                shrutiData.push({
                    index: i + 1,
                    symbol: shruti.symbol + "'",
                    name: shruti.name,
                    ratio: shruti.ratio,
                    freq: (saFreq * shruti.freqRatio * 0.5).toFixed(2),
                    octave: 'lower'
                });
            });
            
            // Middle Octave
            shrutiTemplate.forEach((shruti, i) => {
                shrutiData.push({
                    index: i + 1,
                    symbol: shruti.symbol,
                    name: shruti.name,
                    ratio: shruti.ratio,
                    freq: (saFreq * shruti.freqRatio).toFixed(2),
                    octave: 'middle'
                });
            });
            
            // Upper Octave
            shrutiTemplate.forEach((shruti, i) => {
                let upperSymbol;
                if (shruti.symbol.length === 1) {
                    // Single character: add dot above
                    upperSymbol = shruti.symbol + '̇';
                } else {
                    // Multi-character: add dot above first character
                    upperSymbol = shruti.symbol[0] + '̇' + shruti.symbol.substring(1);
                }
                shrutiData.push({
                    index: i + 1,
                    symbol: upperSymbol,
                    name: shruti.name,
                    ratio: shruti.ratio,
                    freq: (saFreq * shruti.freqRatio * 2.0).toFixed(2),
                    octave: 'upper'
                });
            });
            
            return shrutiData;
        }
        
        function updateFrequenciesOnly(newSa) {
            // Update only the frequency displays without re-rendering entire HTML
            const shrutiData = generateShrutiData(newSa);
            
            document.querySelectorAll('.shruti-cell-compact').forEach(cell => {
                const octave = cell.getAttribute('data-octave');
                const index = parseInt(cell.getAttribute('data-index'));
                
                const shruti = shrutiData.find(s => s.octave === octave && s.index === index);
                if (shruti) {
                    cell.setAttribute('data-freq', shruti.freq);
                    const freqElement = cell.querySelector('.shruti-freq');
                    if (freqElement) {
                        freqElement.textContent = shruti.freq;
                    }
                }
            });
        }
        
        function render() {
            const shrutiData = generateShrutiData(baseSa);
            const container = document.getElementById('shruti-visualizer-content');
            
            // Fixed slider range
            const minFreq = 69.30; // Lower bound
            const maxFreq = 526.09; // Upper bound
            
            let html = `
                <div class="shruti-visualizer-intro">
                    <h2>22 Shruti Spectrum - Interactive Explorer</h2>
                    <p>Explore the complete 22-shruti system across three octaves. <strong>Double-click</strong> any shruti to play it continuously (double-click again to stop). <strong>Hover</strong> over any shruti to see its consonant partners highlighted.</p>
                    
                    <div class="sa-frequency-control">
                        <div class="slider-control">
                            <label for="sa-freq-slider">Middle Sa Frequency:</label>
                            <div class="slider-wrapper">
                                <span class="slider-label">69.30 Hz</span>
                                <input type="range" id="sa-freq-slider" value="${baseSa}" min="${minFreq}" max="${maxFreq}" step="0.1">
                                <span class="slider-label">526.09 Hz</span>
                            </div>
                            <div class="current-freq">
                                <strong id="current-sa-display">${baseSa.toFixed(2)} Hz</strong>
                                <label class="play-while-sliding">
                                    <input type="checkbox" id="play-while-sliding-checkbox">
                                    <span>Play Sa while sliding</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="scale-selector">
                            <label>Select Scale (Middle Sa):</label>
                            <div class="scale-buttons">
                                <button class="scale-btn" data-freq="87.31" data-note="F2">F2 (87.31 Hz)</button>
                                <button class="scale-btn" data-freq="92.50" data-note="F#2">F#2 (92.50 Hz)</button>
                                <button class="scale-btn" data-freq="98.00" data-note="G2">G2 (98.00 Hz)</button>
                                <button class="scale-btn" data-freq="103.83" data-note="G#2">G#2 (103.83 Hz)</button>
                                <button class="scale-btn" data-freq="110.00" data-note="A2">A2 (110.00 Hz)</button>
                                <button class="scale-btn" data-freq="116.54" data-note="A#2">A#2 (116.54 Hz)</button>
                                <button class="scale-btn" data-freq="123.47" data-note="B2">B2 (123.47 Hz)</button>
                                <button class="scale-btn" data-freq="130.81" data-note="C3">C3 (130.81 Hz)</button>
                                <button class="scale-btn" data-freq="138.59" data-note="C#3">C#3 (138.59 Hz)</button>
                                <button class="scale-btn" data-freq="146.83" data-note="D3">D3 (146.83 Hz)</button>
                                <button class="scale-btn" data-freq="155.56" data-note="D#3">D#3 (155.56 Hz)</button>
                                <button class="scale-btn" data-freq="164.81" data-note="E3">E3 (164.81 Hz)</button>
                                <button class="scale-btn active" data-freq="174.61" data-note="F3">F3 (174.61 Hz)</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="consonance-legend">
                        <div class="legend-item"><span class="legend-box source"></span> Selected Shruti</div>
                        <div class="legend-item"><span class="legend-box ma"></span> Ma Partner (+9)</div>
                        <div class="legend-item"><span class="legend-box pa"></span> Pa Partner (+13)</div>
                    </div>
                </div>
                
                <div class="shruti-grid-compact">
            `;
            
            // Render all three octaves in one compact grid
            ['lower', 'middle', 'upper'].forEach(octave => {
                const octaveShrutis = shrutiData.filter(s => s.octave === octave);
                
                html += '<div class="shruti-row-compact">';
                
                octaveShrutis.forEach(shruti => {
                    const partners = getConsonantPartners(shruti.index);
                    const uniqueId = `${shruti.octave}-${shruti.index}`;
                    
                    html += `
                        <div class="shruti-cell-compact" 
                             data-id="${uniqueId}"
                             data-index="${shruti.index}"
                             data-octave="${shruti.octave}"
                             data-freq="${shruti.freq}"
                             data-ma="${partners.ma}"
                             data-pa="${partners.pa}">
                            <div class="shruti-symbol">${shruti.symbol}</div>
                            <div class="shruti-freq">${shruti.freq}</div>
                            <div class="playing-indicator">♪</div>
                        </div>
                    `;
                });
                
                html += '</div>';
            });
            
            html += '</div>';
            
            container.innerHTML = html;
            
            // Add Sa frequency slider handler
            const slider = document.getElementById('sa-freq-slider');
            const display = document.getElementById('current-sa-display');
            const playWhileSlidingCheckbox = document.getElementById('play-while-sliding-checkbox');
            
            slider.addEventListener('input', function() {
                const newSa = parseFloat(this.value);
                baseSa = newSa;
                display.textContent = newSa.toFixed(2) + ' Hz';
                
                // Stop all playing oscillators from shruti cells
                if (audioContext) {
                    Object.keys(playingOscillators).forEach(key => {
                        playingOscillators[key].gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
                        playingOscillators[key].oscillator.stop(audioContext.currentTime + 0.1);
                    });
                    playingOscillators = {};
                }
                
                // Play Sa frequency while sliding if checkbox is checked
                if (playWhileSlidingCheckbox && playWhileSlidingCheckbox.checked) {
                    initAudio();
                    
                    // Stop previous slider oscillator if exists
                    if (sliderOscillator) {
                        sliderOscillator.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.01);
                        sliderOscillator.oscillator.stop(audioContext.currentTime + 0.01);
                    }
                    
                    // Create new oscillator for current frequency
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = newSa;
                    oscillator.type = 'sine';
                    
                    const now = audioContext.currentTime;
                    gainNode.gain.setValueAtTime(0, now);
                    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
                    
                    oscillator.start(now);
                    
                    sliderOscillator = { oscillator, gainNode };
                }
                
                // Update frequencies without full re-render
                updateFrequenciesOnly(newSa);
            });
            
            // When slider is released, keep playing if checkbox is checked
            slider.addEventListener('change', function() {
                const checkbox = document.getElementById('play-while-sliding-checkbox');
                
                // If checkbox is checked, keep the current frequency playing
                // (sliderOscillator is already playing from the input event)
                // If checkbox is not checked, stop playing
                if (!checkbox || !checkbox.checked) {
                    if (sliderOscillator) {
                        sliderOscillator.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
                        sliderOscillator.oscillator.stop(audioContext.currentTime + 0.1);
                        sliderOscillator = null;
                    }
                }
            });
            
            // Add checkbox handler to play/stop Sa when checked/unchecked
            playWhileSlidingCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    // Start playing current Sa frequency
                    initAudio();
                    
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = baseSa;
                    oscillator.type = 'sine';
                    
                    const now = audioContext.currentTime;
                    gainNode.gain.setValueAtTime(0, now);
                    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
                    
                    oscillator.start(now);
                    
                    sliderOscillator = { oscillator, gainNode };
                } else {
                    // Stop playing
                    if (sliderOscillator) {
                        sliderOscillator.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
                        sliderOscillator.oscillator.stop(audioContext.currentTime + 0.1);
                        sliderOscillator = null;
                    }
                }
            });
            
            // Add scale button handlers
            document.querySelectorAll('.scale-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const freq = parseFloat(this.getAttribute('data-freq'));
                    baseSa = freq;
                    
                    // Stop all playing oscillators from shruti cells
                    if (audioContext) {
                        Object.keys(playingOscillators).forEach(key => {
                            playingOscillators[key].gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
                            playingOscillators[key].oscillator.stop(audioContext.currentTime + 0.1);
                        });
                        playingOscillators = {};
                    }
                    
                    // Stop and restart slider oscillator if checkbox is checked
                    const checkbox = document.getElementById('play-while-sliding-checkbox');
                    if (sliderOscillator) {
                        sliderOscillator.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.01);
                        sliderOscillator.oscillator.stop(audioContext.currentTime + 0.01);
                        sliderOscillator = null;
                    }
                    
                    // Re-render with new frequency
                    render();
                    
                    // After render, update the slider and display (since render recreates them)
                    const newSlider = document.getElementById('sa-freq-slider');
                    const newDisplay = document.getElementById('current-sa-display');
                    const newCheckbox = document.getElementById('play-while-sliding-checkbox');
                    if (newSlider) newSlider.value = freq;
                    if (newDisplay) newDisplay.textContent = freq.toFixed(2) + ' Hz';
                    
                    // Restart playing if checkbox was checked
                    if (checkbox && checkbox.checked && newCheckbox) {
                        newCheckbox.checked = true;
                        initAudio();
                        
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        oscillator.frequency.value = freq;
                        oscillator.type = 'sine';
                        
                        const now = audioContext.currentTime;
                        gainNode.gain.setValueAtTime(0, now);
                        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
                        
                        oscillator.start(now);
                        
                        sliderOscillator = { oscillator, gainNode };
                    }
                    
                    // Update active state on buttons
                    document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Add event handlers for shruti cells
            document.querySelectorAll('.shruti-cell-compact').forEach(cell => {
                // Double-click to toggle continuous play
                cell.addEventListener('dblclick', function() {
                    const freq = parseFloat(this.getAttribute('data-freq'));
                    const id = this.getAttribute('data-id');
                    
                    const isPlaying = toggleContinuousPlay(freq, id);
                    
                    if (isPlaying) {
                        this.classList.add('playing');
                    } else {
                        this.classList.remove('playing');
                    }
                });
                
                // Hover to show consonant partners
                cell.addEventListener('mouseenter', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const octave = this.getAttribute('data-octave');
                    const maPartner = parseInt(this.getAttribute('data-ma'));
                    const paPartner = parseInt(this.getAttribute('data-pa'));
                    
                    // Clear previous highlights
                    document.querySelectorAll('.shruti-cell-compact').forEach(c => {
                        c.classList.remove('source-highlight', 'ma-highlight', 'pa-highlight');
                    });
                    
                    // Highlight source
                    this.classList.add('source-highlight');
                    
                    // Highlight Ma and Pa partners in the same octave
                    document.querySelectorAll(`.shruti-cell-compact[data-octave="${octave}"][data-index="${maPartner}"]`).forEach(c => {
                        c.classList.add('ma-highlight');
                    });
                    
                    document.querySelectorAll(`.shruti-cell-compact[data-octave="${octave}"][data-index="${paPartner}"]`).forEach(c => {
                        c.classList.add('pa-highlight');
                    });
                });
                
                cell.addEventListener('mouseleave', function() {
                    // Remove highlights when mouse leaves
                    document.querySelectorAll('.shruti-cell-compact').forEach(c => {
                        c.classList.remove('source-highlight', 'ma-highlight', 'pa-highlight');
                    });
                });
            });
        }
        
        // Add Swara Derivation Section
        function renderSwaraDerivation(raagName) {
            const derivationContainer = document.getElementById('swara-derivation-section');
            if (!derivationContainer) return;
            
            // Define swara derivation data for specific raags
            const swaraDerivations = {
                'यमन': {
                    raagName: 'Yaman (यमन)',
                    targetSwara: 'Ga',
                    neighbors: { left: 'Re', right: 'Ma#' },
                    ratios: { re: 9/8, ma: 45/32 },
                    correctGa: 5/4,
                    reFreq: 9/8,
                    maFreq: 45/32,
                    span: '5/4',
                    spanCalculation: '(45/32) ÷ (9/8) = (45/32) × (8/9) = 5/4',
                    factorization: '5/4 = (10/9) × (9/8)',
                    gaRatio: '5/4',
                    gaCalculation: 'Ga = Re × (10/9) = (9/8) × (10/9) = 5/4',
                    explanation: 'In Yaman, the Teevra Madhyam (Ma#) raises the span between Re and Ma. This forces Ga to sit at 5/4, the just major third. This is the only position that creates balanced intervals on both sides and maintains consonance with Pa.'
                },
                'तोड़ी': {
                    raagName: 'Todi (तोड़ी)',
                    targetSwara: 'Ga',
                    neighbors: { left: 'Re (komal)', right: 'Ma#' },
                    ratios: { re: 16/15, ma: 45/32 },
                    correctGa: 6/5,
                    reFreq: 16/15,
                    maFreq: 45/32,
                    span: '3/2',
                    spanCalculation: '(45/32) ÷ (16/15) ≈ 3/2',
                    factorization: '3/2 = (6/5) × (5/4)',
                    gaRatio: '6/5',
                    gaCalculation: 'Ga = Re × (6/5) ≈ 6/5',
                    explanation: 'In Todi, the komal Re drops the lower bound while Ma# raises the upper bound, creating a massive span. Ga must sit at 6/5 (komal Gandhar) to maintain balance. This lower position creates the characteristic emotional intensity and spiritual longing of Todi.'
                },
                'काफी': {
                    raagName: 'Kafi (काफी)',
                    targetSwara: 'Ga',
                    neighbors: { left: 'Re', right: 'Ma' },
                    ratios: { re: 9/8, ma: 4/3 },
                    correctGa: 6/5,
                    reFreq: 9/8,
                    maFreq: 4/3,
                    span: '32/27',
                    spanCalculation: '(4/3) ÷ (9/8) = 32/27',
                    factorization: '32/27 = (6/5) × (10/9)',
                    gaRatio: '6/5',
                    gaCalculation: 'Ga = 6/5 for folk character',
                    explanation: 'Kafi uses komal Gandhar (6/5) instead of shuddha Gandhar to create its characteristic folk-like, earthy quality. The lower Ga creates a softer melancholy compared to the bright major scale of Bilawal.'
                }
            };
            
            const derivation = swaraDerivations[raagName];
            if (!derivation) {
                derivationContainer.innerHTML = '<div class="derivation-placeholder"><p>Select a raag from the dropdown above to see the interactive mathematical derivation of its swara positions.</p></div>';
                return;
            }
            
            // Audio context for playing
            let gaOscillator = null;
            let saOscillator = null;
            let reOscillator = null;
            let maOscillator = null;
            let paOscillator = null;
            let gaAudioContext = null;
            let isPlaying = false;
            const baseSa = 240; // Hz
            
            function initGaAudio() {
                if (!gaAudioContext) {
                    gaAudioContext = new (window.AudioContext || window.webkitAudioContext)();
                }
            }
            
            function createOscillator(frequency) {
                const oscillator = gaAudioContext.createOscillator();
                const gainNode = gaAudioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(gaAudioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                const now = gaAudioContext.currentTime;
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05);
                
                oscillator.start(now);
                
                return { oscillator, gainNode };
            }
            
            function stopOscillator(osc) {
                if (osc) {
                    osc.gainNode.gain.linearRampToValueAtTime(0, gaAudioContext.currentTime + 0.1);
                    osc.oscillator.stop(gaAudioContext.currentTime + 0.1);
                }
            }
            
            function playGa(gaRatio) {
                initGaAudio();
                
                // Stop previous oscillators
                stopOscillator(gaOscillator);
                stopOscillator(saOscillator);
                stopOscillator(reOscillator);
                stopOscillator(maOscillator);
                stopOscillator(paOscillator);
                
                // Play Ga
                gaOscillator = createOscillator(baseSa * gaRatio);
                
                // Play Sa if checkbox is checked
                const saCheckbox = document.getElementById('play-sa-checkbox');
                if (saCheckbox && saCheckbox.checked) {
                    saOscillator = createOscillator(baseSa * 1.0);
                }
                
                // Play Re if checkbox is checked
                const reCheckbox = document.getElementById('play-re-checkbox');
                if (reCheckbox && reCheckbox.checked) {
                    reOscillator = createOscillator(baseSa * derivation.ratios.re);
                }
                
                // Play Ma if checkbox is checked
                const maCheckbox = document.getElementById('play-ma-checkbox');
                if (maCheckbox && maCheckbox.checked) {
                    maOscillator = createOscillator(baseSa * derivation.ratios.ma);
                }
                
                // Play Pa if checkbox is checked
                const paCheckbox = document.getElementById('play-pa-checkbox');
                if (paCheckbox && paCheckbox.checked) {
                    paOscillator = createOscillator(baseSa * 1.5); // Pa is always 3/2
                }
                
                isPlaying = true;
            }
            
            function stopGa() {
                stopOscillator(gaOscillator);
                stopOscillator(saOscillator);
                stopOscillator(reOscillator);
                stopOscillator(maOscillator);
                stopOscillator(paOscillator);
                
                gaOscillator = null;
                saOscillator = null;
                reOscillator = null;
                maOscillator = null;
                paOscillator = null;
                isPlaying = false;
            }
            
            function togglePlayGa(gaRatio) {
                if (isPlaying) {
                    stopGa();
                    return false; // Stopped
                } else {
                    playGa(gaRatio);
                    return true; // Playing
                }
            }
            
            let html = `
                <div class="swara-derivation-card">
                    <h2>🎵 Interactive Swara Explorer: ${derivation.targetSwara} in ${derivation.raagName}</h2>
                    <p class="derivation-intro">Slide ${derivation.targetSwara} to hear different positions, then find the mathematically correct placement</p>
                    
                    <div class="interactive-ga-section">
                        <div class="scale-visualization">
                            <div class="scale-line">
                                <div class="scale-marker neighbor-marker" style="left: 0%">
                                    <div class="marker-label">${derivation.neighbors.left}</div>
                                    <div class="marker-freq">${derivation.ratios.re.toFixed(4)}</div>
                                </div>
                                <div class="scale-marker ga-marker" id="ga-position-marker" style="left: 50%">
                                    <div class="marker-label">${derivation.targetSwara}</div>
                                    <div class="marker-freq" id="ga-freq-display">1.2000</div>
                                </div>
                                <div class="scale-marker neighbor-marker" style="left: 100%">
                                    <div class="marker-label">${derivation.neighbors.right}</div>
                                    <div class="marker-freq">${derivation.ratios.ma.toFixed(4)}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="ga-slider-control">
                            <label>Slide ${derivation.targetSwara} position:</label>
                            <input type="range" id="ga-position-slider" 
                                   min="${derivation.ratios.re}" 
                                   max="${derivation.ratios.ma}" 
                                   step="0.001" 
                                   value="${(derivation.ratios.re + derivation.ratios.ma) / 2}">
                            
                            <div class="play-with-options">
                                <h4>Play together with:</h4>
                                <div class="note-checkboxes">
                                    <label class="note-checkbox">
                                        <input type="checkbox" id="play-sa-checkbox">
                                        <span>Sa (Tonic)</span>
                                    </label>
                                    <label class="note-checkbox">
                                        <input type="checkbox" id="play-re-checkbox">
                                        <span>${derivation.neighbors.left}</span>
                                    </label>
                                    <label class="note-checkbox">
                                        <input type="checkbox" id="play-ma-checkbox">
                                        <span>${derivation.neighbors.right}</span>
                                    </label>
                                    <label class="note-checkbox">
                                        <input type="checkbox" id="play-pa-checkbox">
                                        <span>Pa (Fifth)</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="slider-actions">
                                <button id="play-ga-btn" class="action-btn">🔊 Play ${derivation.targetSwara}</button>
                                <button id="snap-correct-btn" class="action-btn primary">✨ Snap to Correct Position</button>
                            </div>
                        </div>
                        
                        <div class="interval-analysis">
                            <div class="interval-box">
                                <h4>${derivation.neighbors.left} → ${derivation.targetSwara}</h4>
                                <div class="interval-value" id="re-ga-interval">-</div>
                                <div class="interval-status" id="re-ga-status"></div>
                            </div>
                            <div class="interval-box">
                                <h4>${derivation.targetSwara} → ${derivation.neighbors.right}</h4>
                                <div class="interval-value" id="ga-ma-interval">-</div>
                                <div class="interval-status" id="ga-ma-status"></div>
                            </div>
                            <div class="interval-box">
                                <h4>Clustering Check</h4>
                                <div class="interval-value" id="clustering-check">-</div>
                                <div class="interval-status" id="clustering-status"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="derivation-explanation">
                        <h4>💡 The Mathematical Solution</h4>
                        <div class="solution-steps">
                            <div class="solution-step">
                                <strong>1. Span:</strong> ${derivation.spanCalculation} = ${derivation.span}
                            </div>
                            <div class="solution-step">
                                <strong>2. Factorization:</strong> ${derivation.factorization}
                            </div>
                            <div class="solution-step">
                                <strong>3. Result:</strong> ${derivation.gaCalculation}
                            </div>
                            <div class="solution-step correct-answer">
                                <strong>✓ Correct ${derivation.targetSwara}:</strong> ${derivation.gaRatio} = ${derivation.correctGa.toFixed(4)}
                            </div>
                        </div>
                        <p>${derivation.explanation}</p>
                    </div>
                </div>
            `;
            
            derivationContainer.innerHTML = html;
            
            // Add interactivity
            const slider = document.getElementById('ga-position-slider');
            const gaMarker = document.getElementById('ga-position-marker');
            const gaFreqDisplay = document.getElementById('ga-freq-display');
            const playBtn = document.getElementById('play-ga-btn');
            const snapBtn = document.getElementById('snap-correct-btn');
            
            const reGaInterval = document.getElementById('re-ga-interval');
            const reGaStatus = document.getElementById('re-ga-status');
            const gaMaInterval = document.getElementById('ga-ma-interval');
            const gaMaStatus = document.getElementById('ga-ma-status');
            const clusteringCheck = document.getElementById('clustering-check');
            const clusteringStatus = document.getElementById('clustering-status');
            
            function updateGaPosition(gaValue) {
                const gaRatio = parseFloat(gaValue);
                
                // Update marker position (percentage between Re and Ma)
                const percentage = ((gaRatio - derivation.ratios.re) / (derivation.ratios.ma - derivation.ratios.re)) * 100;
                gaMarker.style.left = percentage + '%';
                gaFreqDisplay.textContent = gaRatio.toFixed(4);
                
                // Calculate intervals
                const reToGa = gaRatio / derivation.ratios.re;
                const gaToMa = derivation.ratios.ma / gaRatio;
                
                reGaInterval.textContent = reToGa.toFixed(4);
                gaMaInterval.textContent = gaToMa.toFixed(4);
                
                // Check if close to correct position
                const isCorrect = Math.abs(gaRatio - derivation.correctGa) < 0.005;
                
                if (isCorrect) {
                    reGaStatus.textContent = '✓ Perfect!';
                    reGaStatus.className = 'interval-status correct';
                    gaMaStatus.textContent = '✓ Balanced!';
                    gaMaStatus.className = 'interval-status correct';
                    gaMarker.classList.add('correct-position');
                } else {
                    reGaStatus.textContent = '';
                    reGaStatus.className = 'interval-status';
                    gaMaStatus.textContent = '';
                    gaMaStatus.className = 'interval-status';
                    gaMarker.classList.remove('correct-position');
                }
                
                // Clustering check (should be > 16/15 ≈ 1.0667)
                const minInterval = Math.min(reToGa, gaToMa);
                clusteringCheck.textContent = minInterval.toFixed(4);
                if (minInterval > 1.0667) {
                    clusteringStatus.textContent = '✓ No clustering';
                    clusteringStatus.className = 'interval-status correct';
                } else {
                    clusteringStatus.textContent = '⚠ Too close!';
                    clusteringStatus.className = 'interval-status warning';
                }
            }
            
            playBtn.addEventListener('click', function() {
                const gaRatio = parseFloat(slider.value);
                const nowPlaying = togglePlayGa(gaRatio);
                
                if (nowPlaying) {
                    playBtn.textContent = '⏸ Stop Ga';
                    playBtn.classList.add('playing');
                } else {
                    playBtn.textContent = '🔊 Play Ga';
                    playBtn.classList.remove('playing');
                }
            });
            
            // Update frequency when slider moves while playing
            slider.addEventListener('input', function() {
                updateGaPosition(this.value);
                
                // If currently playing, update the frequency in real-time
                if (isPlaying) {
                    const gaRatio = parseFloat(this.value);
                    playGa(gaRatio); // Restart with new frequency
                }
            });
            
            // Add checkbox listeners to update sound when toggled
            const checkboxes = ['play-sa-checkbox', 'play-re-checkbox', 'play-ma-checkbox', 'play-pa-checkbox'];
            checkboxes.forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.addEventListener('change', function() {
                        // If currently playing, restart to include/exclude the note
                        if (isPlaying) {
                            const gaRatio = parseFloat(slider.value);
                            playGa(gaRatio);
                        }
                    });
                }
            });
            
            snapBtn.addEventListener('click', function() {
                slider.value = derivation.correctGa;
                updateGaPosition(derivation.correctGa);
                
                // If playing, update to correct frequency
                if (isPlaying) {
                    playGa(derivation.correctGa);
                }
                
                // Visual feedback
                snapBtn.textContent = '✓ Correct Position!';
                setTimeout(() => {
                    snapBtn.textContent = '✨ Snap to Correct Position';
                }, 2000);
            });
            
            // Initialize
            updateGaPosition(slider.value);
        }
        
        // Update raag selector to trigger derivation rendering
        render();
        
        // Add mode button handlers
        const presetModeBtn = document.getElementById('preset-mode-btn');
        const customModeBtn = document.getElementById('custom-mode-btn');
        const presetControls = document.getElementById('preset-controls');
        const customControls = document.getElementById('custom-controls');
        
        if (presetModeBtn && customModeBtn && presetControls && customControls) {
            presetModeBtn.addEventListener('click', function() {
                presetModeBtn.classList.add('active');
                customModeBtn.classList.remove('active');
                presetControls.classList.remove('hidden');
                customControls.classList.add('hidden');
            });
            
            customModeBtn.addEventListener('click', function() {
                customModeBtn.classList.add('active');
                presetModeBtn.classList.remove('active');
                customControls.classList.remove('hidden');
                presetControls.classList.add('hidden');
            });
        }
        
        // After render completes, set up the derivation section
        // Use a longer timeout to ensure render() has completed
        setTimeout(() => {
            const raagSelector = document.getElementById('raag-selector');
            const visualizerContent = document.getElementById('shruti-visualizer-content');
            
            if (raagSelector && visualizerContent) {
                // Populate raag selector with available raags
                const availableRaags = ['यमन', 'तोड़ी', 'काफी'];
                
                // Clear existing options except the first one
                while (raagSelector.options.length > 1) {
                    raagSelector.remove(1);
                }
                
                // Add raag options
                availableRaags.forEach(raag => {
                    const option = document.createElement('option');
                    option.value = raag;
                    option.textContent = raag;
                    raagSelector.appendChild(option);
                });
                
                console.log('Raag options added:', raagSelector.options.length);
                
                // Add derivation container if it doesn't exist
                let derivationSection = document.getElementById('swara-derivation-section');
                if (!derivationSection) {
                    derivationSection = document.createElement('div');
                    derivationSection.id = 'swara-derivation-section';
                    derivationSection.className = 'swara-derivation-section';
                    visualizerContent.appendChild(derivationSection);
                }
                
                // Initialize with placeholder
                renderSwaraDerivation(null);
                
                // Add change event listener
                raagSelector.addEventListener('change', function() {
                    const selectedRaag = this.value;
                    renderSwaraDerivation(selectedRaag || null);
                });
            } else {
                console.error('Elements not found:', { raagSelector, visualizerContent });
            }
        }, 500);
    }

    function renderDNAGrid() {
        const container = document.getElementById('dna-grid-content');
        
        // Three rows representing the 22 Shruti DNA as shown in the presentation
        const dnaRows = [
            {
                name: 'Row 1 (Tara - Upper)',
                color: '#FFD700',
                shrutis: 'P¹→R1→D1→G1→N1→M1→r1→d1→g1→n1'
            },
            {
                name: 'Row 2 (Ati-Tara - Highest)',
                color: '#FFA500',
                shrutis: '1→d1→g1→n1→m1→ S →P→R2→D2→G2→N2→M2'
            },
            {
                name: 'Row 3 (Ati-Komal - Lowest)',
                color: '#FF8C00',
                shrutis: '2→G2→N2→M2→r2→d2→ g2 →n2→m2→Ṡ2'
            }
        ];
        
        let html = `
            <div class="dna-intro-card">
                <h2>22 Shruti DNA</h2>
                <p>The 22 shrutis are organized in three fundamental rows (Bheemapalas), each representing different harmonic relationships. Ragas are formed by "cutting" specific sequences from this DNA structure.</p>
                <div class="dna-key-concepts">
                    <div class="concept-box">
                        <h4>Tara (Upper Row)</h4>
                        <p>Contains the primary shuddha (natural) notes with just intonation ratios</p>
                    </div>
                    <div class="concept-box">
                        <h4>Ati-Tara (Highest Row)</h4>
                        <p>Contains teevra (sharp) variants and connects through Shadja (Sa)</p>
                    </div>
                    <div class="concept-box">
                        <h4>Ati-Komal (Lowest Row)</h4>
                        <p>Contains komal (flat) variants creating depth and emotion</p>
                    </div>
                </div>
            </div>
        `;
        
        // Render the three DNA rows
        html += `<div class="dna-grid-presentation">`;
        
        dnaRows.forEach((row, index) => {
            html += `
                <div class="dna-row-container" style="animation-delay: ${index * 0.15}s">
                    <div class="dna-row-header" style="border-left-color: ${row.color}">
                        <h3 style="color: ${row.color}">${row.name}</h3>
                    </div>
                    <div class="dna-row-display" style="border-color: ${row.color}">
                        <div class="dna-sequence">${row.shrutis}</div>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        
        // Add detailed explanation section
        html += `
            <div class="dna-explanation-section">
                <h3>Understanding the DNA Structure</h3>
                <div class="explanation-grid">
                    <div class="explanation-card">
                        <h4>🧬 What is Shruti DNA?</h4>
                        <p>Dr. Vidyadhar Oke's research reveals that all 22 shrutis are interconnected through specific mathematical relationships. These three rows (called Bheemapalas) represent the complete harmonic framework from which every raga is derived.</p>
                    </div>
                    <div class="explanation-card">
                        <h4>✂️ How Ragas are "Cut"</h4>
                        <p>Each raga selects specific shrutis from these rows. For example, Darabari uses a sequence from the middle section, while Bairagi uses a different "cut" from the same DNA. The arrows (→) show the natural progression between consonant shrutis.</p>
                    </div>
                    <div class="explanation-card">
                        <h4>🎵 Harmonic Relationships</h4>
                        <p>The positioning in these rows is not arbitrary - it follows the natural harmonic series and the relationships of Ma (perfect fourth) and Pa (perfect fifth). Moving horizontally maintains consonance, while jumping between rows creates tension.</p>
                    </div>
                    <div class="explanation-card">
                        <h4>📊 S-G, S-P Relationships</h4>
                        <p>The 22 shrutis are related by two fundamental intervals: the Shadja-Gandhar (major third) and Shadja-Pancham (perfect fifth) relationships. These create the three distinct rows with their characteristic sounds.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add example ragas section
        html += `
            <div class="dna-examples-section">
                <h3>Example: How Ragas are Cut from DNA</h3>
                <div class="dna-examples-grid">
                    <div class="dna-example-card">
                        <h4>🎼 Darabari</h4>
                        <div class="path-display">P¹→R1→D1→G1→N1→M1→r1→d1→g1→n1</div>
                        <p class="path-description">Cut from Row 1 (Tara). This sequence creates the deep, meditative character of Darbari Kanada, one of the most profound midnight ragas.</p>
                    </div>
                    <div class="dna-example-card">
                        <h4>🎼 Bairagi</h4>
                        <div class="path-display">n1→m1→ S →P→R2→D2</div>
                        <p class="path-description">Cut from Row 2 (Ati-Tara). This creates the devotional, renunciate character of Bairagi, perfect for morning meditation.</p>
                    </div>
                    <div class="dna-example-card">
                        <h4>🎼 Bhupali</h4>
                        <div class="path-display">S → R1 → G1 → P → D1</div>
                        <p class="path-description">A pentatonic cut using only shuddha notes from Row 1. Creates the serene, evening atmosphere of Bhupali.</p>
                    </div>
                    <div class="dna-example-card">
                        <h4>🎼 Malkauns</h4>
                        <div class="path-display">S → g1 → m1 → d1 → n1</div>
                        <p class="path-description">Uses komal (flat) notes from the lower sections. Creates the dark, mysterious midnight mood of Malkauns.</p>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }

    function renderShrutiExplanations() {
        const container = document.getElementById('shruti-explanation-content');
        
        // Comprehensive shruti selection explanations based on the document
        const explanations = [
            {
                category: "Understanding Shruti Selection",
                intro: "The selection of specific shrutis in a raag is not arbitrary—it is dictated by the natural laws of harmony, psychoacoustic perception, and the emotional character (rasa) the raag aims to evoke. Each raag has a unique 'DNA' formed by its specific shruti positions.",
                items: []
            },
            {
                category: "Komal Gandhar (g1 vs g2)",
                intro: "There are two variants of Komal Gandhar, each creating distinct emotional effects:",
                items: [
                    {
                        shruti: "g1 (Ati Komal Gandhar)",
                        ratio: "32/27",
                        cents: "-6 cents",
                        usage: "Used in raags like Todi, Multani, Gujari Todi, Darbari Kanhra",
                        reason: "This extremely flat Gandhar creates intense yearning and devotion. In Darbari, the g1 is rendered with heavy oscillation (andolan) so low that it 'leans' toward Rishabh, creating the raag's characteristic gravity and depth. In Todi, it combines with Teevra Madhyam (M1) to produce a sense of spiritual longing."
                    },
                    {
                        shruti: "g2 (Komal Gandhar)",
                        ratio: "6/5",
                        cents: "+15 cents",
                        usage: "Used in raags like Kafi, Bhimpalasi, Bageshri, Asavari, Jaunpuri",
                        reason: "This is the standard minor third, creating a softer, more folk-like melancholy. It's less intense than g1 and is used in raags with a more accessible, earthy character. The higher position makes it more consonant with the tonic."
                    }
                ]
            },
            {
                category: "Komal Rishabh (r1 vs r2)",
                intro: "The two Komal Rishabh variants define morning raags and devotional moods:",
                items: [
                    {
                        shruti: "r1 (Ati Komal Rishabh)",
                        ratio: "256/243",
                        cents: "-10 cents",
                        usage: "Used in raags like Bhairavi, Poorvi, Shri, Marwa, Todi, Lalit",
                        reason: "This is the lowest possible Rishabh, so flat it's almost indistinguishable from Sa to untrained ears. It creates an ascetic, mystical, and deeply devotional character. In Bhairav-family raags, it establishes the sacred morning atmosphere. In Marwa and Poorvi, it combines with sharp notes to create dramatic tension."
                    },
                    {
                        shruti: "r2 (Komal Rishabh)",
                        ratio: "16/15",
                        cents: "+11 cents",
                        usage: "Used in raags like Bhairav, Ahir Bhairav, Gauri",
                        reason: "Slightly higher than r1, this creates a less extreme but still devotional mood. In Bhairav, it pairs with Shuddha Gandhar (G1) to create the characteristic morning raga sound—serious but not as austere as r1-based raags."
                    }
                ]
            },
            {
                category: "Shuddha Rishabh (R1 vs R2)",
                intro: "Even natural notes have microtonal variants that affect raag identity:",
                items: [
                    {
                        shruti: "R1 (Shuddha Rishabh)",
                        ratio: "10/9",
                        cents: "-18 cents",
                        usage: "Used in raags like Bhupali, Bageshri, Bhimpalasi, Darbari",
                        reason: "This is the 'just' major second, derived from the natural harmonic series. It's slightly flatter than the equal-tempered Re, creating a more consonant, pure sound. Used in pentatonic raags like Bhupali for its harmonic purity."
                    },
                    {
                        shruti: "R2 (Teevra Shuddha Rishabh)",
                        ratio: "9/8",
                        cents: "+4 cents",
                        usage: "Used in most Bilawal, Kalyan, Khamaj, and Kafi raags",
                        reason: "This is the Pythagorean major second, slightly sharper and more 'bright' than R1. It's the standard Re in most raags and creates a more energetic, forward-moving character. The higher position makes melodic phrases more dynamic."
                    }
                ]
            },
            {
                category: "Shuddha Gandhar (G1 vs G2)",
                intro: "The major third variants create subtle but important tonal differences:",
                items: [
                    {
                        shruti: "G1 (Shuddha Gandhar)",
                        ratio: "5/4",
                        cents: "-14 cents",
                        usage: "Used in most raags: Yaman, Bilawal, Bhairav, Poorvi, Khamaj",
                        reason: "This is the 'just' major third, perfectly consonant with Sa. It's the standard Ga in Hindustani music, creating a luminous, open quality. In Yaman, it sits at a higher microtonal position than in Bilawal, making Yaman feel more 'elevated' and evening-appropriate."
                    },
                    {
                        shruti: "G2 (Teevra Shuddha Gandhar)",
                        ratio: "81/64",
                        cents: "+8 cents",
                        usage: "Used in raags like Marwa",
                        reason: "This Pythagorean major third is sharper and more tense. In Marwa, it combines with r1 and M1 to create one of the most dramatic and tension-filled raags in the system. The extreme sharpness creates an almost 'royal' or 'regal' character."
                    }
                ]
            },
            {
                category: "Madhyam (m1, m2, M1, M2)",
                intro: "The fourth has four distinct positions, more than any other swara:",
                items: [
                    {
                        shruti: "m1 (Shuddha Madhyam)",
                        ratio: "4/3",
                        cents: "-2 cents",
                        usage: "Used in Bilawal, Kafi, Khamaj, Asavari, Bhairav, Bhairavi thaats",
                        reason: "This is the perfect fourth, the most consonant Ma. It's stable and grounding, used in raags that don't require the tension of Teevra Madhyam. It's the 'natural' Ma that completes the lower tetrachord."
                    },
                    {
                        shruti: "m2 (Ek Shruti Madhyam)",
                        ratio: "27/20",
                        cents: "+19 cents",
                        usage: "Rarely used as a distinct position; transitional",
                        reason: "This intermediate position is used in gamakas (ornamentations) and meends (glides) between m1 and M1. It's not typically a 'landing' note but part of the microtonal journey."
                    },
                    {
                        shruti: "M1 (Teevra Madhyam)",
                        ratio: "45/32",
                        cents: "-10 cents",
                        usage: "Used in Kalyan, Todi, Poorvi, Marwa thaats",
                        reason: "This sharp fourth creates tension and forward motion. In Yaman/Kalyan, it's the defining note that creates the evening raga's characteristic 'longing' quality. In Todi and Poorvi, it combines with flat notes to create intense emotional complexity."
                    },
                    {
                        shruti: "M2 (Teevratama Madhyam)",
                        ratio: "64/45",
                        cents: "+12 cents",
                        usage: "Extremely rare; used in specific ornamentations",
                        reason: "This is the sharpest Ma, almost touching Pa. It's used in very specific contexts for dramatic effect, creating maximum tension before resolving to Pa."
                    }
                ]
            },
            {
                category: "Komal Dhaivat (d1 vs d2)",
                intro: "The flat sixth variants create different shades of melancholy:",
                items: [
                    {
                        shruti: "d1 (Ati Komal Dhaivat)",
                        ratio: "128/81",
                        cents: "-8 cents",
                        usage: "Used in raags like Asavari, Darbari, Jaunpuri, Poorvi, Todi",
                        reason: "This extremely flat Dha creates deep melancholy and introspection. In Darbari, it's rendered with slow oscillation, adding to the raag's midnight gravitas. In Poorvi and Todi, it contrasts with sharp notes to create dramatic tension."
                    },
                    {
                        shruti: "d2 (Komal Dhaivat)",
                        ratio: "8/5",
                        cents: "+13 cents",
                        usage: "Used in raags like Bhairav, Chandrakauns",
                        reason: "Slightly higher than d1, this creates a less intense but still somber mood. In Bhairav, it pairs with r2 to create the morning raga's devotional character. It's more 'accessible' than d1."
                    }
                ]
            },
            {
                category: "Shuddha Dhaivat (D1 vs D2)",
                intro: "Natural sixth variants affect brightness and time of day:",
                items: [
                    {
                        shruti: "D1 (Shuddha Dhaivat)",
                        ratio: "5/3",
                        cents: "-16 cents",
                        usage: "Used in raags like Durga, Bhupali, Bageshri, Ahir Bhairav",
                        reason: "This is the 'just' major sixth, perfectly consonant. It's used in pentatonic raags and creates a pure, open sound. In Bhupali, it contributes to the raag's serene, evening character."
                    },
                    {
                        shruti: "D2 (Teevra Shuddha Dhaivat)",
                        ratio: "27/16",
                        cents: "+6 cents",
                        usage: "Used in most Bilawal, Kalyan, Khamaj raags",
                        reason: "Slightly sharper, this creates a brighter, more energetic character. It's the standard Dha in most raags and makes melodic phrases more dynamic and forward-moving."
                    }
                ]
            },
            {
                category: "Komal Nishad (n1 vs n2)",
                intro: "Flat seventh variants define lighter classical and folk-based raags:",
                items: [
                    {
                        shruti: "n1 (Ati Komal Nishad)",
                        ratio: "16/9",
                        cents: "-4 cents",
                        usage: "Used in raags like Khamaj, Desh, Kafi, Bhimpalasi, Asavari",
                        reason: "This is the standard flat seventh in Hindustani music, creating the characteristic 'minor' sound. In Khamaj, it alternates with N1 to create the raag's playful, semi-classical character. In Kafi and Bhimpalasi, it establishes the folk-based, earthy mood."
                    },
                    {
                        shruti: "n2 (Komal Nishad)",
                        ratio: "9/5",
                        cents: "+17 cents",
                        usage: "Used in specific raags like Chandrakauns, Saraswati",
                        reason: "Slightly sharper than n1, this creates a different emotional color—less melancholic, more mysterious. In Chandrakauns, it combines with other notes to create an enigmatic, night-time atmosphere."
                    }
                ]
            },
            {
                category: "Shuddha Nishad (N1 vs N2)",
                intro: "Natural seventh variants complete the octave with different tensions:",
                items: [
                    {
                        shruti: "N1 (Shuddha Nishad)",
                        ratio: "15/8",
                        cents: "-12 cents",
                        usage: "Used in most raags: Yaman, Bilawal, Bhairav, Poorvi, Todi",
                        reason: "This is the 'just' major seventh, creating strong pull toward the upper Sa. It's the standard Ni in most raags, providing a sense of completion and resolution. The slightly flat position makes it more consonant than N2."
                    },
                    {
                        shruti: "N2 (Teevra Shuddha Nishad)",
                        ratio: "243/128",
                        cents: "+10 cents",
                        usage: "Used in raags like Chandrakauns, Marwa (in specific contexts)",
                        reason: "This Pythagorean major seventh is extremely sharp, creating maximum tension before resolving to Sa. It's used sparingly for dramatic effect, making the resolution to Sa even more satisfying."
                    }
                ]
            },
            {
                category: "The DNA Concept",
                intro: "Dr. Vidyadhar Oke's research reveals that raags are 'cut' from a universal harmonic grid, like DNA sequences:",
                items: [
                    {
                        shruti: "Universal Harmonic Grid",
                        ratio: "Multiple ratios",
                        cents: "Variable",
                        usage: "All raags",
                        reason: "The 22-shruti system forms a 'periodic table' of musical elements. Each raag selects specific shrutis from this grid, creating its unique 'DNA path.' This explains why raags with the same note names (like Bhupali and Deshkar) sound different—they use different shruti positions and follow different harmonic paths through the grid."
                    }
                ]
            },
            {
                category: "Leaning Notes Phenomenon",
                intro: "Certain notes 'lean' toward their neighbors to create specific effects:",
                items: [
                    {
                        shruti: "Leaning Madhyam in Bhairav",
                        ratio: "Variable",
                        cents: "Between m1 and M1",
                        usage: "Bhairav, Ramkali",
                        reason: "The Shuddha Madhyam in Bhairav often leans slightly higher toward Teevra Madhyam without crossing over, adding tension and mystical aura. This microtonal 'lean' is what makes Bhairav distinct from other raags with the same notes."
                    },
                    {
                        shruti: "Leaning Gandhar in Darbari",
                        ratio: "Variable",
                        cents: "Around g1, leaning toward r2",
                        usage: "Darbari Kanhra",
                        reason: "The Ati Komal Gandhar in Darbari is so low and heavily oscillated that it 'leans' toward Rishabh, creating the raag's signature gravity. This is the most microtonally complex note in Hindustani music."
                    }
                ]
            },
            {
                category: "Practical Application",
                intro: "How to use this knowledge:",
                items: [
                    {
                        shruti: "22-Shruti Harmonium",
                        ratio: "All ratios",
                        cents: "All corrections",
                        usage: "Performance and practice",
                        reason: "The 22-shruti harmonium allows performers to select the exact shruti for each note using knobs. This ensures perfect consonance with the tanpura and preserves the authentic rasa of each raag. Standard 12-tone instruments are inherently 'out of tune' with natural harmonics."
                    },
                    {
                        shruti: "Vocal Training",
                        ratio: "All ratios",
                        cents: "All corrections",
                        usage: "Learning and teaching",
                        reason: "Understanding shruti positions helps vocalists intone notes correctly. The human voice can access all 22 shrutis naturally, but conscious awareness of these positions ensures authentic raag rendition. Modern apps can show real-time frequency analysis to help students match ideal shruti positions."
                    }
                ]
            }
        ];

        let html = '<div class="shruti-explanation-intro">';
        html += '<h2>Why We Select Specific Shrutis for Each Raag</h2>';
        html += '<p class="intro-text">The 22-shruti system is not just a theoretical framework—it\'s the scientific foundation of rasa (emotional essence) in Hindustani classical music. Each raag\'s unique character comes from its precise selection of microtonal positions. This guide explains why specific shrutis are chosen and how they create distinct emotional effects.</p>';
        html += '</div>';

        explanations.forEach((section, idx) => {
            html += `<div class="explanation-section" style="animation-delay: ${idx * 0.1}s">`;
            html += `<h3 class="section-title">${section.category}</h3>`;
            html += `<p class="section-intro">${section.intro}</p>`;
            
            if (section.items && section.items.length > 0) {
                html += '<div class="shruti-cards">';
                section.items.forEach((item, i) => {
                    html += `<div class="shruti-card" style="animation-delay: ${(idx * 0.1) + (i * 0.05)}s">`;
                    html += `<h4 class="shruti-name">${item.shruti}</h4>`;
                    html += `<div class="shruti-specs">`;
                    html += `<span class="spec-badge">Ratio: ${item.ratio}</span>`;
                    html += `<span class="spec-badge">Cents: ${item.cents}</span>`;
                    html += `</div>`;
                    html += `<p class="shruti-usage"><strong>Used in:</strong> ${item.usage}</p>`;
                    html += `<p class="shruti-reason">${item.reason}</p>`;
                    html += `</div>`;
                });
                html += '</div>';
            }
            
            html += '</div>';
        });

        container.innerHTML = html;
        
        // Search functionality for shruti explanations
        shrutiSearchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const sections = document.querySelectorAll('.explanation-section');
            
            if (!term) {
                sections.forEach(section => section.style.display = 'block');
                return;
            }
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                section.style.display = text.includes(term) ? 'block' : 'none';
            });
        });
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
