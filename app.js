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
        let customMode = false;
        let selectedShrutis = [];
        
        // Audio context for playing frequencies
        let audioContext = null;
        let currentOscillator = null;
        
        function initAudio() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }
        
        function playFrequency(frequency, duration = 1000) {
            initAudio();
            
            // Stop any currently playing sound
            if (currentOscillator) {
                currentOscillator.stop();
                currentOscillator = null;
            }
            
            // Create oscillator
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Set frequency
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine'; // Pure tone
            
            // Envelope for smooth attack and release
            const now = audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05); // Attack
            gainNode.gain.linearRampToValueAtTime(0.3, now + duration / 1000 - 0.1); // Sustain
            gainNode.gain.linearRampToValueAtTime(0, now + duration / 1000); // Release
            
            oscillator.start(now);
            oscillator.stop(now + duration / 1000);
            
            currentOscillator = oscillator;
        }
        
        // 22 Shruti reference data with index (1-22)
        const shrutiData = [
            { index: 1, symbol: 'S', name: 'Shadja', ratio: '1/1', cents: '0', freq: '240.00', freqRatio: 1.0 },
            { index: 2, symbol: 'r1', name: 'Ati Komal Rishabh', ratio: '256/243', cents: '-10', freq: '252.84', freqRatio: 1.053 },
            { index: 3, symbol: 'r2', name: 'Komal Rishabh', ratio: '16/15', cents: '+11', freq: '256.00', freqRatio: 1.067 },
            { index: 4, symbol: 'R1', name: 'Shuddha Rishabh', ratio: '10/9', cents: '-18', freq: '266.67', freqRatio: 1.111 },
            { index: 5, symbol: 'R2', name: 'Teevra Shuddha Rishabh', ratio: '9/8', cents: '+4', freq: '270.00', freqRatio: 1.125 },
            { index: 6, symbol: 'g1', name: 'Ati Komal Gandhar', ratio: '32/27', cents: '-6', freq: '284.44', freqRatio: 1.185 },
            { index: 7, symbol: 'g2', name: 'Komal Gandhar', ratio: '6/5', cents: '+15', freq: '288.00', freqRatio: 1.2 },
            { index: 8, symbol: 'G1', name: 'Shuddha Gandhar', ratio: '5/4', cents: '-14', freq: '300.00', freqRatio: 1.25 },
            { index: 9, symbol: 'G2', name: 'Teevra Shuddha Gandhar', ratio: '81/64', cents: '+8', freq: '303.75', freqRatio: 1.266 },
            { index: 10, symbol: 'm1', name: 'Shuddha Madhyam', ratio: '4/3', cents: '-2', freq: '320.00', freqRatio: 1.333 },
            { index: 11, symbol: 'm2', name: 'Ek Shruti Madhyam', ratio: '27/20', cents: '+19', freq: '324.00', freqRatio: 1.35 },
            { index: 12, symbol: 'M1', name: 'Teevra Madhyam', ratio: '45/32', cents: '-10', freq: '337.50', freqRatio: 1.406 },
            { index: 13, symbol: 'M2', name: 'Teevratama Madhyam', ratio: '64/45', cents: '+12', freq: '341.33', freqRatio: 1.422 },
            { index: 14, symbol: 'P', name: 'Pancham', ratio: '3/2', cents: '+2', freq: '360.00', freqRatio: 1.5 },
            { index: 15, symbol: 'd1', name: 'Ati Komal Dhaivat', ratio: '128/81', cents: '-8', freq: '379.26', freqRatio: 1.58 },
            { index: 16, symbol: 'd2', name: 'Komal Dhaivat', ratio: '8/5', cents: '+13', freq: '384.00', freqRatio: 1.6 },
            { index: 17, symbol: 'D1', name: 'Shuddha Dhaivat', ratio: '5/3', cents: '-16', freq: '400.00', freqRatio: 1.667 },
            { index: 18, symbol: 'D2', name: 'Teevra Shuddha Dhaivat', ratio: '27/16', cents: '+6', freq: '405.00', freqRatio: 1.688 },
            { index: 19, symbol: 'n1', name: 'Ati Komal Nishad', ratio: '16/9', cents: '-4', freq: '426.67', freqRatio: 1.778 },
            { index: 20, symbol: 'n2', name: 'Komal Nishad', ratio: '9/5', cents: '+17', freq: '432.00', freqRatio: 1.8 },
            { index: 21, symbol: 'N1', name: 'Shuddha Nishad', ratio: '15/8', cents: '-12', freq: '450.00', freqRatio: 1.875 },
            { index: 22, symbol: 'N2', name: 'Teevra Shuddha Nishad', ratio: '243/128', cents: '+10', freq: '455.62', freqRatio: 1.898 }
        ];

        // Calculate consonant partners using 9 or 13 rule
        function getConsonantPartners(shrutiIndex) {
            const maPartnerIndex = shrutiIndex + 9;
            const paPartnerIndex = shrutiIndex + 13;
            
            return {
                ma: maPartnerIndex <= 22 ? maPartnerIndex : maPartnerIndex - 22,
                pa: paPartnerIndex <= 22 ? paPartnerIndex : paPartnerIndex - 22
            };
        }
        
        // Comprehensive raag-to-shruti mapping with reasoning
        const raagShrutiMap = {
            'यमन': {
                thaat: 'Kalyan',
                shrutis: ['S', 'R2', 'G1', 'M1', 'P', 'D2', 'N1'],
                reasoning: {
                    'R2': 'Teevra Shuddha Rishabh (9/8) is used for its bright, energetic character that defines evening raags. The slightly sharp position creates forward momentum.',
                    'G1': 'Shuddha Gandhar (5/4) - the just major third - creates a luminous, open quality. In Yaman, it sits at a higher microtonal position than in Bilawal, making it feel more elevated and evening-appropriate.',
                    'M1': 'Teevra Madhyam (45/32) is THE defining note of Yaman. This sharp fourth creates the characteristic longing and tension that makes Yaman the quintessential evening raga. Without M1, it would lose its identity.',
                    'D2': 'Teevra Shuddha Dhaivat (27/16) is slightly sharper than D1, creating brightness and energy. It makes melodic phrases more dynamic and complements the M1 perfectly.',
                    'N1': 'Shuddha Nishad (15/8) - the just major seventh - creates strong pull toward the upper Sa, providing a sense of completion and resolution.'
                }
            },
            'भैरव': {
                thaat: 'Bhairav',
                shrutis: ['S', 'r2', 'G1', 'm1', 'P', 'd2', 'N1'],
                reasoning: {
                    'r2': 'Komal Rishabh (16/15) creates the devotional morning character. Slightly higher than r1, it\'s less extreme but still establishes the sacred atmosphere of Bhairav.',
                    'G1': 'Shuddha Gandhar (5/4) paired with r2 creates the distinctive Bhairav sound - the contrast between flat Re and natural Ga is what makes this raag recognizable.',
                    'm1': 'Shuddha Madhyam (4/3) often "leans" slightly toward M1 without crossing over, adding mystical tension. This microtonal lean is unique to Bhairav.',
                    'd2': 'Komal Dhaivat (8/5) pairs with r2 to create symmetry in the octave. It\'s more accessible than d1 while maintaining the devotional mood.',
                    'N1': 'Shuddha Nishad (15/8) provides the resolution and completes the sacred morning atmosphere.'
                }
            },
            'दरबारी': {
                thaat: 'Asavari',
                shrutis: ['S', 'R1', 'g1', 'm1', 'P', 'd1', 'n1'],
                reasoning: {
                    'R1': 'Shuddha Rishabh (10/9) - the just major second - is used instead of R2 for its more consonant, pure sound that grounds the raag.',
                    'g1': 'Ati Komal Gandhar (32/27) is THE signature of Darbari. Rendered with heavy, slow oscillation (andolan), it\'s so low it "leans" toward Rishabh. This is the most microtonally complex note in Hindustani music, creating Darbari\'s midnight gravitas.',
                    'm1': 'Shuddha Madhyam (4/3) provides stability and grounding in this deeply introspective raag.',
                    'd1': 'Ati Komal Dhaivat (128/81) - extremely flat - creates deep melancholy. Rendered with slow oscillation like g1, it adds to the raag\'s profound depth.',
                    'n1': 'Ati Komal Nishad (16/9) completes the somber, introspective character of this midnight raag.'
                }
            },
            'तोड़ी': {
                thaat: 'Todi',
                shrutis: ['S', 'r1', 'g1', 'M1', 'P', 'd1', 'N1'],
                reasoning: {
                    'r1': 'Ati Komal Rishabh (256/243) - the lowest possible Re - creates an ascetic, deeply devotional character. So flat it\'s almost indistinguishable from Sa.',
                    'g1': 'Ati Komal Gandhar (32/27) combined with r1 creates intense yearning. The extreme flatness of both notes establishes Todi\'s spiritual intensity.',
                    'M1': 'Teevra Madhyam (45/32) is the pivotal note in Todi. The combination of flat r1, g1 with sharp M1 creates maximum tension and devotion - this contrast is what makes Todi so powerful.',
                    'd1': 'Ati Komal Dhaivat (128/81) continues the pattern of extreme flatness, adding to the raag\'s yearning quality.',
                    'N1': 'Shuddha Nishad (15/8) provides the only "natural" note besides Sa and Pa, creating a point of resolution amidst the tension.'
                }
            },
            'मालकौश': {
                thaat: 'Bhairavi',
                shrutis: ['S', 'g1', 'm1', 'd1', 'n1'],
                reasoning: {
                    'g1': 'Ati Komal Gandhar (32/27) - no Re at all - creates Malkauns\' mysterious, pentatonic character. The absence of Re makes the g1 even more prominent.',
                    'm1': 'Shuddha Madhyam (4/3) provides the only "natural" note besides Sa, creating a stable anchor point.',
                    'd1': 'Ati Komal Dhaivat (128/81) - no Pa - the absence of Pa (the perfect fifth) is highly unusual and creates Malkauns\' enigmatic, night-time atmosphere.',
                    'n1': 'Ati Komal Nishad (16/9) completes the purely komal character. Malkauns uses only flat notes, creating its dark, mysterious mood.'
                }
            },
            'भूपाली': {
                thaat: 'Kalyan',
                shrutis: ['S', 'R1', 'G1', 'P', 'D1'],
                reasoning: {
                    'R1': 'Shuddha Rishabh (10/9) - the just major second - is chosen over R2 for its harmonic purity. In pentatonic raags, pure consonance is essential.',
                    'G1': 'Shuddha Gandhar (5/4) - the just major third - creates perfect consonance with Sa. This pure ratio is what gives Bhupali its serene, meditative quality.',
                    'D1': 'Shuddha Dhaivat (5/3) - the just major sixth - completes the pentatonic scale with perfect consonance. All three notes (R1, G1, D1) use "just" ratios for maximum harmonic purity.'
                }
            },
            'काफी': {
                thaat: 'Kafi',
                shrutis: ['S', 'R2', 'g1', 'm1', 'P', 'D1', 'n1'],
                reasoning: {
                    'R2': 'Teevra Shuddha Rishabh (9/8) provides brightness and energy, contrasting with the flat notes.',
                    'g1': 'Ati Komal Gandhar (32/27) creates the folk-based, earthy character. Less intense than in Darbari, it\'s rendered more straightforwardly.',
                    'm1': 'Shuddha Madhyam (4/3) provides stability in this accessible, folk-influenced raag.',
                    'D1': 'Shuddha Dhaivat (5/3) - the just major sixth - creates consonance and openness.',
                    'n1': 'Ati Komal Nishad (16/9) establishes the characteristic "minor" sound of Kafi, making it folk-like and approachable.'
                }
            },
            'खमाज': {
                thaat: 'Khamaj',
                shrutis: ['S', 'R2', 'G1', 'm1', 'P', 'D2', 'n1', 'N1'],
                reasoning: {
                    'R2': 'Teevra Shuddha Rishabh (9/8) creates brightness and forward motion.',
                    'G1': 'Shuddha Gandhar (5/4) provides consonance and openness.',
                    'm1': 'Shuddha Madhyam (4/3) grounds the raag.',
                    'D2': 'Teevra Shuddha Dhaivat (27/16) adds brightness.',
                    'n1': 'Ati Komal Nishad (16/9) is THE defining note - but Khamaj uniquely alternates between n1 and N1, creating its playful, semi-classical character. This alternation is what makes Khamaj perfect for lighter forms like Thumri.',
                    'N1': 'Shuddha Nishad (15/8) alternates with n1, creating the characteristic Khamaj flavor.'
                }
            },
            'भीमपलासी': {
                thaat: 'Kafi',
                shrutis: ['S', 'R1', 'g1', 'm1', 'P', 'D1', 'n1'],
                reasoning: {
                    'R1': 'Shuddha Rishabh (10/9) - the just major second - is chosen over R2 for a more grounded, afternoon character.',
                    'g1': 'Ati Komal Gandhar (32/27) creates the melancholic, introspective mood. In Bhimpalasi, it\'s rendered with gentle oscillation, less intense than Darbari.',
                    'm1': 'Shuddha Madhyam (4/3) provides stability.',
                    'D1': 'Shuddha Dhaivat (5/3) creates consonance.',
                    'n1': 'Ati Komal Nishad (16/9) completes the afternoon melancholy, making Bhimpalasi perfect for contemplative moods.'
                }
            },
            'बागेश्री': {
                thaat: 'Kafi',
                shrutis: ['S', 'R1', 'g1', 'm1', 'D1', 'n1'],
                reasoning: {
                    'R1': 'Shuddha Rishabh (10/9) provides a pure, grounded foundation.',
                    'g1': 'Ati Komal Gandhar (32/27) creates the romantic, night-time character. In Bageshri, it\'s rendered smoothly without heavy oscillation.',
                    'm1': 'Shuddha Madhyam (4/3) - note that Pa is omitted in Bageshri, making m1 even more important as a structural anchor.',
                    'D1': 'Shuddha Dhaivat (5/3) provides consonance and openness.',
                    'n1': 'Ati Komal Nishad (16/9) creates the romantic, late-night atmosphere that makes Bageshri so beloved.'
                }
            },
            'मारवा': {
                thaat: 'Marva',
                shrutis: ['S', 'r1', 'G2', 'M1', 'D2', 'N1'],
                reasoning: {
                    'r1': 'Ati Komal Rishabh (256/243) - extremely flat - creates dramatic tension.',
                    'G2': 'Teevra Shuddha Gandhar (81/64) - THIS is why G2 instead of G1! The Pythagorean major third is sharper and more tense. Combined with r1 and M1, it creates one of the most dramatic raags in the system. The extreme contrast between the lowest Re and highest Ga creates Marwa\'s "royal" character.',
                    'M1': 'Teevra Madhyam (45/32) adds to the tension. Note that Pa is omitted, making M1 the highest note in the lower tetrachord.',
                    'D2': 'Teevra Shuddha Dhaivat (27/16) - sharp and bright - continues the pattern of extreme notes.',
                    'N1': 'Shuddha Nishad (15/8) provides resolution to this highly tense raag.'
                }
            },
            'पूर्वी': {
                thaat: 'Poorvi',
                shrutis: ['S', 'r1', 'G1', 'm1', 'M1', 'P', 'd1', 'N1'],
                reasoning: {
                    'r1': 'Ati Komal Rishabh (256/243) creates the devotional, evening character.',
                    'G1': 'Shuddha Gandhar (5/4) - G1 not G2 - because Poorvi needs the just major third for consonance. The contrast with r1 is already dramatic enough.',
                    'm1': 'Shuddha Madhyam (4/3) and M1 both appear, creating unique color.',
                    'M1': 'Teevra Madhyam (45/32) is the defining note, creating tension and forward motion.',
                    'd1': 'Ati Komal Dhaivat (128/81) adds to the devotional intensity.',
                    'N1': 'Shuddha Nishad (15/8) provides resolution.'
                }
            }
        };

        // Populate raag selector
        const selector = document.getElementById('raag-selector');
        const sortedRaags = Object.keys(raagShrutiMap).sort();
        sortedRaags.forEach(raag => {
            const option = document.createElement('option');
            option.value = raag;
            option.textContent = raag;
            selector.appendChild(option);
        });

        function renderScale(selectedRaag) {
            const container = document.getElementById('shruti-visualizer-content');
            
            if (!selectedRaag) {
                container.innerHTML = '<div class="visualizer-intro"><p>Select a raag from the dropdown above to see its exact shruti positions on the 22-shruti scale. <strong>Click any shruti to hear its frequency!</strong></p></div>';
                return;
            }

            const raagData = raagShrutiMap[selectedRaag];
            const usedShrutis = raagData.shrutis;

            let html = `
                <div class="raag-info-card">
                    <h2>${selectedRaag}</h2>
                    <p class="thaat-label">Thaat: ${raagData.thaat}</p>
                    <p class="shruti-list">Shrutis: ${usedShrutis.join(' ')}</p>
                </div>
                
                <div class="consonance-info-card">
                    <h3>🎵 The 9 or 13 Rule - Consonant Harmony</h3>
                    <p>Hover over any shruti to see its consonant partners:</p>
                    <ul>
                        <li><strong>+9 Shrutis</strong> = Madhyam Partner (4th) - Frequency × 1.333</li>
                        <li><strong>+13 Shrutis</strong> = Pancham Partner (5th) - Frequency × 1.5</li>
                    </ul>
                    <p class="info-note">These mathematical constants ensure perfect resonance without dissonance (beats).</p>
                </div>
                
                <div class="shruti-scale-container">
                    <h3>22-Shruti Scale (Interactive)</h3>
                    <div class="shruti-scale">
            `;

            shrutiData.forEach(shruti => {
                const isUsed = usedShrutis.includes(shruti.symbol);
                const reasoning = raagData.reasoning[shruti.symbol] || '';
                const partners = getConsonantPartners(shruti.index);
                const maPartner = shrutiData.find(s => s.index === partners.ma);
                const paPartner = shrutiData.find(s => s.index === partners.pa);
                
                html += `
                    <div class="shruti-note ${isUsed ? 'active' : ''}" 
                         data-shruti="${shruti.symbol}"
                         data-index="${shruti.index}"
                         data-ma-partner="${partners.ma}"
                         data-pa-partner="${partners.pa}"
                         data-reasoning="${reasoning}">
                        <div class="shruti-index">#${shruti.index}</div>
                        <div class="shruti-symbol">${shruti.symbol}</div>
                        <div class="shruti-name">${shruti.name}</div>
                        <div class="shruti-ratio">${shruti.ratio}</div>
                        ${isUsed ? '<div class="shruti-indicator">●</div>' : ''}
                    </div>
                `;
            });

            html += `
                    </div>
                    <div id="consonance-display" class="consonance-display"></div>
                </div>
                
                <div class="reasoning-panel">
                    <h3>Why These Shrutis?</h3>
                    <div class="reasoning-cards">
            `;

            usedShrutis.forEach(shruti => {
                if (raagData.reasoning[shruti]) {
                    const shrutiInfo = shrutiData.find(s => s.symbol === shruti);
                    const partners = getConsonantPartners(shrutiInfo.index);
                    const maPartner = shrutiData.find(s => s.index === partners.ma);
                    const paPartner = shrutiData.find(s => s.index === partners.pa);
                    
                    html += `
                        <div class="reasoning-card">
                            <h4>${shruti} - ${shrutiInfo.name}</h4>
                            <div class="reasoning-specs">
                                <span class="spec">Index: #${shrutiInfo.index}</span>
                                <span class="spec">Ratio: ${shrutiInfo.ratio}</span>
                                <span class="spec">Cents: ${shrutiInfo.cents}</span>
                                <span class="spec">Freq: ${shrutiInfo.freq} Hz</span>
                            </div>
                            <div class="consonance-partners">
                                <span class="partner-badge ma-badge">Ma Partner (+9): ${maPartner.symbol} (${maPartner.name})</span>
                                <span class="partner-badge pa-badge">Pa Partner (+13): ${paPartner.symbol} (${paPartner.name})</span>
                            </div>
                            <p class="reasoning-text">${raagData.reasoning[shruti]}</p>
                        </div>
                    `;
                }
            });

            html += `
                    </div>
                </div>
            `;

            container.innerHTML = html;

            // Add interactive hover effects for consonance visualization
            document.querySelectorAll('.shruti-note').forEach(note => {
                // Click to play frequency
                note.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const shrutiInfo = shrutiData.find(s => s.index === index);
                    const frequency = parseFloat(shrutiInfo.freq);
                    
                    playFrequency(frequency);
                    
                    // Visual feedback
                    this.style.animation = 'none';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 10);
                });
                
                note.addEventListener('mouseenter', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const symbol = this.getAttribute('data-shruti');
                    const maPartnerIndex = parseInt(this.getAttribute('data-ma-partner'));
                    const paPartnerIndex = parseInt(this.getAttribute('data-pa-partner'));
                    
                    // Highlight consonant partners
                    document.querySelectorAll('.shruti-note').forEach(n => {
                        n.classList.remove('ma-partner', 'pa-partner', 'source-note');
                    });
                    
                    this.classList.add('source-note');
                    
                    const maPartnerNote = document.querySelector(`[data-index="${maPartnerIndex}"]`);
                    const paPartnerNote = document.querySelector(`[data-index="${paPartnerIndex}"]`);
                    
                    if (maPartnerNote) maPartnerNote.classList.add('ma-partner');
                    if (paPartnerNote) paPartnerNote.classList.add('pa-partner');
                    
                    // Show consonance info
                    const shrutiInfo = shrutiData.find(s => s.index === index);
                    const maPartner = shrutiData.find(s => s.index === maPartnerIndex);
                    const paPartner = shrutiData.find(s => s.index === paPartnerIndex);
                    
                    const display = document.getElementById('consonance-display');
                    display.innerHTML = `
                        <div class="consonance-info">
                            <h4>Consonant Partners for ${symbol} (${shrutiInfo.name})</h4>
                            <div class="partner-info">
                                <div class="partner-detail ma-detail">
                                    <strong>Madhyam Partner (+9):</strong> ${maPartner.symbol} (${maPartner.name})<br>
                                    <span class="math">Index ${index} + 9 = ${maPartnerIndex}</span><br>
                                    <span class="math">Freq: ${shrutiInfo.freq} Hz × 1.333 ≈ ${(parseFloat(shrutiInfo.freq) * 1.333).toFixed(2)} Hz</span><br>
                                    <span class="math">Actual: ${maPartner.freq} Hz ✓</span>
                                </div>
                                <div class="partner-detail pa-detail">
                                    <strong>Pancham Partner (+13):</strong> ${paPartner.symbol} (${paPartner.name})<br>
                                    <span class="math">Index ${index} + 13 = ${paPartnerIndex > 22 ? paPartnerIndex - 22 + ' (wrapped)' : paPartnerIndex}</span><br>
                                    <span class="math">Freq: ${shrutiInfo.freq} Hz × 1.5 = ${(parseFloat(shrutiInfo.freq) * 1.5).toFixed(2)} Hz</span><br>
                                    <span class="math">Actual: ${paPartner.freq} Hz ✓</span>
                                </div>
                            </div>
                        </div>
                    `;
                    display.style.display = 'block';
                });
                
                note.addEventListener('mouseleave', function(e) {
                    // Don't hide if moving to the consonance display
                    const display = document.getElementById('consonance-display');
                    const relatedTarget = e.relatedTarget;
                    
                    if (relatedTarget && (display.contains(relatedTarget) || relatedTarget === display)) {
                        return;
                    }
                    
                    setTimeout(() => {
                        if (!document.querySelector('.shruti-note:hover') && !display.matches(':hover')) {
                            document.querySelectorAll('.shruti-note').forEach(n => {
                                n.classList.remove('ma-partner', 'pa-partner', 'source-note');
                            });
                            display.style.display = 'none';
                        }
                    }, 100);
                });
            });
            
            // Keep consonance display visible when hovering over it
            const display = document.getElementById('consonance-display');
            if (display) {
                display.addEventListener('mouseenter', function() {
                    this.style.display = 'block';
                });
                
                display.addEventListener('mouseleave', function() {
                    if (!document.querySelector('.shruti-note:hover')) {
                        document.querySelectorAll('.shruti-note').forEach(n => {
                            n.classList.remove('ma-partner', 'pa-partner', 'source-note');
                        });
                        this.style.display = 'none';
                    }
                });
            }
        }

        // Initial render
        renderScale(null);

        // Mode switching
        const presetModeBtn = document.getElementById('preset-mode-btn');
        const customModeBtn = document.getElementById('custom-mode-btn');
        const presetControls = document.getElementById('preset-controls');
        const customControls = document.getElementById('custom-controls');
        
        presetModeBtn.addEventListener('click', () => {
            customMode = false;
            presetModeBtn.classList.add('active');
            customModeBtn.classList.remove('active');
            presetControls.classList.remove('hidden');
            customControls.classList.add('hidden');
            selectedShrutis = [];
            renderScale(selector.value || null);
        });
        
        customModeBtn.addEventListener('click', () => {
            customMode = true;
            customModeBtn.classList.add('active');
            presetModeBtn.classList.remove('active');
            customControls.classList.remove('hidden');
            presetControls.classList.add('hidden');
            selectedShrutis = [];
            renderCustomScale();
        });

        // Handle raag selection
        selector.addEventListener('change', (e) => {
            if (!customMode) {
                renderScale(e.target.value);
            }
        });
        
        // Custom scale controls
        document.getElementById('clear-scale-btn').addEventListener('click', () => {
            selectedShrutis = [];
            renderCustomScale();
        });
        
        document.getElementById('validate-scale-btn').addEventListener('click', () => {
            validateScale();
        });
        
        function renderCustomScale() {
            const container = document.getElementById('shruti-visualizer-content');
            
            let html = `
                <div class="custom-scale-info">
                    <h2>🎼 Build Your Own Scale</h2>
                    <p><strong>Click</strong> any shruti to hear its frequency. <strong>Double-click</strong> to add/remove from your scale.</p>
                    <div class="selected-scale">
                        <strong>Your Scale:</strong> ${selectedShrutis.length > 0 ? selectedShrutis.map(i => shrutiData.find(s => s.index === i).symbol).join(' ') : 'Empty - Double-click shrutis to add'}
                    </div>
                </div>
                
                <div class="consonance-rules-card">
                    <h3>📐 The Mathematical Rules</h3>
                    <div class="rules-grid">
                        <div class="rule-box">
                            <h4>Consonance Formula</h4>
                            <p>Two notes are consonant if their index difference is exactly <strong>9</strong> or <strong>13</strong></p>
                            <div class="formula">Distance = |Index₁ - Index₂|</div>
                            <div class="formula">✓ If distance = 9 or 13 → Consonant</div>
                            <div class="formula">✗ If distance = 2 or 20 → Dissonant</div>
                        </div>
                        <div class="rule-box">
                            <h4>Row Consistency Rule</h4>
                            <p>Stay within the same "DNA Row" for stability:</p>
                            <div class="formula">Alpha Row: R1, G1, D1, N1 (indices 4, 8, 17, 21)</div>
                            <div class="formula">Beta Row: R2, G2, D2, N2 (indices 5, 9, 18, 22)</div>
                            <p class="warning">⚠️ Mixing rows creates unstable distances (e.g., 15 instead of 13)</p>
                        </div>
                    </div>
                </div>
                
                <div class="shruti-scale-container">
                    <h3>22-Shruti Scale (Click to Select)</h3>
                    <div class="shruti-scale">
            `;

            shrutiData.forEach(shruti => {
                const isSelected = selectedShrutis.includes(shruti.index);
                const partners = getConsonantPartners(shruti.index);
                
                html += `
                    <div class="shruti-note ${isSelected ? 'selected' : ''} clickable" 
                         data-shruti="${shruti.symbol}"
                         data-index="${shruti.index}"
                         data-ma-partner="${partners.ma}"
                         data-pa-partner="${partners.pa}">
                        <div class="shruti-index">#${shruti.index}</div>
                        <div class="shruti-symbol">${shruti.symbol}</div>
                        <div class="shruti-name">${shruti.name}</div>
                        <div class="shruti-ratio">${shruti.ratio}</div>
                        ${isSelected ? '<div class="shruti-indicator">✓</div>' : ''}
                    </div>
                `;
            });

            html += `
                    </div>
                    <div id="consonance-display" class="consonance-display"></div>
                </div>
                
                <div id="validation-results" class="validation-results"></div>
            `;

            container.innerHTML = html;
            
            // Add click handlers for custom mode
            document.querySelectorAll('.shruti-note.clickable').forEach(note => {
                // Single click to play frequency
                note.addEventListener('click', function(e) {
                    const index = parseInt(this.getAttribute('data-index'));
                    const shrutiInfo = shrutiData.find(s => s.index === index);
                    const frequency = parseFloat(shrutiInfo.freq);
                    
                    playFrequency(frequency);
                    
                    // Visual feedback
                    this.style.animation = 'none';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 10);
                });
                
                // Double click to toggle selection
                note.addEventListener('dblclick', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    
                    if (selectedShrutis.includes(index)) {
                        selectedShrutis = selectedShrutis.filter(i => i !== index);
                    } else {
                        selectedShrutis.push(index);
                        selectedShrutis.sort((a, b) => a - b);
                    }
                    
                    renderCustomScale();
                });
                
                // Keep hover functionality
                note.addEventListener('mouseenter', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const symbol = this.getAttribute('data-shruti');
                    const maPartnerIndex = parseInt(this.getAttribute('data-ma-partner'));
                    const paPartnerIndex = parseInt(this.getAttribute('data-pa-partner'));
                    
                    document.querySelectorAll('.shruti-note').forEach(n => {
                        n.classList.remove('ma-partner', 'pa-partner', 'source-note');
                    });
                    
                    this.classList.add('source-note');
                    
                    const maPartnerNote = document.querySelector(`[data-index="${maPartnerIndex}"]`);
                    const paPartnerNote = document.querySelector(`[data-index="${paPartnerIndex}"]`);
                    
                    if (maPartnerNote) maPartnerNote.classList.add('ma-partner');
                    if (paPartnerNote) paPartnerNote.classList.add('pa-partner');
                    
                    const shrutiInfo = shrutiData.find(s => s.index === index);
                    const maPartner = shrutiData.find(s => s.index === maPartnerIndex);
                    const paPartner = shrutiData.find(s => s.index === paPartnerIndex);
                    
                    const display = document.getElementById('consonance-display');
                    display.innerHTML = `
                        <div class="consonance-info">
                            <h4>Consonant Partners for ${symbol} (${shrutiInfo.name})</h4>
                            <div class="partner-info">
                                <div class="partner-detail ma-detail">
                                    <strong>Madhyam Partner (+9):</strong> ${maPartner.symbol} (${maPartner.name})<br>
                                    <span class="math">Index ${index} + 9 = ${maPartnerIndex}</span><br>
                                    <span class="math">Freq: ${shrutiInfo.freq} Hz × 1.333 ≈ ${(parseFloat(shrutiInfo.freq) * 1.333).toFixed(2)} Hz</span><br>
                                    <span class="math">Actual: ${maPartner.freq} Hz ✓</span>
                                </div>
                                <div class="partner-detail pa-detail">
                                    <strong>Pancham Partner (+13):</strong> ${paPartner.symbol} (${paPartner.name})<br>
                                    <span class="math">Index ${index} + 13 = ${paPartnerIndex > 22 ? paPartnerIndex - 22 + ' (wrapped)' : paPartnerIndex}</span><br>
                                    <span class="math">Freq: ${shrutiInfo.freq} Hz × 1.5 = ${(parseFloat(shrutiInfo.freq) * 1.5).toFixed(2)} Hz</span><br>
                                    <span class="math">Actual: ${paPartner.freq} Hz ✓</span>
                                </div>
                            </div>
                        </div>
                    `;
                    display.style.display = 'block';
                });
                
                note.addEventListener('mouseleave', function(e) {
                    const display = document.getElementById('consonance-display');
                    const relatedTarget = e.relatedTarget;
                    
                    if (relatedTarget && (display.contains(relatedTarget) || relatedTarget === display)) {
                        return;
                    }
                    
                    setTimeout(() => {
                        if (!document.querySelector('.shruti-note:hover') && !display.matches(':hover')) {
                            document.querySelectorAll('.shruti-note').forEach(n => {
                                n.classList.remove('ma-partner', 'pa-partner', 'source-note');
                            });
                            display.style.display = 'none';
                        }
                    }, 100);
                });
            });
            
            // Keep consonance display visible when hovering over it
            const display = document.getElementById('consonance-display');
            if (display) {
                display.addEventListener('mouseenter', function() {
                    this.style.display = 'block';
                });
                
                display.addEventListener('mouseleave', function() {
                    if (!document.querySelector('.shruti-note:hover')) {
                        document.querySelectorAll('.shruti-note').forEach(n => {
                            n.classList.remove('ma-partner', 'pa-partner', 'source-note');
                        });
                        this.style.display = 'none';
                    }
                });
            }
        }
        
        function validateScale() {
            if (selectedShrutis.length < 2) {
                alert('Please select at least 2 shrutis to validate');
                return;
            }
            
            const results = document.getElementById('validation-results');
            let html = '<div class="validation-panel"><h3>🔍 Consonance Validation Results</h3>';
            
            const pairs = [];
            const consonantPairs = [];
            const dissonantPairs = [];
            
            // Check all pairs
            for (let i = 0; i < selectedShrutis.length; i++) {
                for (let j = i + 1; j < selectedShrutis.length; j++) {
                    const idx1 = selectedShrutis[i];
                    const idx2 = selectedShrutis[j];
                    const distance = Math.abs(idx2 - idx1);
                    const shruti1 = shrutiData.find(s => s.index === idx1);
                    const shruti2 = shrutiData.find(s => s.index === idx2);
                    
                    const isConsonant = distance === 9 || distance === 13;
                    const isDissonant = distance === 2 || distance === 20;
                    
                    const pair = {
                        shruti1,
                        shruti2,
                        distance,
                        isConsonant,
                        isDissonant
                    };
                    
                    pairs.push(pair);
                    if (isConsonant) consonantPairs.push(pair);
                    if (isDissonant) dissonantPairs.push(pair);
                }
            }
            
            // Summary
            html += `<div class="validation-summary">`;
            html += `<div class="summary-stat good">✓ Consonant Pairs: ${consonantPairs.length}</div>`;
            html += `<div class="summary-stat bad">✗ Dissonant Pairs: ${dissonantPairs.length}</div>`;
            html += `<div class="summary-stat neutral">~ Neutral Pairs: ${pairs.length - consonantPairs.length - dissonantPairs.length}</div>`;
            html += `</div>`;
            
            // Consonant pairs
            if (consonantPairs.length > 0) {
                html += '<div class="pair-section good-section"><h4>✓ Consonant Pairs (Distance = 9 or 13)</h4>';
                consonantPairs.forEach(pair => {
                    const relationship = pair.distance === 9 ? 'Madhyam (4th)' : 'Pancham (5th)';
                    html += `
                        <div class="pair-card good">
                            <strong>${pair.shruti1.symbol} ↔ ${pair.shruti2.symbol}</strong>
                            <span class="distance">Distance: ${pair.distance} (${relationship})</span>
                            <span class="verdict">Perfect Consonance ✓</span>
                        </div>
                    `;
                });
                html += '</div>';
            }
            
            // Dissonant pairs
            if (dissonantPairs.length > 0) {
                html += '<div class="pair-section bad-section"><h4>✗ Dissonant Pairs (Distance = 2 or 20)</h4>';
                dissonantPairs.forEach(pair => {
                    html += `
                        <div class="pair-card bad">
                            <strong>${pair.shruti1.symbol} ↔ ${pair.shruti2.symbol}</strong>
                            <span class="distance">Distance: ${pair.distance}</span>
                            <span class="verdict">⚠️ Creates Beats - Avoid Playing Together</span>
                        </div>
                    `;
                });
                html += '</div>';
            }
            
            // Neutral pairs
            const neutralPairs = pairs.filter(p => !p.isConsonant && !p.isDissonant);
            if (neutralPairs.length > 0) {
                html += '<div class="pair-section neutral-section"><h4>~ Neutral Pairs (Other Distances)</h4>';
                neutralPairs.forEach(pair => {
                    html += `
                        <div class="pair-card neutral">
                            <strong>${pair.shruti1.symbol} ↔ ${pair.shruti2.symbol}</strong>
                            <span class="distance">Distance: ${pair.distance}</span>
                            <span class="verdict">Neither strongly consonant nor dissonant</span>
                        </div>
                    `;
                });
                html += '</div>';
            }
            
            // Overall verdict
            const score = (consonantPairs.length / pairs.length) * 100;
            html += `<div class="overall-verdict">`;
            if (dissonantPairs.length === 0 && consonantPairs.length >= pairs.length * 0.5) {
                html += `<div class="verdict-box excellent">🎵 Excellent Scale! ${score.toFixed(0)}% consonant pairs, no dissonance.</div>`;
            } else if (dissonantPairs.length === 0) {
                html += `<div class="verdict-box good">✓ Valid Scale. No dissonant pairs detected.</div>`;
            } else {
                html += `<div class="verdict-box warning">⚠️ Warning: ${dissonantPairs.length} dissonant pair(s) detected. Consider removing conflicting notes.</div>`;
            }
            html += `</div>`;
            
            html += '</div>';
            results.innerHTML = html;
        }
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
