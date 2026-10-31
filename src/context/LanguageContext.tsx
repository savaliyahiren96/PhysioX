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
    'nav.registry': 'Patient Registry',
    'nav.assessment3Tier': 'Assessment & 3-Tier Diagnosis',
    'nav.protocols': 'Protocols & Rehab',
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
    'nav.registry': 'मरीज रजिस्ट्री',
    'nav.assessment3Tier': 'मूल्यांकन एवं 3-स्तरीय निदान',
    'nav.protocols': 'प्रोटोकॉल और पुनर्वास',
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
    'nav.registry': 'દર્દી રજિસ્ટ્રી',
    'nav.assessment3Tier': 'મૂલ્યાંકન અને 3-સ્તરીય નિદાન',
    'nav.protocols': 'પ્રોટોકોલ અને રિહેબ',
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
