import classNames from 'classnames';
import { PropsWithChildren, useEffect, useState } from 'react';
import styles from './unlockButton.module.css';

// https://codepen.io/beccakroese/pen/GQgwbx

export interface UnlockButtonProps extends PropsWithChildren {
  chargeTime: number;
  state: 'locked' | 'unlocking' | 'unlocked' | 'failed';
  onClick: () => void;
}

export default function UnlockButton(props: UnlockButtonProps) {
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
  const [charging, setCharging] = useState(false);
  const { state } = props;

  useEffect(() => {
    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('touchend', onMouseUp);

    return () => {
      document.documentElement.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('touchend', onMouseUp);
    };
  }, [onMouseUp]);

  function onMouseDown() {
    if (state != 'locked') {
      return;
    }

    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => unlock(), props.chargeTime + 50));
    setCharging(true);
    vibrate(10);
  }

  function onMouseUp() {
    if (!charging || state != 'locked') {
      return;
    }

    clearTimeout(timeoutId);
    setCharging(false);
    vibrate(10);
  }

  function unlock() {
    setCharging(false);
    props.onClick();
  }

  return (
    <div
      className="relative rounded-full p-10"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <div
        className={classNames(styles.backSignal, {
          hidden: state != 'unlocking',
        })}
      />
      <div
        className={classNames(
          styles.root,
          'relative box-content flex h-[200px] w-[200px] select-none items-center overflow-hidden rounded-full border-4 border-conversion text-xl font-bold text-white',
          {
            'bg-main': state != 'unlocked',
            'border-green-500 bg-green-500': state == 'unlocked',
            'border-red-500 bg-red-500': state == 'failed',
            'border-white': charging || state == 'unlocking',
          },
        )}
      >
        <div
          className={classNames(styles.after, {
            [styles.spin ?? '']: charging || state == 'unlocking',
            hidden: state == 'unlocked' || state == 'failed',
          })}
          style={{
            animationDuration: props.chargeTime / 2 + 'ms',
          }}
        />
        <div
          className={classNames(styles.before, {
            [styles.spin2 ?? '']: charging || state == 'unlocking',
            hidden: state == 'unlocked' || state == 'failed',
          })}
          style={{
            animationDuration: props.chargeTime / 2 + 'ms',
            animationDelay: props.chargeTime / 2 + 'ms',
          }}
        />

        <div
          className={classNames(
            'absolute left-[12px] top-[12px] z-10 flex h-[176px] w-[176px] flex-col items-center justify-center rounded-full bg-conversion text-center',
            {
              'bg-green-600': state == 'unlocked',
              'bg-red-600': state == 'failed',
            },
          )}
        >
          <div
            className={classNames(styles.lock, 'mb-2 scale-[70%]', {
              [styles.unlocked ?? '']: state == 'unlocked',
              [styles.charging ?? '']: charging,
              [styles.unlocking ?? '']: state == 'unlocking',
            })}
          />
          {props.children}
        </div>
      </div>
    </div>
  );
}

export function vibrate(timeout: number) {
  if ('vibrate' in navigator) {
    navigator.vibrate(timeout);
  }
}
