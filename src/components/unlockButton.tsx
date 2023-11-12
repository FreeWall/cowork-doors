import classNames from 'classnames';
import { PropsWithChildren, useEffect, useState } from 'react';
import styles from './unlockButton.module.css';

// https://codepen.io/beccakroese/pen/GQgwbx

interface UnlockButtonProps extends PropsWithChildren {
  type: 'rectangle' | 'circle';
  timeout: number;
  state: 'locked' | 'unlocking' | 'unlocked';
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
    setTimeoutId(setTimeout(() => unlock(), props.timeout + 50));
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

  if (props.type == 'circle') {
    return (
      <div
        className="relative p-10 rounded-full"
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
            ' w-[200px] h-[200px] border-4 box-content border-conversion select-none text-white overflow-hidden text-xl font-bold flex items-center rounded-full relative',
            {
              'bg-main': state != 'unlocked',
              'bg-green-500 border-green-500': state == 'unlocked',
              'border-white': charging || state == 'unlocking',
            },
          )}
        >
          <div
            className={classNames(styles.after, {
              [styles.spin ?? '']: charging || state == 'unlocking',
              hidden: state == 'unlocked',
            })}
            style={{
              animationDuration: props.timeout / 2 + 'ms',
            }}
          />
          <div
            className={classNames(styles.before, {
              [styles.spin2 ?? '']: charging || state == 'unlocking',
              hidden: state == 'unlocked',
            })}
            style={{
              animationDuration: props.timeout / 2 + 'ms',
              animationDelay: props.timeout / 2 + 'ms',
            }}
          />

          <div
            className={classNames(
              'z-10 absolute top-[10px] left-[10px] text-center w-[180px] rounded-full h-[180px] bg-conversion flex flex-col justify-center items-center',
              {
                'bg-green-600': state == 'unlocked',
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

  return (
    <div
      className={classNames(
        'bg-conversion border-conversion select-none p-6 text-white overflow-hidden text-xl font-bold px-4 flex items-center rounded-lg relative w-full',
        {
          'bg-green-600': state == 'unlocked',
        },
      )}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <div
        className={classNames(
          'absolute -translate-x-full top-0 left-0 w-full h-full bg-conversion brightness-[60%]',
          {
            'animate-fill': charging,
            hidden: state == 'unlocked',
          },
        )}
        style={{
          animationDuration: props.timeout + 'ms',
        }}
      />
      <div className="z-10 text-center w-full">{props.children}</div>
    </div>
  );
}

export function vibrate(timeout: number) {
  if ('vibrate' in navigator) {
    navigator.vibrate(timeout);
  }
}
