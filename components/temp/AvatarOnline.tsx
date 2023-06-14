import Image from 'next/image';

const AvatarOnline = ({ src }: { src: string }) => {
  return (
    <>
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <Image
            src={src}
            alt="online user profile picture"
            width={48}
            height={48}
          />
        </div>
      </div>
    </>
  );
};

export default AvatarOnline;
