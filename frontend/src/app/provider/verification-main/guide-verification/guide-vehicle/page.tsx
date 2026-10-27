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

const vehicleTypes = ['Car', 'SUV / Jeep', 'Van', 'Mini Bus', 'Bus', 'Tuk-tuk', 'Motorbike'];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

type ToggleRowProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        'flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors',
        checked ? 'border-[#001a43] bg-[#f0f4ff]' : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
      ].join(' ')}
    >
      <span
        className={[
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
          checked ? 'bg-[#001a43]' : 'bg-[#c5cde0]',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          ].join(' ')}
        />
      </span>
      <span className="text-sm font-medium text-[#001a43]">{label}</span>
    </button>
  );
}

export default function GuideVehiclePage() {
  const [providesVehicle, setProvidesVehicle] = useState(false);
  const [vehicleType, setVehicleType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [driverIncluded, setDriverIncluded] = useState(false);
  const [fuelIncluded, setFuelIncluded] = useState(false);

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={7}
      stepLabel="Step 8"
      stepTitle="Vehicle"
      onBackHref="/provider/verification-main/guide-verification/guide-pricing"
      onNextHref="/provider/verification-main/guide-verification/emergency-conatct"
    >
      <div className="space-y-5">
        <ToggleRow label="I provide a vehicle for tours" checked={providesVehicle} onChange={setProvidesVehicle} />

        {providesVehicle && (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="vehicle-type" className={labelClass}>
                  Vehicle Type <span className="text-[#b08d1f]">*</span>
                </label>
                <select
                  id="vehicle-type"
                  value={vehicleType}
                  onChange={(event) => setVehicleType(event.target.value)}
                  className={`${inputClass} ${vehicleType ? '' : 'text-[#8a93a8]'}`}
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="vehicle-capacity" className={labelClass}>
                  Passenger Capacity <span className="text-[#b08d1f]">*</span>
                </label>
                <input
                  id="vehicle-capacity"
                  type="number"
                  min={1}
                  value={capacity}
                  onChange={(event) => setCapacity(event.target.value)}
                  placeholder="4"
                  className={inputClass}
                />
              </div>
            </div>

            <ToggleRow label="Driver included in service" checked={driverIncluded} onChange={setDriverIncluded} />
            <ToggleRow label="Fuel cost included in price" checked={fuelIncluded} onChange={setFuelIncluded} />
          </>
        )}
      </div>
    </GuideVerificationShell>
  );
}
