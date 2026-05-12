import Image from 'next/image';

export default function SkeamTitle() {
  return (
    <span className="inline-flex items-center ">
      S
      <Image
        src="/images/SKEAM SYMBOL .png"
        alt="Skeam"
        width={50}
        height={32}
        className="h-8 w-auto inline"
        style={{ width: 'auto', height: 'auto' }}
      />
      eam
    </span>
  );
}
