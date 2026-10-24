import { CATEGORY_META, CATEGORIES, DEPARTMENTS, LOCALITY_INDEX } from './constants.js';
import { normaliseText } from './geo.js';

const categorySignals = Object.freeze({
  [CATEGORIES.ROADS]: ['pothole', 'potholes', 'road', 'roads', 'crater', 'footpath', 'bad roads', 'road repair', 'गड्ढ', 'सड़क', 'सड़क', 'रास्ता', 'मरम्मत', 'खराब सड़क', 'टूटी सड़क'],
  [CATEGORIES.WATER]: ['water', 'drinking water', 'supply', 'pipeline', 'tap', 'leak', 'water crisis', 'no water', 'nal jal', 'pani', 'पानी', 'जल', 'नल', 'पाइप', 'जलापूर्ति', 'पेयजल', 'नल जल', 'जल संकट', 'हर घर नल'],
  [CATEGORIES.SANITATION]: ['garbage', 'waste', 'sewage', 'trash', 'sanitation', 'dustbin', 'safai', 'कचरा', 'गंदगी', 'सफाई', 'कचरा प्रबंधन'],
  [CATEGORIES.ELECTRICITY]: ['power', 'electric', 'electricity', 'meter', 'power cut', 'power outage', 'low voltage', 'transformer', 'bijli', 'बिजली', 'कटौती', 'मीटर', 'खंभ', 'ट्रांसफार्मर', 'वोल्टेज', 'बिजली नहीं'],
  [CATEGORIES.DRAINAGE]: ['drain', 'waterlogging', 'flooded', 'overflow', 'drainage', 'blocked drain', 'sewer', 'nala', 'नाला', 'जलजमाव', 'नाली', 'सीवर', 'जल निकासी'],
  [CATEGORIES.INFRASTRUCTURE]: ['broken bridge', 'bridge repair', 'damaged bridge', 'culvert', 'public asset', 'पुल', 'पुलिया', 'टूटा पुल', 'क्षतिग्रस्त पुल', 'पुल मरम्मत'],
  [CATEGORIES.FLOOD]: ['flood', 'kosi', 'gandak', 'bagmati', 'flood relief', 'flood affected', 'flood compensation', 'बाढ़', 'बाढ़', 'कोसी', 'गंडक', 'बागमती', 'बाढ़ राहत', 'बाढ़ प्रभावित', 'बाढ़ मुआवजा'],
  [CATEGORIES.HEALTHCARE]: ['hospital', 'doctor', 'medicine', 'ambulance', 'health', 'clinic', 'nurse', 'अस्पताल', 'डॉक्टर', 'दवा', 'एम्बुलेंस', 'स्वास्थ्य', 'सरकारी अस्पताल'],
  [CATEGORIES.EDUCATION]: ['school', 'teacher', 'education', 'classroom', 'school toilet', 'school building', 'स्कूल', 'शिक्षक', 'शिक्षा', 'विद्यालय', 'मास्टर'],
  [CATEGORIES.RATION]: ['ration', 'pds', 'ration card', 'ration dealer', 'khadya', 'राशन', 'राशन कार्ड', 'पीडीएस', 'डीलर', 'कोटेदार', 'अनाज'],
  [CATEGORIES.PENSION]: ['pension', 'old age pension', 'widow pension', 'disability pension', 'पेंशन', 'वृद्धावस्था', 'विधवा', 'दिव्यांग'],
  [CATEGORIES.HOUSING]: ['awas', 'housing', 'pmay', 'housing scheme', 'आवास', 'मकान', 'इंदिरा आवास', 'आवास योजना'],
  [CATEGORIES.AGRICULTURE]: ['farmer', 'crop', 'crop damage', 'irrigation', 'fertilizer', 'kisan', 'किसान', 'फसल', 'नुकसान', 'सिंचाई', 'खाद', 'यूरिया'],
  [CATEGORIES.TRAFFIC]: ['traffic', 'traffic jam', 'traffic signal', 'jam', 'यातायात', 'ट्रैफिक', 'जाम', 'सिग्नल'],
  [CATEGORIES.LIGHTING]: ['streetlight', 'street light', 'light off', 'स्ट्रीट लाइट', 'स्ट्रीटलाइट', 'बत्ती'],
  [CATEGORIES.SCHEMES]: ['scheme', 'yojana', 'dbt', 'subsidy', 'pending payment', 'योजना', 'डीबीटी', 'भुगतान', 'सरकारी योजना'],
  [CATEGORIES.ENCROACHMENT]: ['encroachment', 'illegal encroachment', 'footpath encroachment', 'अतिक्रमण', 'अवैध अतिक्रमण'],
  [CATEGORIES.GRIEVANCE]: ['grievance', 'complaint', 'public problem', 'civic issue', 'janta pareshan', 'शिकायत', 'जन शिकायत', 'नागरिक शिकायत', 'जन समस्या', 'जनता परेशान']
});
const urgencySignals = ['urgent', 'danger', 'accident', 'school', 'hospital', 'flood', 'overflow', 'fire', 'ambulance', 'death', 'emergency', 'जल्द', 'खतरा', 'दुर्घटना', 'बच्च', 'तुरंत', 'आपात', 'गंभीर', 'बाढ़', 'जान', 'इमरजेंसी'];
const negativeSignals = ['no ', 'not ', 'broken', 'damage', 'waste', 'outage', 'problem', 'bad', 'cut', 'shortage', 'absent', 'jam', 'नहीं', 'खराब', 'टूटा', 'गंदा', 'परेशान', 'कमी', 'बंद', 'लंबित', 'जाम', 'समस्या', 'संकट'];
const civicSignals = [...Object.values(categorySignals).flat(), 'please', 'help', 'complaint', 'grievance', 'issue', 'कृपया', 'शिकायत', 'सुधार', 'मदद', 'गुहार', 'ध्यान दें'];

function scoreSignals(text, words) { return words.reduce((score, word) => score + (text.includes(word) ? 1 : 0), 0); }

function detectCategory(text, mediaLabel = '') {
  const extendedText = `${text} ${mediaLabel}`.toLowerCase();
  const scores = Object.entries(categorySignals).map(([category, words]) => [category, scoreSignals(extendedText, words)]);
  const [category, score] = scores.sort((a, b) => b[1] - a[1])[0];
  return { category: score ? category : CATEGORIES.GRIEVANCE, score };
}

function extractLocation(text, suppliedLocation) {
  const corpus = normaliseText(`${text} ${suppliedLocation || ''}`);
  const matched = LOCALITY_INDEX.find((place) => place.aliases.some((alias) => corpus.includes(normaliseText(alias))));
  if (!matched) return { locality: suppliedLocation || 'Location pending review', district: null, latitude: null, longitude: null, confidence: 'low' };
  return { locality: matched.locality, district: matched.district, latitude: matched.latitude, longitude: matched.longitude, confidence: suppliedLocation ? 'high' : 'medium' };
}

function routeDepartment(category, text) {
  const corpus = normaliseText(text);
  if (category === CATEGORIES.ROADS && /(rural|village|gram|ग्रामीण|गांव|टोला)/.test(corpus)) return { code: 'RWD', confidence: 0.82 };
  if (category === CATEGORIES.ROADS && /(highway|state road|major district|राज्य मार्ग|राजमार्ग|पथ)/.test(corpus)) return { code: 'RCD', confidence: 0.84 };
  if (category === CATEGORIES.DRAINAGE && /(embankment|river|तटबंध|नदी|बाढ़|कटाव)/.test(corpus)) return { code: 'WRD', confidence: 0.8 };
  const department = DEPARTMENTS.find((entry) => entry.categories.includes(category)) || DEPARTMENTS[0];
  return { code: department.code, confidence: 0.72 };
}

export function analyseComplaint(input) {
  const content = input.content?.trim() || '';
  const text = normaliseText(content);
  const categoryResult = detectCategory(text, input.mediaLabel);
  const civicHits = scoreSignals(text, civicSignals);
  const isGrievance = civicHits > 0 || categoryResult.score > 0;
  const negativeHits = scoreSignals(text, negativeSignals);
  const urgencyHits = scoreSignals(text, urgencySignals);
  const urgency = urgencyHits >= 2 ? 'critical' : urgencyHits === 1 ? 'high' : categoryResult.score >= 2 ? 'medium' : 'low';
  const sentiment = negativeHits ? 'negative' : isGrievance ? 'neutral' : 'positive';
  const severity = urgency === 'critical' ? 'critical' : categoryResult.score >= 3 ? 'high' : categoryResult.score >= 1 ? 'medium' : 'low';
  const location = extractLocation(content, input.locality);
  const routing = routeDepartment(categoryResult.category, content);
  const action = CATEGORY_META[categoryResult.category].defaultAction;
  const confidence = Math.min(0.96, 0.45 + categoryResult.score * 0.12 + (location.confidence === 'high' ? 0.12 : location.confidence === 'medium' ? 0.06 : 0));
  const department = DEPARTMENTS.find((entry) => entry.code === routing.code);

  return {
    isGrievance,
    confidence: Number(confidence.toFixed(2)),
    category: categoryResult.category,
    sentiment,
    urgency,
    severity,
    location,
    routing,
    action,
    explanation: `Demo text analysis detected ${CATEGORY_META[categoryResult.category].label.toLowerCase()}, ${sentiment} sentiment, ${urgency} urgency, and recommends ${department.name}. Human verification is required.`
  };
}
