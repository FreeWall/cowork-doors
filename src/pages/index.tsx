import UnlockButton from '@/components/unlockButton';
import Image from 'next/future/image';
import logo from 'public/assets/icon.svg';

export default function Index() {
  return (
    <div className="flex absolute top-0 w-full h-full">
      <Image
        className="absolute top-10 left-1/2 -ml-[32px]"
        src={logo.src}
        alt=""
        width={64}
        height={64}
      />
      <div className="p-6 w-full h-full flex items-center justify-center pt-40 flex-col">
        <UnlockButton
          type="circle"
          timeout={1000}
        >
          Otevřít
        </UnlockButton>
      </div>
    </div>
  );
}
