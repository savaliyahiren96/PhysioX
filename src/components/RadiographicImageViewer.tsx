import React, { useState } from 'react';
import {
  RadiographicViewerData,
  RadiographicImageFinding,
} from '../types/clinical';
import {
  Eye,
  Sliders,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  Columns,
  Sparkles,
  Info,
  Ruler,
  Layers,
  Sun,
  Moon,
} from 'lucide-react';

interface RadiographicImageViewerProps {
  viewerData: RadiographicViewerData;
  modalityName: string;
}

export const RadiographicImageViewer: React.FC<RadiographicImageViewerProps> = ({
  viewerData,
  modalityName,
}) => {
  const [viewMode, setViewMode] = useState<'pathological' | 'normal' | 'split'>('pathological');
  const [showOverlays, setShowOverlays] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(
    viewerData.findingsHotspots[0]?.id || null
  );
  const [invertedFilm, setInvertedFilm] = useState(false);
  const [windowPreset, setWindowPreset] = useState<'standard' | 'high-contrast' | 'bone'>('standard');

  const selectedHotspot = viewerData.findingsHotspots.find((h) => h.id === selectedHotspotId);

  // Filter styles based on window preset and inversion
  const getFilterStyle = () => {
    let filter = '';
    if (invertedFilm) filter += 'invert(1) hue-rotate(180deg) ';
    if (windowPreset === 'high-contrast') filter += 'contrast(1.4) brightness(0.95) ';
    if (windowPreset === 'bone') filter += 'contrast(1.2) brightness(1.05) ';
    return filter.trim();
  };

  // SVG Renderer for each specific investigation modality
  const renderSvgPlate = (isPathology: boolean) => {
    const type = viewerData.svgGraphicType;

    switch (type) {
      // 1. KNEE OSTEOARTHRITIS X-RAY (Rosenberg AP View)
      case 'xray-knee-oa':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            <defs>
              <radialGradient id="xrayGlow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#2a3342" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0a0f1d" stopOpacity="0.9" />
              </radialGradient>
              <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="sclerosisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>

            {/* Background Grid & Vignette */}
            <rect width="500" height="500" fill="#0b1120" />
            <rect width="500" height="500" fill="url(#xrayGlow)" />
            <circle cx="250" cy="250" r="230" fill="none" stroke="#1e293b" strokeDasharray="4 6" opacity="0.3" />

            {/* Scale & Film Marker */}
            <text x="30" y="45" fill="#64748b" fontSize="12" fontFamily="monospace" fontWeight="bold">
              MEDIAL [R] STANDING PA 45°
            </text>
            <text x="430" y="45" fill="#64748b" fontSize="14" fontFamily="monospace" fontWeight="bold">
              LAT
            </text>

            {/* Femur Condyles */}
            <path
              d="M 120,40 L 140,180 Q 150,220 180,235 Q 210,245 230,225 Q 250,205 270,225 Q 290,245 320,235 Q 350,220 360,180 L 380,40 Z"
              fill="url(#boneGrad)"
              stroke="#64748b"
              strokeWidth="2"
              opacity="0.95"
            />

            {/* Patella Silhouette Overlay */}
            <ellipse cx="250" cy="180" rx="42" ry="50" fill="#94a3b8" opacity="0.4" stroke="#cbd5e1" strokeDasharray="3 3" />

            {/* Tibial Plateau and Shaft */}
            <path
              d={
                isPathology
                  ? 'M 130,244 Q 160,242 195,244 Q 220,246 235,225 Q 245,210 250,225 Q 265,245 285,255 Q 330,256 365,260 L 345,460 L 165,460 Z'
                  : 'M 140,260 Q 175,260 215,260 Q 235,255 245,235 Q 255,235 265,255 Q 295,260 360,260 L 340,460 L 160,460 Z'
              }
              fill="url(#boneGrad)"
              stroke="#64748b"
              strokeWidth="2"
              opacity="0.95"
            />

            {/* Fibula Head (Lateral) */}
            <path
              d="M 360,285 Q 380,285 385,310 L 375,460 L 350,460 L 355,305 Z"
              fill="#94a3b8"
              stroke="#475569"
              strokeWidth="1.5"
              opacity="0.85"
            />

            {/* PATHOLOGY OVERLAYS: Medial joint space collapse & Sclerosis */}
            {isPathology && (
              <>
                {/* Medial Dense Subchondral Sclerosis Band */}
                <ellipse cx="190" cy="254" rx="35" ry="10" fill="url(#sclerosisGrad)" opacity="0.9" />
                <ellipse cx="190" cy="228" rx="32" ry="8" fill="url(#sclerosisGrad)" opacity="0.85" />

                {/* Medial Marginal Osteophyte Spikes */}
                <path d="M 130,244 L 115,247 L 132,255 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <path d="M 140,225 L 122,228 L 142,235 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

                {/* Lateral Joint Space (Maintained) vs Medial (Collapsed) Calipers */}
                {showOverlays && (
                  <>
                    {/* Medial Caliper: 1.1 mm (Narrowed) */}
                    <line x1="190" y1="235" x2="190" y2="244" stroke="#f43f5e" strokeWidth="2.5" />
                    <line x1="182" y1="235" x2="198" y2="235" stroke="#f43f5e" strokeWidth="2" />
                    <line x1="182" y1="244" x2="198" y2="244" stroke="#f43f5e" strokeWidth="2" />
                    <text x="135" y="275" fill="#f43f5e" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      MEDIAL: 1.1 mm (K-L III)
                    </text>

                    {/* Lateral Caliper: 5.4 mm (Normal) */}
                    <line x1="320" y1="235" x2="320" y2="258" stroke="#10b981" strokeWidth="2" />
                    <line x1="312" y1="235" x2="328" y2="235" stroke="#10b981" strokeWidth="2" />
                    <line x1="312" y1="258" x2="328" y2="258" stroke="#10b981" strokeWidth="2" />
                    <text x="300" y="275" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      LATERAL: 5.4 mm
                    </text>
                  </>
                )}
              </>
            )}

            {/* NORMAL OVERLAYS: Symmetrical Joint Space */}
            {!isPathology && showOverlays && (
              <>
                <line x1="190" y1="235" x2="190" y2="260" stroke="#10b981" strokeWidth="2" />
                <line x1="320" y1="235" x2="320" y2="260" stroke="#10b981" strokeWidth="2" />
                <text x="145" y="280" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  MEDIAL: 5.2 mm
                </text>
                <text x="290" y="280" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  LATERAL: 5.3 mm
                </text>
                <text x="160" y="160" fill="#6ee7b7" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  SYMMETRICAL CLEAR JOINT SPACE
                </text>
              </>
            )}
          </svg>
        );

      // 2. KNEE MRI 3.0T (Sagittal T2 STIR - ACL TEAR & BONE BRUISE)
      case 'mri-knee-acl':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            <defs>
              <radialGradient id="mriBg" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>
              <radialGradient id="edemaGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="500" height="500" fill="url(#mriBg)" />

            {/* MRI Acquisition Header */}
            <text x="25" y="35" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              SAG PD-FS / T2 STIR 3.0T · TR: 3400 TE: 42
            </text>
            <text x="380" y="35" fill="#94a3b8" fontSize="11" fontFamily="monospace">
              SL: 3.0 mm
            </text>

            {/* Femoral Condyle Profile (Sagittal Curve) */}
            <path
              d="M 120,60 L 150,180 Q 170,260 250,265 Q 330,265 370,210 Q 390,170 380,120 L 360,60 Z"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="2.5"
            />

            {/* Tibial Plateau Profile */}
            <path
              d="M 140,300 Q 240,295 360,310 L 340,460 L 160,460 Z"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="2.5"
            />

            {/* Blumensaat's Line (Intercondylar Roof) */}
            {showOverlays && (
              <line x1="200" y1="160" x2="300" y2="240" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
            )}

            {/* Meniscus Posterior Horn (Homogeneous Black Triangle) */}
            <polygon points="340,295 375,295 360,270" fill="#020617" stroke="#334155" strokeWidth="1" />
            {/* Meniscus Anterior Horn */}
            <polygon points="170,290 205,290 190,265" fill="#020617" stroke="#334155" strokeWidth="1" />

            {/* Normal ACL vs Pathological Disrupted ACL */}
            {!isPathology ? (
              // Normal Taut Hypointense Black Ligament Parallel to Blumensaat's Line
              <path
                d="M 285,225 Q 260,250 230,295"
                fill="none"
                stroke="#020617"
                strokeWidth="12"
                strokeLinecap="round"
              />
            ) : (
              // Disrupted ACL Stump + Hyperintense Joint Effusion Fluid
              <>
                {/* Hyperintense Joint Effusion Fluid in Intercondylar Notch */}
                <ellipse cx="250" cy="245" rx="35" ry="25" fill="#38bdf8" opacity="0.35" />

                {/* Wavy Disrupted Ligament Stump with Empty Notch */}
                <path
                  d="M 230,295 Q 235,280 242,275"
                  fill="none"
                  stroke="#020617"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <circle cx="260" cy="235" r="14" fill="#f43f5e" opacity="0.3" stroke="#f43f5e" strokeDasharray="2 2" />

                {/* Bone Marrow Edema Kissing Contusions (STIR Hyperintensity) */}
                {/* 1. Lateral Femoral Condyle Edema */}
                <ellipse cx="310" cy="220" rx="40" ry="30" fill="url(#edemaGrad)" opacity="0.9" />
                {/* 2. Posterolateral Tibial Plateau Edema */}
                <ellipse cx="330" cy="330" rx="38" ry="24" fill="url(#edemaGrad)" opacity="0.85" />
              </>
            )}

            {/* Annotations */}
            {showOverlays && isPathology && (
              <>
                <text x="210" y="150" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                  BLUMENSAAT'S LINE
                </text>
                <text x="215" y="225" fill="#f43f5e" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  EMPTY NOTCH / ACL DISCONTINUITY
                </text>
                <text x="290" y="190" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  FEMORAL KISSING EDEMA
                </text>
                <text x="290" y="375" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  POST-TIBIAL BONE BRUISE
                </text>
              </>
            )}
          </svg>
        );

      // 3. CT SCAN (Bone Window) - LUMBAR PARS SPONDYLOLYSIS
      case 'ct-lumbar-pars':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            <rect width="500" height="500" fill="#090d16" />
            <text x="25" y="35" fill="#e2e8f0" fontSize="11" fontFamily="monospace" fontWeight="bold">
              BONE CT · 0.625mm OBLIQUE SAGITTAL RECONSTRUCTION
            </text>

            {/* Vertebral Body L4 */}
            <rect x="140" y="90" width="120" height="85" rx="12" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            <text x="180" y="140" fill="#cbd5e1" fontSize="16" fontWeight="bold" fontFamily="monospace">
              L4
            </text>

            {/* Vertebral Body L5 */}
            <rect x="150" y="210" width="125" height="95" rx="12" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            <text x="195" y="265" fill="#cbd5e1" fontSize="16" fontWeight="bold" fontFamily="monospace">
              L5
            </text>

            {/* Sacrum S1 */}
            <path
              d="M 160,340 L 290,340 L 260,460 L 175,460 Z"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="2"
            />
            <text x="200" y="390" fill="#94a3b8" fontSize="14" fontWeight="bold" fontFamily="monospace">
              S1
            </text>

            {/* Posterior Elements & "Scotty Dog" silhouette */}
            {/* L5 Pars Interarticularis */}
            <path
              d="M 275,225 L 340,205 Q 360,225 350,260 L 295,290 Z"
              fill="#475569"
              stroke="#cbd5e1"
              strokeWidth="2"
            />

            {/* Fracture cleft vs Intact bone */}
            {isPathology ? (
              <>
                {/* Cortical Lucent Fracture Cleft across L5 Pars ("Broken Collar on Scotty Dog") */}
                <line x1="315" y1="210" x2="330" y2="270" stroke="#090d16" strokeWidth="6" />
                <line x1="315" y1="210" x2="330" y2="270" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="3 2" />

                {/* Reactive Sclerotic Bone Callus Edges */}
                <ellipse cx="310" cy="225" rx="8" ry="14" fill="#ffffff" opacity="0.85" />
                <ellipse cx="332" cy="255" rx="8" ry="14" fill="#ffffff" opacity="0.85" />

                {showOverlays && (
                  <>
                    <text x="270" y="190" fill="#f43f5e" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      PARS DEFECT (SPONDYLOLYSIS)
                    </text>
                    <text x="345" y="270" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      SCLEROTIC CALLUS
                    </text>
                  </>
                )}
              </>
            ) : (
              <text x="290" y="250" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">
                INTACT PARS ISTHMUS
              </text>
            )}
          </svg>
        );

      // 4. MRI LUMBAR SPINE (Axial/Sagittal T2 - DISC EXTRUSION & SCIATICA)
      case 'mri-lumbar-herniation':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            <rect width="500" height="500" fill="#050811" />
            <text x="25" y="35" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              LUMBAR SPINE AXIAL T2 FSE 3.0T · L4-L5 DISC LEVEL
            </text>

            {/* Disc Outline (Reniform/Kidney Bean Shape) */}
            <path
              d="M 120,220 C 130,150 370,150 380,220 C 375,270 310,260 250,270 C 190,260 125,270 120,220 Z"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="2.5"
            />
            {/* Nucleus Pulposus */}
            <ellipse cx="250" cy="210" rx="90" ry="35" fill="#334155" opacity="0.8" />

            {/* Spinal Canal Posteriorly */}
            <path
              d="M 170,270 Q 250,285 330,270 Q 370,360 330,420 Q 250,440 170,420 Q 130,360 170,270 Z"
              fill="#0f172a"
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Thecal Sac (CSF Bright White on T2) */}
            <ellipse cx="250" cy="340" rx="55" ry="45" fill="#e2e8f0" opacity="0.9" stroke="#94a3b8" />

            {/* Traversing Nerve Roots inside Thecal Sac */}
            <circle cx="230" cy="345" r="5" fill="#1e293b" />
            <circle cx="270" cy="345" r="5" fill="#1e293b" />

            {/* PATHOLOGY: Paracentral Disc Extrusion compressing L5 root */}
            {isPathology ? (
              <>
                {/* Focal Extruded Nuclear Fragment herniating into right lateral recess */}
                <path
                  d="M 260,255 Q 295,260 305,295 Q 290,320 265,305 Z"
                  fill="#475569"
                  stroke="#f43f5e"
                  strokeWidth="2"
                />
                {/* High Intensity Zone (HIZ) Annular Radial Tear */}
                <circle cx="270" cy="265" r="4.5" fill="#ffffff" stroke="#f43f5e" strokeWidth="1.5" />

                {/* Effaced/Compressed Traversing Right L5 Nerve Root */}
                <ellipse cx="295" cy="315" rx="7" ry="3" fill="#f43f5e" />

                {showOverlays && (
                  <>
                    <text x="315" y="295" fill="#f43f5e" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      RIGHT L5 ROOT COMPRESSION
                    </text>
                    <text x="260" y="245" fill="#ffffff" fontSize="9" fontFamily="monospace">
                      HIZ ANNULAR TEAR
                    </text>
                  </>
                )}
              </>
            ) : (
              <text x="210" y="345" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">
                PATENT THECAL SAC
              </text>
            )}
          </svg>
        );

      // 5. HIGH-RESOLUTION MSK ULTRASOUND - SHOULDER ROTATOR CUFF TEAR
      case 'msk-us-rotator-cuff':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            <rect width="500" height="500" fill="#060913" />
            <text x="25" y="35" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              MSK ULTRASOUND 15 MHz · SUPRASPINATUS TENDON LONG-AXIS
            </text>

            {/* Deltoid Muscle Fascicles */}
            <path d="M 50,110 Q 250,90 450,110 L 450,180 Q 250,170 50,180 Z" fill="#1e293b" opacity="0.7" />
            <line x1="80" y1="130" x2="220" y2="155" stroke="#475569" strokeWidth="1" strokeDasharray="5 3" />
            <line x1="260" y1="135" x2="420" y2="155" stroke="#475569" strokeWidth="1" strokeDasharray="5 3" />

            {/* Greater Tuberosity Humeral Bone Line (Hyperechoic White Cortex with Dark Acoustic Shadow Below) */}
            <path
              d="M 50,330 Q 180,310 270,300 Q 360,290 450,340 L 450,470 L 50,470 Z"
              fill="#020617"
              stroke="#ffffff"
              strokeWidth="3.5"
            />

            {/* Supraspinatus Tendon (Normal Convex Bird Beak vs Retracted Tear) */}
            {!isPathology ? (
              // Normal Fibrillar Hyperechoic Tendon capping humeral head
              <path
                d="M 120,200 Q 240,195 360,220 Q 380,265 370,290 Q 260,285 120,300 Z"
                fill="#64748b"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                opacity="0.85"
              />
            ) : (
              // Retracted Full-Thickness Tear with Anechoic Black Fluid Gap
              <>
                {/* Retracted Medial Tendon Stump */}
                <path
                  d="M 60,200 Q 160,200 190,225 Q 180,290 60,310 Z"
                  fill="#475569"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />

                {/* Anechoic Fluid Gap Overlying Naked Greater Tuberosity */}
                <rect x="200" y="210" width="140" height="90" fill="#000000" opacity="0.9" stroke="#f43f5e" strokeDasharray="3 3" />

                {/* Power Doppler Flow Signals (Red & Orange Pixels) */}
                <circle cx="185" cy="225" r="6" fill="#ef4444" opacity="0.8" />
                <circle cx="192" cy="235" r="5" fill="#f59e0b" opacity="0.8" />
                <circle cx="178" cy="245" r="4" fill="#ef4444" opacity="0.7" />

                {showOverlays && (
                  <>
                    <text x="210" y="255" fill="#f43f5e" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      FULL-THICKNESS RETRACTED TEAR (14mm)
                    </text>
                    <text x="210" y="325" fill="#ffffff" fontSize="9" fontFamily="monospace">
                      NAKED BONE FOOTPRINT
                    </text>
                  </>
                )}
              </>
            )}
          </svg>
        );

      // 6. DUAL-ENERGY CT (DECT) - GOUT & URATE CRYSTAL TOPHI
      case 'ct-gout-dect':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            <rect width="500" height="500" fill="#030712" />
            <text x="25" y="35" fill="#4ade80" fontSize="11" fontFamily="monospace" fontWeight="bold">
              DECT 80/140 kV · MONOSODIUM URATE MATERIAL DECOMPOSITION
            </text>

            {/* 1st Metatarsal Bone Profile */}
            <path
              d="M 60,210 L 220,210 Q 255,210 260,240 Q 255,270 220,270 L 60,270 Z"
              fill="#334155"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            {/* Proximal Phalanx Base */}
            <path
              d="M 310,210 Q 300,240 310,270 L 440,270 L 440,210 Z"
              fill="#334155"
              stroke="#94a3b8"
              strokeWidth="2"
            />

            {/* Joint Recess */}
            {isPathology ? (
              <>
                {/* Punched-out Subchondral Bone Erosion with Overhanging Edge */}
                <path d="M 240,210 Q 220,225 240,240 Z" fill="#030712" stroke="#f59e0b" strokeWidth="2" />

                {/* VIVID NEON GREEN URATE CRYSTAL TOPHUS DEPOSITION (DECT Color Encoding) */}
                <path
                  d="M 230,185 Q 285,170 300,205 Q 315,250 280,285 Q 235,280 230,245 Z"
                  fill="#22c55e"
                  opacity="0.88"
                  stroke="#4ade80"
                  strokeWidth="2.5"
                />
                <circle cx="260" cy="190" r="12" fill="#16a34a" opacity="0.9" />
                <circle cx="285" cy="270" r="10" fill="#16a34a" opacity="0.9" />

                {showOverlays && (
                  <>
                    <text x="210" y="160" fill="#4ade80" fontSize="12" fontWeight="bold" fontFamily="monospace">
                      GREEN: URATE TOPHUS (1.84 cm³)
                    </text>
                    <text x="175" y="325" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                      PUNCHED-OUT EROSION ("MARTEL SIGN")
                    </text>
                  </>
                )}
              </>
            ) : (
              <text x="220" y="245" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">
                NORMAL GREEN-FREE RECESSED JOINT
              </text>
            )}
          </svg>
        );

      // 7. LATERAL FOOT X-RAY - CALCANEAL FRACTURE & BOEHLER'S ANGLE
      case 'xray-ankle-boehler':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            <rect width="500" height="500" fill="#080e1a" />
            <text x="25" y="35" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold">
              LATERAL HINDFOOT RADIOGRAPH · BOEHLER & GISSANE ANGLES
            </text>

            {/* Tibia & Fibula Distal */}
            <path d="M 210,50 L 260,50 L 260,180 L 210,180 Z" fill="#94a3b8" opacity="0.7" />
            {/* Talus */}
            <path
              d="M 190,190 Q 250,175 290,195 Q 320,240 280,250 Q 210,255 190,225 Z"
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="2"
            />

            {/* Calcaneus */}
            <path
              d={
                isPathology
                  ? 'M 100,320 Q 210,270 270,270 Q 320,280 340,320 L 320,380 L 130,390 Z'
                  : 'M 110,340 Q 210,245 280,245 Q 330,270 350,310 L 330,370 L 140,380 Z'
              }
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="2"
            />

            {/* Boehler's Angle Intersecting Lines */}
            {showOverlays && (
              <>
                {isPathology ? (
                  // Flattened angle (11°) in depressed fracture
                  <>
                    <line x1="110" y1="320" x2="270" y2="270" stroke="#f43f5e" strokeWidth="2.5" />
                    <line x1="270" y1="270" x2="340" y2="320" stroke="#f43f5e" strokeWidth="2.5" />
                    <text x="160" y="250" fill="#f43f5e" fontSize="13" fontWeight="bold" fontFamily="monospace">
                      BOEHLER'S ANGLE: 11° (COLLAPSED / SEVERE)
                    </text>
                  </>
                ) : (
                  // Normal Angle (32°)
                  <>
                    <line x1="110" y1="340" x2="280" y2="245" stroke="#10b981" strokeWidth="2" />
                    <line x1="280" y1="245" x2="350" y2="310" stroke="#10b981" strokeWidth="2" />
                    <text x="180" y="235" fill="#10b981" fontSize="13" fontWeight="bold" fontFamily="monospace">
                      BOEHLER'S ANGLE: 32° (NORMAL: 28°–40°)
                    </text>
                  </>
                )}
              </>
            )}
          </svg>
        );

      // 8. EOS FULL SPINE - ADOLESCENT SCOLIOSIS & COBB ANGLE
      case 'xray-scoliosis-cobb':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            <rect width="500" height="500" fill="#070c18" />
            <text x="25" y="35" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              EOS 36-INCH FULL-SPINE STANDING RADIOGRAPH · CORONAL PA
            </text>

            {/* Pelvis and Iliac Crests */}
            <path
              d="M 120,400 Q 150,360 210,380 L 250,420 L 290,380 Q 350,360 380,400 L 350,460 L 150,460 Z"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="2"
            />

            {/* Spine Column: Straight vs Right Thoracic Scoliotic Curve */}
            {isPathology ? (
              <>
                {/* Curved Vertebral Column */}
                <path
                  d="M 250,70 Q 255,140 310,210 Q 345,260 290,330 Q 245,370 250,420"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="24"
                  strokeLinecap="round"
                />

                {/* Cobb Angle Tangent Lines */}
                {showOverlays && (
                  <>
                    {/* T5 Upper Endplate Tangent */}
                    <line x1="180" y1="120" x2="330" y2="155" stroke="#f43f5e" strokeWidth="2.5" />
                    {/* T12 Lower Endplate Tangent */}
                    <line x1="210" y1="345" x2="350" y2="295" stroke="#f43f5e" strokeWidth="2.5" />

                    <text x="180" y="235" fill="#f43f5e" fontSize="14" fontWeight="bold" fontFamily="monospace">
                      COBB ANGLE: 36° (STRUCTURAL THORACIC)
                    </text>
                    <text x="285" y="445" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      RISSER STAGE 2
                    </text>
                  </>
                )}
              </>
            ) : (
              <>
                <line x1="250" y1="70" x2="250" y2="420" stroke="#cbd5e1" strokeWidth="24" strokeLinecap="round" />
                <text x="180" y="240" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  STRAIGHT CORONAL ALIGNMENT (COBB &lt; 5°)
                </text>
              </>
            )}
          </svg>
        );

      // 9. ELECTRODIAGNOSTIC WAVEFORM SCREEN (EMG/NCS)
      case 'emg-radiculopathy':
        return (
          <svg viewBox="0 0 500 500" className="w-full h-full select-none">
            {/* Dark Green Phosphor Oscilloscope Grid */}
            <rect width="500" height="500" fill="#041208" />
            <defs>
              <pattern id="emgGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#064e1e" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect width="500" height="500" fill="url(#emgGrid)" />

            <text x="25" y="35" fill="#22c55e" fontSize="11" fontFamily="monospace" fontWeight="bold">
              ELECTROMYOGRAPHY (CONCENTRIC NEEDLE) · 50 μV/div · 10 ms/div
            </text>

            {/* Sweep 1: Spontaneous Activity at Rest */}
            <line x1="40" y1="120" x2="460" y2="120" stroke="#15803d" strokeWidth="1" strokeDasharray="2 4" />
            <text x="40" y="105" fill="#86efac" fontSize="11" fontFamily="monospace">
              REST ACTIVITY (TIBIALIS ANTERIOR)
            </text>

            {isPathology ? (
              <>
                {/* Spontaneous Fibrillations (Sharp spikes) */}
                <path
                  d="M 40,120 L 120,120 L 125,75 L 130,145 L 135,120 L 220,120 L 225,65 L 230,150 L 235,120 L 330,120 L 335,80 L 340,140 L 345,120 L 460,120"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                />
                {/* Positive Sharp Wave (PSW) */}
                <path
                  d="M 260,120 L 275,120 L 280,185 L 310,105 L 325,120"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />

                {/* Sweep 2: Motor Unit Recruitment */}
                <text x="40" y="275" fill="#86efac" fontSize="11" fontFamily="monospace">
                  MAXIMUM VOLUNTARY CONTRACTION (REDUCED RECRUITMENT)
                </text>
                <path
                  d="M 40,320 L 90,320 L 95,210 L 105,420 L 115,320 L 170,320 L 175,215 L 185,415 L 195,320 L 460,320"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2.5"
                />

                {showOverlays && (
                  <>
                    <text x="140" y="65" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      FIBRILLATION POTENTIAL (3+)
                    </text>
                    <text x="280" y="200" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      POSITIVE SHARP WAVE (PSW)
                    </text>
                    <text x="210" y="360" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      REDUCED RECRUITMENT (&lt; 2 MUAPs AT HIGH FREQUENCY)
                    </text>
                  </>
                )}
              </>
            ) : (
              <>
                <line x1="40" y1="120" x2="460" y2="120" stroke="#4ade80" strokeWidth="2" />
                <text x="160" y="145" fill="#4ade80" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  ELECTRICAL SILENCE AT REST (NORMAL)
                </text>
                {/* Full dense interference pattern */}
                <path
                  d="M 40,320 L 60,260 L 70,380 L 80,240 L 90,390 L 100,250 L 110,400 L 120,270 L 130,370 L 150,230 L 160,410 L 180,260 L 200,380 L 220,240 L 240,400 L 260,260 L 280,380 L 300,250 L 320,410 L 350,270 L 380,390 L 420,250 L 460,320"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="1.5"
                />
              </>
            )}
          </svg>
        );

      // 10. CLINICAL LABORATORY REPORT (NABL Sheet)
      case 'lab-pathology-panel':
      default:
        return (
          <div className="w-full h-full p-6 bg-slate-900 text-slate-100 flex flex-col justify-between font-mono text-xs select-none overflow-y-auto">
            <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-teal-400 text-sm">
                  NABL ACCREDITED CLINICAL PATHOLOGY & IMMUNOASSAY REPORT
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Automated Chemiluminescence & Nephelometry Platform · ICMR Reference Matrix
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-teal-900/60 text-teal-300 border border-teal-700 font-bold text-[10px]">
                {isPathology ? 'CRITICAL FLAGS DETECTED' : 'ALL VALUES WITHIN NORMAL RANGE'}
              </span>
            </div>

            <div className="space-y-3 my-4">
              {/* Test 1: hs-CRP */}
              <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">High-Sensitivity C-Reactive Protein (hs-CRP)</div>
                  <div className="text-[10px] text-slate-400">Ref: &lt; 1.0 mg/L (Normal) | 1.0–3.0 (Moderate) | &gt; 3.0 (High)</div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${isPathology ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isPathology ? '14.8 mg/L [CRITICAL HIGH]' : '0.6 mg/L [NORMAL]'}
                  </span>
                </div>
              </div>

              {/* Test 2: Vitamin D */}
              <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">Serum 25-Hydroxy Vitamin D3 [25(OH)D]</div>
                  <div className="text-[10px] text-slate-400">Ref: 30.0 – 100.0 ng/mL | Deficient: &lt; 20.0 ng/mL</div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${isPathology ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isPathology ? '10.4 ng/mL [SEVERE DEFICIENCY]' : '42.5 ng/mL [OPTIMAL]'}
                  </span>
                </div>
              </div>

              {/* Test 3: Uric Acid */}
              <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">Serum Uric Acid</div>
                  <div className="text-[10px] text-slate-400">Ref: Male 3.5 – 7.2 mg/dL | Female 2.6 – 6.0 mg/dL</div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${isPathology ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {isPathology ? '8.6 mg/dL [ELEVATED]' : '4.8 mg/dL [NORMAL]'}
                  </span>
                </div>
              </div>

              {/* Test 4: HLA-B27 */}
              <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-200">HLA-B27 PCR / Flow Cytometry</div>
                  <div className="text-[10px] text-slate-400">Ref: Negative (Associated with Axial Spondyloarthritis)</div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${isPathology ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isPathology ? 'POSITIVE [HIGH RISK SSpA]' : 'NEGATIVE'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
              <span>Verified by Senior Biochemist · Quality Control Run OK</span>
              <span>ICMR / NABL Guideline 2024</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100 flex flex-col">
      {/* 1. PACS Hospital Top Station Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-mono font-bold text-teal-400 tracking-wider">PACS DICOM WORKSTATION</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-semibold">{viewerData.projectionView}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setViewMode('pathological')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'pathological'
                  ? 'bg-rose-900/70 text-rose-200 border border-rose-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pathological Scan
            </button>
            <button
              onClick={() => setViewMode('normal')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'normal'
                  ? 'bg-emerald-900/70 text-emerald-200 border border-emerald-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal Baseline
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-teal-900/70 text-teal-200 border border-teal-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3 h-3" />
              <span>Split Comparison</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive PACS Tool Controls Bar */}
      <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {/* Toggle Overlays & Calipers */}
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`px-2.5 py-1 rounded-md border text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              showOverlays
                ? 'bg-teal-950/80 text-teal-300 border-teal-700'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Ruler className="w-3 h-3" />
            <span>Landmarks & Calipers</span>
          </button>

          {/* Toggle Interactive Hotspot Pins */}
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-2.5 py-1 rounded-md border text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              showHotspots
                ? 'bg-teal-950/80 text-teal-300 border-teal-700'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Finding Hotspots ({viewerData.findingsHotspots.length})</span>
          </button>

          {/* Invert Film */}
          <button
            onClick={() => setInvertedFilm(!invertedFilm)}
            className={`px-2.5 py-1 rounded-md border text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              invertedFilm
                ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Invert film negative/positive greyscale"
          >
            {invertedFilm ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            <span>Invert Film</span>
          </button>
        </div>

        {/* Window Preset */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-slate-500 font-mono">WINDOW:</span>
          <button
            onClick={() => setWindowPreset('standard')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              windowPreset === 'standard' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Default
          </button>
          <button
            onClick={() => setWindowPreset('high-contrast')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              windowPreset === 'high-contrast' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            STIR/Fluid
          </button>
          <button
            onClick={() => setWindowPreset('bone')}
            className={`px-2 py-0.5 rounded cursor-pointer ${
              windowPreset === 'bone' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bone Window
          </button>
        </div>
      </div>

      {/* 3. Radiographic Film Canvas Area */}
      <div className="p-4 sm:p-6 bg-black flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[460px]">
        {viewMode === 'split' ? (
          /* Split Comparison: Pathological vs Normal Side by Side */
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-rose-900/60 rounded-xl overflow-hidden bg-slate-950 relative flex flex-col">
              <div className="bg-rose-950/80 px-3 py-1.5 text-[11px] font-bold text-rose-300 flex items-center justify-between border-b border-rose-900/60">
                <span>PATHOLOGICAL SCAN: {viewerData.pathologyTitle}</span>
                <span className="text-[10px] text-rose-400 font-mono">ACTIVE CASE</span>
              </div>
              <div className="relative aspect-square w-full" style={{ filter: getFilterStyle() }}>
                {renderSvgPlate(true)}
              </div>
            </div>

            <div className="border border-emerald-900/60 rounded-xl overflow-hidden bg-slate-950 relative flex flex-col">
              <div className="bg-emerald-950/80 px-3 py-1.5 text-[11px] font-bold text-emerald-300 flex items-center justify-between border-b border-emerald-900/60">
                <span>NORMAL BASELINE REFERENCE SCAN</span>
                <span className="text-[10px] text-emerald-400 font-mono">CONTROL</span>
              </div>
              <div className="relative aspect-square w-full" style={{ filter: getFilterStyle() }}>
                {renderSvgPlate(false)}
              </div>
            </div>
          </div>
        ) : (
          /* Single Main Display */
          <div className="relative w-full max-w-xl aspect-square border border-slate-800 rounded-xl overflow-hidden bg-slate-950 shadow-inner">
            <div
              className="w-full h-full relative"
              style={{ filter: getFilterStyle() }}
            >
              {renderSvgPlate(viewMode === 'pathological')}
            </div>

            {/* Interactive Findings Hotspot Pins Overlay */}
            {showHotspots && viewMode === 'pathological' && (
              <div className="absolute inset-0 pointer-events-none">
                {viewerData.findingsHotspots.map((hotspot, idx) => {
                  const isSelected = selectedHotspotId === hotspot.id;
                  return (
                    <button
                      key={hotspot.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHotspotId(hotspot.id);
                      }}
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                      }`}
                      title={hotspot.label}
                    >
                      <span className="relative flex h-6 w-6">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            hotspot.significance === 'Critical Pathology'
                              ? 'bg-rose-500'
                              : hotspot.significance === 'Diagnostic Landmark'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-[10px] font-bold text-white shadow-lg border border-white/60 ${
                            hotspot.significance === 'Critical Pathology'
                              ? 'bg-rose-600'
                              : hotspot.significance === 'Diagnostic Landmark'
                              ? 'bg-amber-600'
                              : 'bg-emerald-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Interactive Hotspots Drawer & Clinical Finding Details */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Radiological Findings & Anatomical Hotspots
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Click any pin to inspect verified pathological criteria
          </span>
        </div>

        {/* Hotspots Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {viewerData.findingsHotspots.map((hotspot, idx) => {
            const isSelected = selectedHotspotId === hotspot.id;
            return (
              <button
                key={hotspot.id}
                onClick={() => setSelectedHotspotId(hotspot.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? hotspot.significance === 'Critical Pathology'
                      ? 'bg-rose-900/80 text-rose-100 border border-rose-500 shadow-xs'
                      : hotspot.significance === 'Diagnostic Landmark'
                      ? 'bg-amber-900/80 text-amber-100 border border-amber-500 shadow-xs'
                      : 'bg-emerald-900/80 text-emerald-100 border border-emerald-500 shadow-xs'
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-mono font-bold">
                  {idx + 1}
                </span>
                <span>{hotspot.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Hotspot Deep-Dive Card */}
        {selectedHotspot && (
          <div
            className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
              selectedHotspot.significance === 'Critical Pathology'
                ? 'bg-rose-950/40 border-rose-800/80 text-rose-100'
                : selectedHotspot.significance === 'Diagnostic Landmark'
                ? 'bg-amber-950/40 border-amber-800/80 text-amber-100'
                : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white flex items-center gap-1.5">
                {selectedHotspot.significance === 'Critical Pathology' ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                )}
                <span>{selectedHotspot.label}</span>
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  selectedHotspot.significance === 'Critical Pathology'
                    ? 'bg-rose-900 text-rose-200 border border-rose-700'
                    : selectedHotspot.significance === 'Diagnostic Landmark'
                    ? 'bg-amber-900 text-amber-200 border border-amber-700'
                    : 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                }`}
              >
                {selectedHotspot.significance}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">{selectedHotspot.description}</p>
          </div>
        )}

        {/* Diagnostic Criteria Summary List */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
          <div className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-400" />
            <span>Standardized Diagnostic Criteria & Interpretation Guidelines</span>
          </div>
          <ul className="space-y-1 text-slate-400 list-disc list-inside">
            {viewerData.diagnosticCriteriaSummary.map((crit, idx) => (
              <li key={idx} className="leading-relaxed">
                {crit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
