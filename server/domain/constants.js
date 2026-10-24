export const CATEGORIES = Object.freeze({
  ROADS: 'roads',
  WATER: 'water',
  SANITATION: 'sanitation',
  ELECTRICITY: 'electricity',
  DRAINAGE: 'drainage',
  INFRASTRUCTURE: 'infrastructure',
  FLOOD: 'flood',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  RATION: 'ration',
  PENSION: 'pension',
  HOUSING: 'housing',
  AGRICULTURE: 'agriculture',
  TRAFFIC: 'traffic',
  LIGHTING: 'lighting',
  SCHEMES: 'schemes',
  ENCROACHMENT: 'encroachment',
  GRIEVANCE: 'grievance'
});

export const CATEGORY_META = Object.freeze({
  [CATEGORIES.ROADS]: { label: 'Roads & potholes', icon: 'road', defaultAction: 'Inspect road segment, log pothole coordinates, and schedule road repair.' },
  [CATEGORIES.WATER]: { label: 'Drinking water & Nal-Jal', icon: 'water', defaultAction: 'Verify water supply network/pipeline and dispatch maintenance team.' },
  [CATEGORIES.SANITATION]: { label: 'Sanitation & garbage', icon: 'waste', defaultAction: 'Dispatch waste collection team and clear accumulated garbage.' },
  [CATEGORIES.ELECTRICITY]: { label: 'Electricity & power cuts', icon: 'power', defaultAction: 'Inspect transformer/feeder line and restore power supply.' },
  [CATEGORIES.DRAINAGE]: { label: 'Drainage & waterlogging', icon: 'drain', defaultAction: 'Clear blocked drain/sewer and restore stormwater drainage flow.' },
  [CATEGORIES.INFRASTRUCTURE]: { label: 'Bridges & public assets', icon: 'asset', defaultAction: 'Inspect damaged bridge/structure and initiate emergency structural repairs.' },
  [CATEGORIES.FLOOD]: { label: 'Flood relief & rescue', icon: 'flood', defaultAction: 'Alert disaster management team, inspect embankment, and dispatch relief.' },
  [CATEGORIES.HEALTHCARE]: { label: 'Hospitals & healthcare', icon: 'health', defaultAction: 'Verify doctor/medicine availability and notify district civil surgeon.' },
  [CATEGORIES.EDUCATION]: { label: 'Schools & education', icon: 'school', defaultAction: 'Notify District Education Officer (DEO) and inspect school facilities.' },
  [CATEGORIES.RATION]: { label: 'Ration & PDS complaints', icon: 'ration', defaultAction: 'Inspect PDS dealer, verify biometric/stock registers, and release ration.' },
  [CATEGORIES.PENSION]: { label: 'Social security & pensions', icon: 'pension', defaultAction: 'Verify beneficiary Aadhaar/bank linking and process pending pension.' },
  [CATEGORIES.HOUSING]: { label: 'Awas Yojana & housing', icon: 'housing', defaultAction: 'Verify geo-tagging status and disburse pending housing installment.' },
  [CATEGORIES.AGRICULTURE]: { label: 'Agriculture & farmers', icon: 'farmer', defaultAction: 'Assess crop damage/fertilizer distribution and process farmer subsidy.' },
  [CATEGORIES.TRAFFIC]: { label: 'Traffic & signal jams', icon: 'traffic', defaultAction: 'Deploy traffic police personnel and recalibrate signal timing.' },
  [CATEGORIES.LIGHTING]: { label: 'Street lighting', icon: 'light', defaultAction: 'Dispatch electrical field team to replace non-functional streetlights.' },
  [CATEGORIES.SCHEMES]: { label: 'Government schemes & DBT', icon: 'scheme', defaultAction: 'Verify PFMS/DBT transaction status and resolve beneficiary grievance.' },
  [CATEGORIES.ENCROACHMENT]: { label: 'Encroachment removal', icon: 'encroachment', defaultAction: 'Issue encroachment notice and schedule anti-encroachment drive.' },
  [CATEGORIES.GRIEVANCE]: { label: 'General public grievance', icon: 'grievance', defaultAction: 'Forward grievance to District Public Grievance Redressal Officer.' }
});

export const DEPARTMENTS = Object.freeze([
  { code: 'ULB', name: 'Urban Local Body (Nagar Nigam / Parishad)', categories: [CATEGORIES.ROADS, CATEGORIES.SANITATION, CATEGORIES.DRAINAGE, CATEGORIES.INFRASTRUCTURE, CATEGORIES.LIGHTING, CATEGORIES.ENCROACHMENT] },
  { code: 'RWD', name: 'Rural Works Department (Gramin Karya)', categories: [CATEGORIES.ROADS, CATEGORIES.INFRASTRUCTURE] },
  { code: 'RCD', name: 'Road Construction Department (Path Nirman)', categories: [CATEGORIES.ROADS, CATEGORIES.INFRASTRUCTURE] },
  { code: 'PHED', name: 'Public Health Engineering Department (Nal-Jal)', categories: [CATEGORIES.WATER] },
  { code: 'POWER', name: 'Bihar State Power Holding Company (BSPHCL / Discom)', categories: [CATEGORIES.ELECTRICITY] },
  { code: 'WRD', name: 'Water Resources & Disaster Management (WRD / DMD)', categories: [CATEGORIES.DRAINAGE, CATEGORIES.FLOOD] },
  { code: 'HEALTH', name: 'Health Department (Swasthya Vibhag)', categories: [CATEGORIES.HEALTHCARE] },
  { code: 'EDUCATION', name: 'Education Department (Shiksha Vibhag)', categories: [CATEGORIES.EDUCATION] },
  { code: 'FOOD_PDS', name: 'Food & Consumer Protection (Khadya Evam Upbhokta)', categories: [CATEGORIES.RATION] },
  { code: 'SOCIAL_WELFARE', name: 'Social Welfare Department (Samaj Kalyan)', categories: [CATEGORIES.PENSION] },
  { code: 'RURAL_DEV', name: 'Rural Development Department (Gramin Vikas - Awas)', categories: [CATEGORIES.HOUSING] },
  { code: 'AGRICULTURE', name: 'Agriculture Department (Krishi Vibhag)', categories: [CATEGORIES.AGRICULTURE] },
  { code: 'TRAFFIC_POLICE', name: 'Traffic Police & Transport Department', categories: [CATEGORIES.TRAFFIC] },
  { code: 'PGRO', name: 'Public Grievance Redressal Office (Lok Shikayat)', categories: [CATEGORIES.SCHEMES, CATEGORIES.GRIEVANCE] }
]);

export const LIFECYCLE = Object.freeze(['Detected', 'Needs Review', 'Verified', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Rejected']);
export const ACTIVE_STATUSES = Object.freeze(['Detected', 'Needs Review', 'Verified', 'Assigned', 'In Progress']);

export const LOCALITY_INDEX = Object.freeze([
  { locality: 'Patna', district: 'Patna', latitude: 25.5941, longitude: 85.1376, aliases: ['patna', 'पटना', 'kadamkuan', 'bailey road', 'bhikhna pahari', 'gandhi maidan', 'danapur', 'kankarbagh', 'boring road'] },
  { locality: 'Gaya', district: 'Gaya', latitude: 24.7955, longitude: 85.0002, aliases: ['gaya', 'गया', 'ap colony', 'bodh gaya', 'bodhgaya'] },
  { locality: 'Muzaffarpur', district: 'Muzaffarpur', latitude: 26.1209, longitude: 85.3647, aliases: ['muzaffarpur', 'मुजफ्फरपुर', 'chakkar maidan', 'motijheel'] },
  { locality: 'Bhagalpur', district: 'Bhagalpur', latitude: 25.2425, longitude: 86.9842, aliases: ['bhagalpur', 'भागलपुर', 'tilka manjhi', 'barari', 'kahalgaon'] },
  { locality: 'Darbhanga', district: 'Darbhanga', latitude: 26.1542, longitude: 85.8918, aliases: ['darbhanga', 'दरभंगा', 'laheriasarai', 'kosi'] },
  { locality: 'Purnia', district: 'Purnia', latitude: 25.7771, longitude: 87.4753, aliases: ['purnia', 'पूर्णिया', 'line bazar'] },
  { locality: 'Bihar Sharif', district: 'Nalanda', latitude: 25.1986, longitude: 85.5239, aliases: ['bihar sharif', 'बिहार शरीफ', 'nalanda', 'राजगीर', 'rajgir'] },
  { locality: 'Samastipur', district: 'Samastipur', latitude: 25.8628, longitude: 85.7811, aliases: ['samastipur', 'समस्तीपुर', 'tajpur', 'rosera'] },
  { locality: 'Begusarai', district: 'Begusarai', latitude: 25.4182, longitude: 86.1272, aliases: ['begusarai', 'बेगूसराय', 'barauni'] },
  { locality: 'Munger', district: 'Munger', latitude: 25.3756, longitude: 86.4744, aliases: ['munger', 'मुंगेर', 'jamalpur'] },
  { locality: 'Saharsa', district: 'Saharsa', latitude: 25.8835, longitude: 86.5953, aliases: ['saharsa', 'सहरसा', 'kosi'] },
  { locality: 'Katihar', district: 'Katihar', latitude: 25.5541, longitude: 87.5716, aliases: ['katihar', 'कटिहार'] },
  { locality: 'Arrah', district: 'Bhojpur', latitude: 25.5560, longitude: 84.6603, aliases: ['arrah', 'आरा', 'bhojpur', 'भोजपुर'] },
  { locality: 'Chhapra', district: 'Saran', latitude: 25.7848, longitude: 84.7274, aliases: ['chhapra', 'छपरा', 'saran', 'सारण'] },
  { locality: 'Motihari', district: 'East Champaran', latitude: 26.6469, longitude: 84.9089, aliases: ['motihari', 'मोतिहारी', 'champaran', 'चंपारण'] },
  { locality: 'Bettiah', district: 'West Champaran', latitude: 26.8024, longitude: 84.5028, aliases: ['bettiah', 'बेतिया', 'bagmati', 'gandak'] },
  { locality: 'Sitamarhi', district: 'Sitamarhi', latitude: 26.5937, longitude: 85.4894, aliases: ['sitamarhi', 'सीतामढ़ी', 'bagmati'] },
  { locality: 'Madhubani', district: 'Madhubani', latitude: 26.3544, longitude: 86.0718, aliases: ['madhubani', 'मधुबनी', 'jhanjharpur'] },
  { locality: 'Sasaram', district: 'Rohtas', latitude: 24.9520, longitude: 84.0315, aliases: ['sasaram', 'सासाराम', 'rohtas', 'रोहतास', 'dehri'] },
  { locality: 'Vaishali', district: 'Vaishali', latitude: 25.6833, longitude: 85.2167, aliases: ['vaishali', 'वैशाली', 'hajipur', 'हाजीपुर'] }
]);
