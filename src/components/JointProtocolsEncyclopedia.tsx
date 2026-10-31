import React, { useState, useMemo, useEffect } from 'react';
import {
  ALL_JOINT_CONDITIONS,
  JOINT_REGIONS_LIST,
} from '../data/jointProtocolsData';
import {
  ALL_SPECIALTY_CONDITIONS,
  ALL_SPECIALTIES_SECTIONS,
} from '../data/specialtyProtocolsData';
import {
  JointConditionMaster,
  SpecialtyConditionMaster,
  JointRegion,
  SpecialtyId,
  TissueGroup,
  TissueType,
  ConditionAcuity,
  IrritabilityLevel,
} from '../types/clinical';
import {
  Search,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Copy,
  Check,
  Microscope,
  Sparkles,
  Brain,
  BookOpen,
  Printer,
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  History,
  Columns,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Info,
  X,
} from 'lucide-react';
import { NamedProtocolsLibrary } from './NamedProtocolsLibrary';
import { MASTER_NAMED_PROTOCOLS } from '../data/namedProtocolsLibrary';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';

// Unified condition type for both joints and medical specialties
export type UnifiedCondition = (JointConditionMaster | SpecialtyConditionMaster) & {
  domainType: 'joint' | 'specialty';
  displayTag: string;
};

interface JointProtocolsEncyclopediaProps {
  initialConditionId?: string;
  onApplyToPatient?: (condition: UnifiedCondition) => void;
}

// ==========================================
// CENTRALIZED TRILINGUAL DICTIONARY (en / hi / gu)
// ==========================================
const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Level 1 Joints
    'joint.all': 'All Joint Complexes',
    'joint.knee': 'Knee',
    'joint.lumbar': 'Lumbar Spine & Pelvis',
    'joint.shoulder': 'Shoulder',
    'joint.cervical': 'Cervical Spine',
    'joint.hip': 'Hip & Groin',
    'joint.elbow': 'Elbow',
    'joint.wrist': 'Wrist & Hand',
    'joint.ankle': 'Ankle & Foot',
    'joint.tmj': 'Temporomandibular Joint (TMJ)',
    'joint.thoracic': 'Thoracic Spine & Ribs',

    // Level 2 Tissue Groups & Types
    'tissue.hardHeader': 'Hard Tissue',
    'tissue.softHeader': 'Soft Tissue',
    'tissue.all': 'All Tissues',
    'tissue.postSurgical': 'Post-surgical',
    'tissue.bone': 'Bone (fracture, stress injury)',
    'tissue.articular': 'Articular Surface / Subchondral Bone (OA, osteochondral lesions)',
    'tissue.ligament': 'Ligament',
    'tissue.muscleTendon': 'Muscle & Tendon',
    'tissue.meniscusCartilage': 'Meniscus / Labrum / Cartilage',
    'tissue.nerve': 'Nerve / Neural',
    'tissue.disc': 'Disc',
    'tissue.bursaFascia': 'Bursa & Fascia',

    // Tags
    'tag.hard': 'Hard',
    'tag.soft': 'Soft',
    'tag.acute': 'Acute',
    'tag.chronic': 'Chronic',
    'tag.postOp': 'Post-op',
    'tag.low': 'Low Irritability',
    'tag.mod': 'Mod Irritability',
    'tag.high': 'High Irritability',

    // Breadcrumbs & Navigation
    'nav.drilldownTitle': '3-Level Structural Drill-Down',
    'nav.resetFilters': 'Reset to All',
    'nav.emptyTitle': 'No conditions for this combination',
    'nav.emptyDesc': 'Try selecting another tissue type or reset to see all conditions for this joint.',
    'nav.tests': 'tests',
    'nav.rehab': '4-Phase Rehab',
    'nav.selectToInspect': 'Select to inspect details',

    // Clinical Quality Additions
    'clinical.redFlagsTitle': 'Red Flags & When to Refer',
    'clinical.whenToRefer': 'When to Refer to Specialist / Surgeon',
    'clinical.emergency': 'EMERGENCY ESCALATION REQUIRED',
    'clinical.urgent': 'URGENT SPECIALTY CONSULTATION',
    'clinical.progressionChecklist': 'Phase Progression Criteria Checklist',
    'clinical.criteriaCheckDesc': 'Verify all milestone criteria before advancing patient to next phase',
    'clinical.outcomeMeasuresTitle': 'Validated Outcome Measures & MCID',
    'clinical.measureName': 'Outcome Measure',
    'clinical.mcid': 'MCID (Minimal Clinically Important Difference)',
    'clinical.target': 'Clinical Target',
    'clinical.evidenceBadge': 'Evidence Strength',
    'clinical.evidenceGuideline': 'Clinical Practice Guideline',
    'clinical.evidenceSysRev': 'Systematic Review',
    'clinical.evidenceRct': 'Randomized Controlled Trial',
    'clinical.evidenceConsensus': 'Expert Delphi Consensus',
    'clinical.footerDisclaimer': 'For educational and clinical-decision support only. Not a substitute for professional judgment. Adjust dosing to the individual patient.',
    'clinical.lastReviewed': 'Last reviewed',
    'clinical.printPdf': 'Print / Save as PDF',
    'clinical.copyProtocol': 'Copy Full Protocol',
    'clinical.protocolCopied': 'Protocol Copied',

    // Useful Extras
    'extra.teachingMode': 'Teaching Mode',
    'extra.teachingModeOn': 'Teaching Mode Active',
    'extra.teachingModeDesc': 'Exercise dosages hidden to test recall; clinical reasoning & viva questions revealed below.',
    'extra.revealDose': 'Click to reveal dose',
    'extra.hideDose': 'Hide dose',
    'extra.clinicalReasoning': 'Clinical Reasoning & Biomechanical Pearls',
    'extra.vivaQuestions': 'Viva & Examination Questions',
    'extra.showAnswer': 'Show Answer',
    'extra.hideAnswer': 'Hide Answer',
    'extra.compare': 'Compare Condition',
    'extra.comparingWith': 'Comparing With',
    'extra.selectConditionToCompare': 'Select a condition to compare side-by-side',
    'extra.closeCompare': 'Close Comparison',
    'extra.bookmarks': 'Bookmarks',
    'extra.bookmarkCondition': 'Bookmark this condition',
    'extra.bookmarked': 'Bookmarked',
    'extra.recentlyViewed': 'Recently Viewed',
  },
  hi: {
    // Level 1 Joints
    'joint.all': 'सभी जोड़ कॉम्प्लेक्स',
    'joint.knee': 'घुटना (Knee)',
    'joint.lumbar': 'कमर और पेल्विस (Lumbar Spine)',
    'joint.shoulder': 'कंधा (Shoulder)',
    'joint.cervical': 'गर्दन (Cervical Spine)',
    'joint.hip': 'कूल्हा और कमर (Hip & Groin)',
    'joint.elbow': 'कोहनी (Elbow)',
    'joint.wrist': 'कलाई और हाथ (Wrist & Hand)',
    'joint.ankle': 'टखना और पैर (Ankle & Foot)',
    'joint.tmj': 'जबड़ा (TMJ)',
    'joint.thoracic': 'छाती की रीढ़ और पसलियां (Thoracic Spine)',

    // Level 2 Tissue Groups & Types
    'tissue.hardHeader': 'कठोर ऊतक (Hard Tissue)',
    'tissue.softHeader': 'कोमल ऊतक (Soft Tissue)',
    'tissue.all': 'सभी ऊतक',
    'tissue.postSurgical': 'सर्जरी के बाद (Post-op)',
    'tissue.bone': 'हड्डी (फ्रैक्चर, स्ट्रेस इंजरी)',
    'tissue.articular': 'जोड़ की सतह / उपास्थि (OA, घाव)',
    'tissue.ligament': 'लिगामेंट (स्नायुबंधन)',
    'tissue.muscleTendon': 'मांसपेशी और टेंडन',
    'tissue.meniscusCartilage': 'मेनिस्कस / लैब्रम / कार्टिलेज',
    'tissue.nerve': 'तंत्रिका / नर्व',
    'tissue.disc': 'डिस्क',
    'tissue.bursaFascia': 'बर्सा और प्रावरणी',

    // Tags
    'tag.hard': 'हार्ड',
    'tag.soft': 'सॉफ्ट',
    'tag.acute': 'तीव्र (Acute)',
    'tag.chronic': 'दीर्घकालिक (Chronic)',
    'tag.postOp': 'सर्जरी बाद',
    'tag.low': 'कम जलन',
    'tag.mod': 'मध्यम जलन',
    'tag.high': 'उच्च जलन',

    // Breadcrumbs & Navigation
    'nav.drilldownTitle': '3-स्तरीय संरचनात्मक ड्रिल-डाउन',
    'nav.resetFilters': 'सभी रीसेट करें',
    'nav.emptyTitle': 'इस संयोजन के लिए कोई स्थिति नहीं मिली',
    'nav.emptyDesc': 'कृपया अन्य ऊतक प्रकार चुनें या इस जोड़ की सभी स्थितियाँ देखने के लिए रीसेट करें।',
    'nav.tests': 'परीक्षण',
    'nav.rehab': '4-चरण पुनर्वास',
    'nav.selectToInspect': 'विस्तार देखने के लिए चुनें',

    // Clinical Quality Additions
    'clinical.redFlagsTitle': 'रेड फ्लैग्स और कब रेफर करें',
    'clinical.whenToRefer': 'विशेषज्ञ / सर्जन को कब रेफर करें',
    'clinical.emergency': 'आपातकालीन तत्काल ध्यान आवश्यक',
    'clinical.urgent': 'शीघ्र विशेषज्ञ परामर्श आवश्यक',
    'clinical.progressionChecklist': 'चरण प्रगति मापदंड चेकलिस्ट',
    'clinical.criteriaCheckDesc': 'मरीज को अगले चरण में ले जाने से पहले सभी मापदंड सत्यापित करें',
    'clinical.outcomeMeasuresTitle': 'मान्य परिणाम उपाय और एमसीआईडी (MCID)',
    'clinical.measureName': 'परिणाम पैमाना',
    'clinical.mcid': 'एमसीआईडी (न्यूनतम नैदानिक महत्वपूर्ण अंतर)',
    'clinical.target': 'नैदानिक लक्ष्य',
    'clinical.evidenceBadge': 'प्रमाण स्तर',
    'clinical.evidenceGuideline': 'क्लिनिकल प्रैक्टिस गाइडलाइन',
    'clinical.evidenceSysRev': 'सिस्टमैटिक रिव्यू',
    'clinical.evidenceRct': 'रैंडमाइज्ड कंट्रोल्ड ट्रायल',
    'clinical.evidenceConsensus': 'विशेषज्ञ डेल्फी सर्वसम्मति',
    'clinical.footerDisclaimer': 'केवल शैक्षिक और नैदानिक-निर्णय सहायता के लिए। पेशेवर निर्णय का विकल्प नहीं। व्यक्तिगत रोगी के अनुसार खुराक समायोजित करें।',
    'clinical.lastReviewed': 'अंतिम समीक्षा',
    'clinical.printPdf': 'प्रिंट / पीडीएफ के रूप में सहेजें',
    'clinical.copyProtocol': 'पूरा प्रोटोकॉल कॉपी करें',
    'clinical.protocolCopied': 'प्रोटोकॉल कॉपी किया गया',

    // Useful Extras
    'extra.teachingMode': 'शिक्षण मोड (Teaching Mode)',
    'extra.teachingModeOn': 'शिक्षण मोड सक्रिय',
    'extra.teachingModeDesc': 'खुराक याद रखने का परीक्षण करने के लिए डोज छुपाई गई हैं; क्लिनिकल तर्क और मौखिक प्रश्न नीचे उपलब्ध हैं।',
    'extra.revealDose': 'खुराक देखने के लिए क्लिक करें',
    'extra.hideDose': 'खुराक छुपाएं',
    'extra.clinicalReasoning': 'क्लिनिकल तर्क और बायोमैकेनिकल सिद्धांत',
    'extra.vivaQuestions': 'परीक्षा और मौखिक प्रश्न (Viva)',
    'extra.showAnswer': 'उत्तर देखें',
    'extra.hideAnswer': 'उत्तर छुपाएं',
    'extra.compare': 'तुलना करें',
    'extra.comparingWith': 'के साथ तुलना',
    'extra.selectConditionToCompare': 'साथ-साथ तुलना के लिए दूसरी स्थिति चुनें',
    'extra.closeCompare': 'तुलना बंद करें',
    'extra.bookmarks': 'बुकमार्क',
    'extra.bookmarkCondition': 'इस स्थिति को बुकमार्क करें',
    'extra.bookmarked': 'बुकमार्क किया गया',
    'extra.recentlyViewed': 'हाल ही में देखा गया',
  },
  gu: {
    // Level 1 Joints
    'joint.all': 'બધા સાંધા સંકુલ',
    'joint.knee': 'ઘૂંટણ (Knee)',
    'joint.lumbar': 'કમર અને પેલ્વિસ (Lumbar Spine)',
    'joint.shoulder': 'ખભો (Shoulder)',
    'joint.cervical': 'ડોક (Cervical Spine)',
    'joint.hip': 'થાપો અને જાંઘ (Hip & Groin)',
    'joint.elbow': 'કોણી (Elbow)',
    'joint.wrist': 'કાંડું અને હાથ (Wrist & Hand)',
    'joint.ankle': 'ઘૂંટી અને પગ (Ankle & Foot)',
    'joint.tmj': 'જડબું (TMJ)',
    'joint.thoracic': 'છાતીની કરોડ અને પાંસળીઓ (Thoracic Spine)',

    // Level 2 Tissue Groups & Types
    'tissue.hardHeader': 'કઠણ પેશી (Hard Tissue)',
    'tissue.softHeader': 'નરમ પેશી (Soft Tissue)',
    'tissue.all': 'બધી પેશીઓ',
    'tissue.postSurgical': 'ઓપરેશન પછી (Post-op)',
    'tissue.bone': 'હાડકું (ફ્રેક્ચર, તિરાડ, સ્ટ્રેસ ઇજા)',
    'tissue.articular': 'સાંધાની સપાટી / કૂર્ચા (OA, ઘસારો)',
    'tissue.ligament': 'લિગામેન્ટ (સ્નાયુબંધન)',
    'tissue.muscleTendon': 'સ્નાયુ અને ટેન્ડન',
    'tissue.meniscusCartilage': 'મેનિસ્કસ / લેબ્રમ / કાર્ટિલેજ',
    'tissue.nerve': 'ચેતા / નર્વ',
    'tissue.disc': 'ડિસ્ક',
    'tissue.bursaFascia': 'બર્સા અને ફેસિયા',

    // Tags
    'tag.hard': 'હાર્ડ',
    'tag.soft': 'સોફ્ટ',
    'tag.acute': 'તીવ્ર (Acute)',
    'tag.chronic': 'લાંબા ગાળાનું (Chronic)',
    'tag.postOp': 'સર્જરી પછી',
    'tag.low': 'ઓછી બળતરા',
    'tag.mod': 'મધ્યમ બળતરા',
    'tag.high': 'વધુ બળતરા',

    // Breadcrumbs & Navigation
    'nav.drilldownTitle': '3-સ્તરીય રચનાત્મક ડ્રિલ-ડાઉન',
    'nav.resetFilters': 'બધા રીસેટ કરો',
    'nav.emptyTitle': 'આ પસંદગી માટે કોઈ સ્થિતિ ઉપલબ્ધ નથી',
    'nav.emptyDesc': 'કૃપા કરીને અન્ય પેશી પ્રકાર પસંદ કરો અથવા આ સાંધાની બધી સ્થિતિઓ જોવા રીસેટ કરો.',
    'nav.tests': 'ટેસ્ટ્સ',
    'nav.rehab': '4-તબક્કા રિહેબ',
    'nav.selectToInspect': 'વિગતો જોવા માટે પસંદ કરો',

    // Clinical Quality Additions
    'clinical.redFlagsTitle': 'રેડ ફ્લેગ્સ અને ક્યારે રેફર કરવું',
    'clinical.whenToRefer': 'નિષ્ણાત / સર્જનને ક્યારે રેફર કરવું',
    'clinical.emergency': 'તાત્કાલિક ઇમરજન્સી તપાસ જરૂરી',
    'clinical.urgent': 'ઝડપી નિષ્ણાત પરામર્શ જરૂરી',
    'clinical.progressionChecklist': 'તબક્કા પ્રગતિ માપદંડ ચેકલિસ્ટ',
    'clinical.criteriaCheckDesc': 'દર્દીને આગળના તબક્કામાં મોકલતા પહેલા બધા માપદંડ તપાસો',
    'clinical.outcomeMeasuresTitle': 'પ્રમાણિત પરિણામ સ્કેલ અને એમસીઆઈડી (MCID)',
    'clinical.measureName': 'પરિણામ માપદંડ',
    'clinical.mcid': 'એમસીઆઈડી (લઘુત્તમ ક્લિનિકલ મહત્વપૂર્ણ તફાવત)',
    'clinical.target': 'ક્લિનિકલ લક્ષ્ય',
    'clinical.evidenceBadge': 'પુરાવા સ્તર',
    'clinical.evidenceGuideline': 'ક્લિનિકલ પ્રેક્ટિસ ગાઇડલાઇન',
    'clinical.evidenceSysRev': 'સિસ્ટમેટિક રિવ્યુ',
    'clinical.evidenceRct': 'રેન્ડમાઇઝ્ડ કંટ્રોલ્ડ ટ્રાયલ',
    'clinical.evidenceConsensus': 'નિષ્ણાત ડેલફી સર્વસંમતિ',
    'clinical.footerDisclaimer': 'માત્ર શૈક્ષણિક અને ક્લિનિકલ નિર્ણય આધાર માટે. વ્યાવસાયિક નિર્ણયનો વિકલ્પ નથી. દરેક દર્દી અનુસાર કસરતની માત્રા ગોઠવો.',
    'clinical.lastReviewed': 'છેલ્લી સમીક્ષા',
    'clinical.printPdf': 'પ્રિન્ટ / પીડીએફ તરીકે સાચવો',
    'clinical.copyProtocol': 'સંપૂર્ણ પ્રોટોકોલ કોપી કરો',
    'clinical.protocolCopied': 'પ્રોટોકોલ કોપી થઈ ગયો',

    // Useful Extras
    'extra.teachingMode': 'શિક્ષણ મોડ (Teaching Mode)',
    'extra.teachingModeOn': 'શિક્ષણ મોડ સક્રિય',
    'extra.teachingModeDesc': 'યાદશક્તિ ચકાસવા માટે કસરતની માત્રા છુપાવેલ છે; ક્લિનિકલ તર્ક અને મૌખિક પ્રશ્નો નીચે દર્શાવેલ છે.',
    'extra.revealDose': 'માત્રા જોવા માટે ક્લિક કરો',
    'extra.hideDose': 'માત્રા છુપાવો',
    'extra.clinicalReasoning': 'ક્લિનિકલ તર્ક અને બાયોમિકેનિકલ સિદ્ધાંતો',
    'extra.vivaQuestions': 'પરીક્ષા અને મૌખિક પ્રશ્નો (Viva)',
    'extra.showAnswer': 'જવાબ જુઓ',
    'extra.hideAnswer': 'જવાબ છુપાવો',
    'extra.compare': 'સરખામણી કરો',
    'extra.comparingWith': 'સાથે સરખામણી',
    'extra.selectConditionToCompare': 'સરખામણી કરવા બીજી સ્થિતિ પસંદ કરો',
    'extra.closeCompare': 'સરખામણી બંધ કરો',
    'extra.bookmarks': 'બુકમાર્ક્સ',
    'extra.bookmarkCondition': 'આ સ્થિતિ બુકમાર્ક કરો',
    'extra.bookmarked': 'બુકમાર્ક કરેલ',
    'extra.recentlyViewed': 'તાજેતરમાં જોયેલું',
  },
};

// Hard and Soft tissue chip configurations
const HARD_TISSUE_CHIPS: { type: TissueType; labelKey: string }[] = [
  { type: 'Bone', labelKey: 'tissue.bone' },
  { type: 'Articular Surface', labelKey: 'tissue.articular' },
];

const SOFT_TISSUE_CHIPS: { type: TissueType; labelKey: string }[] = [
  { type: 'Ligament', labelKey: 'tissue.ligament' },
  { type: 'Muscle & Tendon', labelKey: 'tissue.muscleTendon' },
  { type: 'Meniscus/Labrum/Cartilage', labelKey: 'tissue.meniscusCartilage' },
  { type: 'Nerve / Neural', labelKey: 'tissue.nerve' },
  { type: 'Disc', labelKey: 'tissue.disc' },
  { type: 'Bursa & Fascia', labelKey: 'tissue.bursaFascia' },
];

export const JointProtocolsEncyclopedia: React.FC<JointProtocolsEncyclopediaProps> = ({
  initialConditionId,
  onApplyToPatient,
}) => {
  const { language } = useLanguage();
  const tr = (key: string): string => TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;

  // View Mode: Named Protocols Library vs Joints vs Medical Specialties
  const [viewMode, setViewMode] = useState<'named-library' | 'joints' | 'specialties'>('joints');

  // Level 1: Selected Joint
  const [selectedJoint, setSelectedJoint] = useState<JointRegion>('Knee');
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyId>('neurology');

  // Level 2: Selected Tissue Filter
  // 'all' | 'post-op' | 'hard-group' | 'soft-group' | specific TissueType
  const [selectedTissueFilter, setSelectedTissueFilter] = useState<string>('all');
  const [selectedTissueGroup, setSelectedTissueGroup] = useState<'all' | 'hard' | 'soft'>('all');

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<
    'physiotherapy' | 'presentation' | 'tests' | 'investigations' | 'advances'
  >('physiotherapy');
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  // Useful Extras State
  const [teachingMode, setTeachingMode] = useState(false);
  const [revealedDoses, setRevealedDoses] = useState<Record<string, boolean>>({});
  const [expandedViva, setExpandedViva] = useState<Record<number, boolean>>({});
  const [compareConditionId, setCompareConditionId] = useState<string | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clinica_bookmarked_conditions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recentConditionIds, setRecentConditionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clinica_recent_conditions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // Phase Progression Checked Items state: [phaseIdx-critIdx]: boolean
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>({});

  // Combine both pools into a unified list
  const allUnifiedConditions: UnifiedCondition[] = useMemo(() => {
    const joints: UnifiedCondition[] = ALL_JOINT_CONDITIONS.map((c) => ({
      ...c,
      domainType: 'joint',
      displayTag: c.joint,
    }));
    const specialties: UnifiedCondition[] = ALL_SPECIALTY_CONDITIONS.map((c) => ({
      ...c,
      domainType: 'specialty',
      displayTag: c.category,
    }));
    return [...joints, ...specialties];
  }, []);

  // Compute conditions for currently selected joint
  const conditionsForCurrentJoint = useMemo(() => {
    return ALL_JOINT_CONDITIONS.filter((c) => c.joint === selectedJoint);
  }, [selectedJoint]);

  // Compute Level 2 chip live counts for current joint
  const chipCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: conditionsForCurrentJoint.length,
      'post-op': conditionsForCurrentJoint.filter((c) => c.acuity === 'post-op').length,
      hard: conditionsForCurrentJoint.filter((c) => c.tissue_group === 'hard').length,
      soft: conditionsForCurrentJoint.filter((c) => c.tissue_group === 'soft').length,
    };

    HARD_TISSUE_CHIPS.forEach((chip) => {
      counts[chip.type] = conditionsForCurrentJoint.filter((c) =>
        c.tissue_types?.includes(chip.type)
      ).length;
    });

    SOFT_TISSUE_CHIPS.forEach((chip) => {
      counts[chip.type] = conditionsForCurrentJoint.filter((c) =>
        c.tissue_types?.includes(chip.type)
      ).length;
    });

    return counts;
  }, [conditionsForCurrentJoint]);

  // Filter current catalog based on Level 1, Level 2, Level 3, Search, or Bookmarks
  const currentCatalog = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return allUnifiedConditions.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.clinicalPresentation.toLowerCase().includes(q) ||
          ('joint' in c && c.joint?.toLowerCase().includes(q)) ||
          ('specialty' in c && c.specialty?.toLowerCase().includes(q)) ||
          ('tissue_types' in c && c.tissue_types?.some((t) => t.toLowerCase().includes(q))) ||
          c.bedsideAssessmentTests.some((t) => t.testName.toLowerCase().includes(q)) ||
          c.physiotherapyProtocol.phases.some((p) =>
            p.exercisePrescription.some((e) => e.exerciseName.toLowerCase().includes(q))
          )
      );
    }

    if (showOnlyBookmarks) {
      return allUnifiedConditions.filter((c) => bookmarks.includes(c.id));
    }

    if (viewMode === 'joints') {
      let filtered = conditionsForCurrentJoint;

      if (selectedTissueFilter === 'all') {
        if (selectedTissueGroup === 'hard') {
          filtered = filtered.filter((c) => c.tissue_group === 'hard');
        } else if (selectedTissueGroup === 'soft') {
          filtered = filtered.filter((c) => c.tissue_group === 'soft');
        }
      } else if (selectedTissueFilter === 'post-op') {
        filtered = filtered.filter((c) => c.acuity === 'post-op');
      } else {
        // Specific tissue type filter
        filtered = filtered.filter((c) =>
          c.tissue_types?.includes(selectedTissueFilter as TissueType)
        );
      }

      return filtered.map((c) => ({
        ...c,
        domainType: 'joint' as const,
        displayTag: c.joint,
      }));
    } else {
      return allUnifiedConditions.filter(
        (c) => c.domainType === 'specialty' && 'specialty' in c && c.specialty === selectedSpecialty
      );
    }
  }, [
    allUnifiedConditions,
    searchQuery,
    showOnlyBookmarks,
    bookmarks,
    viewMode,
    conditionsForCurrentJoint,
    selectedTissueFilter,
    selectedTissueGroup,
    selectedSpecialty,
  ]);

  // Selected Condition ID
  const [selectedConditionId, setSelectedConditionId] = useState<string>(() => {
    if (initialConditionId) return initialConditionId;
    const firstKnee = ALL_JOINT_CONDITIONS.find((c) => c.joint === 'Knee');
    return firstKnee ? firstKnee.id : ALL_JOINT_CONDITIONS[0]?.id || '';
  });

  const selectedCondition: UnifiedCondition = useMemo(() => {
    return (
      allUnifiedConditions.find((c) => c.id === selectedConditionId) ||
      currentCatalog[0] ||
      allUnifiedConditions[0]
    );
  }, [selectedConditionId, currentCatalog, allUnifiedConditions]);

  // Track recently viewed conditions
  useEffect(() => {
    if (selectedCondition?.id) {
      setRecentConditionIds((prev) => {
        const updated = [selectedCondition.id, ...prev.filter((id) => id !== selectedCondition.id)].slice(0, 5);
        try {
          localStorage.setItem('clinica_recent_conditions', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    }
  }, [selectedCondition?.id]);

  // Bookmark toggle
  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      try {
        localStorage.setItem('clinica_bookmarked_conditions', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Handle select condition (Level 3 click or search result click)
  const handleSelectCondition = (condition: UnifiedCondition) => {
    setSelectedConditionId(condition.id);

    if (condition.domainType === 'joint' && 'joint' in condition && condition.joint) {
      setViewMode('joints');
      setSelectedJoint(condition.joint);
      // Auto-set tissue group and filter if coming from global search
      if ('tissue_group' in condition && condition.tissue_group) {
        setSelectedTissueGroup(condition.tissue_group);
      }
      if ('tissue_types' in condition && condition.tissue_types?.[0]) {
        setSelectedTissueFilter(condition.tissue_types[0]);
      } else {
        setSelectedTissueFilter('all');
      }
    } else if (condition.domainType === 'specialty' && 'specialty' in condition && condition.specialty) {
      setViewMode('specialties');
      setSelectedSpecialty(condition.specialty);
    }

    setActivePhaseIndex(0);

    // Scroll to detail panel smoothly on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const el = document.getElementById('condition-detail-panel');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Level 1 Joint Card Click
  const handleSelectJoint = (jointId: JointRegion) => {
    setSelectedJoint(jointId);
    // Selecting a new joint resets Levels 2 and 3 per requirement
    setSelectedTissueFilter('all');
    setSelectedTissueGroup('all');
    setShowOnlyBookmarks(false);

    const firstInJoint = ALL_JOINT_CONDITIONS.find((c) => c.joint === jointId);
    if (firstInJoint) {
      setSelectedConditionId(firstInJoint.id);
    }
    setActivePhaseIndex(0);
  };

  // Level 2 Chip Click
  const handleSelectTissueFilter = (filter: string, group?: 'hard' | 'soft') => {
    setSelectedTissueFilter(filter);
    if (group) {
      setSelectedTissueGroup(group);
    } else if (filter === 'all' || filter === 'post-op') {
      setSelectedTissueGroup('all');
    }

    // Auto-select first matching condition in Level 3
    const matching = conditionsForCurrentJoint.filter((c) => {
      if (filter === 'all') return true;
      if (filter === 'post-op') return c.acuity === 'post-op';
      return c.tissue_types?.includes(filter as TissueType);
    });

    if (matching.length > 0 && !matching.some((m) => m.id === selectedConditionId)) {
      setSelectedConditionId(matching[0].id);
      setActivePhaseIndex(0);
    }
  };

  // Copy Protocol Handler
  const handleCopyProtocol = () => {
    const p = selectedCondition.physiotherapyProtocol;
    const text = `
CLINICAAI EVIDENCE-BASED PHYSIOTHERAPY PROTOCOL
Condition: ${selectedCondition.name} (${selectedCondition.displayTag})
Evidence Strength: ${('evidence_strength' in selectedCondition && selectedCondition.evidence_strength) || 'Clinical Guideline'}
Last Reviewed: ${('last_reviewed' in selectedCondition && selectedCondition.last_reviewed) || '2026-08-20'}
Guideline Basis: ${p.guidelineBasis || 'Evidence-Based Practice'}
Summary: ${p.summary || selectedCondition.clinicalPresentation}

${p.phases
  .map(
    (phase) => `
PHASE ${phase.phaseNumber}: ${phase.phaseName.toUpperCase()} (${phase.timeline})
Goals: ${phase.clinicalGoals.join(', ')}
Exercises:
${phase.exercisePrescription.map((e) => ` - [${e.category}] ${e.exerciseName}: ${e.dosage} (Rationale: ${e.clinicalRationale})`).join('\n')}
Progression Criteria: ${phase.progressionCriteria.join(', ')}
Precautions: ${phase.precautionsAndContraindications.join(', ')}
`
  )
  .join('\n')}

${('outcome_measures' in selectedCondition && selectedCondition.outcome_measures && selectedCondition.outcome_measures.length > 0)
  ? `OUTCOME MEASURES & MCID:\n${selectedCondition.outcome_measures.map(o => ` - ${o.name}: MCID ${o.mcid} (Target: ${o.target || 'Met'})`).join('\n')}\n`
  : ''}
DISCHARGE / RETURN TO FUNCTION & SPORT CRITERIA:
${(p.dischargeAndReturnToActivityCriteria || []).join('\n - ')}

PATIENT EDUCATION:
${p.patientEducationSummary || ''}

DISCLAIMER:
Last reviewed: ${('last_reviewed' in selectedCondition && selectedCondition.last_reviewed) || '2026-08-20'}. For educational and clinical-decision support only. Not a substitute for professional judgment. Adjust dosing to the individual patient.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 2500);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Toggle checklist checkbox
  const toggleCriterion = (key: string) => {
    setCheckedCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Actions Bar */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Comprehensive Clinical Protocols & Dosed Physiotherapy Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Clinical Protocols & Phased Physiotherapy Dosing Encyclopedia
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Evidence-based conditions spanning Peripheral MSK Joints, Neurology, Neurosurgery, Paediatrics, Geriatrics, Cardiopulmonary, and Rheumatology. Each includes bedside diagnostic accuracy, multi-modality investigations, recent literature with DOIs, and 4-phase exercise dosing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Teaching Mode Toggle */}
          <button
            onClick={() => setTeachingMode(!teachingMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              teachingMode
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Toggle Teaching Mode: hides exercise doses to test clinical recall"
          >
            <GraduationCap className={`w-4 h-4 ${teachingMode ? 'text-amber-700' : 'text-slate-500'}`} />
            <span>{teachingMode ? tr('extra.teachingModeOn') : tr('extra.teachingMode')}</span>
          </button>

          {/* Print / Save as PDF Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
            title="Print or export current protocol to PDF"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{tr('clinical.printPdf')}</span>
          </button>

          {/* Copy Full Protocol Button */}
          <button
            onClick={handleCopyProtocol}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
            title="Copy complete structured protocol to clipboard"
          >
            {copiedProtocol ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">{tr('clinical.protocolCopied')}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>{tr('clinical.copyProtocol')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Domain Switcher: Named Protocols Library vs Joint Complexes vs Medical Specialties */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              setViewMode('named-library');
              setSearchQuery('');
              setShowOnlyBookmarks(false);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'named-library'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Named Protocols Library (Word Doc Master)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-800 text-teal-300">
              {MASTER_NAMED_PROTOCOLS.length} Protocols
            </span>
          </button>

          <button
            onClick={() => {
              setViewMode('joints');
              setSearchQuery('');
              setShowOnlyBookmarks(false);
              const firstJoint = ALL_JOINT_CONDITIONS.find((c) => c.joint === selectedJoint);
              if (firstJoint) setSelectedConditionId(firstJoint.id);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'joints' && !searchQuery && !showOnlyBookmarks
                ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>Musculoskeletal Joint Complexes</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800 font-bold">
              {ALL_JOINT_CONDITIONS.length}
            </span>
          </button>

          <button
            onClick={() => {
              setViewMode('specialties');
              setSearchQuery('');
              setShowOnlyBookmarks(false);
              const firstSpec = ALL_SPECIALTY_CONDITIONS.find((c) => c.specialty === selectedSpecialty);
              if (firstSpec) setSelectedConditionId(firstSpec.id);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'specialties' && !searchQuery && !showOnlyBookmarks
                ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-indigo-600" />
            <span>Medical Specialties</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
              {ALL_SPECIALTY_CONDITIONS.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Bookmarks Filter Button */}
          {bookmarks.length > 0 && (
            <button
              onClick={() => {
                setShowOnlyBookmarks(!showOnlyBookmarks);
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                showOnlyBookmarks
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{tr('extra.bookmarks')} ({bookmarks.length})</span>
            </button>
          )}

          <div className="text-[11px] text-slate-500 px-2 font-mono hidden sm:block">
            {MASTER_NAMED_PROTOCOLS.length + allUnifiedConditions.length} Total Clinical Records Indexed
          </div>
        </div>
      </div>

      {viewMode === 'named-library' ? (
        <NamedProtocolsLibrary />
      ) : (
        <>
          {/* ======================================================== */}
          {/* LEVEL 1: JOINT / REGION CARDS (Condition Count per Joint) */}
          {/* ======================================================== */}
          {!searchQuery && !showOnlyBookmarks && viewMode === 'joints' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                  <span>Level 1: Joint & Regional Complexes</span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  10 Joint Complexes · 65 Evidence-Based Conditions
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {JOINT_REGIONS_LIST.map((joint) => {
                  const isSelected = selectedJoint === joint.id;
                  return (
                    <button
                      key={joint.id}
                      onClick={() => handleSelectJoint(joint.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-700 bg-teal-50/80 shadow-xs ring-2 ring-teal-600/40 text-teal-950'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-teal-900' : 'text-slate-900'}`}>
                          {joint.id}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                            isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {joint.conditionCount}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {joint.keyAnatomy}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Level 1 Specialties Selector (if viewMode === 'specialties') */}
          {!searchQuery && !showOnlyBookmarks && viewMode === 'specialties' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {ALL_SPECIALTIES_SECTIONS.map((sec) => {
                const isSelected = selectedSpecialty === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setSelectedSpecialty(sec.id);
                      const first = ALL_SPECIALTY_CONDITIONS.find((c) => c.specialty === sec.id);
                      if (first) setSelectedConditionId(first.id);
                    }}
                    className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-700 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-600/30'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                        {sec.label.split('&')[0].trim()}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                        {sec.conditionCount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {sec.corePhysioRole}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* ======================================================== */}
          {/* LEVEL 2: TISSUE STRUCTURE FILTER (Chips with Live Counts) */}
          {/* ======================================================== */}
          {!searchQuery && !showOnlyBookmarks && viewMode === 'joints' && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Level 2: Tissue Structure Filter ({selectedJoint})</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  Select a tissue layer to filter conditions
                </span>
              </div>

              {/* Top Global Chips: All & Post-Surgical */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 whitespace-nowrap">
                <button
                  onClick={() => handleSelectTissueFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedTissueFilter === 'all' && selectedTissueGroup === 'all'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span>{tr('tissue.all')}</span>
                  <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200/60 text-slate-800">
                    {chipCounts.all}
                  </span>
                </button>

                <button
                  onClick={() => handleSelectTissueFilter('post-op')}
                  disabled={chipCounts['post-op'] === 0}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    chipCounts['post-op'] === 0
                      ? 'opacity-40 cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                      : selectedTissueFilter === 'post-op'
                      ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                      : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <span>{tr('tissue.postSurgical')}</span>
                  <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-800">
                    {chipCounts['post-op']}
                  </span>
                </button>
              </div>

              {/* Group 1: Hard Tissue */}
              <div className="space-y-1.5 pt-1 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    {tr('tissue.hardHeader')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {chipCounts.hard} conditions
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 whitespace-nowrap">
                  {HARD_TISSUE_CHIPS.map((chip) => {
                    const count = chipCounts[chip.type] || 0;
                    const isZero = count === 0;
                    const isSelected = selectedTissueFilter === chip.type;

                    return (
                      <button
                        key={chip.type}
                        onClick={() => handleSelectTissueFilter(chip.type, 'hard')}
                        disabled={isZero}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          isZero
                            ? 'opacity-35 cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                            : isSelected
                            ? 'bg-slate-800 text-white border-slate-800 shadow-xs font-semibold'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                        }`}
                      >
                        <span>{tr(chip.labelKey)}</span>
                        <span
                          className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                            isSelected ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: Soft Tissue */}
              <div className="space-y-1.5 pt-1 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    {tr('tissue.softHeader')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {chipCounts.soft} conditions
                  </span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 whitespace-nowrap">
                  {SOFT_TISSUE_CHIPS.map((chip) => {
                    const count = chipCounts[chip.type] || 0;
                    const isZero = count === 0;
                    const isSelected = selectedTissueFilter === chip.type;

                    return (
                      <button
                        key={chip.type}
                        onClick={() => handleSelectTissueFilter(chip.type, 'soft')}
                        disabled={isZero}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          isZero
                            ? 'opacity-35 cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                            : isSelected
                            ? 'bg-teal-700 text-white border-teal-700 shadow-xs font-semibold'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                        }`}
                      >
                        <span>{tr(chip.labelKey)}</span>
                        <span
                          className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                            isSelected ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Global Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 65 joint & specialty conditions (ACL, Meniscus, Sciatica, Rotator Cuff, Tennis Elbow, Achilles, PTTD, CTS, TMJ, Stroke...)"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Recently Viewed Bar (if items exist) */}
          {recentConditionIds.length > 0 && !searchQuery && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-600 whitespace-nowrap">
              <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>{tr('extra.recentlyViewed')}:</span>
              </span>
              {recentConditionIds.map((id) => {
                const cond = allUnifiedConditions.find((c) => c.id === id);
                if (!cond) return null;
                const isSelected = cond.id === selectedCondition.id;
                return (
                  <button
                    key={id}
                    onClick={() => handleSelectCondition(cond)}
                    className={`px-2 py-1 rounded-md text-[11px] border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cond.name.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>
          )}

          {/* ======================================================== */}
          {/* LEVEL 3 & DETAIL PANEL GRID (Main Content Layout) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Condition List (Level 3) */}
            <div className="lg:col-span-4 space-y-3">
              {/* Breadcrumb Navigation above Level 3 */}
              {!searchQuery && !showOnlyBookmarks && viewMode === 'joints' && (
                <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 overflow-x-auto whitespace-nowrap">
                  <button
                    onClick={() => {
                      setSelectedTissueFilter('all');
                      setSelectedTissueGroup('all');
                    }}
                    className="font-bold text-teal-800 hover:text-teal-950 hover:underline cursor-pointer"
                  >
                    {selectedJoint}
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <button
                    onClick={() => {
                      setSelectedTissueFilter('all');
                    }}
                    className={`hover:underline cursor-pointer ${
                      selectedTissueGroup !== 'all' ? 'font-bold text-slate-800' : 'text-slate-600'
                    }`}
                  >
                    {selectedTissueGroup === 'hard'
                      ? tr('tissue.hardHeader')
                      : selectedTissueGroup === 'soft'
                      ? tr('tissue.softHeader')
                      : tr('tissue.all')}
                  </button>
                  {selectedTissueFilter !== 'all' && (
                    <>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-teal-900 bg-white px-2 py-0.5 rounded shadow-2xs">
                        {selectedTissueFilter === 'post-op' ? tr('tissue.postSurgical') : selectedTissueFilter}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Condition List Header */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
                <span>
                  {searchQuery
                    ? `Search Matches (${currentCatalog.length})`
                    : showOnlyBookmarks
                    ? `Bookmarked Conditions (${currentCatalog.length})`
                    : viewMode === 'joints'
                    ? `${selectedJoint} (${currentCatalog.length})`
                    : `${ALL_SPECIALTIES_SECTIONS.find((s) => s.id === selectedSpecialty)?.label} (${currentCatalog.length})`}
                </span>
                <span className="text-[11px] text-slate-400">{tr('nav.selectToInspect')}</span>
              </div>

              {/* Condition List Rows (Empty State or List) */}
              {currentCatalog.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-slate-300 rounded-xl bg-slate-50 space-y-3">
                  <Info className="w-6 h-6 text-slate-400 mx-auto" />
                  <div className="font-semibold text-sm text-slate-800">{tr('nav.emptyTitle')}</div>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">{tr('nav.emptyDesc')}</p>
                  <button
                    onClick={() => {
                      setSelectedTissueFilter('all');
                      setSelectedTissueGroup('all');
                      setSearchQuery('');
                      setShowOnlyBookmarks(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{tr('nav.resetFilters')}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
                  {currentCatalog.map((cond) => {
                    const isSelected = cond.id === selectedCondition.id;
                    const isBookmarked = bookmarks.includes(cond.id);
                    const tissueGroup = 'tissue_group' in cond ? cond.tissue_group : undefined;
                    const acuity = 'acuity' in cond ? cond.acuity : undefined;
                    const irritability = 'irritability' in cond ? cond.irritability : undefined;

                    return (
                      <div
                        key={cond.id}
                        onClick={() => handleSelectCondition(cond)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-semibold text-sm leading-snug">
                            {cond.name}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {/* Bookmark Star Icon */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(cond.id);
                              }}
                              className={`p-1 rounded hover:bg-slate-200/40 transition-colors cursor-pointer ${
                                isSelected ? 'text-amber-400' : isBookmarked ? 'text-amber-500' : 'text-slate-300'
                              }`}
                              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this condition'}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                            </button>

                            {cond.isRedFlag && (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                                  isSelected
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                                }`}
                              >
                                Red Flag
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Level 3 Metadata Tags: Tissue Group, Acuity, Irritability */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {tissueGroup && (
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-slate-800 text-teal-300 border border-slate-700'
                                  : tissueGroup === 'hard'
                                  ? 'bg-amber-50 text-amber-900 border border-amber-200'
                                  : 'bg-teal-50 text-teal-900 border border-teal-200'
                              }`}
                            >
                              {tissueGroup === 'hard' ? tr('tag.hard') : tr('tag.soft')}
                            </span>
                          )}

                          {acuity && (
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                  : acuity === 'acute'
                                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                                  : acuity === 'chronic'
                                  ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                                  : 'bg-purple-50 text-purple-800 border border-purple-200'
                              }`}
                            >
                              {acuity === 'acute'
                                ? tr('tag.acute')
                                : acuity === 'chronic'
                                ? tr('tag.chronic')
                                : tr('tag.postOp')}
                            </span>
                          )}

                          {irritability && (
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                  : irritability === 'High'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : irritability === 'Mod'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}
                            >
                              {irritability === 'High'
                                ? tr('tag.high')
                                : irritability === 'Mod'
                                ? tr('tag.mod')
                                : tr('tag.low')}
                            </span>
                          )}
                        </div>

                        {/* Subtitle Info */}
                        <div className="flex items-center gap-2 mt-2 text-xs">
                          <span className={`text-[11px] ${isSelected ? 'text-teal-300' : 'text-teal-700 font-medium'}`}>
                            {cond.displayTag}
                          </span>
                          <span className={isSelected ? 'text-slate-400' : 'text-slate-300'}>·</span>
                          <span className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {cond.bedsideAssessmentTests.length} {tr('nav.tests')}
                          </span>
                          <span className={isSelected ? 'text-slate-400' : 'text-slate-300'}>·</span>
                          <span className={`text-[11px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {tr('nav.rehab')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Detail Deep Dive Panel */}
            <div id="condition-detail-panel" className="lg:col-span-8 space-y-4">
              {/* Header Card for Selected Condition */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                      <span>{selectedCondition.displayTag}</span>
                      <span>·</span>
                      <span className="text-teal-700 font-semibold">{selectedCondition.category}</span>
                      {'tissue_types' in selectedCondition && selectedCondition.tissue_types && (
                        <>
                          <span>·</span>
                          <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-mono text-[11px]">
                            {selectedCondition.tissue_types.join(', ')}
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {selectedCondition.name}
                    </h2>

                    {'targetPopulation' in selectedCondition && selectedCondition.targetPopulation && (
                      <p className="text-xs text-slate-500 mt-1">
                        <strong>Population:</strong> {selectedCondition.targetPopulation}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                    <div className="flex items-center gap-2">
                      {/* Compare Button */}
                      <button
                        onClick={() => {
                          setIsCompareModalOpen(true);
                          if (!compareConditionId) {
                            const second = allUnifiedConditions.find((c) => c.id !== selectedCondition.id);
                            if (second) setCompareConditionId(second.id);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                        title="Compare side-by-side with another condition"
                      >
                        <Columns className="w-3.5 h-3.5 text-slate-600" />
                        <span>{tr('extra.compare')}</span>
                      </button>

                      {/* Bookmark Icon Button */}
                      <button
                        onClick={() => toggleBookmark(selectedCondition.id)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          bookmarks.includes(selectedCondition.id)
                            ? 'bg-amber-50 border-amber-300 text-amber-700'
                            : 'bg-white border-slate-300 text-slate-400 hover:text-slate-600'
                        }`}
                        title={bookmarks.includes(selectedCondition.id) ? 'Bookmarked' : 'Add to bookmarks'}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarks.includes(selectedCondition.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Evidence Strength Badge */}
                    {'evidence_strength' in selectedCondition && selectedCondition.evidence_strength && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                        <span>{selectedCondition.evidence_strength}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ======================================================== */}
                {/* CLINICAL QUALITY ADDITION 1: RED FLAGS & WHEN TO REFER */}
                {/* ======================================================== */}
                {('red_flags' in selectedCondition && selectedCondition.red_flags && selectedCondition.red_flags.length > 0) ||
                selectedCondition.isRedFlag ? (
                  <div className="border-l-4 border-rose-600 bg-rose-50/80 rounded-r-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-950 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>{tr('clinical.redFlagsTitle')}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white uppercase tracking-wider">
                        {selectedCondition.redFlagSeverity === 'EMERGENCY_IMMEDIATE'
                          ? tr('clinical.emergency')
                          : tr('clinical.urgent')}
                      </span>
                    </div>

                    {/* Red Flags List */}
                    {'red_flags' in selectedCondition && selectedCondition.red_flags && (
                      <ul className="space-y-1.5 text-xs text-rose-900">
                        {selectedCondition.red_flags.map((flag, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-bold text-rose-700 mt-0.5">•</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* When To Refer */}
                    {'when_to_refer' in selectedCondition && selectedCondition.when_to_refer && (
                      <div className="pt-2 border-t border-rose-200/80">
                        <div className="text-[11px] font-bold text-rose-950 uppercase mb-1">
                          {tr('clinical.whenToRefer')}:
                        </div>
                        <ul className="space-y-1 text-xs text-rose-800">
                          {selectedCondition.when_to_refer.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-rose-600 font-bold">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Navigation Tabs */}
                <div className="flex items-center gap-1 border-b border-slate-200 pt-2 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('physiotherapy')}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'physiotherapy'
                        ? 'border-teal-700 text-teal-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>4-Phase Physiotherapy Protocol</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('presentation')}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'presentation'
                        ? 'border-teal-700 text-teal-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Presentation & Acuity</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('tests')}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'tests'
                        ? 'border-teal-700 text-teal-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Bedside Tests ({selectedCondition.bedsideAssessmentTests.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('investigations')}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'investigations'
                        ? 'border-teal-700 text-teal-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Microscope className="w-3.5 h-3.5" />
                    <span>Investigations Profile ({selectedCondition.investigationsProfile.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('advances')}
                    className={`px-3 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'advances'
                        ? 'border-teal-700 text-teal-800'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recent Advances & Research ({selectedCondition.recentAdvancesAndResearch?.length || 0})</span>
                  </button>
                </div>

                {/* TAB 1: PHYSIOTHERAPY PROTOCOL */}
                {activeTab === 'physiotherapy' && (
                  <div className="space-y-6 pt-2">
                    {/* Summary & Guideline Basis */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Clinical Rehabilitation Synthesis
                        </span>
                        <span className="text-xs font-mono text-teal-700 font-semibold">
                          {selectedCondition.physiotherapyProtocol.guidelineBasis || 'Evidence-Based CPG'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {selectedCondition.physiotherapyProtocol.summary || selectedCondition.clinicalPresentation}
                      </p>
                    </div>

                    {/* Phased Tabs */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-teal-600" />
                          <span>Rehabilitation Progression Phases</span>
                        </h3>
                        <span className="text-xs text-slate-500 font-mono">
                          Phase {activePhaseIndex + 1} of {selectedCondition.physiotherapyProtocol.phases.length}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                        {selectedCondition.physiotherapyProtocol.phases.map((phase, idx) => {
                          const isCurrent = activePhaseIndex === idx;
                          return (
                            <button
                              key={phase.phaseNumber}
                              onClick={() => setActivePhaseIndex(idx)}
                              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                                isCurrent
                                  ? 'border-teal-700 bg-teal-50 ring-1 ring-teal-600 text-slate-900 shadow-xs'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                              }`}
                            >
                              <div className="text-[11px] font-mono font-bold text-teal-700">
                                PHASE {phase.phaseNumber}
                              </div>
                              <div className="text-xs font-semibold mt-0.5 line-clamp-1">
                                {phase.phaseName}
                              </div>
                              <div className="text-[10px] text-slate-500 mt-1 font-mono">
                                {phase.timeline}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Phase Deep Dive */}
                      {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex] && (
                        <div className="space-y-5 border border-slate-200 rounded-lg p-5 bg-white">
                          {/* Phase Header */}
                          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="text-xs font-mono font-bold text-teal-700">
                                PHASE {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].phaseNumber} · {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].timeline}
                              </div>
                              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                                {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].phaseName}
                              </h4>
                            </div>
                          </div>

                          {/* Clinical Goals */}
                          <div>
                            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                              Clinical Goals for this Phase
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].clinicalGoals.map((goal, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                                  <span>{goal}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Exercise Prescription Table (with Teaching Mode Hide/Reveal) */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                Exercise Dosing & Biomechanical Prescription
                              </div>
                              {teachingMode && (
                                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                  {tr('extra.teachingModeOn')}
                                </span>
                              )}
                            </div>

                            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                                  <tr>
                                    <th className="py-2.5 px-3 font-semibold">Category</th>
                                    <th className="py-2.5 px-3 font-semibold">Exercise Name</th>
                                    <th className="py-2.5 px-3 font-semibold">Dosage / Dosing</th>
                                    <th className="py-2.5 px-3 font-semibold">Clinical Rationale</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].exercisePrescription.map((ex, i) => {
                                    const doseKey = `${selectedCondition.id}-${activePhaseIndex}-${i}`;
                                    const isDoseRevealed = revealedDoses[doseKey];

                                    return (
                                      <tr key={i} className="hover:bg-slate-50/50">
                                        <td className="py-2.5 px-3 font-medium text-teal-800 whitespace-nowrap align-top">
                                          {ex.category}
                                        </td>
                                        <td className="py-2.5 px-3 font-semibold text-slate-900 align-top">
                                          {ex.exerciseName}
                                        </td>
                                        <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap align-top">
                                          {teachingMode && !isDoseRevealed ? (
                                            <button
                                              onClick={() =>
                                                setRevealedDoses((prev) => ({ ...prev, [doseKey]: true }))
                                              }
                                              className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded text-[11px] font-sans hover:bg-amber-100 transition-colors cursor-pointer"
                                              title="Click to test your memory and reveal dose"
                                            >
                                              <Eye className="w-3 h-3 text-amber-600" />
                                              <span>{tr('extra.revealDose')}</span>
                                            </button>
                                          ) : (
                                            <div className="flex items-center gap-1.5">
                                              <span>{ex.dosage}</span>
                                              {teachingMode && (
                                                <button
                                                  onClick={() =>
                                                    setRevealedDoses((prev) => ({ ...prev, [doseKey]: false }))
                                                  }
                                                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                                                  title="Hide dose again"
                                                >
                                                  <EyeOff className="w-3 h-3" />
                                                </button>
                                              )}
                                            </div>
                                          )}
                                        </td>
                                        <td className="py-2.5 px-3 text-slate-600 leading-relaxed align-top">
                                          {ex.clinicalRationale}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* ======================================================== */}
                          {/* CLINICAL QUALITY ADDITION 2: PHASE PROGRESSION CRITERIA CHECKLIST */}
                          {/* ======================================================== */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 uppercase tracking-wide">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>{tr('clinical.progressionChecklist')}</span>
                                </div>
                                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                                  Required to advance
                                </span>
                              </div>

                              <p className="text-[11px] text-emerald-800">
                                {tr('clinical.criteriaCheckDesc')}
                              </p>

                              <div className="space-y-1.5 pt-1">
                                {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].progressionCriteria.map((c, i) => {
                                  const key = `${selectedCondition.id}-${activePhaseIndex}-${i}`;
                                  const isChecked = !!checkedCriteria[key];

                                  return (
                                    <div
                                      key={i}
                                      onClick={() => toggleCriterion(key)}
                                      className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                                        isChecked
                                          ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950 font-medium'
                                          : 'bg-white border-emerald-100 text-slate-700 hover:bg-emerald-50/60'
                                      }`}
                                    >
                                      {isChecked ? (
                                        <CheckSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                                      ) : (
                                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                      )}
                                      <span className={isChecked ? 'line-through text-emerald-900 opacity-80' : ''}>
                                        {c}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Precautions & Contraindications */}
                            <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-4 space-y-2.5">
                              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                                <span>Precautions & Contraindications</span>
                              </div>
                              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                                {selectedCondition.physiotherapyProtocol.phases[activePhaseIndex].precautionsAndContraindications.map((p, i) => (
                                  <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-amber-100">
                                    <span className="text-amber-700 font-bold shrink-0">⚠</span>
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ======================================================== */}
                    {/* CLINICAL QUALITY ADDITION 3: OUTCOME MEASURES & MCID TABLE */}
                    {/* ======================================================== */}
                    {'outcome_measures' in selectedCondition &&
                      selectedCondition.outcome_measures &&
                      selectedCondition.outcome_measures.length > 0 && (
                        <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-teal-600" />
                              <span>{tr('clinical.outcomeMeasuresTitle')}</span>
                            </h3>
                            <span className="text-[11px] text-slate-500 font-mono">
                              Clinically Validated Instruments
                            </span>
                          </div>

                          <div className="overflow-x-auto border border-slate-200 rounded-lg">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                                <tr>
                                  <th className="py-2.5 px-3 font-semibold">{tr('clinical.measureName')}</th>
                                  <th className="py-2.5 px-3 font-semibold">{tr('clinical.mcid')}</th>
                                  <th className="py-2.5 px-3 font-semibold">{tr('clinical.target')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {selectedCondition.outcome_measures.map((om, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/50">
                                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                                      {om.name}
                                    </td>
                                    <td className="py-2.5 px-3 font-mono text-teal-800 font-bold">
                                      {om.mcid}
                                    </td>
                                    <td className="py-2.5 px-3 text-slate-700">
                                      {om.target || 'Resolution of functional limitation'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    {/* Discharge / Return-to-Function Milestones */}
                    <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4 text-teal-600" />
                        <span>Discharge, Functional Independence & Maintenance Criteria</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {(selectedCondition.physiotherapyProtocol.dischargeAndReturnToActivityCriteria || []).map((crit, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                            <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{crit}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200">
                        <div className="text-[11px] font-bold text-slate-600 uppercase mb-1">
                          Patient Education Summary
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed italic">
                          "{selectedCondition.physiotherapyProtocol.patientEducationSummary}"
                        </p>
                      </div>
                    </div>

                    {/* ======================================================== */}
                    {/* USEFUL EXTRA 1: TEACHING MODE ACCORDION & VIVA QUESTIONS */}
                    {/* ======================================================== */}
                    {teachingMode && 'teaching_notes' in selectedCondition && selectedCondition.teaching_notes && (
                      <div className="border border-amber-300 bg-amber-50/70 rounded-xl p-5 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wider">
                          <GraduationCap className="w-5 h-5 text-amber-700" />
                          <span>{tr('extra.clinicalReasoning')}</span>
                        </div>

                        <div className="bg-white p-3.5 rounded-lg border border-amber-200 text-xs text-slate-800 leading-relaxed">
                          {selectedCondition.teaching_notes.clinicalReasoning}
                        </div>

                        {selectedCondition.teaching_notes.vivaQuestions && (
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-amber-950 uppercase">
                              {tr('extra.vivaQuestions')}
                            </div>

                            {selectedCondition.teaching_notes.vivaQuestions.map((vq, idx) => {
                              const isRevealed = expandedViva[idx];
                              return (
                                <div key={idx} className="bg-white rounded-lg border border-amber-200 p-3.5 space-y-2">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="font-semibold text-xs text-slate-900">
                                      Q{idx + 1}: {vq.question}
                                    </div>
                                    <button
                                      onClick={() =>
                                        setExpandedViva((prev) => ({ ...prev, [idx]: !prev[idx] }))
                                      }
                                      className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 px-2 py-0.5 rounded bg-amber-100 shrink-0 cursor-pointer"
                                    >
                                      {isRevealed ? tr('extra.hideAnswer') : tr('extra.showAnswer')}
                                    </button>
                                  </div>

                                  {isRevealed && (
                                    <div className="text-xs text-slate-700 pt-2 border-t border-amber-100 bg-amber-50/40 p-2 rounded leading-relaxed">
                                      <strong>Model Clinical Answer:</strong> {vq.answer}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: PRESENTATION & ACUITY */}
                {activeTab === 'presentation' && (
                  <div className="space-y-5 pt-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-2">
                        Clinical Presentation & Pathophysiology
                      </h3>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 leading-relaxed">
                        {selectedCondition.clinicalPresentation}
                      </div>
                    </div>

                    {'clinicalPearls' in selectedCondition && selectedCondition.clinicalPearls && (
                      <div className="bg-teal-50/60 border border-teal-200 rounded-lg p-4 space-y-2">
                        <div className="text-xs font-bold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-teal-600" />
                          <span>Master Clinician Pearls</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-teal-950">
                          {selectedCondition.clinicalPearls.map((pearl, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="font-bold text-teal-700">•</span>
                              <span>{pearl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: BEDSIDE TESTS */}
                {activeTab === 'tests' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">
                        Bedside Physical Examination & Diagnostic Battery
                      </h3>
                      <span className="text-xs text-slate-500">
                        Evidence-linked sensitivity, specificity & likelihood ratios
                      </span>
                    </div>

                    <div className="space-y-3">
                      {selectedCondition.bedsideAssessmentTests.map((test, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white hover:border-slate-300 transition-colors space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <span className="font-bold text-sm text-slate-900">
                              {test.testName}
                            </span>
                            <div className="flex items-center gap-3 text-xs font-mono">
                              <span className="text-teal-700 font-semibold">
                                Sn: {test.sensitivity}
                              </span>
                              <span className="text-slate-400">·</span>
                              <span className="text-teal-700 font-semibold">
                                Sp: {test.specificity}
                              </span>
                              {test.positiveLikelihoodRatio && (
                                <>
                                  <span className="text-slate-400">·</span>
                                  <span className="text-slate-800 font-semibold">
                                    LR+: {test.positiveLikelihoodRatio}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            <strong className="text-slate-700">Technique & Interpretation:</strong> {test.techniqueAndInterpretation}
                          </p>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                            <span>Source: {test.evidenceCitation}</span>
                            {test.doi && (
                              <span className="font-mono text-teal-700">DOI: {test.doi}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: INVESTIGATIONS PROFILE */}
                {activeTab === 'investigations' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">
                        Multi-Modality Diagnostic Investigation Profile
                      </h3>
                      <span className="text-xs text-slate-500">
                        X-ray, MRI, CT, Ultrasound, Path Lab, & Special Imaging
                      </span>
                    </div>

                    <div className="space-y-3">
                      {selectedCondition.investigationsProfile.map((inv, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="font-bold text-sm text-teal-900">
                              {inv.modality}
                            </span>
                            <span className="text-xs font-mono text-slate-600">
                              {inv.accuracyOrYield}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                            <div>
                              <strong className="text-slate-800">Clinical Indications:</strong>
                              <p className="text-slate-600 mt-0.5">{inv.indications}</p>
                            </div>
                            <div>
                              <strong className="text-slate-800">Characteristic Pathological Findings:</strong>
                              <p className="text-slate-600 mt-0.5">{inv.keyFindings}</p>
                            </div>
                          </div>

                          {inv.recentAdvanceNote && (
                            <div className="text-xs bg-slate-50 p-2 rounded border border-slate-100 text-slate-700 flex items-start gap-1.5 mt-2">
                              <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                              <span>
                                <strong>Technological Advance:</strong> {inv.recentAdvanceNote}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: RECENT ADVANCES & RESEARCH */}
                {activeTab === 'advances' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">
                        Recent Technological Advances & Peer-Reviewed Literature
                      </h3>
                      <span className="text-xs text-slate-500">
                        Curated latest evidence with journals & DOIs
                      </span>
                    </div>

                    <div className="space-y-3">
                      {(selectedCondition.recentAdvancesAndResearch || []).map((adv, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-white space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <span className="font-bold text-sm text-slate-900">
                              {adv.advanceTitle}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                              {adv.readinessLevel}
                            </span>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed">
                            {adv.description}
                          </p>

                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1 text-xs">
                            <div className="font-semibold text-slate-900">
                              {adv.journalPaper.title}
                            </div>
                            <div className="text-slate-600">
                              {adv.journalPaper.authors} · <em>{adv.journalPaper.journal}</em> ({adv.journalPaper.year})
                            </div>
                            <div className="flex items-center justify-between pt-1 text-[11px]">
                              <span className="font-mono text-teal-700">DOI: {adv.journalPaper.doi}</span>
                              <a
                                href={`https://doi.org/${adv.journalPaper.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-700 hover:text-teal-900 flex items-center gap-1 font-medium"
                              >
                                <span>Open Article</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ======================================================== */}
                {/* CLINICAL QUALITY ADDITION 5: MANDATORY DISCLAIMER FOOTER */}
                {/* ======================================================== */}
                <div className="pt-4 mt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {tr('clinical.lastReviewed')}:{' '}
                      <strong>
                        {('last_reviewed' in selectedCondition && selectedCondition.last_reviewed) || '2026-08-20'}
                      </strong>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 max-w-xl text-left sm:text-right">
                    {tr('clinical.footerDisclaimer')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* USEFUL EXTRA 2: COMPARE MODAL (Side-by-Side Comparison) */}
      {/* ======================================================== */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Columns className="w-5 h-5 text-teal-600" />
                  <span>Side-by-Side Clinical Condition Comparison</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Compare diagnostic presentation, special tests, investigations, and rehabilitation milestones
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector for 2nd Condition */}
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700">{tr('extra.comparingWith')}:</span>
              <select
                value={compareConditionId || ''}
                onChange={(e) => setCompareConditionId(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600"
              >
                {allUnifiedConditions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.displayTag})
                  </option>
                ))}
              </select>
            </div>

            {/* Side-by-Side Matrix */}
            {(() => {
              const condB = allUnifiedConditions.find((c) => c.id === compareConditionId);
              if (!condB) return null;

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Left: Condition A (Current) */}
                  <div className="border border-slate-200 rounded-xl p-4 space-y-4 bg-slate-50/50">
                    <div className="border-b border-slate-200 pb-2">
                      <div className="text-[11px] font-mono text-teal-700 font-bold">{selectedCondition.displayTag}</div>
                      <h4 className="text-base font-bold text-slate-900">{selectedCondition.name}</h4>
                    </div>

                    <div>
                      <strong className="text-slate-800 block mb-1">Clinical Presentation:</strong>
                      <p className="text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-200">
                        {selectedCondition.clinicalPresentation}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-800 block mb-1">Key Bedside Tests:</strong>
                      <ul className="space-y-1 bg-white p-3 rounded border border-slate-200">
                        {selectedCondition.bedsideAssessmentTests.map((t, idx) => (
                          <li key={idx} className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-slate-800">{t.testName}</span>
                            <span className="font-mono text-teal-700">Sn: {t.sensitivity} / Sp: {t.specificity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-slate-800 block mb-1">Phase 1 Initial Goal:</strong>
                      <div className="bg-white p-3 rounded border border-slate-200 text-[11px] text-slate-700">
                        {selectedCondition.physiotherapyProtocol.phases[0]?.clinicalGoals[0] || 'Early Protection & Mobilization'}
                      </div>
                    </div>
                  </div>

                  {/* Right: Condition B (Compare Target) */}
                  <div className="border border-slate-200 rounded-xl p-4 space-y-4 bg-slate-50/50">
                    <div className="border-b border-slate-200 pb-2">
                      <div className="text-[11px] font-mono text-indigo-700 font-bold">{condB.displayTag}</div>
                      <h4 className="text-base font-bold text-slate-900">{condB.name}</h4>
                    </div>

                    <div>
                      <strong className="text-slate-800 block mb-1">Clinical Presentation:</strong>
                      <p className="text-slate-600 leading-relaxed bg-white p-3 rounded border border-slate-200">
                        {condB.clinicalPresentation}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-800 block mb-1">Key Bedside Tests:</strong>
                      <ul className="space-y-1 bg-white p-3 rounded border border-slate-200">
                        {condB.bedsideAssessmentTests.map((t, idx) => (
                          <li key={idx} className="flex justify-between items-center text-[11px]">
                            <span className="font-semibold text-slate-800">{t.testName}</span>
                            <span className="font-mono text-indigo-700">Sn: {t.sensitivity} / Sp: {t.specificity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-slate-800 block mb-1">Phase 1 Initial Goal:</strong>
                      <div className="bg-white p-3 rounded border border-slate-200 text-[11px] text-slate-700">
                        {condB.physiotherapyProtocol.phases[0]?.clinicalGoals[0] || 'Early Protection & Mobilization'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                {tr('extra.closeCompare')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
