const iso = (day, hour = 9) => `2026-10-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:00.000Z`;

export const samplePosts = [
  // 1. Roads & Potholes (Bihar Road Problem / बिहार सड़क समस्या / #BiharRoadProblem)
  ['demo-001', 'X', 'Patna, Bhikhna Pahari', 'भिखना पहाड़ी स्कूल के पास सड़क में बहुत बड़ा गड्ढा है। बच्चों को आने-जाने में खतरा है, कृपया जल्द ठीक करें। #BiharRoadProblem', 'hi', 'Road-damage image', iso(14, 7), 46],
  ['demo-002', 'Facebook', 'Patna, Kadamkuan', 'Huge potholes near the school approach road in Bhikhna Pahari. Bad roads in Bihar need urgent road repair before an accident happens. #BadRoadsBihar', 'en', 'Road-damage image', iso(14, 12), 32],
  ['demo-003', 'Instagram', 'Patna, Bhikhna Pahari', 'स्कूल के सामने वाली सड़क टूटी हुई है और सड़क के गड्ढे में पानी भरा है। #बिहारसड़कसमस्या #PotholesBihar', 'hi', 'Waterlogged-road image', iso(15, 8), 28],
  ['demo-016', 'Facebook', 'Bihar Sharif, Nalanda', 'Nalanda side village road टूट गई है, खराब सड़क के कारण गांव के बच्चों को स्कूल जाने में बहुत परेशानी है। #खराबसड़कबिहार', 'hinglish', 'Road-damage image', iso(13, 8), 25],
  ['demo-017', 'X', 'Bihar Sharif, Nalanda', 'Rural road near Nalanda is badly damaged after rain. Road complaint Bihar, culvert side is unsafe. #RoadComplaintBihar', 'en', 'Road-damage image', iso(14, 9), 30],

  // 2. Electricity & Power Outages (Bihar Electricity Problem / बिहार बिजली समस्या / #PowerCutBihar)
  ['demo-009', 'X', 'Bhagalpur, Tilka Manjhi', 'Tilka Manjhi area mein baar baar bijli ja rahi hai. Hospital ke paas power outage bahut serious hai. #PowerCutBihar #BijliNahiHai', 'hinglish', 'No media', iso(16, 4), 57],
  ['demo-010', 'Facebook', 'Bhagalpur, Tilka Manjhi', 'Power cut in Bihar: outage again near Tilka Manjhi hospital. Low voltage and electricity complaint in Bihar. #BiharElectricityProblem', 'en', 'No media', iso(16, 5), 63],
  ['demo-011', 'Instagram', 'Bhagalpur, Barari', 'Transformer ki awaaz aa rahi hai aur transformer problem Bihar ke karan light baar baar trip kar rahi hai. #बिहारबिजलीसमस्या', 'hinglish', 'Electric-pole image', iso(16, 6), 31],
  ['demo-023', 'Facebook', 'Bhagalpur, Barari', 'Broken electric pole near Barari market looks dangerous. Wire sparking after heavy wind. #BiharElectricityProblem', 'en', 'Electric-pole image', iso(15, 16), 48],
  ['demo-024', 'YouTube', 'Purnia, Line Bazar', 'Transformer problem aur low voltage Bihar: meter faulty hai aur bill wrong aa raha. #बिजलीनहींहै', 'hinglish', 'Meter image', iso(16, 10), 12],

  // 3. Water Crisis & Supply (Bihar Water Crisis / बिहार जल संकट / #WaterProblemBihar)
  ['demo-004', 'X', 'Gaya, AP Colony', 'AP Colony में दो दिन से पानी नहीं आ रहा है। नल सूखे हैं, बिहार जल संकट गहरा गया है, PHED कृपया जलापूर्ति शुरू कराएं। #BiharWaterCrisis', 'hi', 'No media', iso(15, 6), 42],
  ['demo-005', 'Facebook', 'Gaya, AP Colony', 'No water in Bihar AP Colony since yesterday. Drinking water problem Bihar is affecting thousands of households. #WaterProblemBihar', 'en', 'No media', iso(15, 10), 39],
  ['demo-006', 'YouTube', 'Gaya, AP Colony', 'AP colony water supply bandh hai, tanki se bhi paani nahi aa raha. #PaniNahiHai #बिहारजलसंकट', 'hinglish', 'Water-pipeline image', iso(16, 8), 41],
  ['demo-018', 'Facebook', 'Patna, Bailey Road', 'Bailey Road पर नल के पास पाइप से लगातार पानी रिस रहा है, जलापूर्ति समस्या से सड़क खराब हो रही है। #WaterSupplyProblemBihar', 'hi', 'Water-leak image', iso(13, 10), 26],

  // 4. Nal-Jal Yojana (Nal Jal Yojana Bihar / बिहार नल जल योजना / #NalJalProblem)
  ['demo-025', 'X', 'Samastipur', 'हर घर नल का जल योजना का पाइप 6 महीने से टूटा पड़ा है। गांव में नल में पानी नहीं आ रहा। #NalJalYojana #हरघरनलकाजल #नलजलसमस्या', 'hi', 'Water-pipeline image', iso(17, 9), 52],
  ['demo-026', 'Facebook', 'Samastipur', 'No water in tap Bihar under Nal Jal Yojana. Pipeline is broken and motor is burnt. #NalJalProblem #बिहारनलजलयोजना', 'en', 'Water-pipeline image', iso(17, 11), 34],

  // 5. Flood Relief & Rescue (Bihar Flood / बिहार बाढ़ / #BiharFlood / #KosiFlood)
  ['demo-027', 'X', 'Saharsa', 'कोसी नदी का जलस्तर बढ़ने से सहरसा के कई गांव बाढ़ प्रभावित हो गए हैं। नाव और बाढ़ राहत सामग्री की सख्त जरूरत है। #BiharFlood #KosiFlood #बिहारबाढ़', 'hi', 'Flood-water image', iso(18, 5), 89],
  ['demo-028', 'Facebook', 'Darbhanga', 'Bagmati flood affected villages in Darbhanga district. Embankment leakage risk, urgent flood relief Bihar needed! #BiharFlood #FloodReliefBihar', 'en', 'Flood-water image', iso(18, 8), 74],
  ['demo-029', 'YouTube', 'Sitamarhi', 'बागमती बाढ़ से सीतामढ़ी के गांव डूबे, फसलें बर्बाद और flood compensation bihar अभी तक नहीं मिला। #बिहारबाढ़राहत #कोसीबाढ़', 'hinglish', 'Flood-water image', iso(18, 12), 65],

  // 6. Drainage & Waterlogging (Bihar Waterlogging / पटना जलजमाव / #PatnaWaterlogging)
  ['demo-012', 'X', 'Darbhanga, Laheriasarai', 'बारिश के बाद लहेरियासराय में नाला जाम है और सड़क पर जलजमाव हो गया है। #DrainageProblemBihar #नालाजाम', 'hi', 'Waterlogging image', iso(15, 13), 27],
  ['demo-013', 'Facebook', 'Darbhanga, Laheriasarai', 'Drain blocked in Laheriasarai; water is entering shops after rain. Drainage problem Bihar. #BiharWaterlogging', 'en', 'Waterlogging image', iso(16, 9), 37],
  ['demo-021', 'Facebook', 'Muzaffarpur, Motijheel', 'Motijheel ke paas sewer overflow ho raha hai. Sewer overflow Bihar is creating unhygienic conditions. #NalaJam #BiharWaterlogging', 'hinglish', 'Sewage image', iso(16, 8), 35],
  ['demo-030', 'X', 'Patna, Kankarbagh', 'कंकड़बाग मुख्य मार्ग पर भारी बारिश के बाद पटना जलजमाव हो गया है, नाला जाम होने से गाड़ियां डूब रही हैं। #PatnaWaterlogging #बिहारजलजमाव', 'hi', 'Waterlogging image', iso(17, 14), 58],

  // 7. Sanitation & Waste Management (Bihar Garbage Problem / बिहार कचरा समस्या / #SafaiNahiHui)
  ['demo-007', 'Instagram', 'Muzaffarpur, Chakkar Maidan', 'चक्कर मैदान के पास कई दिनों से कचरे का ढेर पड़ा है। सफाई नहीं हुई, बदबू और मच्छर बढ़ रहे हैं। #GarbageProblemBihar #सफाईनहींहुई', 'hi', 'Garbage image', iso(15, 7), 28],
  ['demo-008', 'Facebook', 'Muzaffarpur, Chakkar Maidan', 'Garbage has not been collected in Bihar Chakkar Maidan. Waste management Bihar is in terrible state. #BiharGarbage', 'en', 'Garbage image', iso(16, 11), 31],
  ['demo-019', 'X', 'Patna, Gandhi Maidan', 'Dustbin overflow near Gandhi Maidan, garbage not collected Bihar, spillage on footpath. #BiharGarbage #कचरासमस्या', 'en', 'Garbage image', iso(16, 7), 21],

  // 8. Hospitals & Healthcare (Bihar Hospital Problem / बिहार अस्पताल समस्या / #DoctorNotAvailable)
  ['demo-031', 'X', 'Patna, PMCH', 'पटना सरकारी अस्पताल में इमरजेंसी वार्ड में डॉक्टर उपलब्ध नहीं हैं। मरीज घंटों से दर्द से तड़प रहे हैं। #BiharHospitalProblem #DoctorNotAvailable #बिहारअस्पतालसमस्या', 'hi', 'Hospital-crowd image', iso(19, 8), 84],
  ['demo-032', 'Facebook', 'Muzaffarpur, SKMCH', 'Government hospital Bihar has no basic medicines available. Medicine not available Bihar and ambulance problem Bihar delaying treatment. #BiharHealth #डॉक्टरउपलब्धनहीं', 'en', 'Hospital-crowd image', iso(19, 10), 72],
  ['demo-033', 'YouTube', 'Gaya', 'गया सदर अस्पताल में एम्बुलेंस नहीं मिली, परिजन मरीज को ठेले पर लाने को मजबूर। #HospitalProblemBihar #BiharHealth', 'hinglish', 'Hospital-crowd image', iso(19, 13), 61],

  // 9. Schools & Education (Bihar School Problem / बिहार स्कूल समस्या / #TeacherAbsent)
  ['demo-034', 'X', 'Motihari, Champaran', 'मोतिहारी के सरकारी स्कूल में शिक्षक अनुपस्थित रहते हैं। स्कूल भवन की छत जर्जर है और स्कूल शौचालय में ताला लगा है। #BiharSchoolProblem #TeacherAbsent #बिहारस्कूलसमस्या', 'hi', 'School-building image', iso(18, 9), 56],
  ['demo-035', 'Facebook', 'Darbhanga', 'Government school Bihar: teacher absent and school building problem Bihar. No drinking water for children. #BiharEducation #शिक्षकअनुपस्थित', 'en', 'School-building image', iso(18, 11), 47],

  // 10. Ration & PDS (Bihar Ration Problem / बिहार राशन समस्या / #RationNotReceived)
  ['demo-036', 'X', 'Begusarai', 'बेगूसराय में राशन डीलर 2 महीने से राशन नहीं दे रहा और अंगूठा लगवा कर भगा देता है। बिहार राशन कार्ड समस्या की जांच हो। #BiharRation #RationNotReceived #राशननहींमिला', 'hi', 'PDS-counter image', iso(17, 8), 63],
  ['demo-037', 'Facebook', 'Katihar', 'Ration dealer complaint Bihar: PDS complaint Bihar regarding grain cut and refusal to distribute free ration. #RationCardProblem #बिहारराशनडीलर', 'en', 'PDS-counter image', iso(17, 13), 51],

  // 11. Pensions & Social Welfare (Bihar Pension Problem / बिहार पेंशन समस्या / #PensionNotReceived)
  ['demo-038', 'X', 'Arrah, Bhojpur', 'आरा में बुजुर्गों को 6 महीने से वृद्धावस्था पेंशन नहीं मिली है। ब्लॉक का चक्कर काट कर परेशान हैं। #BiharPension #OldAgePensionBihar #पेंशननहींमिली', 'hi', 'Pension-queue image', iso(16, 11), 59],
  ['demo-039', 'Facebook', 'Madhubani', 'Widow pension Bihar and disability pension pending for 50+ beneficiaries in Madhubani village. #BiharPension #PensionNotReceived', 'en', 'Pension-queue image', iso(16, 15), 44],

  // 12. Housing Schemes & Awas Yojana (Awas Yojana Bihar / बिहार आवास योजना / #AwasNotReceived)
  ['demo-040', 'X', 'Bettiah, West Champaran', 'प्रधानमंत्री आवास योजना की पहली किस्त मिलने के बाद दूसरी किस्त का पैसा नहीं मिला, मकान आधा अधूरा पड़ा है। #AwasYojanaBihar #AwasNotReceived #आवासनहींमिला', 'hi', 'Housing-construction image', iso(15, 10), 48],
  ['demo-041', 'Facebook', 'Sitamarhi', 'Housing scheme Bihar: Awas payment not received despite geo-tagging approval 4 months ago. #AwasYojanaBihar #आवासयोजना', 'en', 'Housing-construction image', iso(15, 14), 38],

  // 13. Agriculture & Farmers (Farmer Problem Bihar / बिहार किसान समस्या / #CropDamageBihar)
  ['demo-042', 'X', 'Bhojpur, Arrah', 'आरा बिहिया में यूरिया खाद की भारी कमी है, पैक्स पर खाद नहीं मिल रही और कालाबाजारी हो रही है। किसान परेशान हैं। #BiharFarmer #FertilizerShortageBihar #बिहारकिसानसमस्या', 'hi', 'Fertilizer-queue image', iso(17, 7), 78],
  ['demo-043', 'Facebook', 'Sasaram, Rohtas', 'Crop damage Bihar due to canal water breach. Irrigation problem Bihar and crop compensation pending for Rohtas farmers. #FarmerProblemBihar #बिहारफसलनुकसान', 'en', 'Crop-field image', iso(17, 10), 67],

  // 14. Traffic & Congestion (Traffic Problem Bihar / बिहार यातायात समस्या / #PatnaTrafficJam)
  ['demo-044', 'X', 'Patna, Dak Bungalow', 'डाक बंगला चौराहे पर 2 घंटे से भीषण पटना ट्रैफिक जाम है। ट्रैफिक सिग्नल खराब है और पुलिसकर्मी मौजूद नहीं। #PatnaTrafficJam #BiharTraffic #बिहारट्रैफिकजाम', 'hi', 'Traffic-jam image', iso(19, 17), 62],
  ['demo-045', 'Instagram', 'Muzaffarpur', 'Traffic problem Bihar: huge traffic jam near zero mile Muzaffarpur bypass due to faulty signal and encroachment. #TrafficJamBihar', 'hinglish', 'Traffic-jam image', iso(19, 18), 45],

  // 15. Street Lighting (Street Light Problem Bihar / बिहार स्ट्रीट लाइट समस्या / #StreetLightProblem)
  ['demo-014', 'X', 'Purnia, Line Bazar', 'Line Bazar में स्ट्रीट लाइट कई रातों से बंद है। रास्ता असुरक्षित लगता है। #StreetLightProblem #बिहारस्ट्रीटलाइट', 'hi', 'Streetlight image', iso(14, 19), 14],
  ['demo-015', 'Instagram', 'Purnia, Line Bazar', 'Streetlights are not working at Line Bazar bus stand. Street light off Bihar. Please fix the lights. #BiharStreetLight', 'en', 'Streetlight image', iso(15, 20), 20],
  ['demo-046', 'Facebook', 'Gaya, Bodh Gaya', 'Bodh Gaya bypass road street lights not working for past 2 weeks, increasing accident risk. #StreetLightProblem #स्ट्रीटलाइटखराब', 'en', 'Streetlight image', iso(16, 21), 22],

  // 16. Bridge Damage & Structural Repairs (Bridge Problem Bihar / बिहार पुल समस्या / #BrokenBridgeBihar)
  ['demo-047', 'X', 'Chhapra, Saran', 'छपरा में गंडक नहर पर बना पुलिया धंस गया है। पुल में गहरी दरारें आ गई हैं, भारी वाहनों के लिए बड़ा खतरा। #BiharBridge #BrokenBridgeBihar #बिहारपुलसमस्या', 'hi', 'Damaged-bridge image', iso(18, 14), 77],
  ['demo-048', 'Facebook', 'Araria', 'Broken bridge Bihar: river bridge pillar damaged after flood stream. Bridge repair Bihar needed urgently before collapse! #DamagedBridgeBihar #टूटापुलबिहार', 'en', 'Damaged-bridge image', iso(18, 16), 83],

  // 17. Encroachments (Encroachment Bihar / बिहार अतिक्रमण / #IllegalEncroachment)
  ['demo-049', 'X', 'Patna, Boring Road', 'बोरिंग रोड चौराहे पर अवैध दुकानों और ठेलों ने पूरा फुटपाथ और सड़क घेर रखी है। पैदल चलना दूभर हो गया है। #BiharEncroachment #RoadEncroachmentBihar #अवैधअतिक्रमण', 'hi', 'Encroachment image', iso(17, 16), 36],
  ['demo-050', 'Facebook', 'Bhagalpur', 'Footpath encroachment Bihar and illegal shops blocking fire brigade access in market area. Administration please remove. #IllegalEncroachment #बिहारअतिक्रमण', 'en', 'Encroachment image', iso(17, 18), 33],

  // 18. Government Schemes & DBT (Bihar Government Scheme / बिहार योजना / #BiharYojana)
  ['demo-051', 'X', 'Vaishali, Hajipur', 'मुख्यमंत्री कन्या उत्थान और साइकिल योजना की राशि 1 साल से लंबित है। DBT का पैसा नहीं मिला बैंक खाते में। #BiharYojana #DBTProblemBihar #योजनाकालाभ', 'hi', 'DBT-portal image', iso(16, 12), 49],
  ['demo-052', 'Facebook', 'Muzaffarpur', 'Government scheme Bihar: Scheme payment pending and DBT money not received under state student scholarship. #BiharGovernmentScheme #योजनाभुगतान', 'en', 'DBT-portal image', iso(16, 14), 43],

  // 19. Public Grievances (Bihar Public Grievance / बिहार जन शिकायत / #JantaPareshan)
  ['demo-053', 'X', 'Patna', 'बिहार लोक शिकायत निवारण में आवेदन दिए 60 दिन बीत गए, कोई सुनवाई नहीं हुई। बिहार में जनता परेशान है। #BiharPublicGrievance #BiharComplaint #जनतापरेशान', 'hi', 'Grievance-slip image', iso(19, 11), 54],
  ['demo-054', 'Facebook', 'Gaya', 'Civic issue Bihar: multiple public complaints registered at district portal with zero response. #BiharCitizenComplaint #BiharPublicProblem', 'en', 'Grievance-slip image', iso(19, 15), 41]
].map(([sourceReference, sourcePlatform, locality, content, language, mediaLabel, createdAt, engagement]) => ({
  sourceReference, sourcePlatform, locality, content, language, mediaLabel, createdAt, engagement
}));
