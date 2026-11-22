'use client';

import { useState } from 'react';

import GuideVerificationShell from '@/components/provider/guide/guide-verification-shell';

const steps = [
  'Guide Type',
  'Profile',
  'Contact',
  'Registration',
  'Qualifications',
  'Services',
  'Pricing',
  'Vehicle',
  'Emergency contact',
  'Bank Details',
  'Agreement',
  'Upload Documents',
];

const guideLevels = ['National Guide', 'Chauffeur Guide', 'Site / Area Guide', 'Adventure & Trekking Guide'];

const languages = [
  'English',
  'Sinhala',
  'Tamil',
  'German',
  'French',
  'Mandarin',
  'Japanese',
  'Korean',
  'Russian',
  'Arabic',
  'Spanish',
  'Italian',
  'Portuguese',
  'Dutch',
  'Polish',
  'Swedish',
  'Hindi',
  'Malay',
  'Thai',
  'Vietnamese',
];

const defaultSkills = [
  'First Aid',
  'Wildlife Tracking',
  'Historical Storytelling',
  'Hiking & Water Sports',
  'Bird Watching',
  'Photography',
  'Scuba Diving',
  'Rock Climbing',
  'Cooking Classes',
];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

const chipClass = (isSelected: boolean) =>
  [
    'inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors',
    isSelected
      ? 'border-[#001a43] bg-[#001a43] text-white'
      : 'border-[#dce3f1] bg-white text-[#4e5568] hover:border-[#001a43]/50 hover:text-[#001a43]',
  ].join(' ');

const toggleItem = (list: string[], item: string) =>
  list.includes(item) ? list.filter((value) => value !== item) : [...list, item];

export default function GuideQualificationPage() {
  const [regNo, setRegNo] = useState('');
  const [experience, setExperience] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>(defaultSkills);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');

  const addCustomSkill = () => {
    const value = customSkill.trim();
    if (!value) return;

    const existing = skills.find((skill) => skill.toLowerCase() === value.toLowerCase());
    if (existing) {
      setSelectedSkills((prev) => (prev.includes(existing) ? prev : [...prev, existing]));
    } else {
      setSkills((prev) => [...prev, value]);
      setSelectedSkills((prev) => [...prev, value]);
    }
    setCustomSkill('');
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((item) => item !== skill));
    setSelectedSkills((prev) => prev.filter((item) => item !== skill));
  };

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={4}
      stepLabel="Step 5"
      stepTitle="Qualifications"
      onBackHref="/provider/verification-main/guide-verification/guide-registration"
      onNextHref="/provider/verification-main/guide-verification/guide-services"
    >
      <div className="space-y-7">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Tourist Board Reg. No</span>
            <input
              type="text"
              value={regNo}
              onChange={(event) => setRegNo(event.target.value)}
              placeholder="TB registration number"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>
              Years of Experience <span className="text-[#b08d1f]">*</span>
            </span>
            <input
              type="number"
              min={0}
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </label>
        </div>

        <div>
          <p className={labelClass}>Guide Level (select all that apply)</p>
          <div className="flex flex-wrap gap-3">
            {guideLevels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevels((prev) => toggleItem(prev, level))}
                className={chipClass(selectedLevels.includes(level))}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={labelClass}>Languages Spoken</p>
          <div className="flex flex-wrap gap-2.5">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setSelectedLanguages((prev) => toggleItem(prev, language))}
                className={chipClass(selectedLanguages.includes(language))}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={labelClass}>Special Skills</p>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <span key={skill} className={`${chipClass(isSelected)} gap-2 py-0 pr-2`}>
                  <button
                    type="button"
                    onClick={() => setSelectedSkills((prev) => toggleItem(prev, skill))}
                    className="py-2"
                  >
                    {skill}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className={[
                      'flex h-5 w-5 items-center justify-center rounded-full text-xs leading-none transition-colors',
                      isSelected ? 'hover:bg-white/20' : 'hover:bg-[#001a43]/10',
                    ].join(' ')}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <input
              type="text"
              value={customSkill}
              onChange={(event) => setCustomSkill(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addCustomSkill();
                }
              }}
              placeholder="Type a custom skill and press Enter or Add"
              className={inputClass}
            />
            <button
              type="button"
              onClick={addCustomSkill}
              className="btn-primary shrink-0 rounded-xl px-6 py-3 text-sm font-bold"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </GuideVerificationShell>
  );
}
