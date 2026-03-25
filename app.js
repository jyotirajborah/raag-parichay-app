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
