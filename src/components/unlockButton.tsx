import classNames from 'classnames';
import { PropsWithChildren, useEffect, useState } from 'react';
import styles from './unlockButton.module.css';

// https://codepen.io/beccakroese/pen/GQgwbx

interface UnlockButtonProps extends PropsWithChildren {
  type: 'rectangle' | 'circle';
  timeout: number;
}

export default function UnlockButton(props: UnlockButtonProps) {
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
  const [state, setState] = useState<
    'locked' | 'charging' | 'unlocking' | 'finished'
  >('locked');

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
    setState('charging');
    vibrate(10);
  }

  function onMouseUp() {
    if (state != 'charging') {
      return;
    }

    clearTimeout(timeoutId);
    setState('locked');
    vibrate(10);
  }

  function unlock() {
    setState('unlocking');
    vibrate(10);

    setTimeout(() => {
      finish();
    }, 3000);
  }

  function finish() {
    setState('finished');
    vibrate(500);

    setTimeout(() => {
      setState('locked');
    }, 2000);
  }

  if (props.type == 'circle') {
    return (
      <div
        className="relative p-10 rounded-full"
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
      >
        <div
          className={classNames(
            styles.root,
            ' w-[200px] h-[200px] border-4 box-content border-conversion select-none text-white overflow-hidden text-xl font-bold flex items-center rounded-full relative',
            {
              'bg-main': state != 'finished',
              'bg-green-500 border-green-500': state == 'finished',
              'border-white': state == 'charging' || state == 'unlocking',
            },
          )}
        >
          <div
            className={classNames(styles.after, {
              [styles.spin ?? '']: state == 'charging' || state == 'unlocking',
              hidden: state == 'finished',
            })}
            style={{
              animationDuration: props.timeout / 2 + 'ms',
            }}
          />
          <div
            className={classNames(styles.before, {
              [styles.spin2 ?? '']: state == 'charging' || state == 'unlocking',
              hidden: state == 'finished',
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
                'bg-green-600': state == 'finished',
              },
            )}
          >
            <div
              className={classNames(styles.signal, {
                hidden: state != 'unlocking',
              })}
            >
              <div />
              <div />
              <div />
            </div>
            <div
              className={classNames(styles.lock, 'mb-2 scale-[70%]', {
                [styles.unlocked ?? '']: state == 'finished',
                [styles.charging ?? '']: state == 'charging',
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
          'bg-green-600': state == 'finished',
        },
      )}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <div
        className={classNames(
          'absolute -translate-x-full top-0 left-0 w-full h-full bg-conversion brightness-[60%]',
          {
            'animate-fill': state == 'charging',
            hidden: state == 'finished',
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

function vibrate(timeout: number) {
  if ('vibrate' in navigator) {
    navigator.vibrate(timeout);
  }
}
