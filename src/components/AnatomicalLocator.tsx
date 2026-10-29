import React from 'react';
import { Crosshair, MapPin } from 'lucide-react';

interface AnatomicalLocatorProps {
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
  complaintCategory: 'Knee Pain' | 'Low Back Pain' | 'Other';
}

export const AnatomicalLocator: React.FC<AnatomicalLocatorProps> = ({
  selectedLocation,
  onSelectLocation,
  complaintCategory,
}) => {
  const kneeLocations = [
    { label: 'Right Knee - Anterior / Retropatellar', desc: 'Retropatellar aching, stair pain, crepitus (PFPS / OA)' },
    { label: 'Right Knee - Medial Joint Line', desc: 'Medial meniscus, MCL sprain, pes anserine bursitis' },
    { label: 'Right Knee - Lateral Joint Line & ACL', desc: 'Lateral meniscus, acute ACL hemarthrosis, LCL' },
    { label: 'Right Knee - Superior / Quadriceps Tendon', desc: 'Quadriceps tendinopathy, suprapatellar effusion' },
    { label: 'Right Knee - Inferior / Patellar Tendon', desc: 'Patellar tendinopathy (Jumper\'s knee), Osgood-Schlatter' },
    { label: 'Right Knee - Posterior / Popliteal Fossa', desc: 'Baker\'s cyst, PCL sprain, neurovascular tracking' },
    { label: 'Left Knee - Anterior / Retropatellar', desc: 'Left retropatellar and peripatellar region' },
    { label: 'Left Knee - Medial Joint Line', desc: 'Left medial meniscal and collateral ligament margin' },
    { label: 'Bilateral Knees - Diffuse Degenerative', desc: 'Symmetrical or asymmetric osteoarthritic joint stiffness' },
  ];

  const spineLocations = [
    { label: 'Lumbar Spine - Central L4/L5 & L5/S1', desc: 'Axial discogenic or mechanical low back pain' },
    { label: 'Lumbar Spine with Right L5 Radiculopathy', desc: 'Right buttock to lateral thigh, lateral calf, and dorsal big toe' },
    { label: 'Lumbar Spine with Right S1 Radiculopathy', desc: 'Right posterior thigh, calf, Achilles, and lateral foot/sole' },
    { label: 'Lumbar Spine with Left L5/S1 Radiculopathy', desc: 'Left lower limb radicular radiation below knee' },
    { label: 'Bilateral Lumbar - Saddle & Perineal Distribution', desc: 'RED FLAG: Perineal saddle anesthesia / Cauda Equina zone' },
    { label: 'Lumbar Spine - Bilateral Diffuse Claudication Zone', desc: 'Bilateral calves and thighs provoked by standing/walking (Canal Stenosis)' },
    { label: 'Right Sacroiliac Joint & Gluteal Region', desc: 'SI joint dysfunction, pelvic ring strain, spondyloarthritis' },
    { label: 'Left Sacroiliac Joint & Gluteal Region', desc: 'Left SI joint and deep buttock distribution' },
  ];

  const activeOptions = complaintCategory === 'Knee Pain' ? kneeLocations : spineLocations;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1 font-medium text-slate-700">
          <Crosshair className="w-3.5 h-3.5 text-teal-600" />
          Anatomical Topography & Symptom Localization
        </span>
        <span>Select primary pain center</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
        {activeOptions.map((item) => {
          const isSelected = selectedLocation === item.label;
          const isRedFlag = item.label.includes('RED FLAG') || item.label.includes('Saddle');

          return (
            <button
              type="button"
              key={item.label}
              onClick={() => onSelectLocation(item.label)}
              className={`text-left p-2.5 rounded-lg border transition-all text-xs flex items-start gap-2.5 ${
                isSelected
                  ? 'border-teal-700 bg-teal-50/50 shadow-xs ring-1 ring-teal-700/20'
                  : isRedFlag
                  ? 'border-amber-200 bg-amber-50/30 hover:border-amber-400'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <MapPin
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  isSelected
                    ? 'text-teal-700'
                    : isRedFlag
                    ? 'text-amber-600'
                    : 'text-slate-400'
                }`}
              />
              <div className="min-w-0 flex-1">
                <div className={`font-semibold truncate ${isSelected ? 'text-teal-900' : 'text-slate-900'}`}>
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedLocation && (
        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-md p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Selected Location:</span>
            <span className="text-teal-800 font-medium">{selectedLocation}</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectLocation('')}
            className="text-[11px] text-slate-400 hover:text-slate-700 underline"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
