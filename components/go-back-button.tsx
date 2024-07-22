'use client';

import { useRouter } from 'next/navigation';

import { BUTTONS } from '@/lib/constants';

interface GoBackButtonProps {
  className?: string;
}

export default function GoBackButton({ className = '' }: GoBackButtonProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className={`text-white hover:text-blue-200 transition duration-300 ease-in-out ${className}`}
      onClick={handleGoBack}
    >
      &lt; {BUTTONS.GO_BACK}
    </button>
  );
}
