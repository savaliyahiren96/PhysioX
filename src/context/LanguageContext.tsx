import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en' | 'hi' | 'gu';

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  getTierLabel: (tier: 1 | 2 | 3) => { title: string; subtitle: string; badge: string };
  getSpecialityLabel: (speciality: string) => string;
  getPatientInstructions: (conditionKey: string) => { title: string; points: string[]; warning: string };
}

// Comprehensive dictionary for English, Hindi, and Gujarati
const DICTIONARY: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // App & Branding
    'app.title': 'ClinicaAI',
    'app.tagline': 'Clinical Decision Support & Sports Science (Indian & Global CPGs)',
    'app.whoFor': 'Who Is This For?',
    'app.newAssessment': 'New Assessment',
    'app.selectLanguage': 'Select Language',

    // Navigation
    'nav.doctorDashboard': 'Doctor Profile (Dr. Darpan)',
    'nav.patientProfile': 'Patient Profiles (11)',
    'nav.registry': 'Patient Registry',
    'nav.assessment3Tier': 'Assessment & 3-Tier Diagnosis',
    'nav.protocols': 'Protocols & Rehab',
    'nav.aiBiomechanics': 'AI Motion & Biomechanics',
    'nav.motion': 'AI Motion & Gait Analysis',
    'nav.posture': 'AI Posture Analysis',
    'nav.biomechanics': 'Joint Biomechanics',
    'nav.outcomes': 'Outcome Measures Calculator',
    'nav.progress': 'Longitudinal Progress',
    'nav.sportsHub': 'Sports & Athlete Hub',
    'nav.athleteTesting': 'Athlete Testing & Return-to-Sport',
    'nav.sandc': 'Strength & Conditioning (S&C)',
    'nav.nutrition': 'Sports Nutrition & Indian Diet',
    'nav.diagnostics': 'Diagnostics Atlas',
    'nav.mdt': 'MDT Consensus',
    'nav.cpgs': 'CPGs & Evidence',
    'nav.governance': 'Governance & Audit',

    // 3-Tier Diagnostic System
    'tier.title': '3-Tier Clinical Decision & Treatment Options',
    'tier.subtitle': 'World-class evidence hierarchy customized for clinical practice and patient choice',
    'tier.1.title': 'Tier 1: Strong Evidence (Gold Standard)',
    'tier.1.sub': 'High-Grade Level I RCTs, Cochrane Reviews, International CPGs, SAI/BCCI Mandates',
    'tier.1.badge': 'Gold Standard / Class I-A',
    'tier.2.title': 'Tier 2: Evidence (Emerging & Pragmatic)',
    'tier.2.sub': 'Cohort Studies, Level II/III Trials, Pragmatic Clinic Adaptations, Cost-Effective',
    'tier.2.badge': 'Pragmatic Evidence / Class II-B',
    'tier.3.title': 'Tier 3: Expert Opinion & Clinical Pearls',
    'tier.3.sub': 'Senior Specialist Delphi Consensus, Master Clinicians Experience, Bio-Mechanical Reasoning',
    'tier.3.badge': 'Master Clinician Consensus',
    'tier.matrix': 'Side-by-Side Matrix Comparison',
    'tier.aiOpinion': 'AI Second Opinion (Gemini 3.8 Flash)',

    // Clinical Assessment Sections
    'assess.prefill': '1-Click Prefill Worldwide Clinical Template',
    'assess.prefillDesc': 'Instantly populate standard international diagnostic cases with pathognomonic triads and special tests.',
    'assess.step1': '1. Patient Intake & Subjective',
    'assess.step2': '2. Objective Physical Exam',
    'assess.step3': '3. Investigations & Red Flags',
    'assess.step4': '4. 3-Tier Diagnosis & Rehab',
    'assess.name': 'Patient Name',
    'assess.age': 'Age',
    'assess.gender': 'Sex',
    'assess.occupation': 'Occupation / Sport',
    'assess.chiefComplaint': 'Chief Complaint & Symptoms',
    'assess.onset': 'Onset',
    'assess.painScore': 'Pain Score (NPRS 0-10)',
    'assess.aggravating': 'Aggravating Factors',
    'assess.relieving': 'Relieving Factors',
    'assess.rom': 'Range of Motion (ROM)',
    'assess.mmt': 'Manual Muscle Testing (MMT 0-5)',
    'assess.specialTests': 'Special Orthopaedic / Clinical Tests',
    'assess.redFlags': 'Red Flags / Urgent Warning Signs',
    'assess.yellowFlags': 'Yellow Flags / Psychosocial Barriers',
    'assess.investigations': 'Diagnostic Imaging & Lab Results',
    'assess.primaryDiagnosis': 'Primary Working Diagnosis',
    'assess.differential': 'Differential Diagnoses',
    'assess.clinicalReasoning': 'Clinical Diagnostic Reasoning',
    'assess.referral': 'Interdisciplinary Referral Criteria',

    // Actions
    'btn.adopt': 'Adopt This Protocol',
    'btn.copy': 'Copy Clinical Summary',
    'btn.exportPdf': 'Export PDF',
    'btn.save': 'Save Assessment',
    'btn.reset': 'Reset Form',
    'btn.back': 'Back',
    'btn.next': 'Next Step',
    'btn.close': 'Close',
    'btn.print': 'Print Patient Instructions',

    // Patient Advice & Education
    'patient.homeAdvice': 'Home Exercise & Care Guidelines',
    'patient.dos': 'Things to Do (Do)',
    'patient.donts': 'Things to Avoid (Don’t)',
    'patient.emergency': 'Emergency / Warning Signs: Consult Doctor Immediately',
  },
  hi: {
    // App & Branding
    'app.title': 'क्लिनिका एआई (ClinicaAI)',
    'app.tagline': 'क्लिनिकल निर्णय सहायता एवं खेल विज्ञान (भारतीय एवं वैश्विक दिशानिर्देश)',
    'app.whoFor': 'यह किसके लिए है?',
    'app.newAssessment': 'नया मूल्यांकन',
    'app.selectLanguage': 'भाषा चुनें',

    // Navigation
    'nav.doctorDashboard': 'डॉक्टर प्रोफाइल (डॉ. दर्पण)',
    'nav.patientProfile': 'मरीज प्रोफाइल (11)',
    'nav.registry': 'मरीज रजिस्ट्री',
    'nav.assessment3Tier': 'मूल्यांकन एवं 3-स्तरीय निदान',
    'nav.protocols': 'प्रोटोकॉल और पुनर्वास',
    'nav.aiBiomechanics': 'एआई मोशन एवं बायोमैकेनिक्स',
    'nav.motion': 'एआई गति एवं चाल विश्लेषण',
    'nav.posture': 'एआई काया (पोस्चर) विश्लेषण',
    'nav.biomechanics': 'जोड़ बायोमैकेनिक्स',
    'nav.outcomes': 'परिणाम मापन कैलकुलेटर',
    'nav.progress': 'दीर्घकालिक प्रगति ट्रैकिंग',
    'nav.sportsHub': 'खेल एवं एथलीट केंद्र',
    'nav.athleteTesting': 'एथलीट परीक्षण एवं खेल वापसी',
    'nav.sandc': 'स्ट्रेंथ और कंडीशनिंग (S&C)',
    'nav.nutrition': 'खेल पोषण और भारतीय आहार',
    'nav.diagnostics': 'डायग्नोस्टिक एटलस',
    'nav.mdt': 'एमडीटी आम सहमति',
    'nav.cpgs': 'दिशानिर्देश एवं साक्ष्य',
    'nav.governance': 'क्लिनिकल गवर्नेंस एवं ऑडिट',

    // 3-Tier Diagnostic System
    'tier.title': '3-स्तरीय नैदानिक निर्णय एवं उपचार विकल्प',
    'tier.subtitle': 'विश्वस्तरीय साक्ष्य पदानुक्रम जो भारतीय क्लिनिकल अभ्यास एवं मरीज की प्राथमिकताओं के अनुकूल है',
    'tier.1.title': 'स्तर 1: सुदृढ़ प्रमाण (स्वर्ण मानक - Gold Standard)',
    'tier.1.sub': 'उच्च-स्तरीय आरसीटी (RCTs), कोचरन समीक्षाएं, वैश्विक सीपीजी, साई/बीसीसीआई मानक',
    'tier.1.badge': 'स्वर्ण मानक / क्लास I-A',
    'tier.2.title': 'स्तर 2: साक्ष्य आधारित (व्यावहारिक एवं किफायती)',
    'tier.2.sub': 'कोहोर्ट अध्ययन, चरण II/III परीक्षण, भारतीय ओपीडी अनुकूलन, लागत प्रभावी विकल्प',
    'tier.2.badge': 'व्यावहारिक साक्ष्य / क्लास II-B',
    'tier.3.title': 'स्तर 3: विशेषज्ञ सम्मति (क्लिनिकल अनुभव एवं डेलफी)',
    'tier.3.sub': 'वरिष्ठ विशेषज्ञों का साझा परामर्श, जैव-यांत्रिकी विश्लेषण, व्यक्तिगत क्लिनिकल अनुभव',
    'tier.3.badge': 'वरिष्ठ विशेषज्ञ सम्मति',
    'tier.matrix': 'समानांतर तुलनात्मक तालिका (Matrix)',
    'tier.aiOpinion': 'एआई द्वितीय राय (Gemini 3.8 Flash)',

    // Clinical Assessment Sections
    'assess.prefill': '1-क्लिक विश्वस्तरीय क्लिनिकल टेम्पलेट भरें',
    'assess.prefillDesc': 'अंतरराष्ट्रीय स्तर पर स्वीकृत मानक मामलों को विशेष परीक्षणों और लक्षणों सहित तुरंत लोड करें।',
    'assess.step1': '1. मरीज विवरण एवं व्यक्तिगत इतिहास',
    'assess.step2': '2. वस्तुनिष्ठ शारीरिक परीक्षण (Physical Exam)',
    'assess.step3': '3. जांच रिपोर्ट एवं खतरे के संकेत (Red Flags)',
    'assess.step4': '4. 3-स्तरीय निदान एवं पुनर्वास योजना',
    'assess.name': 'मरीज का नाम',
    'assess.age': 'आयु',
    'assess.gender': 'लिंग',
    'assess.occupation': 'व्यवसाय / खेल',
    'assess.chiefComplaint': 'मुख्य समस्या एवं लक्षण',
    'assess.onset': 'प्रारंभ (Onset)',
    'assess.painScore': 'दर्द का पैमाना (NPRS 0-10)',
    'assess.aggravating': 'दर्द बढ़ाने वाले कारक',
    'assess.relieving': 'दर्द घटाने वाले कारक',
    'assess.rom': 'गति का दायरा (Range of Motion)',
    'assess.mmt': 'मांसपेशियों की शक्ति परीक्षण (MMT 0-5)',
    'assess.specialTests': 'विशेष ऑर्थोपेडिक परीक्षण',
    'assess.redFlags': 'खतरे के संकेत (Red Flags - आपातकाल)',
    'assess.yellowFlags': 'मनोसामाजिक कारक (Yellow Flags)',
    'assess.investigations': 'इमेजिंग (X-Ray/MRI) एवं लैब जांच',
    'assess.primaryDiagnosis': 'प्राथमिक कार्यशील निदान (Diagnosis)',
    'assess.differential': 'संभावित अन्य निदान (Differential)',
    'assess.clinicalReasoning': 'नैदानिक तार्किक व्याख्या',
    'assess.referral': 'विशेषज्ञ डॉक्टर रेफरल मानदंड',

    // Actions
    'btn.adopt': 'यह प्रोटोकॉल अपनाएं',
    'btn.copy': 'क्लिनिकल सारांश कॉपी करें',
    'btn.exportPdf': 'पीडीएफ निर्यात करें',
    'btn.save': 'मूल्यांकन सहेजें',
    'btn.reset': 'फॉर्म रीसेट करें',
    'btn.back': 'पिछला चरण',
    'btn.next': 'अगला चरण',
    'btn.close': 'बंद करें',
    'btn.print': 'मरीज निर्देश प्रिंट करें',

    // Patient Advice & Education
    'patient.homeAdvice': 'घर पर व्यायाम एवं देखभाल संबंधी निर्देश',
    'patient.dos': 'क्या करें (आवश्यक निर्देश)',
    'patient.donts': 'क्या न करें (सावधानियां)',
    'patient.emergency': 'आपातकालीन चेतावनी संकेत: तुरंत डॉक्टर से संपर्क करें',
  },
  gu: {
    // App & Branding
    'app.title': 'ક્લિનિકા એઆઇ (ClinicaAI)',
    'app.tagline': 'ક્લિનિકલ નિર્ણય સહાય અને સ્પોર્ટ્સ સાયન્સ (ભારતીય અને વૈશ્વિક માર્ગદર્શિકા)',
    'app.whoFor': 'આ એપ્લિકેશન કોના માટે છે?',
    'app.newAssessment': 'નવું મૂલ્યાંકન',
    'app.selectLanguage': 'ભાષા પસંદ કરો',

    // Navigation
    'nav.doctorDashboard': 'ડોક્ટર પ્રોફાઇલ (ડો. દર્પણ)',
    'nav.patientProfile': 'દર્દી પ્રોફાઇલ (૧૧)',
    'nav.registry': 'દર્દી રજિસ્ટ્રી',
    'nav.assessment3Tier': 'મૂલ્યાંકન અને 3-સ્તરીય નિદાન',
    'nav.protocols': 'પ્રોટોકોલ અને રિહેબ',
    'nav.aiBiomechanics': 'એઆઈ મોશન અને બાયોમિકેનિક્સ',
    'nav.motion': 'એઆઈ ગતિશીલતા અને ચાલ વિશ્લેષણ',
    'nav.posture': 'એઆઈ મુદ્રા (પોશ્ચર) વિશ્લેષણ',
    'nav.biomechanics': 'સાંધા બાયોમિકેનિક્સ',
    'nav.outcomes': 'પરિણામ માપન કેલ્ક્યુલેટર',
    'nav.progress': 'લાંબા ગાળાની પ્રગતિ ટ્રેકિંગ',
    'nav.sportsHub': 'સ્પોર્ટ્સ અને એથ્લેટ હબ',
    'nav.athleteTesting': 'એથ્લેટ ટેસ્ટિંગ અને સ્પોર્ટ્સ વાપસી',
    'nav.sandc': 'સ્ટ્રેન્થ અને કન્ડિશનિંગ (S&C)',
    'nav.nutrition': 'સ્પોર્ટ્સ પોષણ અને ભારતીય આહાર',
    'nav.diagnostics': 'ડાયગ્નોસ્ટિક્સ એટલાસ',
    'nav.mdt': 'એમડીટી સર્વસંમતિ',
    'nav.cpgs': 'ક્લિનિકલ ગાઇડલાઇન્સ અને પુરાવા',
    'nav.governance': 'ગવર્નન્સ અને ક્લિનિકલ ઓડિટ',

    // 3-Tier Diagnostic System
    'tier.title': '3-સ્તરીય ક્લિનિકલ નિર્ણય અને સારવાર વિકલ્પો',
    'tier.subtitle': 'વિશ્વસ્તરીય પુરાવા પદાનુક્રમ જે ભારતીય ક્લિનિકલ પ્રેક્ટિસ અને દર્દીની પસંદગીને અનુરૂપ છે',
    'tier.1.title': 'સ્તર 1: સખત વૈજ્ઞાનિક પુરાવા (સુવર્ણ માનક - Gold Standard)',
    'tier.1.sub': 'ઉચ્ચ-ગ્રેડ લેવલ I આરસીટી (RCTs), કોકરેન રિવ્યુ, આંતરરાષ્ટ્રીય માર્ગદર્શિકાઓ, SAI/BCCI નિયમો',
    'tier.1.badge': 'સુવર્ણ માનક / ક્લાસ I-A',
    'tier.2.title': 'સ્તર 2: ઉપલબ્ધ સાયન્ટિફિક પુરાવા (પ્રાયોગિક અને આર્થિક)',
    'tier.2.sub': 'કોહોર્ટ સ્ટડીઝ, ફેઝ II/III ટ્રાયલ્સ, ક્લિનિકલ અનુકૂલન, બજેટ-અનુકૂળ વિકલ્પો',
    'tier.2.badge': 'પ્રાયોગિક પુરાવા / ક્લાસ II-B',
    'tier.3.title': 'સ્તર 3: નિષ્ણાત અભિપ્રાય (ક્લિનિકલ અનુભવ અને ડેલ્ફી સર્વસંમતિ)',
    'tier.3.sub': 'વરિષ્ઠ ઓર્થોપેડિક અને ફિઝિયોથેરાપી નિષ્ણાતોનો સંયુક્ત અભિપ્રાય, બાયો-મિકેનિકલ કારણો',
    'tier.3.badge': 'વરિષ્ઠ નિષ્ણાત અભિપ્રાય',
    'tier.matrix': 'સામસામે તુલનાત્મક ટેબલ (Matrix)',
    'tier.aiOpinion': 'AI સેકન્ડ ઓપિનિયન (Gemini 3.8 Flash)',

    // Clinical Assessment Sections
    'assess.prefill': '1-ક્લિક વિશ્વવ્યાપી ક્લિનિકલ ટેમ્પ્લેટ ભરો',
    'assess.prefillDesc': 'આંતરરાષ્ટ્રીય સ્તરે પ્રમાણિત કેસો ટેસ્ટ અને લક્ષણો સાથે ત્વરિત લોડ કરો.',
    'assess.step1': '1. દર્દી વિગતો અને કેસ હિસ્ટ્રી',
    'assess.step2': '2. શારીરિક તપાસ (Physical Examination)',
    'assess.step3': '3. નિદાન રિપોર્ટ્સ અને લાલ નિશાનીઓ (Red Flags)',
    'assess.step4': '4. 3-સ્તરીય નિદાન અને રિહેબ પ્લાન',
    'assess.name': 'દર્દીનું નામ',
    'assess.age': 'ઉંમર',
    'assess.gender': 'જાતિ',
    'assess.occupation': 'વ્યવસાય / રમતગમત',
    'assess.chiefComplaint': 'મુખ્ય તકલીફ અને દુખાવાની વિગત',
    'assess.onset': 'શરૂઆત (Onset)',
    'assess.painScore': 'દુખાવાનો સ્કોર (NPRS 0-10)',
    'assess.aggravating': 'દુખાવો વધારતા કારણો',
    'assess.relieving': 'દુખાવામાં રાહત આપતા કારણો',
    'assess.rom': 'હલનચલનનો વ્યાપ (Range of Motion)',
    'assess.mmt': 'સ્નાયુ શક્તિ ટેસ્ટ (MMT 0-5)',
    'assess.specialTests': 'વિશેષ ઓર્થોપેડિક ટેસ્ટ (Special Tests)',
    'assess.redFlags': 'ગંભીર ચેતવણીઓ (Red Flags - કટોકટી)',
    'assess.yellowFlags': 'માનસિક અને સામાજિક પરિબળો (Yellow Flags)',
    'assess.investigations': 'એક્સ-રે, એમઆરઆઈ અને લેબ રિપોર્ટ',
    'assess.primaryDiagnosis': 'મુખ્ય નિદાન (Primary Diagnosis)',
    'assess.differential': 'સંભવિત અન્ય બીમારીઓ (Differential)',
    'assess.clinicalReasoning': 'ક્લિનિકલ નિદાનનું તાર્કિક કારણ',
    'assess.referral': 'નિષ્ણાત ડૉક્ટર પાસે મોકલવાના માપદંડ',

    // Actions
    'btn.adopt': 'આ પ્રોટોકોલ લાગુ કરો',
    'btn.copy': 'ક્લિનિકલ સમરી કૉપી કરો',
    'btn.exportPdf': 'પીડીએફ ડાઉનલોડ કરો',
    'btn.save': 'મૂલ્યાંકન સેવ કરો',
    'btn.reset': 'ફોર્મ રીસેટ કરો',
    'btn.back': 'પાછળ જાઓ',
    'btn.next': 'આગળ વધો',
    'btn.close': 'બંધ કરો',
    'btn.print': 'દર્દી માટે માર્ગદર્શિકા પ્રિન્ટ કરો',

    // Patient Advice & Education
    'patient.homeAdvice': 'ઘરે કસરત અને કાળજી રાખવા માટેની માર્ગદર્શિકા',
    'patient.dos': 'શું કરવું (આવશ્યક બાબતો)',
    'patient.donts': 'શું ન કરવું (સાવચેતીઓ)',
    'patient.emergency': 'તાત્કાલિક ચેતવણી: તરત જ ડૉક્ટરનો સંપર્ક કરો',
  },
};

// Specialized translations for Medical Specialities in India
const SPECIALITY_TRANSLATIONS: Record<string, { hi: string; gu: string }> = {
  Orthopaedics: { hi: 'अस्थिरोग विज्ञान (Orthopaedics)', gu: 'અસ્થિરોગ વિજ્ઞાન (Orthopaedics)' },
  'Musculoskeletal Physiotherapy': { hi: 'मस्कुलोस्केलेटल फिजियोथेरेपी', gu: 'મસ્ક્યુલોસ્કેલેટલ ફિઝિયોથેરાપી' },
  'Sports Physiotherapy': { hi: 'खेल फिजियोथेरेपी (Sports PT)', gu: 'સ્પોર્ટ્સ ફિઝિયોથેરાપી' },
  'Sports Medicine': { hi: 'खेल चिकित्सा (Sports Medicine)', gu: 'સ્પોર્ટ્સ મેડિસિન' },
  Neurology: { hi: 'न्यूरोलॉजी (तंत्रिका विज्ञान)', gu: 'ન્યુરોલોજી (ચેતાતંત્ર વિજ્ઞાન)' },
  Neurosurgery: { hi: 'न्यूरोसर्जरी (तंत्रिका शल્યचिकित्सा)', gu: 'ન્યુરોસર્જરી' },
  Cardiology: { hi: 'कार्डियोलॉजी (हृदय रोग विज्ञान)', gu: 'કાર્ડિયોલોજી (હૃદયરોગ વિજ્ઞાન)' },
  'Cardiopulmonary Physiotherapy': { hi: 'हृदय एवं फेफड़े की फिजियोथेरेपी', gu: 'હૃદય અને શ્વાસ રોગ ફિઝિયોથેરાપી' },
  Paediatrics: { hi: 'बालरोग विज्ञान (Paediatrics)', gu: 'બાળરોગ વિજ્ઞાન (Paediatrics)' },
  Geriatrics: { hi: 'जराचिकित्सा / बुजुर्गों की देखभाल (Geriatrics)', gu: 'વૃદ્ધાવસ્થા વિજ્ઞાન (Geriatrics)' },
  Rheumatology: { hi: 'संधिवात विज्ञान (गठिया रोग)', gu: 'સંધિવા વિજ્ઞાન (સંધિવા રોગ)' },
  'Postoperative Rehabilitation': { hi: 'शल्यक्रिया उपरांत पुनर्वास (Post-Op)', gu: 'ઓપરેશન પછીનું રિહેબિલિટેશન' },
  'Critical Care': { hi: 'गहन चिकित्सा (ICU / Critical Care)', gu: 'ક્રિટિકલ કેર (ICU સારવાર)' },
  Oncology: { hi: 'कर्कट रोग विज्ञान (Oncology)', gu: 'કેન્સર વિજ્ઞાન (Oncology)' },
  'Pelvic Health': { hi: 'श्रोणि स्वास्थ्य (Pelvic Health)', gu: 'પેલ્વિક હેલ્થ (પેલ્વિક કાળજી)' },
  'Pain Management': { hi: 'दर्द प्रबंधन (Pain Management)', gu: 'દુખાવો નિયંત્રણ (Pain Management)' },
  'Strength and Conditioning': { hi: 'शक्ति एवं अनुकूलन (S&C)', gu: 'સ્ટ્રેન્થ અને કન્ડિશનિંગ (S&C)' },
  'Sports Nutrition': { hi: 'खेल पोषण एवं आहार', gu: 'સ્પોર્ટ્સ પોષણ અને ખોરાક' },
};

// Patient discharge advice & home exercises for top conditions
const PATIENT_ADVICE: Record<
  string,
  Record<SupportedLanguage, { title: string; points: string[]; warning: string }>
> = {
  acl: {
    en: {
      title: 'ACL Reconstruction / Sprain Recovery Plan',
      points: [
        'Perform quad sets (isometric thigh squeeze) 3 times daily for 10 repetitions, holding 5 seconds each.',
        'Apply ice pack with compression for 15-20 minutes after rehabilitation exercises.',
        'Maintain extension: Never place a pillow directly under the knee while resting; place it under the ankle to keep knee straight.',
        'Use knee brace and crutches as directed by your operating surgeon until quadriceps control is verified.',
      ],
      warning: 'Call clinic immediately if calf pain/swelling (DVT risk), fever >101°F, or sudden wound drainage occurs.',
    },
    hi: {
      title: 'एसीएल (ACL) लिगामेंट चोट एवं सर्जरी उपरांत देखभाल निर्देश',
      points: [
        'क्वाड्रिसेप्स व्यायाम (जांघ की मांसपेशियों को दबाना) दिन में 3 बार 10 पुनरावृत्ति करें, प्रत्येक बार 5 सेकंड रोकें।',
        'व्यायाम के बाद 15-20 मिनट तक घुटने पर कपड़े में लपेटकर बर्फ की सिकाई करें।',
        'घुटने को सीधा रखें: आराम करते समय घुटने के ठीक नीचे तकिया न रखें; एड़ी के नीचे तकिया रखें ताकि घुटना पूरा सीधा हो सके।',
        'जब तक डॉक्टर अनुमति न दें, ब्रेस और वॉकर/क्रचेस का प्रयोग अनिवार्य रूप से करें।',
      ],
      warning: 'यदि पिण्डली (Calf) में तीव्र दर्द या सूजन हो, 101°F से अधिक बुखार आए या घाव से स्राव हो, तो तुरंत संपर्क करें।',
    },
    gu: {
      title: 'એસીએલ (ACL) સ્નાયુ ઈજા અને ઓપરેશન પછીના ઘરેલુ કાળજી નિયમો',
      points: [
        'જાંઘના સ્નાયુઓનું કસરત (Quadriceps Squeeze): દિવસમાં 3 વખત 10 વાર કરો, દરેક વખતે 5 સેકન્ડ દબાવી રાખો.',
        'કસરત કર્યા પછી 15-20 મિનિટ માટે બરફનો શેક (Ice Pack) કપડામાં લપેટીને લગાવો.',
        'ઘૂંટણને સીધો રાખો: આરામ કરતી વખતે ઘૂંટણની નીચે ઓશીકું ક્યારેય ન મુકવું; ઘૂંટણ સીધો રહે તે માટે ઘૂંટી (Ankle) નીચે ઓશીકું મૂકો.',
        'જ્યાં સુધી ફિઝિયોથેરાપિસ્ટ કે ઓર્થોપેડિક સર્જન પરવાનગી ન આપે ત્યાં સુધી ની-બ્રેસ અને ઘોડી (Crutches) નો યોગ્ય ઉપયોગ કરો.',
      ],
      warning: 'જો પિંડી (Calf) માં અચાનક સોજો કે અસહ્ય દુખાવો થાય, 101°F કરતાં વધુ તાવ આવે તો તરત જ ડૉક્ટરનો સંપર્ક કરવો.',
    },
  },
  oa_knee: {
    en: {
      title: 'Knee Osteoarthritis (Sandhivata) Self-Management',
      points: [
        'Engage in non-impact aerobic exercise: Stationary cycling or brisk walking on level ground for 25-30 minutes.',
        'Strengthen quadriceps and gluteal muscles with straight leg raises and seated knee extensions.',
        'Weight management: Every 1 kg weight reduction removes approximately 4 kg of pressure from your knees during walking.',
        'Use supportive footwear with cushioned soles; avoid sitting cross-legged (palathi) on the floor during acute pain flare-ups.',
      ],
      warning: 'Seek immediate evaluation if the joint becomes hot, red, intensely swollen, or you are completely unable to bear weight.',
    },
    hi: {
      title: 'घुटने का ऑस्टियोआर्थराइटिस (संधिवात/गठिया) घरेलू देखभाल एवं निर्देश',
      points: [
        'कम झटके वाला व्यायाम: समतल जमीन पर 20-30 मिनट टहलें या स्थिर साइकिल चलाएं।',
        'जांघ और कूल्हे की मांसपेशियों की शक्ति बढ़ाने के लिए सीधा पैर उठाने (Straight Leg Raise) की कसरत करें।',
        'वजन नियंत्रण: शरीर का 1 किलो वजन कम करने से चलने के दौरान घुटनों पर 4 किलो तक दबाव कम होता है।',
        'नरम तलवे वाले जूते-चप्पल पहनें; अत्यधिक दर्द के दौरान जमीन पर पालथी मारकर बैठने या उकड़ू बैठने से बचें।',
      ],
      warning: 'यदि घुटने में अत्यधिक लाली, तेज जलन, अचानक बड़ा सूजन आ जाए या पैर पर बिल्कुल वजन न रखा जाए तो तुरंत डॉक्टर को दिखाएं।',
    },
    gu: {
      title: 'ઘૂંટણનો ઘસારો / સંધિવા (Knee OA) ઘરેલુ કસરત અને સંભાળ',
      points: [
        'હળવી કસરતો: રોજ સપાટ જમીન પર 20-30 મિનિટ ચાલવું અથવા સ્ટેશનરી સાયકલ ચલાવવી.',
        'જાંઘ અને સાથળના સ્નાયુ મજબૂત કરવા સીધો પગ ઊંચો કરવાની (Straight Leg Raise) કસરત દિવસમાં 2 વખત 10-15 વાર કરવી.',
        'વજન નિયંત્રણ: માત્ર 1 કિલો વજન ઘટવાથી ચાલતી વખતે ઘૂંટણ પર 4 કિલો જેટલો ભાર ઘટે છે.',
        'સોફ્ટ સોલ વાળા ચંપલ/બૂટ પહેરો; ખૂબ દુખાવો હોય ત્યારે જમીન પર પલાંઠી વાળીને કે ઉભડક (Squat) બેસવાનું ટાળવું.',
      ],
      warning: 'જો ઘૂંટણ લાલચોળ થઈ જાય, ખૂબ ગરમ લાગે, તીવ્ર સોજો આવે કે પગ જમીન પર મુકી જ ન શકાય તો તાત્કાલિક હોસ્પિટલ જવું.',
    },
  },
  lumbar: {
    en: {
      title: 'Lumbar Spine & Sciatica Management Plan',
      points: [
        'Avoid prolonged uninterrupted sitting: Change postures every 30 minutes and take short 2-minute walking breaks.',
        'McKenzie directional preference exercises: Gentle prone lying and press-ups if they centralize back pain away from the leg.',
        'Log-roll technique: When getting out of bed, roll onto your side first and push up with hands, keeping spine neutral.',
        'Core bracing: Gentle abdominal drawing-in maneuvers during daily lifting tasks.',
      ],
      warning: 'RED FLAG ALERT: Sudden loss of bowel/bladder control, numbness in saddle/groin area, or progressive foot drop requires EMERGENCY medical care within 24 hours.',
    },
    hi: {
      title: 'कमर दर्द एवं सायटिका (Sciatica) प्रबंधन निर्देश',
      points: [
        'लगातार 30 मिनट से अधिक एक जगह न बैठें: हर आधे घंटे में उठकर 2 मिनट हल्का टहलें।',
        'मैकेंजी व्यायाम: पेट के बल लेटकर कोहनी पर उठें (यदि इससे पैर का दर्द कमर की ओर केंद्रित हो रहा हो)।',
        'बिस्तर से उठने का सही तरीका: पहले करवट लें, फिर हाथों के सहारे उठकर बैठें; सीधे झटके से न उठें।',
        'वजन उठाते समय घुटने मोड़ें, कमर को झुकाने के बजाय रीढ़ की हड्डी को सीधा रखें।',
      ],
      warning: 'आपातकालीन चेतावनी: यदि पेशाब या मल पर नियंत्रण खो जाए, गुप्त अंगों के आसपास सुन्नपन आ जाए, या पंजा ऊपर न उठे, तो 24 घंटे में आपातकालीन चिकित्सा लें।',
    },
    gu: {
      title: 'કમરનો દુખાવો અને સાયટિકા (રાંઝણ) સંભાળ યોજના',
      points: [
        'સતત 30 મિનિટથી વધુ એકધારી બેઠક ન રાખવી: દર અડધા કલાકે ઊભા થઈને 2 મિનિટ ચાલવાની ટેવ પાડો.',
        'મેકેન્ઝી કસરત: ઊંધા સૂઈને કોણી પર શરીર હળવેથી ઊંચું કરવું (જો આનાથી પગનો દુખાવો કમર તરફ ઘટતો હોય તો જ).',
        'પથારીમાંથી ઊભા થવાની સાચી રીત: સીધા આંચકા સાથે ન ઊઠવું, પહેલા પડખું ફરીને હાથના ટેકે ધીમેથી બેઠા થવું.',
        'ભારે વજન ઉપાડતી વખતે કમરથી વાંકા વળવાને બદલે ઘૂંટણ વાળીને વજન શરીરની નજીક રાખીને ઊંચકવું.',
      ],
      warning: 'લાલ ચેતવણી (Emergency): જો પેશાબ-ઝાડા પરનો કાબૂ જતો રહે, ગુપ્તાંગ આસપાસ બધિરતા (સુન્નપણું) આવે કે પંજો ઢળી પડે (Foot Drop) તો 24 કલાકમાં ઇમરજન્સી ડૉક્ટરને બતાવવું.',
    },
  },
  rotator: {
    en: {
      title: 'Shoulder Rotator Cuff & Impingement Home Guide',
      points: [
        'Maintain pain-free arc: Avoid repetitive overhead reaching or heavy lifting away from body in initial weeks.',
        'Perform sleeper stretch and posterior capsule stretches within comfortable pain-free range.',
        'Rotator cuff strengthening: Resistance band external and internal rotations with towel roll under elbow.',
        'Scapular setting: Gentle shoulder blade retractions and depressions 10 times, 3 times daily.',
      ],
      warning: 'Seek orthopaedic consultation if severe nocturnal unremitting pain, inability to actively lift arm above 30 degrees after trauma, or neurovascular symptoms occur.',
    },
    hi: {
      title: 'कंधे का रोटेटर कफ एवं जकड़न (Impingement) देखभाल',
      points: [
        'दर्द रहित सीमा में रहें: सिर के ऊपर बार-बार हाथ ले जाना या शरीर से दूर भारी सामान उठाना टालें।',
        'तौलिए और रेसिस्टेंस बैंड की सहायता से कोहनी को शरीर से सटाकर आंतरिक एवं बाहरी घुमाव (Rotations) करें।',
        'कंधे की हड्डियों (Scapula) को पीछे और नीचे की ओर खींचकर 5 सेकंड रोकें, दिन में 3 बार 10 बार करें।',
        'रात को सोते समय दर्द वाले कंधे पर सीधे दबाव देकर न सोएं।',
      ],
      warning: 'यदि रात में असहनीय दर्द के कारण नींद न आए, हाथ 30 डिग्री से ऊपर उठ ही न सके, या हाथ में सुन्नपन हो तो विशेषज्ञ से तुरंत मिलें।',
    },
    gu: {
      title: 'ખભાનો દુખાવો અને રોટેટર કફ (Rotator Cuff) ઘરેલુ સારવાર',
      points: [
        'દુખાવા વગરની હિલચાલ: શરૂઆતના દિવસોમાં માથાથી ઉપર વારંવાર હાથ ઊંચો કરવો કે વજન ઊંચકવાનું ટાળવું.',
        'કોણી પાસે ટુવાલ રાખીને રબર બેન્ડ (Resistance Band) થી ખભાના અંદર-બહારના સ્નાયુઓ મજબૂત કરવાની કસરત કરવી.',
        'ખભાના પાછળના હાડકાં (Scapula) પાછળ ખેંચીને 5 સેકન્ડ પકડી રાખવું, દિવસમાં 3 વખત 10 વાર કરવું.',
        'સૂતી વખતે જે ખભામાં દુખાવો હોય તે પડખે સીધું દબાણ આપીને સૂવાનું ટાળવું.',
      ],
      warning: 'જો રાત્રે અસહ્ય દુખાવો રહેતો હોય, હાથ જરાય ઊંચો ન થઈ શકતો હોય કે હાથમાં ખાલી ચડી જતી હોય તો ઓર્થોપેડિક ડૉક્ટરને તાત્કાલિક બતાવવું.',
    },
  },
  meniscal: {
    en: {
      title: 'Knee Meniscal Tear Recovery & Joint Protection',
      points: [
        'Avoid deep squatting beyond 90 degrees and pivoting twists on planted foot.',
        'Perform seated knee extensions and straight leg raises with towel roll under ankle.',
        'Stationary cycling with elevated saddle height to minimize joint pinch.',
        'Apply cold compress for 15 minutes after exercise to control joint swelling.',
      ],
      warning: 'Contact doctor immediately if your knee becomes locked (unable to straighten) or exhibits severe sudden swelling.',
    },
    hi: {
      title: 'घुटने की गद्दी (Meniscus) चोट एवं बचाव निर्देश',
      points: [
        'गहरे उकड़ू (Deep Squat) बैठने और पैर जमाकर अचानक घूमने (Twisting) से बचें।',
        'कुर्सी पर बैठकर पैर सीधा उठाने और जांघ के स्नायु कसने की कसरत दिन में 3 बार करें।',
        'साइकिल की सीट ऊंची रखकर बिना अधिक लोड के रोजाना 15-20 मिनट चलाएं।',
        'कसरत के बाद सूजन रोकने के लिए 15 मिनट बर्फ की सिकाई करें।',
      ],
      warning: 'यदि घुटना मुड़कर लॉक (Locked Knee) हो जाए या पूरा सीधा न हो सके, तो तुरंत डॉक्टर से संपर्क करें।',
    },
    gu: {
      title: 'ઘૂંટણની ગાદી (Meniscus Tear) ની સંભાળ અને કસરત',
      points: [
        'જમીન પર ઉભડક બેસવાનું અને પગ જમીન પર રાખીને અચાનક વળાંક લેવાનું ટાળવું.',
        'ખુરશી પર બેસીને પગ સીધો કરવાની અને જાંઘના સ્નાયુ ખેંચવાની કસરત દિવસમાં 3 વખત કરવી.',
        'સ્ટેશનરી સાયકલની સીટ ઊંચી રાખીને રોજના 15-20 મિનિટ હળવા પેડલ મારવા.',
        'કસરત બાદ 15 મિનિટ બરફનો શેક કરવો જેથી સોજો ન ચડે.',
      ],
      warning: 'જો ઘૂંટણ અચાનક લોક થઈ જાય (સીધો ન થઈ શકે) કે તીવ્ર સોજો આવે તો તાત્કાલિક ઓર્થોપેડિક ડૉક્ટરને બતાવવું.',
    },
  },
  patellofemoral: {
    en: {
      title: 'Runner’s Knee & Patellofemoral Care Guidelines',
      points: [
        'Strengthen hip abductors and glutes: Side-lying leg lifts and clamshells.',
        'Spanish squats with strap behind knees to offload kneecap pressure.',
        'Increase running cadence by 5-10% to reduce impact shock on kneecap.',
        'Take regular breaks from prolonged sitting with bent knees (avoid theater sign).',
      ],
      warning: 'Seek evaluation if large fluid effusion or inability to bear weight develops.',
    },
    hi: {
      title: 'घुटने की कटोरी का दर्द (Runner’s Knee / PFPS) निर्देश',
      points: [
        'कूल्हे और जांघ की बाहरी मांसपेशियों को मजबूत करने के लिए करवट लेकर पैर उठाने का व्यायाम करें।',
        'घुटने के पीछे बेल्ट या पट्टा लगाकर स्पैनिश स्क्वाट (Spanish Squat) करें।',
        'दौड़ते समय छोटे कदम लें और कदम दर (Cadence) 5-10% बढ़ाएं।',
        'लगातार घुटने मोड़कर लंबे समय तक बैठने से बचें; हर 45 मिनट में पैर सीधा करें।',
      ],
      warning: 'यदि घुटने में अधिक पानी भर जाए या पैर मुड़ने लगे तो विशेषज्ञ से परामर्श लें।',
    },
    gu: {
      title: 'ઘૂંટણની વાટકીનો દુખાવો (Runner’s Knee) કાળજી માર્ગદર્શિકા',
      points: [
        'થાપા અને સાથળના બાજુના સ્નાયુઓ માટે પડખું ફરીને પગ ઊંચો કરવાની કસરત (Leg Lifts) કરવી.',
        'ઘૂંટણ પાછળ પટ્ટો રાખીને કસરત (Spanish Squat) કરવાથી વાટકી પર ભાર ઘટશે.',
        'દોડતી વખતે ઝડપી અને નાના પગલાં લેવા જેથી ઘૂંટણ પર આંચકો ન લાગે.',
        'લાંબો સમય ઘૂંટણ વાળીને બેસવાનું ટાળવું; દર 40 મિનિટે પગ સીધો કરવો.',
      ],
      warning: 'જો ઘૂંટણમાં વધુ પાણી ભરાય કે પગ લથડતો હોય તો ડૉક્ટરની સલાહ લેવી.',
    },
  },
  frozen_shoulder: {
    en: {
      title: 'Frozen Shoulder (Adhesive Capsulitis) Phase-Based Guide',
      points: [
        'Perform gentle cane/wand external rotation stretches with elbow supported at your side.',
        'Doorway chest and overhead wall ladder walks within comfortable tolerance.',
        'Never force aggressive stretching through severe sharp pain during the freezing phase.',
        'Apply moist warm compress for 15 minutes prior to mobility exercises.',
      ],
      warning: 'Consult orthopaedist if pain radiates to chest or hand turns pale/cold.',
    },
    hi: {
      title: 'फ्रोजन शोल्डर (कंधे का जाम होना) घरेलू देखभाल',
      points: [
        'डंडे या छड़ी की सहायता से कोहनी को बगल में रखकर धीरे-धीरे बाहर की ओर घुमाने का व्यायाम करें।',
        'दीवार पर उंगलियां चलाकर हाथ ऊपर ले जाने की कसरत (Wall Ladder) दिन में 3 बार करें।',
        'अत्यधिक तेज दर्द के दौरान जबरदस्ती हाथ को खींचने से बचें।',
        'कसरत से पहले कंधे पर 15 मिनट गर्म पानी की थैली या टॉवल से गर्म शेक करें।',
      ],
      warning: 'यदि कंधे का दर्द छाती की ओर फैले या हाथ ठंडा पड़ जाए तो तुरंत डॉक्टर से मिलें।',
    },
    gu: {
      title: 'જામ થયેલા ખભા (Frozen Shoulder) માટે ઘરેલુ કસરત',
      points: [
        'લાકડી કે વાંસના ટેકાથી કોણી અડીને રાખી ખભાને બહારની બાજુ ફેરવવાની હળવી કસરત કરવી.',
        'દિવાલ પર આંગળીઓ ચડાવીને ધીમે-ધીમે હાથ ઊંચો કરવો (Wall Crawl).',
        'ખૂબ તીવ્ર દુખાવો થતો હોય ત્યારે આંચકો મારીને હાથ ખેંચવો નહીં.',
        'કસરત કરતાં પહેલાં ખભા પર 15 મિનિટ ગરમ પાણીની થેલીનો શેક કરવો.',
      ],
      warning: 'જો દુખાવો છાતી તરફ જાય અથવા હાથ ઠંડો પડી જાય તો તાત્કાલિક ડૉક્ટરનો સંપર્ક કરવો.',
    },
  },
  lumbar_stenosis: {
    en: {
      title: 'Spinal Stenosis Walking & Flexion Protocol',
      points: [
        'Practice double knee-to-chest stretches in bed to open spinal canals.',
        'Lean forward onto shopping cart or wheeled walker when walking outdoors.',
        'Use stationary bicycle for 20-30 minutes of painless cardiovascular exercise.',
        'Avoid backward bending and prolonged standing upright without resting.',
      ],
      warning: 'EMERGENCY: Sudden loss of bladder/bowel control or numbness in groin requires emergency hospital admission.',
    },
    hi: {
      title: 'स्पाइनल स्टेनोसिस (रीढ़ की नस दबना) देखभाल निर्देश',
      points: [
        'पीठ के बल लेटकर दोनों घुटनों को छाती की ओर खींचने का व्यायाम (Knee-to-Chest) करें।',
        'चलते समय आगे की ओर हल्का झुकें या वॉकर का सहारा लें।',
        'समतल जमीन पर पैदल चलने के बजाय स्थिर साइकिल चलाएं जो दर्द रहित होती है।',
        'कमर को पीछे की ओर मोड़ने वाले आसनों और ज्यादा देर सीधे खड़े रहने से बचें।',
      ],
      warning: 'आपातकाल: पेशाब-शौच पर नियंत्रण न रहना या पैरों में अचानक भारी कमजोरी आना रीढ़ की इमरजेंसी है।',
    },
    gu: {
      title: 'કરોડરજ્જુની નસ દબાવી (Spinal Stenosis) સંભાળ નિયમો',
      points: [
        'ચત્તા સૂઈને બંને ઘૂંટણ છાતી તરફ ખેંચવાની કસરત સવારે અને સાંજે 10 વખત કરવી.',
        'ચાલતી વખતે સહેજ આગળ ઝૂકીને ચાલવું અથવા વ્હીલ વાળા વૉકરનો ઉપયોગ કરવો.',
        'કાર્ડિયો કસરત માટે સ્ટેશનરી સાયકલ ચલાવવી જે કરોડરજ્જુને ખુલ્લી રાખે છે.',
        'કમરને પાછળ વાળવાની કે લાંબો સમય સીધા ટટ્ટાર ઊભા રહેવાની સ્થિતિ ટાળવી.',
      ],
      warning: 'કટોકટી: પેશાબ-ઝાડા પર કાબૂ જતો રહે કે બંને પગ અચાનક ઢીલા પડી જાય તો તાત્કાલિક ઇમરજન્સી હૉસ્પિટલ પહોંચવું.',
    },
  },
  cervical_radiculopathy: {
    en: {
      title: 'Neck Disc & Cervical Radiculopathy Home Care',
      points: [
        'Perform McKenzie chin tucks (retraction) every 2 hours at your desk.',
        'Maintain laptop screen at eye level to stop downward neck craning.',
        'Perform median nerve sliding exercises smoothly without sharp tension.',
        'Sleep on a supportive cervical contoured pillow under neck curve.',
      ],
      warning: 'Urgent consult needed if progressive arm/grip weakness or hand clumsiness (dropping cups) occurs.',
    },
    hi: {
      title: 'गर्दन की नस दबना (Cervical Radiculopathy) निर्देश',
      points: [
        'गर्दन को पीछे की ओर सीधा खींचने (Chin Tuck) की कसरत हर 2 घंटे में 10 बार करें।',
        'लैपटॉप या मोबाइल की स्क्रीन आंखों के बिल्कुल सामने रखें, गर्दन झुकाकर काम न करें।',
        'हाथ की नसों की स्लाइडिंग कसरत बिना खिंचाव के आराम से करें।',
        'सोते समय गर्दन के नीचे सपोर्ट देने वाला सर्वाइकल तकिया उपयोग करें।',
      ],
      warning: 'यदि हाथ से वस्तुएं छूटने लगें, पकड़ कमजोर हो या उंगलियों की कमजोरी बढ़े तो तुरंत न्यूरोलॉजिस्ट से मिलें।',
    },
    gu: {
      title: 'ગરદનનો દુખાવો અને નસ દબાવી (Cervical Pain) સંભાળ',
      points: [
        'દાઢી પાછળ ખેંચવાની કસરત (Chin Tuck) દિવસમાં દર બે કલાકે 10 વાર કરવી.',
        'લેપટોપ કે મોબાઈલ સ્ક્રીન આંખની સામે સીધી રાખવી, ગરદન વાંકી વાળીને ન બેસવું.',
        'હાથની નસને લચક આપતી નર્વ સ્લાઇડિંગ કસરત હળવેથી કરવી.',
        'રાત્રે સૂતી વખતે ગરદન નીચે યોગ્ય ટેકો રહે તેવો ઓર્થોપેડિક તકિયો વાપરવો.',
      ],
      warning: 'જો હાથની પકડ ઢીલી પડે, કપ કે ગ્લાસ હાથમાંથી છૂટી જવા લાગે તો તરત જ ડૉક્ટરને બતાવવું.',
    },
  },
  tennis_elbow: {
    en: {
      title: 'Tennis Elbow (Lateral Epicondylalgia) Tyler Twist Routine',
      points: [
        'Perform Tyler Twist with rubber flexbar or table-edge dumbbell eccentric wrist lowers.',
        'Lift grocery bags and cups with PALM FACING UP (supinated) rather than palm down.',
        'Wear forearm counterforce strap 2 inches below elbow during manual tasks.',
        'Perform 45-second isometric wrist extension holds against table for pain relief.',
      ],
      warning: 'Consult specialist if resting burning pain radiates to wrist or joint swelling develops.',
    },
    hi: {
      title: 'टेनिस एल्बो (कोहनी का दर्द) घरेलू व्यायाम एवं निर्देश',
      points: [
        'फ्लेक्सबार या हल्के डंबल से कलाई नीचे झुकाने की धीमी कसरत (Eccentric Tyler Twist) करें।',
        'भारी सामान या कप उठाते समय हथेली ऊपर की ओर (Palm Up) रखें, हथेली नीचे न रखें।',
        'काम करते समय कोहनी से 2 इंच नीचे टेनिस एल्बो स्ट्रैप (Counterforce Band) पहनें।',
        'दर्द कम करने के लिए कलाई को 45 सेकंड तक टेबल पर दबाकर रोकने का व्यायाम करें।',
      ],
      warning: 'यदि कोहनी में सूजन आ जाए या हाथ की उंगलियों में सुन्नपन फैले तो जांच कराएं।',
    },
    gu: {
      title: 'ટેનિસ એલ્બો (કોણીનો બહારનો દુખાવો) કાળજી યોજના',
      points: [
        'રબર બાર અથવા હળવા વજનથી કાંડું ધીમે-ધીમે નીચે લઈ જવાની કસરત (Tyler Twist) કરવી.',
        'કોઈપણ સામાન કે કપ ઉપાડતી વખતે હથેળી ઉપરની તરફ (Palm Up) રાખવાની ટેવ પાડો.',
        'કામ કરતી વખતે કોણીથી બે આંગળ નીચે ટેનિસ એલ્બો પટ્ટો (Counterforce Brace) બાંધવો.',
        'ટેબલ પર હાથ દબાવીને 45 સેકન્ડ રોકી રાખવાથી દુખાવામાં તાત્કાલિક રાહત મળશે.',
      ],
      warning: 'જો કોણીમાં સોજો આવે કે હાથમાં સતત ઝણઝણાટી રહે તો ફિઝિયોથેરાપિસ્ટ પાસે જવું.',
    },
  },
  carpal_tunnel: {
    en: {
      title: 'Carpal Tunnel Syndrome Night Splint & Nerve Care',
      points: [
        'Wear rigid neutral wrist brace (0 degree straight) every night during sleep.',
        'Perform Totten & Hunter 5-position finger tendon glides 3 times daily.',
        'Switch to a vertical ergonomic mouse to stop sustained forearm pronation.',
        'Take 2-minute microbreaks every 30 minutes of computer keyboard work.',
      ],
      warning: 'Seek surgical evaluation immediately if persistent thenar thumb muscle wasting or permanent numbness occurs.',
    },
    hi: {
      title: 'कार्पल टनल सिंड्रोम (कलाई की नस दबना) देखभाल निर्देश',
      points: [
        'रात को सोते समय कलाई का सीधा ब्रेस (Neutral Splint) जरूर पहनें ताकि नस न दबे।',
        'उंगलियों की 5 मुद्राओं वाली टेंडन ग्लाइडिंग कसरत दिन में 3 बार करें।',
        'कंप्यूटर पर काम करते समय सीधा वर्टिकल माउस इस्तेमाल करें।',
        'हर 30 मिनट में 2 मिनट के लिए टाइपिंग रोककर हाथों को आराम दें।',
      ],
      warning: 'यदि अंगूठे के नीचे का मांस सूखने लगे (Thenar Wasting) या उंगलियां हमेशा के लिए सुन्न हो जाएं तो तुरंत सर्जन से मिलें।',
    },
    gu: {
      title: 'કાંડાની નસ દબાવી (Carpal Tunnel) રાત્રિ સંભાળ નિયમો',
      points: [
        'રાત્રે સૂતી વખતે કાંડું સીધું રહે તેવો ન્યુટ્રલ બ્રેસ (Wrist Splint) નિયમિત પહેરવો.',
        'આંગળીઓના સ્નાયુઓ લચકદાર રાખવા દિવસમાં 3 વખત કસરત (Tendon Glides) કરવી.',
        'કમ્પ્યુટર વાપરતી વખતે ઊભો વર્ટિકલ માઉસ (Vertical Mouse) વાપરવો.',
        'દર અડધા કલાકે 2 મિનિટ ટાઇપિંગ બંધ કરીને કાંડાને મુક્ત કરવું.',
      ],
      warning: 'જો અંગૂઠા પાસેના સ્નાયુ સુકાઈ જવા લાગે કે આંગળીઓ કાયમી સુન્ન થઈ જાય તો તાત્કાલિક ઓપરેશનની તપાસ કરાવવી.',
    },
  },
  ankle_sprain: {
    en: {
      title: 'Acute Ankle Inversion Sprain Functional Rehab',
      points: [
        'Wear a semi-rigid lace-up ankle brace during all walking and sport activities for 6 weeks.',
        'Perform knee-to-wall weightbearing calf lunges to restore dorsiflexion mobility.',
        'Single-leg balance training on floor and balance board 15 minutes daily.',
        'Resisted ankle eversion with elastic band to strengthen lateral peroneal checkreins.',
      ],
      warning: 'Obtain radiograph if unable to take 4 steps or bone tenderness on malleoli exists (Ottawa Rules).',
    },
    hi: {
      title: 'टखने की मोच (Ankle Sprain) पुनर्वास निर्देश',
      points: [
        'चलते और खेलते समय 6 सप्ताह तक फीते वाला एंकल ब्रेस (Lace-up Brace) अनिवार्य रूप से पहनें।',
        'दीवार के सहारे घुटना आगे झुकाकर एंकल का लचीलापन (Dorsiflexion) बढ़ाने की कसरत करें।',
        'एक पैर पर खड़े होकर संतुलन बनाने की कसरत (Single Leg Balance) रोज 15 मिनट करें।',
        'रबर बैंड से पैर का पंजा बाहर की ओर मोड़ने वाली कसरत करें ताकि नसें मजबूत हों।',
      ],
      warning: 'यदि 4 कदम भी न चला जाए या टखने की हड्डी छूने पर तेज दर्द हो तो तुरंत एक्स-रे कराएं।',
    },
    gu: {
      title: 'ઘૂંટી મચકોડાવી / મોચ (Ankle Sprain) ની રિકવરી પ્લાન',
      points: [
        'ચાલતી વખતે 6 અઠવાડિયા માટે દોરી વાળો એંકલ બ્રેસ (Lace-up Ankle Brace) પહેરવો.',
        'દિવાલના ટેકે પંજો જમીન પર રાખી ઘૂંટણ આગળ લઈ જવાની કસરત કરવી.',
        'એક પગ પર ઊભા રહીને બેલેન્સ જાળવવાની કસરત રોજ 15 મિનિટ કરવી.',
        'રબર બેન્ડ વડે પંજો બહારની તરફ ખેંચવાની કસરતથી બાજુના સ્નાયુ મજબૂત કરવા.',
      ],
      warning: 'જો પગ જમીન પર મૂકીને 4 ડગલાં પણ ન ચાલી શકાય કે હાડકામાં અસહ્ય દુખાવો હોય તો તાત્કાલિક એક્સ-રે કરાવવો.',
    },
  },
  plantar_fasciitis: {
    en: {
      title: 'Plantar Fasciitis Heel Pain Elimination Plan',
      points: [
        'NEVER walk barefoot on hard tile/marble floors; wear cushioned indoor supportive footwear.',
        'Perform DiGiovanni toe stretch 10 times BEFORE taking your first step out of bed.',
        'Rathleff high-load heel raises on a step with a rolled towel propping up big toes.',
        'Roll arch of foot over a frozen water bottle for 10 minutes after standing shifts.',
      ],
      warning: 'Consult doctor if severe constant bone pain or heel squeezing causes intolerable agony (calcaneal fracture rule-out).',
    },
    hi: {
      title: 'एड़ी का दर्द (प्लांटर फैसीसाइटिस) संपूर्ण घरेलू उपचार',
      points: [
        'मार्बल, टाइल्स या कठोर फर्श पर नंगे पैर कभी न चलें; घर में भी नरम तलवे वाली चप्पल पहनें।',
        'सुबह बिस्तर से पहला कदम रखने से पहले उंगलियों को पीछे खींचने की कसरत (DiGiovanni Stretch) जरूर करें।',
        'सीढ़ी के किनारे पर पैर के अंगूठे के नीचे तौलिया रखकर एड़ी उठाने की भारी कसरत (Rathleff Protocol) करें।',
        'दिन भर खड़े रहने के बाद जमे हुए पानी की ठंडी बोतल पर तलवे को 10 मिनट रोल करें।',
      ],
      warning: 'यदि एड़ी की दोनों हड्डियों को दबाने पर असहनीय दर्द हो या दर्द रात में भी न थमे तो डॉक्टर से मिलें।',
    },
    gu: {
      title: 'પગની પાનીનો અસહ્ય દુખાવો (Plantar Fasciitis) કાયમી ઉપાય',
      points: [
        'ઘરમાં માર્બલ કે ટાઇલ્સ પર ઉઘાડા પગે ક્યારેય ન ચાલવું; સોફ્ટ ગાદી વાળા ચંપલ ઘરમાં પણ પહેરવા.',
        'સવારે પથારીમાંથી પહેલો પગ નીચે મુકતાં પહેલાં પગના અંગૂઠા પાછળ ખેંચવાની કસરત કરવી.',
        'પગથિયાં પર અંગૂઠા નીચે ટુવાલ રાખીને એડી ઊંચી-નીચી કરવાની રાથલેફ કસરત (Rathleff Protocol) કરવી.',
        'બરફની બોટલ પર પગનો તળિયું 10 મિનિટ રગડવાથી બળતરા અને સોજામાં તરત આરામ થશે.',
      ],
      warning: 'જો પાનીના હાડકાને બંને બાજુથી દબાવતાં તીવ્ર કંપારી છૂટે કે આરામમાં પણ દુખે તો એક્સ-રે કરાવવો.',
    },
  },
  tmj: {
    en: {
      title: 'Jaw Joint (TMJ) Relaxation & Rocabado Routine',
      points: [
        'Keep teeth apart: Teeth should ONLY touch when chewing; maintain the "N-position" with tongue resting on palate.',
        'Soft food diet: Avoid chewing gum, tough meats, nuts, and large crusty bread.',
        'Perform tongue-up controlled opening: Open jaw only as far as your tongue stays glued to palate.',
        'Support your chin with your fist whenever you yawn to avoid jaw dislocation.',
      ],
      warning: 'Seek emergency evaluation if jaw locks completely closed (< 20mm) or temporal artery is tender/swollen with vision blur.',
    },
    hi: {
      title: 'जबड़े का जोड़ एवं दर्द (TMJ) घरेलू प्रबंधन',
      points: [
        'दांत अलग रखें: केवल खाना चबाते समय ही दांत मिलने चाहिए; बाकी समय जीभ तालू पर रखें और दांतों में गैप रखें।',
        'नरम भोजन करें: च्युइंग गम, कड़क मेवे और बड़े बर्गर खाने से बचें।',
        'जीभ को तालू से सटाकर रखकर ही मुंह धीरे-धीरे खोलने की कसरत करें।',
        'जम्हाई (उबासी) लेते समय ठुड्डी के नीचे मुट्ठी लगाकर जबड़ा संभालें ताकि जोड़ न खिसके।',
      ],
      warning: 'यदि जबड़ा पूरी तरह लॉक हो जाए और मुंह न खुले, या सिर की नस में तेज दर्द के साथ धुंधला दिखे तो तुरंत अस्पताल जाएं।',
    },
    gu: {
      title: 'જડબાનો દુખાવો અને અવાજ (TMJ Disorder) કાળજી માર્ગદર્શિકા',
      points: [
        'દાંત વચ્ચે જગ્યા રાખો: માત્ર ખોરાક ચાવતી વખતે જ દાંત અડવા જોઈએ; બાકીના સમયે જીભ તાળવે અડાવીને રાખવી.',
        'નરમ ખોરાક ખાવો: ચ્યુઇંગમ, કઠણ ડ્રાયફ્રૂટ્સ કે મોટી વસ્તુઓ બચકાં ભરીને ખાવાનું ટાળવું.',
        'જીભ તાળવે ચોંટાડી રાખીને જ મોં ધીમે-ધીમે ખોલવાની કસરત (Rocabado Exercise) કરવી.',
        'બગાસું ખાતી વખતે દાઢી નીચે મુઠ્ઠીનો ટેકો રાખવો જેથી જડબું ખસી ન જાય.',
      ],
      warning: 'જો જડબું સાવ લોક થઈ જાય અને મોં ન ખૂલે તો 48 કલાકમાં ફિઝિયોથેરાપિસ્ટ કે ઓરલ સર્જન પાસે જવું.',
    },
  },
  thoracic_outlet: {
    en: {
      title: 'Thoracic Outlet (TOS) Postural Decompression',
      points: [
        'Practice 360-degree diaphragmatic belly breathing to quiet tense scalene neck muscles.',
        'Perform self-mobilization of the first rib with a towel pulled toward opposite hip.',
        'Doorway corner chest stretch with arms below shoulder height to decompress nerves.',
        'Avoid carrying heavy shoulder bags or sleeping with arms tucked overhead.',
      ],
      warning: 'EMERGENCY: If your hand turns blue/cold or veins across shoulder swell suddenly, seek immediate emergency hospital care (vein thrombosis risk).',
    },
    hi: {
      title: 'थोरैसिक आउटलेट (गर्दन-कंधे की नस दबना) निर्देश',
      points: [
        'पेट से गहरी सांस (Diaphragmatic Breathing) लें ताकि गर्दन के स्नायुओं पर तनाव न पड़े।',
        'तौलिए की सहायता से पहली पसली (First Rib) को नीचे दबाने का व्यायाम करें।',
        'दरवाजे के कोने में खड़े होकर सीने के स्नायु खींचने की कसरत हाथ कंधे से नीचे रखकर करें।',
        'कंधे पर भारी बैग टांगने और हाथ सिर के नीचे दबाकर सोने से बचें।',
      ],
      warning: 'इमरजेंसी: यदि हाथ अचानक नीला पड़ जाए, ठंडा हो जाए या कंधे की नसें फूल जाएं तो तुरंत अस्पताल जाएं (रक्त का थक्का बनने का खतरा)।',
    },
    gu: {
      title: 'થોરેસિક આઉટલેટ (ખભા-હાથની નસ દબાવી) સંભાળ યોજના',
      points: [
        'પેટથી ઊંડા શ્વાસ (Diaphragmatic Breathing) લેવાની ટેવ પાડો જેથી ગરદનના સ્નાયુ રિલેક્સ થાય.',
        'ટુવાલની મદદથી પહેલી પાંસળી (First Rib) ને નીચે દબાવવાની કસરત કરવી.',
        'દરવાજાની ફ્રેમમાં ઊભા રહીને છાતીના સ્નાયુ હળવેથી ખેંચવા (હાથ ખભાથી નીચા રાખવા).',
        'ખભા પર ભારે બેગ લટકાવવી નહીં અને માથા નીચે હાથ દબાવીને સૂવું નહીં.',
      ],
      warning: 'તાત્કાલિક ચેતવણી: જો હાથ અચાનક વાદળી (Blue) થઈ જાય, બરફ જેવો ઠંડો પડે કે ખભાની નસો ફૂલી જાય તો તાત્કાલિક ઇમરજન્સી હૉસ્પિટલ જવું.',
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'clinica_selected_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'hi' || saved === 'gu') {
        return saved;
      }
    } catch {
      // LocalStorage unavailable, fallback to default
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = DICTIONARY[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = DICTIONARY['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const getTierLabel = (tier: 1 | 2 | 3) => {
    return {
      title: t(`tier.${tier}.title`),
      subtitle: t(`tier.${tier}.sub`),
      badge: t(`tier.${tier}.badge`),
    };
  };

  const getSpecialityLabel = (speciality: string): string => {
    if (language === 'en') return speciality;
    const item = SPECIALITY_TRANSLATIONS[speciality];
    if (item && item[language]) {
      return item[language];
    }
    return speciality;
  };

  const getPatientInstructions = (conditionKey: string) => {
    const defaultKey = 'acl';
    const key = PATIENT_ADVICE[conditionKey] ? conditionKey : defaultKey;
    return PATIENT_ADVICE[key][language] || PATIENT_ADVICE[key]['en'];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getTierLabel,
        getSpecialityLabel,
        getPatientInstructions,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
