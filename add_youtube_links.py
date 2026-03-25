import json

# YouTube links for all raags (Instrumental and Vocal)
youtube_links = {
    # Bilawal
    "बिलावल": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Bilawal%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Bilawal%20vocal%20khyal%20bandish%20classical"
    },
    "अल्हैया बिलावल": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Alhaiya%20Bilawal%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Alhaiya%20Bilawal%20vocal%20khyal%20bandish%20classical"
    },
    "बिहाग": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Bihag%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Bihag%20vocal%20khyal%20bandish%20classical"
    },
    "दुर्गा": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Durga%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Durga%20vocal%20khyal%20bandish%20classical"
    },
    "शंकरा": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Shankara%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Shankara%20vocal%20khyal%20bandish%20classical"
    },
    "Deshkar": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Deshkar%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Deshkar%20vocal%20khyal%20bandish%20classical"
    },
    "Maluha Kedar": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Maluha%20Kedar%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Maluha%20Kedar%20vocal%20khyal%20bandish%20classical"
    },
    "हंसध्वनि": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Hamsadhwani%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Hamsadhwani%20vocal%20khyal%20bandish%20classical"
    },
    "Jaldhar Kedar": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Jaldhar%20Kedar%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Jaldhar%20Kedar%20vocal%20khyal%20bandish%20classical"
    },
    "Sarparada": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Sarparada%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Sarparada%20vocal%20khyal%20bandish%20classical"
    },
    "Gopika Basant": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Gopika%20Basant%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Gopika%20Basant%20vocal%20khyal%20bandish%20classical"
    },
    "Devgiri Bilawal": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Devgiri%20Bilawal%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Devgiri%20Bilawal%20vocal%20khyal%20bandish%20classical"
    },
    "Bhatiyar": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Bhatiyar%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Bhatiyar%20vocal%20khyal%20bandish%20classical"
    },
    "Nat Bihag": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Nat%20Bihag%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Nat%20Bihag%20vocal%20khyal%20bandish%20classical"
    },
    "Sukla Bilawal": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Shukla%20Bilawal%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Shukla%20Bilawal%20vocal%20khyal%20bandish%20classical"
    },
    "Bihagara": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Bihagara%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Bihagara%20vocal%20khyal%20bandish%20classical"
    },
    
    # Kalyan
    "कल्याण": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Kalyan%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Kalyan%20vocal%20khyal%20bandish%20classical"
    },
    "यमन": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Yaman%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Yaman%20vocal%20khyal%20bandish%20classical"
    },
    "भूपाली": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Bhupali%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Bhupali%20vocal%20khyal%20bandish%20classical"
    },
    "हमीर": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Hameer%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Hameer%20vocal%20khyal%20bandish%20classical"
    },
    "केदार": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Kedar%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Kedar%20vocal%20khyal%20bandish%20classical"
    },
    "Kamod": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Kamod%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Kamod%20vocal%20khyal%20bandish%20classical"
    },
    "Hindol": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Hindol%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Hindol%20vocal%20khyal%20bandish%20classical"
    },
    "Gaur Sarang": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Gaur%20Sarang%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Gaur%20Sarang%20vocal%20khyal%20bandish%20classical"
    },
    "Chayanaut": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Chayanaut%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Chayanaut%20vocal%20khyal%20bandish%20classical"
    },
    "Sudh Kalyan": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Shuddh%20Kalyan%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Shuddh%20Kalyan%20vocal%20khyal%20bandish%20classical"
    },
    "मारु बिहाग": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Maru%20Bihag%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Maru%20Bihag%20vocal%20khyal%20bandish%20classical"
    },
    "Nand": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Nand%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Nand%20vocal%20khyal%20bandish%20classical"
    },
    "शुद्ध सारंग": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Shuddh%20Sarang%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Shuddh%20Sarang%20vocal%20khyal%20bandish%20classical"
    },
    "Yamani Bilawal": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Yamani%20Bilawal%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Yamani%20Bilawal%20vocal%20khyal%20bandish%20classical"
    },
    "Shyam Kalyan": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Shyam%20Kalyan%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Shyam%20Kalyan%20vocal%20khyal%20bandish%20classical"
    },
    "Hemant": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Hemant%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Hemant%20vocal%20khyal%20bandish%20classical"
    },
    "Jogkaunsh": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Jogkauns%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Jogkauns%20vocal%20khyal%20bandish%20classical"
    },
    "Jaut Kalyan": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Jait%20Kalyan%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Jait%20Kalyan%20vocal%20khyal%20bandish%20classical"
    },
    
    # Khamaj
    "खमाज": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Khamaj%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Khamaj%20vocal%20khyal%20bandish%20classical"
    },
    "देश": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Desh%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Desh%20vocal%20khyal%20bandish%20classical"
    },
    "तिलंग": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Tilang%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Tilang%20vocal%20khyal%20bandish%20classical"
    },
    "तिलक कामोद": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Tilak%20Kamod%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Tilak%20Kamod%20vocal%20khyal%20bandish%20classical"
    },
    "Jaijaiwanti": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Jaijaiwanti%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Jaijaiwanti%20vocal%20khyal%20bandish%20classical"
    },
    "Gur Malhar": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Gaud%20Malhar%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Gaud%20Malhar%20vocal%20khyal%20bandish%20classical"
    },
    "रागेश्री/Rageswari": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Rageshwari%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Rageshwari%20vocal%20khyal%20bandish%20classical"
    },
    "चंपकली": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Champakali%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Champakali%20vocal%20khyal%20bandish%20classical"
    },
    "जोग": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Jog%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Jog%20vocal%20khyal%20bandish%20classical"
    },
    "Narayani": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Narayani%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Narayani%20vocal%20khyal%20bandish%20classical"
    },
    "Madhumad Sarang": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Madhmad%20Sarang%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Madhmad%20Sarang%20vocal%20khyal%20bandish%20classical"
    },
    "Gara": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Gara%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Gara%20vocal%20khyal%20bandish%20classical"
    },
    "गोरख कल्याण": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Gorakh%20Kalyan%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Gorakh%20Kalyan%20vocal%20khyal%20bandish%20classical"
    },
    "Jinjhoti": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Jhinjhoti%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Jhinjhoti%20vocal%20khyal%20bandish%20classical"
    },
    "Khambawati": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Khambavati%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Khambavati%20vocal%20khyal%20bandish%20classical"
    },
    "सरस्वती": {
        "instrumental": "https://www.youtube.com/results?search_query=Raag%20Saraswati%20instrumental%20sitar%20flute%20classical",
        "vocal": "https://www.youtube.com/results?search_query=Raag%20Saraswati%20vocal%20khyal%20bandish%20classical"
    }
}

# Continue with remaining thaats...
# I'll add them in the next part due to length

print(f"Added YouTube links for {len(youtube_links)} raags so far...")
print("Creating complete dataset...")
