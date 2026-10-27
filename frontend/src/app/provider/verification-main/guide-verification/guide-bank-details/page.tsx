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

const accountTypes = ['Savings', 'Current'];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

const hintClass = 'mt-2 text-xs text-[#6c7387]';

const required = <span className="text-[#b08d1f]">*</span>;

export default function GuideBankDetailsPage() {
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={9}
      stepLabel="Step 10"
      stepTitle="Bank Details"
      onBackHref="/provider/verification-main/guide-verification/emergency-conatct"
      onNextHref="/provider/verification-main/guide-verification/agreement"
    >
      <div className="space-y-5">
        <p className="text-sm text-[#4e5568]">
          Your bank details are used only for payment disbursements and are kept fully secure.
        </p>

        <div>
          <label htmlFor="bank-name" className={labelClass}>
            Bank Name {required}
          </label>
          <input
            id="bank-name"
            type="text"
            value={bankName}
            onChange={(event) => setBankName(event.target.value)}
            placeholder="e.g. Commercial Bank of Ceylon / Sampath Bank"
            className={inputClass}
          />
          <p className={hintClass}>Select or enter the registered financial institution name in Sri Lanka.</p>
        </div>

        <div>
          <label htmlFor="branch-name" className={labelClass}>
            Branch Name {required}
          </label>
          <input
            id="branch-name"
            type="text"
            value={branchName}
            onChange={(event) => setBranchName(event.target.value)}
            placeholder="e.g. Kandy / Colombo Fort"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="holder-name" className={labelClass}>
            Account Holder Name {required}
          </label>
          <input
            id="holder-name"
            type="text"
            value={holderName}
            onChange={(event) => setHolderName(event.target.value)}
            placeholder="As per bank records"
            className={inputClass}
          />
          <p className={hintClass}>Must match the legal National Identity Card (NIC) / Passport submitted in Step 2.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="account-number" className={labelClass}>
              Account Number {required}
            </label>
            <input
              id="account-number"
              type="text"
              inputMode="numeric"
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value.replace(/\D/g, ''))}
              placeholder="1234567890"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="account-type" className={labelClass}>
              Account Type {required}
            </label>
            <select
              id="account-type"
              value={accountType}
              onChange={(event) => setAccountType(event.target.value)}
              className={`${inputClass} ${accountType ? '' : 'text-[#8a93a8]'}`}
            >
              <option value="">Select account type</option>
              {accountTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-[#e6d9a8] bg-[#fbf6e4] p-4 text-sm text-[#4e5568]">
          <span className="mt-0.5 text-[#b08d1f]">🔒</span>
          <p>
            <strong className="font-bold text-[#001a43]">256-bit Encrypted Payout Gateway:</strong> Payouts are
            directly initiated through LankaClear CEFTS automated payment rails. EVOLANKA does not store debit
            rights or credentials.
          </p>
        </div>
      </div>
    </GuideVerificationShell>
  );
}
