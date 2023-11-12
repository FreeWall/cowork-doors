import UnlockButton, {
  UnlockButtonProps,
  vibrate,
} from '@/components/unlockButton';
import Image from 'next/future/image';
import logo from 'public/assets/icon.svg';
import { useState } from 'react';

export default function Index() {
  const [state, setState] = useState<UnlockButtonProps['state']>('locked');
  const [shouldUnlock, setShouldUnlock] = useState(true);

  return (
    <div className="flex absolute top-0 w-full h-full">
      <Image
        className="absolute top-10 left-1/2 -ml-[32px]"
        src={logo.src}
        alt=""
        width={64}
        height={64}
      />
      <div className="p-6 w-full h-full flex items-center justify-center pt-40 flex-col overflow-hidden">
        <UnlockButton
          chargeTime={750}
          state={state}
          onClick={() => {
            setState('unlocking');
            vibrate(10);

            setTimeout(() => {
              setShouldUnlock(!shouldUnlock);
              setState(shouldUnlock ? 'unlocked' : 'failed');

              if (shouldUnlock) {
                vibrate(500);
              } else {
                vibrate(100);
                setTimeout(() => vibrate(100), 150);
                setTimeout(() => vibrate(100), 300);
              }

              setTimeout(() => {
                setState('locked');
              }, 2000);
            }, 3000);
          }}
        >
          {state == 'locked' && 'Otevřít'}
          {state == 'unlocking' && 'Otevírám'}
          {state == 'unlocked' && 'Otevřeno'}
          {state == 'failed' && 'Zamítnuto'}
        </UnlockButton>
      </div>
    </div>
  );
}
