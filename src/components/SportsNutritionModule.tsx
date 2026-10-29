import React, { useState, useMemo } from 'react';
import {
  INDIAN_FOOD_DATABASE,
  DEMO_NUTRITION_PLANS,
} from '../data/sportsNutritionData';
import {
  FoodPreference,
  BudgetLevel,
  DietaryTradition,
  IndianPersonalizedNutritionPlan,
} from '../types/clinical';
import {
  Apple,
  Utensils,
  Droplets,
  ShieldAlert,
  Flame,
  Scale,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Info,
  Calendar,
} from 'lucide-react';

export const SportsNutritionModule: React.FC = () => {
  // Athlete Input State
  const [age, setAge] = useState<number>(24);
  const [sex, setSex] = useState<'Male' | 'Female'>('Male');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [activityFactor, setActivityFactor] = useState<number>(1.75); // Heavy athletic training
  const [goal, setGoal] = useState<'Hypertrophy' | 'Fat Loss' | 'Endurance' | 'Injury Recovery'>('Hypertrophy');
  const [foodPreference, setFoodPreference] = useState<FoodPreference>('Pure Vegetarian (Lacto)');
  const [budgetTier, setBudgetTier] = useState<BudgetLevel>('Economy / Budget-Friendly (Local Dal, Sattu, Besan, Rice, Curd)');
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);

  // RED-S Screening State
  const [redsAnswers, setRedsAnswers] = useState<Record<string, boolean>>({});

  // BMR & Energy Calculations (Mifflin-St Jeor)
  const bmr = useMemo(() => {
    if (sex === 'Male') {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
    } else {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
    }
  }, [sex, weightKg, heightCm, age]);

  const tdee = Math.round(bmr * activityFactor);

  const targetCalories = useMemo(() => {
    if (goal === 'Hypertrophy') return tdee + 400;
    if (goal === 'Fat Loss') return tdee - 450;
    return tdee; // Endurance / Maintenance
  }, [tdee, goal]);

  const proteinGramsPerKg = useMemo(() => {
    if (goal === 'Hypertrophy' || goal === 'Injury Recovery') return 2.0;
    if (goal === 'Fat Loss') return 2.2;
    return 1.6;
  }, [goal]);

  const targetProteinGrams = Math.round(weightKg * proteinGramsPerKg);
  const targetFatsGrams = Math.round((targetCalories * 0.22) / 9);
  const remainingCaloriesForCarbs = targetCalories - targetProteinGrams * 4 - targetFatsGrams * 9;
  const targetCarbsGrams = Math.max(100, Math.round(remainingCaloriesForCarbs / 4));
  const carbsGramsPerKg = Number((targetCarbsGrams / weightKg).toFixed(1));

  const demoPlan: IndianPersonalizedNutritionPlan = DEMO_NUTRITION_PLANS.cricketFastBowlerVeg;

  const handleCopyPlan = () => {
    const text = `
CLINICAAI SPORTS NUTRITION & INDIAN DIET PLAN (ICMR-NIN ALIGNED)
Profile: ${age}y ${sex}, ${weightKg}kg, ${heightCm}cm | Goal: ${goal}
Preference: ${foodPreference} | Budget: ${budgetTier}

ENERGY & MACRONUTRIENT TARGETS:
• BMR: ${bmr} kcal | TDEE: ${tdee} kcal
• Target Daily Calories: ${targetCalories} kcal
• Protein Target: ${targetProteinGrams}g (${proteinGramsPerKg} g/kg bodyweight)
• Carbohydrate Target: ${targetCarbsGrams}g (${carbsGramsPerKg} g/kg bodyweight)
• Healthy Fats Target: ${targetFatsGrams}g (22% of total energy)

DAILY MEAL SCHEDULE:
${demoPlan.meals
  .map(
    (m) => `
[${m.mealName.toUpperCase()}] (${m.timing}) - ${m.targetCalories} kcal, ${m.targetProteinGrams}g P, ${m.targetCarbsGrams}g C
${m.items.map((i) => ` - ${i.foodName}: ${i.portionDescription} (${i.nutritionSummary})`).join('\n')}
Rationale: ${m.clinicalNutrientTimingRationale}
`
  )
  .join('\n')}

HYDRATION & ELECTROLYTES IN INDIAN CLIMATE:
• Nimbu Paani with Kala Namak / Tender Coconut Water / WHO-ORS
• Target: 500ml 2 hrs pre-exercise, 200ml every 20 mins during, 1.5L per kg sweat lost

NADA ANTI-DOPING COMPLIANCE:
Rely on whole Indian foods (Sattu, Paneer, Dahi, Soya, Eggs). Avoid uncertified grey-market supplements.
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <Apple className="w-4 h-4 text-amber-600" />
            <span>Sports Nutrition & Clinical Dietetics Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Personalised Sports Nutrition & Indian Food Planning Engine
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Calculated energy and macronutrient targets aligned with the <strong>ICMR-NIN (National Institute of Nutrition) 2024 Dietary Guidelines for Indians</strong>. Budget-friendly whole Indian foods (Sattu, Paneer, Soya, Dahi, Ragi), hot-weather hydration, RED-S screening, and NADA anti-doping compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyPlan}
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
          >
            {copiedPlan ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copiedPlan ? 'Diet Plan Copied' : 'Copy Indian Meal Plan'}</span>
          </button>
        </div>
      </div>

      {/* Athlete Parameters Configurator Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Scale className="w-4 h-4 text-amber-700" />
          Athlete Biometric & Goal Profiling
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div>
            <label className="text-slate-600 font-medium">Age (yrs):</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 18)}
              className="w-full mt-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium">Biological Sex:</label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as 'Male' | 'Female')}
              className="w-full mt-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="text-slate-600 font-medium">Body Weight (kg):</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value) || 50)}
              className="w-full mt-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium">Height (cm):</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value) || 150)}
              className="w-full mt-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="text-slate-600 font-medium">Training Volume:</label>
            <select
              value={activityFactor}
              onChange={(e) => setActivityFactor(Number(e.target.value))}
              className="w-full mt-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900"
            >
              <option value={1.55}>Moderate (1x/day)</option>
              <option value={1.75}>Heavy (Daily rigorous)</option>
              <option value={2.0}>Two-a-Day / Pro Camp</option>
            </select>
          </div>

          <div>
            <label className="text-slate-600 font-medium">Performance Goal:</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full mt-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900"
            >
              <option value="Hypertrophy">Muscle Gain (+400 kcal)</option>
              <option value="Fat Loss">Fat Loss (-450 kcal)</option>
              <option value="Endurance">Match Performance</option>
              <option value="Injury Recovery">Post-Op Healing</option>
            </select>
          </div>

          <div>
            <label className="text-slate-600 font-medium">Dietary Preference:</label>
            <select
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value as any)}
              className="w-full mt-1 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-900"
            >
              <option value="Pure Vegetarian (Lacto)">Pure Vegetarian</option>
              <option value="Eggetarian (Lacto-Ovo)">Eggetarian</option>
              <option value="Non-Vegetarian (Chicken, Fish, Eggs)">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Jain (Strict Vegetarian without roots)">Jain (No roots)</option>
            </select>
          </div>
        </div>

        {/* Calculated Energy & Macro Output Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
            <span className="text-amber-900 font-medium text-[11px]">Calculated Daily Energy</span>
            <div className="text-xl font-bold font-mono text-amber-950 mt-0.5">{targetCalories} kcal</div>
            <span className="text-[10px] text-slate-500 font-mono">BMR: {bmr} | TDEE: {tdee}</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-600 font-medium text-[11px]">Daily Protein Target</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{targetProteinGrams} g</div>
            <span className="text-[10px] text-teal-700 font-mono font-semibold">{proteinGramsPerKg} g/kg bodyweight</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-600 font-medium text-[11px]">Carbohydrate Dosing</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{targetCarbsGrams} g</div>
            <span className="text-[10px] text-slate-500 font-mono">{carbsGramsPerKg} g/kg glycogen re-synthesis</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-slate-600 font-medium text-[11px]">Essential Healthy Fats</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{targetFatsGrams} g</div>
            <span className="text-[10px] text-slate-500 font-mono">22% of energy (PUFA/MUFA)</span>
          </div>
        </div>
      </div>

      {/* Daily Indian Meal Schedule */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-700" />
              <span>Full Daily Indian Meal Schedule & Nutrient Timing</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalized for {foodPreference} athletes using budget-friendly Indian staples.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">6 Structured Timed Meals</span>
        </div>

        <div className="space-y-3">
          {demoPlan.meals.map((meal, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{meal.mealName}</span>
                  <span className="text-xs text-slate-400">({meal.timing})</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono font-semibold">
                  <span className="text-amber-800">{meal.targetCalories} kcal</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-teal-800">{meal.targetProteinGrams}g Protein</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-700">{meal.targetCarbsGrams}g Carbs</span>
                </div>
              </div>

              <div className="space-y-1.5">
                {meal.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-start justify-between text-xs text-slate-700 bg-slate-50/70 p-2 rounded border border-slate-100">
                    <div>
                      <strong className="text-slate-900">{item.foodName}</strong>
                      <span className="text-slate-500 ml-2">({item.portionDescription})</span>
                    </div>
                    <span className="font-mono text-slate-500 text-[11px] shrink-0">{item.nutritionSummary}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-600 bg-amber-50/40 p-2 rounded border border-amber-100 italic">
                <strong>Clinical Nutrient Timing:</strong> {meal.clinicalNutrientTimingRationale}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Hydration & RED-S / Anti-Doping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Hot-Weather Hydration */}
        <div className="p-4 bg-cyan-50/50 border border-cyan-200 rounded-xl space-y-2">
          <div className="font-bold text-cyan-950 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-700" />
            <span>Hydration & Electrolytes in Indian Heat & Humidity</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {demoPlan.hydrationSweatLossStrategy}
          </p>
          <div className="p-2.5 bg-white rounded border border-cyan-100 text-slate-800 mt-2">
            <strong>Indian Electrolyte Protocols:</strong> {demoPlan.electrolytesStrategy}
          </div>
        </div>

        {/* NADA Anti-Doping & Food Safety */}
        <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
          <div className="font-bold text-rose-950 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-700" />
            <span>NADA / WADA Anti-Doping Notice & Supplement Safety</span>
          </div>
          <p className="text-rose-900 leading-relaxed">
            {demoPlan.wadaNadaComplianceNote}
          </p>
          <div className="p-2.5 bg-white rounded border border-rose-100 text-slate-700 mt-2 text-[11px]">
            <strong>Food-First Principle:</strong> Meet 100% of protein and micronutrient needs through accredited Indian staples (Sattu, Paneer, Dahi, Soya, Eggs, Pulses) before considering third-party certified (Informed Sport) supplements.
          </div>
        </div>
      </div>
    </div>
  );
};
