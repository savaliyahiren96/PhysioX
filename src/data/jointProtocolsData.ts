import { JointConditionMaster, JointRegion } from '../types/clinical';
import { KNEE_CONDITIONS } from './conditions/kneeConditions';
import { SPINE_CONDITIONS } from './conditions/spineConditions';
import { LOWER_EXTREMITY_CONDITIONS } from './conditions/lowerExtremityConditions';
import { UPPER_EXTREMITY_CONDITIONS } from './conditions/upperExtremityConditions';

export {
  KNEE_CONDITIONS,
  SPINE_CONDITIONS,
  LOWER_EXTREMITY_CONDITIONS,
  UPPER_EXTREMITY_CONDITIONS,
};

export const JOINT_REGIONS_LIST: { id: JointRegion; label: string; conditionCount: number; keyAnatomy: string }[] = [
  { id: 'Knee', label: 'Knee Joint Complex', conditionCount: 8, keyAnatomy: 'Tibiofemoral & Patellofemoral Articulations, Cruciates, Menisci' },
  { id: 'Lumbar Spine & Pelvis', label: 'Lumbar Spine & Pelvis', conditionCount: 8, keyAnatomy: 'L1–S1 Motion Segments, Intervertebral Discs, Facets, Sacroiliac' },
  { id: 'Shoulder', label: 'Shoulder & Shoulder Girdle', conditionCount: 7, keyAnatomy: 'Glenohumeral, Subacromial Space, Rotator Cuff, Labrum' },
  { id: 'Cervical Spine', label: 'Cervical Spine', conditionCount: 6, keyAnatomy: 'C1–C7 Segments, Uncovertebral, Cervical Nerve Roots & Cord' },
  { id: 'Hip & Groin', label: 'Hip & Groin Complex', conditionCount: 7, keyAnatomy: 'Acetabulofemoral, Labrum, Iliopsoas, Gluteal Tendons' },
  { id: 'Elbow', label: 'Elbow Joint Complex', conditionCount: 6, keyAnatomy: 'Humeroulnar, Humeroradial, Proximal Radioulnar, Common Extensor/Flexor Tendons' },
  { id: 'Wrist & Hand', label: 'Wrist & Hand Complex', conditionCount: 7, keyAnatomy: 'Radiocarpal, Midcarpal, Carpal Tunnel, APL/EPB, TFCC' },
  { id: 'Ankle & Foot', label: 'Ankle & Foot Complex', conditionCount: 8, keyAnatomy: 'Talocrural, Subtalar, Syndesmosis, Plantar Fascia, Achilles' },
  { id: 'Temporomandibular Joint (TMJ)', label: 'Temporomandibular Joint (TMJ)', conditionCount: 4, keyAnatomy: 'Mandibular Condyle, Glenoid Fossa, Articular Disc, Lateral Pterygoid' },
  { id: 'Thoracic Spine & Ribs', label: 'Thoracic Spine & Rib Cage', conditionCount: 4, keyAnatomy: 'T1–T12 Segments, Costovertebral, Costosternal, Thoracic Outlet' },
];

export const ALL_JOINT_CONDITIONS: JointConditionMaster[] = [
  ...KNEE_CONDITIONS,
  ...SPINE_CONDITIONS,
  ...LOWER_EXTREMITY_CONDITIONS,
  ...UPPER_EXTREMITY_CONDITIONS,
];
