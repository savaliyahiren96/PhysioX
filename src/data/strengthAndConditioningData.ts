import {
  MesocycleBlock,
  PeriodizationModel,
  SCExperienceLevel,
  ExercisePrescriptionDetail,
} from '../types/clinical';

export const SC_PERIODIZATION_MODELS_INFO: {
  model: PeriodizationModel;
  description: string;
  bestSuitedFor: string;
  volumeIntensityDynamic: string;
}[] = [
  {
    model: 'Block Periodisation',
    description: 'Sequenced concentrated training blocks focusing on minimal compatible motor abilities: Accumulation (Hypertrophy/Volume) -> Transmutation (Max Strength/Rate of Force Development) -> Realization (Peaking/Power/Taper).',
    bestSuitedFor: 'Elite athletes (Cricket, Badminton, Hockey, Kabaddi) preparing for major national or international competitions.',
    volumeIntensityDynamic: 'High volume/low intensity shifts sharply to low volume/maximal velocity.',
  },
  {
    model: 'Daily Undulating (DUP)',
    description: 'Frequent non-linear variation of volume and intensity within the same week (e.g., Hypertrophy Day -> Strength Day -> Power Day).',
    bestSuitedFor: 'Intermediate to advanced athletes with multiple games per week or dense club competition schedules.',
    volumeIntensityDynamic: 'Constant multi-stimulus rotation preventing accommodation and reducing neuromuscular monotony.',
  },
  {
    model: 'Linear / Traditional',
    description: 'Stepwise progressive transition from high-volume, low-intensity training towards lower volume and higher intensity over a 12-16 week timeline.',
    bestSuitedFor: 'Beginner athletes, youth athletes, or athletes in general preparation phase (GPP).',
    volumeIntensityDynamic: 'Predictable, gradual overload building basic foundational structural integrity.',
  },
  {
    model: 'Phased Post-Injury Return',
    description: 'Criteria-driven rehabilitation periodisation: Isometric Analgesia -> Eccentric Hypertrophy -> Heavy Slow Resistance (HSR) -> Ballistic / Reactive Stretch-Shortening Cycle (SSC).',
    bestSuitedFor: 'Athletes recovering from tendon, ligament, or muscle injuries returning to sports performance.',
    volumeIntensityDynamic: 'Strict pain-monitoring model (VAS <= 2/10 during, settled by next morning).',
  },
];

export const SC_EXERCISE_LIBRARY: ExercisePrescriptionDetail[] = [
  {
    exerciseName: 'Barbell Back Squat / Front Squat',
    category: 'Squat / Knee Dominant',
    sets: 4,
    repsOrDuration: '5 reps',
    intensityRpeOrPercent1RM: '80–85% 1RM (RPE 8)',
    restSeconds: 180,
    tempo: '3-1-X-1',
    coachingCues: 'Brace core with diaphragmatic 360° breath, drive knees out in line with 2nd toe, explosive concentric drive.',
    equipmentAdaptation: 'Dumbbell Goblet Squat / Heavy Sandbag Squat / Double Kettlebell Front Squat if barbell rack unavailable.',
  },
  {
    exerciseName: 'Romanian Deadlift (RDL) & Trap Bar Deadlift',
    category: 'Hinge / Posterior Chain',
    sets: 4,
    repsOrDuration: '6 reps',
    intensityRpeOrPercent1RM: '75–80% 1RM (RPE 7.5)',
    restSeconds: 150,
    tempo: '3-1-1-1',
    coachingCues: 'Push hips back towards wall, maintain neutral lumbar lordosis, feel loaded tension in mid-hamstring belly.',
    equipmentAdaptation: 'Heavy Dumbbell RDL / Single-Leg Romanian Deadlift with Kettlebell.',
  },
  {
    exerciseName: 'Overhead Barbell Push Press / Landmine Press',
    category: 'Upper Push (Horizontal/Vertical)',
    sets: 4,
    repsOrDuration: '4–6 reps',
    intensityRpeOrPercent1RM: 'RPE 8 (Explosive triple extension)',
    restSeconds: 120,
    tempo: 'Dip-Drive-Hold',
    coachingCues: 'Dip 10cm through heels, explosive hip drive transfer into overhead lockout without arching lumbar spine.',
    equipmentAdaptation: 'Landmine Angled Press (safer for throwers / cricket pacers with shoulder impingement).',
  },
  {
    exerciseName: 'Barbell Chest-Supported Row / Neutral Grip Pull-Up',
    category: 'Upper Pull',
    sets: 4,
    repsOrDuration: '8 reps',
    intensityRpeOrPercent1RM: 'RPE 8',
    restSeconds: 90,
    tempo: '2-1-1-1',
    coachingCues: 'Retract scapulae fully before elbow drive, avoid shrugging upper trapezius, pause at peak contraction.',
    equipmentAdaptation: 'Inverted Bodyweight Row on low parallel bar / Resistance band face-pull rows.',
  },
  {
    exerciseName: 'Countermovement Jump (CMJ) & Hurdle Hops',
    category: 'Plyometrics & RFD',
    sets: 4,
    repsOrDuration: '5 contacts',
    intensityRpeOrPercent1RM: 'Maximal Intent (100% effort)',
    restSeconds: 120,
    tempo: 'Explosive Rapid Coupling',
    coachingCues: 'Minimal ground contact time (< 200 ms), silent soft landing into mid-foot, immediate elastic rebound.',
    equipmentAdaptation: 'Medicine ball explosive floor slams / Box jump onto elevated secure platform.',
  },
  {
    exerciseName: '10-Meter Acceleration Sprints with Sled / Hills',
    category: 'Sprint & Acceleration',
    sets: 6,
    repsOrDuration: '10 meters',
    intensityRpeOrPercent1RM: '100% Maximal Effort',
    restSeconds: 90,
    tempo: 'Max Piston Drive',
    coachingCues: 'Aggressive 45° forward torso angle, high knee punch, violent arm drive from cheek to hip pocket.',
    equipmentAdaptation: 'Uphill grass sprints / Partner resisted towel/band sprints on field.',
  },
  {
    exerciseName: 'Pallof Press & Half-Kneeling Rotational Cable Chops',
    category: 'Rotational & Core',
    sets: 3,
    repsOrDuration: '10 reps each side',
    intensityRpeOrPercent1RM: 'Moderate Tension (Hold 2s at lockout)',
    restSeconds: 60,
    tempo: '2-2-2-1',
    coachingCues: 'Resist rotational torso twist, keep hips and shoulders square, breathe through abdominal brace.',
    equipmentAdaptation: 'Heavy resistance band anchored to post or goalframe.',
  },
];

export const DEMO_MESOCYCLES: Record<string, MesocycleBlock> = {
  cricketFastBowlerPower: {
    blockName: 'Cricket Fast Bowler In-Season Power & Durability Block',
    durationWeeks: 4,
    primaryAdaptation: 'Rate of Force Development (RFD) & Posterior Chain Stiffness while controlling bowling overs volume',
    model: 'Block Periodisation',
    microcycles: [
      {
        weekNumber: 1,
        focus: 'Accumulation & Unilateral Stride Eccentric Control',
        deloadWeek: false,
        volumeLoadEstimateKg: '14,200 kg',
        sessions: [
          {
            dayName: 'Day 1: Lower Body Front-Foot Landing Stiffness & Lumbar Durability',
            warmUpRampProtocol: ['Foam roll thoracic spine', '90/90 hip mobility', 'Pogo hops 3x15', 'Glute bridges 2x12'],
            exercises: [
              SC_EXERCISE_LIBRARY[0], // Squat
              SC_EXERCISE_LIBRARY[1], // RDL
              SC_EXERCISE_LIBRARY[4], // CMJ Plyometrics
              SC_EXERCISE_LIBRARY[6], // Pallof Core
            ],
            coolDownMobility: ['Kneeling hip flexor stretch', 'Thoracic open book stretch 2x10', 'Child pose with deep breathing'],
          },
          {
            dayName: 'Day 2: Upper Body Rotational Power & Scapular Deceleration',
            warmUpRampProtocol: ['Band pull-aparts 3x15', 'Prone Y-T-W 2x8', 'Rotational medicine ball passes 2x6'],
            exercises: [
              SC_EXERCISE_LIBRARY[2], // Push press / Landmine
              SC_EXERCISE_LIBRARY[3], // Row
              SC_EXERCISE_LIBRARY[5], // Sprint acceleration
              SC_EXERCISE_LIBRARY[6], // Rotational chop
            ],
            coolDownMobility: ['Sleeper stretch for posterior shoulder capsule', 'Doorway chest stretch', 'Wrist extensor release'],
          },
        ],
      },
      {
        weekNumber: 2,
        focus: 'Peak Rate of Force Development (RFD) & Velocity',
        deloadWeek: false,
        volumeLoadEstimateKg: '15,800 kg',
        sessions: [
          {
            dayName: 'Day 1: Explosive Triple Extension & Front Foot Deceleration',
            warmUpRampProtocol: ['Single-leg pogo hops', 'Ankle dorsiflexion lunge drills', 'Broad jumps 3x3'],
            exercises: [SC_EXERCISE_LIBRARY[0], SC_EXERCISE_LIBRARY[4], SC_EXERCISE_LIBRARY[1]],
            coolDownMobility: ['Hamstring active stretch', 'Couch stretch 2 mins each side'],
          },
        ],
      },
      {
        weekNumber: 3,
        focus: 'High-Velocity Taper & Match Readiness',
        deloadWeek: false,
        volumeLoadEstimateKg: '12,500 kg',
        sessions: [
          {
            dayName: 'Day 1: Neuromuscular Potentiation & Reactivity',
            warmUpRampProtocol: ['Ladder quick feet', 'Band resisted skips', 'Reactive sprint starts'],
            exercises: [SC_EXERCISE_LIBRARY[4], SC_EXERCISE_LIBRARY[5], SC_EXERCISE_LIBRARY[2]],
            coolDownMobility: ['Gentle stretching and hydration monitoring'],
          },
        ],
      },
      {
        weekNumber: 4,
        focus: 'Active Deload & Regenerative Maintenance',
        deloadWeek: true,
        volumeLoadEstimateKg: '8,400 kg (-40% volume reduction)',
        sessions: [
          {
            dayName: 'Day 1: Deload Movement Flow & Tissue Recovery',
            warmUpRampProtocol: ['Full body dynamic flow', 'Joint mobilization'],
            exercises: [SC_EXERCISE_LIBRARY[0], SC_EXERCISE_LIBRARY[3]],
            coolDownMobility: ['Cold-water immersion / contrast bath protocol'],
          },
        ],
      },
    ],
  },
};
