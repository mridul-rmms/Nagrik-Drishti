import test from 'node:test';
import assert from 'node:assert/strict';
import { analyseComplaint } from '../server/domain/analysis.js';

test('Hindi pothole complaint is analysed as a high-priority roads issue', () => {
  const result = analyseComplaint({ content: 'भिखना पहाड़ी स्कूल के पास सड़क में बहुत बड़ा गड्ढा है। बच्चों को खतरा है, कृपया जल्द ठीक करें। #BiharRoadProblem', locality: 'Patna, Bhikhna Pahari', mediaLabel: 'Road-damage image' });
  assert.equal(result.isGrievance, true);
  assert.equal(result.category, 'roads');
  assert.equal(result.routing.code, 'ULB');
  assert.equal(result.location.locality, 'Patna');
  assert.equal(result.urgency, 'critical');
});

test('Hinglish electricity complaint routes to power distribution', () => {
  const result = analyseComplaint({ content: 'Tilka Manjhi hospital ke paas bijli baar baar ja rahi hai, please fix power outage. #PowerCutBihar', locality: 'Bhagalpur', mediaLabel: 'No media' });
  assert.equal(result.category, 'electricity');
  assert.equal(result.routing.code, 'POWER');
  assert.equal(result.sentiment, 'negative');
});

test('Kosi flood complaint is classified as flood disaster and routes to WRD', () => {
  const result = analyseComplaint({ content: 'कोसी नदी का जलस्तर बढ़ने से सहरसा के गांव में बाढ़ आ गई है, राहत सामग्री पहुंचाएं। #KosiFlood #बिहारबाढ़', locality: 'Saharsa' });
  assert.equal(result.isGrievance, true);
  assert.equal(result.category, 'flood');
  assert.equal(result.routing.code, 'WRD');
  assert.equal(result.urgency, 'critical');
});

test('Hospital doctor unavailable complaint routes to health department', () => {
  const result = analyseComplaint({ content: 'सरकारी अस्पताल में डॉक्टर उपलब्ध नहीं हैं और दवा की भारी कमी है। #BiharHealth #DoctorNotAvailable', locality: 'Patna' });
  assert.equal(result.isGrievance, true);
  assert.equal(result.category, 'healthcare');
  assert.equal(result.routing.code, 'HEALTH');
});

test('PDS ration card complaint routes to food and consumer protection', () => {
  const result = analyseComplaint({ content: 'राशन डीलर 2 महीने से अनाज नहीं दे रहा, राशन कार्ड की समस्या है। #BiharRation #RationNotReceived', locality: 'Begusarai' });
  assert.equal(result.isGrievance, true);
  assert.equal(result.category, 'ration');
  assert.equal(result.routing.code, 'FOOD_PDS');
});

test('Broken bridge complaint routes to structural engineering department', () => {
  const result = analyseComplaint({ content: 'छपरा में नहर पर टूटा पुल कभी भी गिर सकता है, पुल मरम्मत कराई जाए। #BiharBridge #BrokenBridgeBihar', locality: 'Chhapra' });
  assert.equal(result.isGrievance, true);
  assert.equal(result.category, 'infrastructure');
  assert.equal(result.routing.code, 'ULB');
});
