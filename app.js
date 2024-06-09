import express from 'express';
import axios from 'axios';
import opencage from 'opencage-api-client';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
const opencageAPIKey = process.env.OPENCAGE_API_KEY;
const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;
const tripadvisorAPIKey = process.env.TRIPADVISOR_API_KEY;

app.get('/getFeaturedCountries', async (req, res) => {
    const allCountries = 
    {
        "Kuala Lumpur, Malaysia": "Kuala Lumpur is the vibrant capital city of Malaysia, known for its modern skyline, cultural diversity, and delicious street food.",
        "Jerusalem, Israel": "Jerusalem is a city of great religious significance, with historical landmarks like the Western Wall, the Church of the Holy Sepulchre, and the Dome of the Rock.",
        "Yaren, Nauru": "Yaren is the capital of the small island nation of Nauru, offering a glimpse  into the unique culture and natural beauty of this Pacific paradise.",
        "Amman, Jordan": "Amman, the capital of Jordan, is a bustling city with a rich history, featuring ancient ruins, vibrant markets, and a welcoming atmosphere.",
        "Kingston, Norfolk Island": "Kingston on Norfolk Island is a charming coastal town, known for its beautiful beaches, convict history, and stunning landscapes.",
        "Lomé, Togo": "Lomé, the capital of Togo, is a lively coastal city with a mix of cultures, colorful markets, and a relaxed beachfront vibe.",
        "Praia, Cape Verde": "Praia, the capital of Cape Verde, is a coastal city offering a blend of African, Portuguese, and Creole cultures, along with beautiful beaches.",
        "Gibraltar, Gibraltar": "Gibraltar is a British Overseas Territory known for its iconic rock, stunning views, and a rich maritime history.",
        "Bogotá, Colombia": "Bogotá is the dynamic capital of Colombia, nestled in the Andes, with a thriving arts scene, historic neighborhoods, and delicious Colombian cuisine.",
        "Ljubljana, Slovenia": "Ljubljana, the capital of Slovenia, is a charming city with a medieval old town, riverside cafes, and a vibrant cultural scene.",
        "Havana, Cuba": "Havana is the capital of Cuba, famous for its colorful vintage cars, lively music, and historic sites like the Malecón and Old Havana.",
        "Managua, Nicaragua": "Managua is the capital of Nicaragua, offering a mix of history, nature, and vibrant local culture.",
        "Oranjestad, Aruba": "Oranjestad is the lively capital of Aruba, known for its Dutch colonial architecture, stunning beaches, and vibrant nightlife.",
        "Ramallah,Jerusalem, Palestine": "Ramallah, located in the West Bank, is a city with historical significance and a hub of Palestinian culture and governance.",
        "Port-au-Prince, Haiti": "Port-au-Prince is the capital of Haiti, known for its lively street markets, historic sites, and vibrant Haitian art and music.",
        "Dublin, Ireland": "Dublin, the capital of Ireland, is a city steeped in history, with charming pubs, literary heritage, and a welcoming Irish spirit.",
        "Mata-Utu, Wallis and Futuna": "Mata-Utu is the capital of Wallis and Futuna, an overseas collectivity of France, known for its Polynesian culture and stunning landscapes.",
        "Road Town, British Virgin Islands": "Road Town is the capital of the British Virgin Islands, offering beautiful beaches, turquoise waters, and a laid-back island atmosphere.",
        "Canberra, Australia": "Canberra is the capital of Australia, known for its modern architecture, national museums, and political significance as the seat of government.",
        "Nassau, Bahamas": "Nassau is the vibrant capital of the Bahamas, famous for its stunning beaches, colorful architecture, and welcoming Bahamian culture.",
        "Copenhagen, Denmark": "Copenhagen is the capital of Denmark, known for its picturesque canals, historic landmarks, and a thriving culinary scene.",
        "undefined, Heard Island and McDonald Islands": "The Heard Island and McDonald Islands are remote, uninhabited territories of Australia, known for their pristine natural landscapes and wildlife.",
        "Lilongwe, Malawi": "Lilongwe is the capital of Malawi, offering a mix of urban development and natural beauty, with a warm and welcoming local culture.",
        "Saint-Denis, Réunion": "Saint-Denis is the largest city of Réunion, a French overseas department in the Indian Ocean, known for its multiculturalism and beautiful landscapes.",
        "Pago Pago, American Samoa": "Pago Pago is the capital of American Samoa, offering stunning Pacific vistas, traditional Polynesian culture, and a relaxed island lifestyle.",
        "Bratislava, Slovakia": "Bratislava, the capital of Slovakia, is a charming city on the banks of the Danube River, with a historic old town and a welcoming atmosphere.",
        "Kigali, Rwanda": "Kigali is the capital of Rwanda, known for its cleanliness, greenery, and as a symbol of the country's recovery from a tragic past.",
        "Malabo, Equatorial Guinea": "Malabo is the capital of Equatorial Guinea, located on Bioko Island, with a unique blend of Spanish and African cultures.",
        "St. George's, Grenada": "St. George's is the capital of Grenada, known for its picturesque harbor, historic forts, and beautiful beaches.",
        "Willemstad, Curaçao": "Willemstad is the capital of Curaçao, famous for its colorful Dutch colonial architecture, pristine beaches, and a vibrant local culture.",
        "Sarajevo, Bosnia and Herzegovina": "Sarajevo is the capital of Bosnia and Herzegovina, a city with a rich history, diverse culture, and warm hospitality.",
        "Ulan Bator, Mongolia": "Ulan Bator is the capital of Mongolia, known for its nomadic heritage, Buddhist monasteries, and a blend of traditional and modern lifestyles.",
        "Monrovia, Liberia": "Monrovia is the capital of Liberia, offering a mix of history, coastal beauty, and a resilient spirit.",
        "Tbilisi, Georgia": "Tbilisi is the capital of Georgia, known for its charming old town, vibrant arts scene, and warm Georgian hospitality.",
        "Nouméa, New Caledonia": "Nouméa is the capital of New Caledonia, a French territory in the Pacific, offering beautiful beaches, a mix of cultures, and stunning marine life.",
        "Brazzaville, Republic of the Congo": "Brazzaville is the capital of the Republic of the Congo, known for its vibrant street markets, riverside location, and lively Congolese culture.",
        "Singapore, Singapore": "Singapore is a city-state known for its modernity, diverse culture, and culinary delights from across the world.",
        "Tunis, Tunisia": "Tunis is the capital of Tunisia, offering a mix of ancient history, stunning architecture, and North African hospitality.",
        "Rome, Italy": "Rome, the capital of Italy, is a city of history and art, with iconic landmarks like the Colosseum, the Vatican, and delicious Italian cuisine.",
        "Islamabad, Pakistan": "Islamabad is the capital of Pakistan, known for its modern design, picturesque hills, and important government buildings.",
        "Diego Garcia, British Indian Ocean Territory": "Diego Garcia is a remote island in the British Indian Ocean Territory, known for its pristine natural beauty and military significance.",
        "Ankara, Turkey": "Ankara is the capital of Turkey, offering a mix of ancient history, modern development, and a rich Turkish culture.",
        "Chișinău, Moldova": "Chișinău is the capital of Moldova, known for its historic architecture, wine culture, and a welcoming atmosphere.",
        "undefined, Antarctica": "Antarctica, the southernmost continent, is a vast, frozen wilderness with unique wildlife and dramatic landscapes, largely untouched by human presence.",
        "Brasília, Brazil": "Brasília is the capital of Brazil, known for its futuristic architecture, urban planning, and diverse culture.",
        "Nicosia, Cyprus": "Nicosia is the capital of Cyprus, offering a blend of Greek and Turkish influences, historic sites, and a relaxed Mediterranean lifestyle.",
        "Prague, Czechia": "Prague, the capital of Czechia, is a city of stunning architecture, historic charm, and a vibrant arts scene.",
        "Helsinki, Finland": "Helsinki is the capital of Finland, known for its modern design, beautiful archipelago, and a rich cultural heritage.",
        "Mbabane, Eswatini": "Mbabane is the capital of Eswatini, formerly known as Swaziland, offering a mix of tradition, natural beauty, and a welcoming Swazi culture.",
        "Dodoma, Tanzania": "Dodoma is the political capital of Tanzania, known for its government buildings, cultural diversity, and the nearby Great Rift Valley.",
        "Phnom Penh, Cambodia": "Phnom Penh is the capital of Cambodia, offering a mix of historical sites, vibrant markets, and a rich Khmer culture.",
        "Jamestown, Saint Helena, Ascension and Tristan da Cunha": "Jamestown is the capital of Saint Helena, a remote island in the South Atlantic, known for its historic significance and stunning landscapes.",
        "Santiago, Chile": "Santiago is the capital of Chile, surrounded by the Andes, offering a mix of modernity, cultural heritage, and diverse landscapes.",
        "Brussels, Belgium": "Brussels is the capital of Belgium, known for its historic architecture, European Union institutions, and delicious Belgian chocolates and waffles.",
        "Port Moresby, Papua New Guinea": "Port Moresby is the capital of Papua New Guinea, offering a diverse mix of cultures, stunning natural beauty, and a tropical climate.",
        "Asunción, Paraguay": "Asunción is the capital of Paraguay, known for its historic architecture, lively street markets, and Paraguayan traditions.",
        "Kabul, Afghanistan": "Kabul is the capital of Afghanistan, known for its history, resilience, and a unique blend of cultures.",
        "Luxembourg, Luxembourg": "Luxembourg City is the capital of Luxembourg, known for its medieval old town, financial institutions, and a mix of European cultures.",
        "Amsterdam, Netherlands": "Amsterdam is the capital of the Netherlands, famous for its picturesque canals, historic architecture, and a vibrant arts scene.",
        "Ngerulmud, Palau": "Ngerulmud is the capital of Palau, offering a glimpse into Palauan culture and natural beauty in the western Pacific.",
        "Beijing, China": "Beijing is the capital of China, known for its ancient history, iconic landmarks like the Great Wall and Forbidden City, and a rapidly evolving modern skyline.",
        "Dakar, Senegal": "Dakar is the capital of Senegal, offering a lively atmosphere, vibrant music and dance, and a blend of modern and traditional Senegalese culture.",
        "Adamstown, Pitcairn Islands": "Adamstown is the capital of the Pitcairn Islands, known for its remote location, small population, and a tranquil island lifestyle.",
        "Riga, Latvia": "Riga is the capital of Latvia, known for its medieval old town, Art Nouveau architecture, and a rich Latvian cultural heritage.",
        "Bangkok, Thailand": "Bangkok is the capital of Thailand, known for its bustling street markets, ornate temples, and a vibrant street food scene.",
        "Paris, France": "Paris, the capital of France, is a city of romance, art, and culture, with iconic landmarks like the Eiffel Tower, Louvre Museum, and delicious French cuisine.",
        "Mariehamn, Åland Islands": "Mariehamn is the capital of the Åland Islands, an autonomous region of Finland, known for its maritime heritage and serene island life.",
        "Dushanbe, Tajikistan": "Dushanbe is the capital of Tajikistan, offering a mix of Persian, Soviet, and Tajik influences, with a blend of tradition and modernity.",
        "Washington, D.C., United States": "Washington, D.C. is the capital of the United States, known for its historic monuments, political significance, and cultural diversity.",
        "Stanley, Falkland Islands": "Stanley is the capital of the Falkland Islands, offering stunning landscapes, rich wildlife, and a British heritage.",
        "Niamey, Niger": "Niamey is the capital of Niger, offering a blend of Sahelian culture, vibrant markets, and a relaxed atmosphere along the Niger River.",
        "Kinshasa, DR Congo": "Kinshasa is the capital of the Democratic Republic of the Congo, known for its lively music, bustling markets, and a mix of Congolese cultures.",
        "Cairo, Egypt": "Cairo is the capital of Egypt, known for its ancient history, iconic pyramids, and a bustling city with a mix of tradition and modernity.",
        "Minsk, Belarus": "Minsk is the capital of Belarus, offering a mix of Soviet heritage, European culture, and a vibrant arts scene.",
        "Bangui, Central African Republic": "Bangui is the capital of the Central African Republic, known for its unique culture, traditional markets, and a warm Central African atmosphere.",
        "Tirana, Albania": "Tirana is the capital of Albania, offering a mix of Ottoman, Italian, and communist influences, along with a vibrant Albanian culture.",
        "El Aaiún, Western Sahara": "El Aaiún is the largest city in Western Sahara, known for its unique political situation and Sahrawi culture.",
        "Wellington, New Zealand": "Wellington is the capital of New Zealand, offering a mix of culture, natural beauty, and a welcoming Kiwi spirit.",
        "Maputo, Mozambique": "Maputo is the capital of Mozambique, known for its coastal charm, Portuguese heritage, and vibrant African culture.",
        "Moroni, Comoros": "Moroni is the capital of Comoros, offering a glimpse into the culture and natural beauty of this Indian Ocean archipelago.",
        "Ashgabat, Turkmenistan": "Ashgabat is the capital of Turkmenistan, known for its grandiose architecture, marble-clad buildings, and a unique blend of Central Asian culture.",
        "Bamako, Mali": "Bamako is the capital of Mali, offering a lively atmosphere, vibrant music, and a rich Malian cultural heritage.",
        "Thimphu, Bhutan": "Thimphu is the capital of Bhutan, known for its stunning Himalayan scenery, traditional architecture, and a commitment to Gross National Happiness.",
        "Yamoussoukro, Ivory Coast": "Yamoussoukro is the political capital of Ivory Coast, known for its grand basilica and serene surroundings.",
        "Bissau, Guinea-Bissau": "Bissau is the capital of Guinea-Bissau, offering a mix of Portuguese colonial heritage, African culture, and a relaxed coastal lifestyle.",
        "Kampala, Uganda": "Kampala is the capital of Uganda, offering a lively cityscape, diverse cultures, and a welcoming Ugandan spirit.",
        "Skopje, North Macedonia": "Skopje is the capital of North Macedonia, known for its blend of history, architecture, and a warm Macedonian culture.",
        "Libreville, Gabon": "Libreville is the capital of Gabon, offering a mix of modernity, coastal beauty, and a vibrant African atmosphere.",
        "Nuku'alofa, Tonga": "Nuku'alofa is the capital of Tonga, known for its royal palace, friendly Tongan culture, and beautiful Pacific island landscapes.",
        "The Valley, Anguilla": "The Valley is the capital of Anguilla, offering beautiful beaches, tranquility, and a laid-back Caribbean lifestyle.",
        "Luanda, Angola": "Luanda is the capital of Angola, known for its coastal charm, African and Portuguese influences, and a dynamic atmosphere.",
        "San José, Costa Rica": "San José is the capital of Costa Rica, offering a mix of culture, nature, and a relaxed Central American lifestyle.",
        "Plymouth, Montserrat": "Plymouth is the former capital of Montserrat, known for its volcanic history, picturesque landscapes, and a resilient spirit.",
        "N'Djamena, Chad": "N'Djamena is the capital of Chad, offering a blend of African and Arabic cultures, a lively market scene, and a Sahelian atmosphere.",
        "Andorra la Vella, Andorra": "Andorra la Vella is the capital of the Principality of Andorra, known for its mountain scenery, duty-free shopping, and a mix of Catalan and Spanish influences.",
        "Philipsburg, Sint Maarten": "Philipsburg is the capital of Sint Maarten, a Dutch constituent country within the Kingdom of the Netherlands, known for its lively atmosphere, duty-free shopping, and beautiful beaches.",
        "Madrid, Spain": "Madrid is the capital of Spain, known for its historic architecture, world-class museums, and a vibrant Spanish culture.",
        "Bucharest, Romania": "Bucharest is the capital of Romania, offering a mix of history, grand architecture, and a thriving arts scene.",
        "Avarua, Cook Islands": "Avarua is the capital of the Cook Islands, known for its relaxed Polynesian lifestyle, stunning beaches, and vibrant marine life.",
        "Bridgetown, Barbados": "Bridgetown is the capital of Barbados, offering a mix of British colonial heritage, Caribbean culture, and beautiful beaches.",
        "Paramaribo, Suriname": "Paramaribo is the capital of Suriname, known for its blend of Dutch, Creole, and Javanese influences, along with a tropical atmosphere.",
        "Taipei, Taiwan": "Taipei is the capital of Taiwan, known for its modern cityscape, vibrant night markets, and a mix of Taiwanese and Chinese cultures.",
        "Banjul, Gambia": "Banjul is the capital of The Gambia, known for its coastal charm, colorful markets, and a relaxed West African atmosphere.",
        "Nouakchott, Mauritania": "Nouakchott is the capital of Mauritania, offering a blend of Saharan culture, lively markets, and a unique Mauritanian lifestyle.",
        "Muscat, Oman": "Muscat is the capital of Oman, known for its Arabian architecture, historic forts, and a blend of tradition and modernity.",
        "Palikir, Micronesia": "Palikir is the capital of the Federated States of Micronesia, offering a serene island lifestyle, rich culture, and stunning marine biodiversity.",
        "Gaborone, Botswana": "Gaborone is the capital of Botswana, known for its modern cityscape, cultural diversity, and a mix of urban development and natural beauty.",
        "Douglas, Isle of Man": "Douglas is the capital of the Isle of Man, known for its historic charm, offshore finance industry, and a unique Manx culture.",
        "Nairobi, Kenya": "Nairobi is the capital of Kenya, known for its bustling cityscape, wildlife conservation efforts, and a mix of urban development and natural beauty.",
        "Baku, Azerbaijan": "Baku is the capital of Azerbaijan, known for its blend of historic and modern architecture, Caspian Sea views, and a rich Azerbaijani culture.",
        "Baghdad, Iraq": "Baghdad is the capital of Iraq, offering a mix of ancient history, iconic landmarks, and a resilient spirit.",
        "Sana'a, Yemen": "Sana'a is the capital of Yemen, known for its unique architecture, ancient history, and a blend of Arab cultures.",
        "Papeetē, French Polynesia": "Papeetē is the capital of French Polynesia, offering a taste of Polynesian culture, stunning landscapes, and vibrant marine life.",
        "Ouagadougou, Burkina Faso": "Ouagadougou is the capital of Burkina Faso, known for its lively atmosphere, vibrant marketplaces, and a warm Burkinabé spirit.",
        "Juba, South Sudan": "Juba is the capital of South Sudan, offering a mix of history, development, and a resilient spirit as the newest nation in the world.",
        "Sofia, Bulgaria": "Sofia is the capital of Bulgaria, known for its historic landmarks, Orthodox churches, and a vibrant Bulgarian culture.",
        "London, United Kingdom": "London is the capital of the United Kingdom, known for its rich history, iconic landmarks like Big Ben and the Tower of London, and a cosmopolitan atmosphere.",
        "Saipan, Northern Mariana Islands": "Saipan is the capital of the Northern Mariana Islands, offering a mix of American and Pacific Island cultures, beautiful beaches, and historical sites from World War II.",
        "Apia, Samoa": "Apia is the capital of Samoa, known for its friendly Polynesian culture, stunning beaches, and traditional Samoan way of life.",
        "Lima, Peru": "Lima is the capital of Peru, offering a mix of history, culture, and a culinary scene known for its delicious ceviche and other Peruvian dishes.",
        "Budapest, Hungary": "Budapest is the capital of Hungary, known for its historic architecture, thermal baths, and a vibrant arts and music scene.",
        "Monaco, Monaco": "Monaco is a city-state and the capital of the Principality of Monaco, famous for its glamorous casinos, Formula 1 Grand Prix, and a luxurious lifestyle.",
        "Windhoek, Namibia": "Windhoek is the capital of Namibia, offering a blend of German colonial history, African culture, and beautiful desert landscapes.",
        "Bandar Seri Begawan, Brunei": "Bandar Seri Begawan is the capital of Brunei, known for its grand mosques, lush rainforests, and a wealthy economy supported by oil and gas resources.",
        "Podgorica, Montenegro": "Podgorica is the capital of Montenegro, offering a mix of history, modern development, and access to Montenegro's scenic mountains and Adriatic coast.",
        "Dhaka, Bangladesh": "Dhaka is the capital of Bangladesh, known for its vibrant street life, historic landmarks, and a rich Bengali culture.",
        "Naypyidaw, Myanmar": "Naypyidaw is the capital of Myanmar, offering a mix of modern infrastructure, government buildings, and cultural heritage.",
        "Vatican City, Vatican City": "Vatican City is the world's smallest independent state and the spiritual and administrative center of the Roman Catholic Church, known for its religious and historical significance.",
        "Hagåtña, Guam": "Hagåtña is the capital of Guam, offering a mix of Chamorro and American cultures, beautiful beaches, and historical sites from World War II.",
        "Jakarta, Indonesia": "Jakarta is the capital of Indonesia, known for its vibrant street markets, colonial architecture, and a diverse Indonesian culture.",
        "Dili, Timor-Leste": "Dili is the capital of Timor-Leste, offering a mix of Portuguese colonial history, pristine beaches, and a warm Timorese culture.",
        "Saint Helier, Jersey": "Saint Helier is the capital of Jersey, known for its maritime heritage, offshore finance industry, and a unique mix of British and Norman influences.",
        "Castries, Saint Lucia": "Castries is the capital of Saint Lucia, offering beautiful beaches, a mix of Creole and British influences, and a tropical Caribbean atmosphere.",
        "Georgetown, Guyana": "Georgetown is the capital of Guyana, known for its colonial architecture, diverse culture, and access to the lush Amazon rainforest.",
        "Maseru, Lesotho": "Maseru is the capital of Lesotho, offering a mix of Basotho culture, scenic mountains, and a welcoming atmosphere in the Mountain Kingdom of Southern Africa.",
        "Port Vila, Vanuatu": "Port Vila is the capital of Vanuatu, known for its Pacific island charm, volcanic landscapes, and a relaxed way of life.",
        "Kingston, Jamaica": "Kingston is the capital of Jamaica, offering reggae music, historic landmarks, and a vibrant Jamaican culture.",
        "Port Louis, Mauritius": "Port Louis is the capital of Mauritius, known for its mix of cultures, beautiful beaches, and a tropical island lifestyle.",
        "Freetown, Sierra Leone": "Freetown is the capital of Sierra Leone, offering a mix of history, vibrant markets, and a friendly West African atmosphere.",
        "Kingstown, Saint Vincent and the Grenadines": "Kingstown is the capital of Saint Vincent and the Grenadines, known for its lush landscapes, colorful markets, and a relaxed Caribbean lifestyle.",
        "City of Victoria, Hong Kong": "The City of Victoria is the historic core of Hong Kong, known for its impressive skyline, bustling harbor, and a vibrant East-meets-West atmosphere.",
        "Khartoum, Sudan": "Khartoum is the capital of Sudan, known for its confluence of the Blue and White Nile rivers, a mix of Arabic and African cultures, and historic sites.",
        "Hamilton, Bermuda": "Hamilton is the capital of Bermuda, known for its pink-sand beaches, British colonial history, and a tranquil island lifestyle.",
        "Belmopan, Belize": "Belmopan is the capital of Belize, offering a blend of Creole culture, lush rainforests, and a relaxed Central American atmosphere.",
        "Manama, Bahrain": "Manama is the capital of Bahrain, known for its modern cityscape, historic souks, and a blend of Arab and expatriate cultures.",
        "Basse-Terre, Guadeloupe": "Basse-Terre is the capital of Guadeloupe, offering beautiful rainforests, French-Caribbean culture, and access to the active volcano La Soufrière.",
        "Yaoundé, Cameroon": "Yaoundé is the capital of Cameroon, offering a mix of French and African cultures, historic sites, and a lively atmosphere.",
        "Honiara, Solomon Islands": "Honiara is the capital of the Solomon Islands, known for its Pacific island charm, World War II history, and stunning marine biodiversity.",
        "Algiers, Algeria": "Algiers is the capital of Algeria, known for its Mediterranean coastline, historic Casbah district, and a mix of North African and French influences.",
        "St. Peter Port, Guernsey": "St. Peter Port is the capital of Guernsey, known for its charming harbor, maritime heritage, and a unique blend of British and Norman cultures.",
        "Saint John's, Antigua and Barbuda": "Saint John's is the capital of Antigua and Barbuda, offering beautiful beaches, colonial architecture, and a relaxed Caribbean atmosphere.",
        "Santo Domingo, Dominican Republic": "Santo Domingo is the capital of the Dominican Republic, known for its historic colonial zone, vibrant music and dance, and a rich Dominican culture.",
        "undefined, Bouvet Island": "Bouvet Island is a remote uninhabited island in the South Atlantic, known for its icy landscapes and isolated nature.",
        "Basseterre, Saint Kitts and Nevis": "Basseterre is the capital of Saint Kitts and Nevis, known for its colonial architecture, beautiful beaches, and a relaxed Caribbean lifestyle.",
        "Washington DC, United States Minor Outlying Islands": "Washington, D.C. is the capital of the United States, known for its unique administrative status as part of the United States.",
        "Kathmandu, Nepal": "Kathmandu is the capital of Nepal, offering a mix of ancient temples, stunning Himalayan views, and a rich Nepalese culture.",
        "Tallinn, Estonia": "Tallinn is the capital of Estonia, known for its well-preserved medieval old town, digital innovation, and a blend of Nordic and Baltic influences.",
        "Port of Spain, Trinidad and Tobago": "Port of Spain is the capital of Trinidad and Tobago, offering a lively Carnival celebration, cultural diversity, and beautiful beaches.",
        "Tashkent, Uzbekistan": "Tashkent is the capital of Uzbekistan, known for its mix of Soviet-era architecture, Islamic heritage, and a warm Uzbek hospitality.",
        "Lisbon, Portugal": "Lisbon is the capital of Portugal, known for its colorful neighborhoods, historic tram rides, and a blend of Portuguese and Moorish influences.",
        "Panama City, Panama": "Panama City is the capital of Panama, offering a modern skyline, historic Casco Viejo district, and access to the Panama Canal.",
        "Alofi, Niue": "Alofi is the capital of Niue, known for its Polynesian culture, stunning coral reefs, and pristine South Pacific landscapes.",
        "Sri Jayawardenepura Kotte, Sri Lanka": "Sri Jayawardenepura Kotte is the legislative capital of Sri Lanka, offering a blend of administrative buildings, lush parks, and a rich Sri Lankan culture.",
        "São Tomé, São Tomé and Príncipe": "São Tomé is the capital of São Tomé and Príncipe, offering a mix of Portuguese colonial history, tropical rainforests, and a laid-back island lifestyle.",
        "Hanoi, Vietnam": "Hanoi is the capital of Vietnam, known for its historic Old Quarter, delicious street food, and a rich Vietnamese culture.",
        "Zagreb, Croatia": "Zagreb is the capital of Croatia, offering a mix of Austro-Hungarian architecture, vibrant street life, and a blend of Central European and Balkan cultures.",
        "Saint-Pierre, Saint Pierre and Miquelon": "Saint-Pierre is the capital of the French overseas territory of Saint Pierre and Miquelon, known for its French culture, seafood cuisine, and North Atlantic charm.",
        "Yerevan, Armenia": "Yerevan is the capital of Armenia, offering a blend of history, a vibrant arts scene, and Armenian hospitality.",
        "Seoul, South Korea": "Seoul is the capital of South Korea, known for its high-tech cityscape, historic palaces, and a blend of traditional Korean and modern influences.",
        "Pristina, Kosovo": "Pristina is the capital of Kosovo, offering a mix of Serbian and Albanian cultures, historic landmarks, and a youthful atmosphere.",
        "Funafuti, Tuvalu": "Funafuti is the capital of Tuvalu, known for its remote Pacific island beauty, turquoise lagoons, and a relaxed way of life.",
        "Conakry, Guinea": "Conakry is the capital of Guinea, offering a mix of West African culture, vibrant markets, and beautiful Atlantic coastlines.",
        "Cockburn Town, Turks and Caicos Islands": "Cockburn Town is the capital of the Turks and Caicos Islands, known for its British colonial history, pristine beaches, and a tranquil Caribbean lifestyle.",
        "George Town, Cayman Islands": "George Town is the capital of the Cayman Islands, known for its financial industry, beautiful beaches, and a blend of Caribbean and British influences.",
        "Beirut, Lebanon": "Beirut is the capital of Lebanon, known for its Mediterranean coastline, historic landmarks, and a mix of cultures influenced by Phoenician, Roman, and Arabic heritage.",
        "Pretoria, South Africa": "Pretoria is one of the three capitals of South Africa, serving as the administrative capital and known for its government buildings, gardens, and a diverse South African culture.",
        "Charlotte Amalie, United States Virgin Islands": "Charlotte Amalie is the capital of the United States Virgin Islands, offering a mix of Danish colonial history, beautiful beaches, and duty-free shopping.",
        "Tripoli, Libya": "Tripoli is the capital of Libya, known for its historic medina, Roman ruins, and a blend of Arab and Mediterranean cultures.",
        "Warsaw, Poland": "Warsaw is the capital of Poland, offering a mix of history, vibrant neighborhoods, and a resilient Polish spirit.",
        "Tehran, Iran": "Tehran is the capital of Iran, known for its bustling bazaars, historic palaces, and a blend of Persian culture and modernity.",
        "Flying Fish Cove, Christmas Island": "Flying Fish Cove is the capital of Christmas Island, offering a mix of natural beauty, wildlife, and the annual migration of red crabs.",
        "Athens, Greece": "Athens is the capital of Greece, known for its ancient ruins, Acropolis, and a blend of ancient Greek and Mediterranean influences.",
        "Cayenne, French Guiana": "Cayenne is the capital of French Guiana, offering a mix of French culture, Amazon rainforest, and a unique South American atmosphere.",
        "Antananarivo, Madagascar": "Antananarivo is the capital of Madagascar, known for its hilly landscapes, a mix of Malagasy and French cultures, and a vibrant market scene.",
        "Ottawa, Canada": "Ottawa is the capital of Canada, known for its historic architecture, Parliament Hill, and a multicultural Canadian atmosphere.",
        "South Tarawa, Kiribati": "South Tarawa is the capital of Kiribati, offering a mix of atolls, traditional cultures, and access to the Pacific Ocean.",
        "Vilnius, Lithuania": "Vilnius is the capital of Lithuania, known for its baroque architecture, a well-preserved old town, and a rich Lithuanian culture.",
        "Caracas, Venezuela": "Caracas is the capital of Venezuela, offering a blend of modern city life, stunning mountains, and a mix of Latin American cultures.",
        "Asmara, Eritrea": "Asmara is the capital of Eritrea, known for its well-preserved colonial architecture, Italian influence, and a blend of African and Middle Eastern cultures.",
        "Harare, Zimbabwe": "Harare is the capital of Zimbabwe, offering a mix of colonial history, vibrant markets, and a resilient spirit.",
        "Abu Dhabi, United Arab Emirates": "Abu Dhabi is the capital of the United Arab Emirates, known for its modern skyline, luxurious lifestyle, and a blend of Arabian and international cultures.",
        "Gustavia, Saint Barthélemy": "Gustavia is the capital of Saint Barthélemy, offering a taste of French Caribbean culture, beautiful beaches, and a luxurious atmosphere.",
        "Quito, Ecuador": "Quito is the capital of Ecuador, known for its historic old town, colonial architecture, and a blend of Andean and Spanish influences.",
        "Gitega, Burundi": "Gitega is the political capital of Burundi, known for its administrative functions and a blend of Burundian culture.",
        "Buenos Aires, Argentina": "Buenos Aires is the capital of Argentina, known for its passionate tango dance, historic neighborhoods, and a blend of European and Latin American influences.",
        "Bern, Switzerland": "Bern is the capital of Switzerland, known for its well-preserved medieval old town, the UNESCO-listed Zytglogge clock tower, and a mix of Swiss-German culture.",
        "Reykjavik, Iceland": "Reykjavik is the capital of Iceland, known for its geothermal pools, vibrant music scene, and a blend of Viking heritage and modernity.",
        "Tokyo, Japan": "Tokyo is the capital of Japan, known for its cutting-edge technology, historic temples, and a blend of traditional Japanese culture and futuristic cityscapes.",
        "Nuuk, Greenland": "Nuuk is the capital of Greenland, offering a mix of Inuit culture, Arctic landscapes, and a unique Greenlandic way of life.",
        "King Edward Point, South Georgia": "King Edward Point is the capital of South Georgia and the South Sandwich Islands, known for its Antarctic landscapes, wildlife, and research stations.",
        "Accra, Ghana": "Accra is the capital of Ghana, known for its lively markets, historic forts and castles, and a blend of African culture and British colonial history.",
        "Suva, Fiji": "Suva is the capital of Fiji, offering a mix of South Pacific charm, a diverse Fijian culture, and access to beautiful coral reefs.",
        "Montevideo, Uruguay": "Montevideo is the capital of Uruguay, known for its scenic waterfront, historic neighborhoods, and a blend of Spanish and South American influences.",
        "West Island, Cocos (Keeling) Islands": "West Island is the capital of the Cocos (Keeling) Islands, known for its pristine beaches, coral atolls, and a tranquil Indian Ocean paradise.",
        "Port-aux-Français, French Southern and Antarctic Lands": "Port-aux-Français is the capital of the French Southern and Antarctic Lands, offering a remote base for scientific research in the southern Indian Ocean.",
        "Riyadh, Saudi Arabia": "Riyadh is the capital of Saudi Arabia, known for its modern architecture, historic sites, and a blend of traditional Arabian culture and cosmopolitan lifestyle.",
        "Kyiv, Ukraine": "Kyiv is the capital of Ukraine, known for its historic cathedrals, vibrant street art scene, and a blend of Slavic and European influences.",
        "Berlin, Germany": "Berlin is the capital of Germany, known for its rich history, cultural diversity, and a vibrant arts and music scene.",
        "Moscow, Russia": "Moscow is the capital of Russia, known for its iconic Red Square, historic cathedrals, and a blend of Russian tradition and modernity.",
        "Macau": "Macau, also spelled as 'Macao', is a special administrative region of China, known for its vibrant casinos, Portuguese colonial history, and a mix of Chinese and Portuguese cultures.",
        "City of San Marino, San Marino": "The City of San Marino is the capital of San Marino, known for its medieval architecture, stunning views, and a microstate with a rich history.",
        "Damascus, Syria": "Damascus is the capital of Syria, known for its ancient history, historic Old City, and a blend of Middle Eastern cultures.",
        "Guatemala City, Guatemala": "Guatemala City is the capital of Guatemala, offering a mix of Mayan heritage, Spanish colonial architecture, and a bustling city life.",
        "Oslo, Norway": "Oslo is the capital of Norway, known for its scenic fjords, Viking history, and a blend of Nordic culture and modernity.",
        "Fakaofo, Tokelau": "Fakaofo is the capital of Tokelau, known for its coral atolls, Polynesian culture, and a tranquil South Pacific paradise.",
        "Vientiane, Laos": "Vientiane is the capital of Laos, offering a mix of French colonial architecture, Buddhist temples, and a relaxed Laotian atmosphere.",
        "Pyongyang, North Korea": "Pyongyang is the capital of North Korea, known for its strict government control, monumental architecture, and a unique North Korean culture.",
        "Doha, Qatar": "Doha is the capital of Qatar, known for its modern skyscrapers, Arabian heritage, and a blend of traditional culture and global commerce.",
        "San Salvador, El Salvador": "San Salvador is the capital of El Salvador, offering a mix of history, vibrant street markets, and a blend of indigenous and Spanish influences.",
        "Marigot, Saint Martin": "Marigot is the capital of the French overseas collectivity of Saint Martin, known for its French-Caribbean culture, beautiful beaches, and a relaxed atmosphere.",
        "Nur-Sultan, Kazakhstan": "Nur-Sultan, formerly known as Astana, is the capital of Kazakhstan, known for its futuristic architecture, Eurasian culture, and a rapidly developing cityscape.",
        "Longyearbyen, Svalbard and Jan Mayen": "Longyearbyen is the largest settlement on Svalbard, an archipelago under Norwegian sovereignty, known for its Arctic landscapes, polar bears, and research stations.",
        "New Delhi, India": "New Delhi is the capital of India, known for its historic landmarks, bustling markets, and a rich blend of Indian cultures and traditions.",
        "Roseau, Dominica": "Roseau is the capital of Dominica, known for its colonial architecture, lush rainforests, and a relaxed Caribbean way of life.",
        "Porto-Novo, Benin": "Porto-Novo is the official capital of Benin, offering a blend of African culture, French colonial history, and a vibrant atmosphere.",
        "Vaduz, Liechtenstein": "Vaduz is the capital of Liechtenstein, known for its medieval castle, alpine landscapes, and a blend of German and Swiss influences.",
        "Kralendijk, Caribbean Netherlands": "Kralendijk is the capital of the Caribbean Netherlands, specifically Bonaire, known for its crystal-clear waters, coral reefs, and a laid-back island lifestyle.",
        "Lusaka, Zambia": "Lusaka is the capital of Zambia, known for its vibrant markets, colonial-era architecture, and a blend of African culture and British colonial history.",
        "Sucre, Bolivia": "Sucre is the constitutional capital of Bolivia, known for its colonial architecture, indigenous culture, and historic significance as the place of Bolivia's independence declaration.",
        "Rabat, Morocco": "Rabat is the capital of Morocco, known for its historic medina, Islamic heritage, and a blend of Arab and French cultures.",
        "Majuro, Marshall Islands": "Majuro is the capital of the Marshall Islands, known for its coral atolls, Micronesian culture, and access to the Pacific Ocean.",
        "Djibouti, Djibouti": "Djibouti is the capital of Djibouti, offering a mix of African and Arabian cultures, beautiful coastlines, and a strategic location at the Bab-el-Mandeb strait.",
        "Addis Ababa, Ethiopia": "Addis Ababa is the capital of Ethiopia, known for its rich history, diverse cultures, and a blend of African and Ethiopian traditions.",
        "Manila, Philippines": "Manila is the capital of the Philippines, known for its historic sites, vibrant street life, and a mix of Spanish and Asian influences.",
        "Mexico City, Mexico": "Mexico City is the capital of Mexico, known for its historic center, Aztec ruins, and a blend of indigenous and Spanish colonial cultures.",
        "San Juan, Puerto Rico": "San Juan is the capital of Puerto Rico, known for its historic forts, vibrant neighborhoods, and a unique blend of Spanish and Caribbean influences.",
        "Abuja, Nigeria": "Abuja is the capital of Nigeria, offering modern government buildings, diverse cultures, and a central role in the country's governance.",
        "Tegucigalpa, Honduras": "Tegucigalpa is the capital of Honduras, known for its historic landmarks, vibrant markets, and a blend of indigenous and Spanish colonial influences.",
        "Vienna, Austria": "Vienna is the capital of Austria, known for its imperial palaces, classical music, and a blend of Austrian and Central European cultures.",
        "Malé, Maldives": "Malé is the capital of the Maldives, known for its stunning coral reefs, Islamic culture, and access to the Indian Ocean.",
        "Belgrade, Serbia": "Belgrade is the capital of Serbia, known for its historic architecture, vibrant nightlife, and a blend of Eastern and Western European influences.",
        "Tórshavn, Faroe Islands": "Tórshavn is the capital of the Faroe Islands, known for its picturesque landscapes, Viking heritage, and a unique blend of Nordic and North Atlantic cultures.",
        "Fort-de-France, Martinique": "Fort-de-France is the capital of Martinique, known for its French-Caribbean culture, beautiful beaches, and a relaxed island atmosphere.",
        "Victoria, Seychelles": "Victoria is the capital of Seychelles, offering a mix of Creole culture, pristine beaches, and access to the Indian Ocean.",
        "Kuwait City, Kuwait": "Kuwait City is the capital of Kuwait, known for its modern skyline, Arabian heritage, and a blend of traditional culture and global commerce.",
        "Bishkek, Kyrgyzstan": "Bishkek is the capital of Kyrgyzstan, offering Soviet-era architecture, Central Asian culture, and access to the Tian Shan mountains.",
        "Stockholm, Sweden": "Stockholm is the capital of Sweden, known for its beautiful archipelago, historic Old Town, and a blend of Nordic culture and modern design.",
        "Mogadishu, Somalia": "Mogadishu is the capital of Somalia, known for its coastal beauty, historic landmarks, and a resilient spirit in a challenging environment.",
        "Valletta, Malta": "Valletta is the capital of Malta, known for its fortified city walls, historic sites, and a blend of European and Mediterranean cultures."
    };

    const data = await axios.get("https://restcountries.net/v3.1/all");
    const countries = await data.data;

    const r1 = countries[Math.floor((Math.random()*countries.length))];
    const r2 = countries[Math.floor((Math.random()*countries.length))];
    const r3 = countries[Math.floor((Math.random()*countries.length))];

    const featured1 = 
    { 
        country_name: r1.name.common, 
        country_capital: r1.capital, 
        country_flag: r1.flag,
        country_desc: allCountries[`${r1.capital}, ${r1.name.common}`]
    };
    const featured2 = 
    { 
        country_name: r2.name.common, 
        country_capital: r2.capital, 
        country_flag: r2.flag,
        country_desc: allCountries[`${r2.capital}, ${r2.name.common}`]
    };
    const featured3 = 
    { 
        country_name: r3.name.common, 
        country_capital: r3.capital, 
        country_flag: r3.flag,
        country_desc: allCountries[`${r3.capital}, ${r3.name.common}`]
    };

    res.status(200).json({ "featured_countries": [featured1, featured2, featured3] });
});

app.get('/getWeatherFromCity', async (req, res) => {
    const { capital, country } = req.query;
    const location = `${capital}, ${country}`;
    opencage.geocode({ q: location , key: opencageAPIKey })
        .then(async data => {
            try {
                const cords = data.results[0].geometry;
                const lat = cords.lat;
                const lng = cords.lng;
                
                const weatherAPIUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`;

                try {
                    const response = await axios.get(weatherAPIUrl);
                    const weather = [
                        response.data.daily.temperature_2m_max[0], 
                        response.data.daily.temperature_2m_min[0]
                    ];
                    res.status(200).json(weather);    
                } catch (error) {
                    console.log('error', error.message);
                }

            } catch (error) {
                res.status(500).json({ error: 'Error Fetching data from the API' });
            }})
        .catch(error => {
            console.log('error', error.message);
        });
});

app.get('/getWeatherFromLocation', async (req, res) => {
    const { city = null, state = null, country = null } = req.query;
    const location = `${city ? city + "," : null} ${state ? state + "," : null} ${country ? country : null}`;

    opencage.geocode({ q: location , key: opencageAPIKey })
        .then(async data => {
            try {
                const cords = data.results[0].geometry;
                const lat = cords.lat;
                const lng = cords.lng;

                const weatherAPIUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`;

                try {
                    const response = await axios.get(weatherAPIUrl);
                    const weather = [
                        response.data.daily.temperature_2m_max[0], 
                        response.data.daily.temperature_2m_min[0]
                    ];
                    res.status(200).json(weather);    
                } catch (error) {
                    console.log('error', error.message);
                }

            } catch (error) {
                res.status(500).json({ error: 'Error Fetching data from the API' });
            }
        })
        .catch(error => {
            console.log('error', error.message);
        });

});

app.get('/getDescFromLocation', async (req, res) => {
    const { city } = req.query;
    const DescAPIUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}&key=${googleMapsAPIKey}`;

    try {
        const response = await axios.get(DescAPIUrl);
        const desc = response.data.results[0].formatted_address;
        res.status(200).json(desc);    
    } catch (error) {
        console.log('error', error.message);
    }
});

app.get('/getLocationImgsFromPlaceId', async (req, res) => {
    const { place_id } = req.query;
    const getLocationImgDataFromPlaceIdUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=photos&key=${googleMapsAPIKey}`;

    const response = (await axios.get(getLocationImgDataFromPlaceIdUrl)).data;

    if (response.result && response.result.photos) {
        const photoReferences = response.result.photos.map((photo) => photo.photo_reference);
        
        const photos = await Promise.all(photoReferences.map(async (photoReference) => {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=250&maxheight=250&photoreference=${photoReference}&key=${googleMapsAPIKey}`;
            const photoResponse = await axios.get(photoUrl, {responseType: 'arraybuffer'});
            const photoData = Buffer.from(photoResponse.data).toString('base64');

            return photoData;
        }));

        res.status(200).json(photos);

    } else {
        console.log('error', response.error_message || 'Error Fetching Photos From Place ID');
    }
});

app.get('/getFeaturedCountryImgs', async (req, res) => {
    const { capital = null, country = null } = req.query;
    const location = `${capital ? capital + ',' : null} ${country ? country : null}`;
    const googleGetPlaceAPIUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&inputtype=textquery&fields=photos&key=${googleMapsAPIKey}`;

    try{
        const photos = (await axios.get(googleGetPlaceAPIUrl)).data.candidates[0].photos;
        const photoReferences = photos.map((photo) => photo.photo_reference);
        const base64Photos = await Promise.all(photoReferences.map(async (photoReference) => {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=${photoReference}&key=${googleMapsAPIKey}`;
            const photoResponse = await axios.get(photoUrl, {responseType: 'arraybuffer'});
            const photoData = Buffer.from(photoResponse.data).toString('base64');
            return photoData;
        }));

        res.status(200).json(base64Photos);
    } catch (error) {
        console.error('Error Retrieveing data from the API', error.message);
        res.status(500).json({ error: 'Error Retrieveing data from the API' });
    };

});

app.get('/getLocationThingsToDo', async (req, res) => {
    const { location=null } = req.query;
    const headers = {accept: 'application/json'}

    const tripadvisorAPIUrl = `https://api.content.tripadvisor.com/api/v1/location/search?key=${tripadvisorAPIKey}&searchQuery=${location}&category=restaurants&radius=25&radiusUnit=mi&language=en`;
    const locationDetails = (await (axios.get(tripadvisorAPIUrl, { headers }))).data;
    console.log('START OF LOGGING');
    
    const locationAllDetailsPromises = await Promise.allSettled(locationDetails.data.map(async (location, index) => {
        console.log('LOCATION: ', location);
        const getLocationDescUrl = `https://api.content.tripadvisor.com/api/v1/location/${location.location_id}/details?key=${tripadvisorAPIKey}&language=en&currency=USD`;
        const locationDescAndUrl = (await (axios.get(getLocationDescUrl, { headers }))).data;
        const locationDesc = locationDescAndUrl.description;
        const locationUrl = locationDescAndUrl.web_url;

        if (index != 0) {
            try {
                const getAllInfoUrl = `https://api.content.tripadvisor.com/api/v1/location/${location.location_id}/photos?language=en&key=B400D6F22AC54FAFA4CF4F14AEEAC699`; //gets url to tripadvisor and the imgs
                const allInfoUrl = (await axios.get(getAllInfoUrl, { headers })).data.data;
    
                const allImgs = allInfoUrl.map((img) => img.images.original.url);
    
                console.log(`index: ${index}`, `location_id: ${location.location_id}`, 'allImgsObject: ', allImgs, 'web_url: ', locationUrl);
    
                if (location.name && locationDesc && allImgs) {
                    return {name: location.name, description: locationDesc , allImgs: allImgs, webUrl: locationUrl};
                } else {
                    console.error(`Error Fetching Location Details for ${index}`);
                }
            } catch (error) {
                console.error(`Error Fetching Location Images for ${index}`, `Location ID: ${location.location_id}`, error.message);
            }
        } else {
            console.log(`index: ${index}`, `location_id: ${location.location_id}`, 'allImgsObject: ', null);
            if (location.name && locationDesc) {
                return {name: location.name, description: locationDesc, allImgs: null, webUrl: locationUrl};
            } else {
                console.error(`Error Fetching Location Details for ${index}`);
            }
        }
    }));

    const locationAllDetails = locationAllDetailsPromises.map((location) => {
        console.log('location: ', location);
        if (location && location.value && location.value.name && location.value.description && location.value.webUrl) {
            return {name: location.value.name, description: location.value.description , allImgs: location.value.allImgs, webUrl: location.value.webUrl};
        } else {
            return {name: null, description: null, allImgs: null, webUrl: null};
        }
    });

    console.log('locationAllDetails: ', locationAllDetails);
    console.log('END OF LOGGING');
    res.status(200).json(locationAllDetails);
});

app.get('/getPlaceIDFromLocation', async (req, res) => {
    const { location } = req.query;
    const placeAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleMapsAPIKey}`;
    const response = (await axios.get(placeAPIUrl)).data;
    console.log('response: ', response);
    const placeID = response.results[0].place_id;
    console.log('placeID: ', placeID);
    res.status(200).json(placeID);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});