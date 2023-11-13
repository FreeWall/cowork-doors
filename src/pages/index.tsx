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
    <div className="absolute top-0 flex h-full w-full">
      <Image
        className="absolute left-1/2 top-10 -ml-[32px]"
        src={logo.src}
        alt=""
        width={64}
        height={64}
      />
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden p-6 pt-40">
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
                setTimeout(() => vibrate(100), 250);
                setTimeout(() => vibrate(100), 500);
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
