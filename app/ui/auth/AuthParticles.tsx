import Image from "next/image";

export const AuthParticles = () => {
  return (
    <div className="login-particles">
      <Image
        src="/assets/assets/images/auth-particles/auth-particle1.webp"
        alt="login-particle"
        className="absolute -z-10 right-[14%] bottom-[32%]"
      />
      <Image
        src="/assets/assets/images/auth-particles/auth-particle2.webp"
        alt="login-particle"
        className="absolute -z-10 -right-[1%] bottom-[14%]"
      />
      <Image
        src="/assets/assets/images/auth-particles/auth-particle3.webp"
        alt="login-particle"
        className="absolute -z-10 top-[35%] left-[3%]"
      />
      <Image
        src="/assets/assets/images/auth-particles/auth-particle4.webp"
        alt="login-particle"
        className="absolute -z-10 left-[18%] bottom-[10%]"
      />
      <Image
        src="/assets/assets/images/auth-particles/auth-particle5.webp"
        alt="login-particle"
        className="absolute -z-10 right-[20%] top-[43%]"
      />
      <Image
        src="/assets/assets/images/auth-particles/auth-particle6.webp"
        alt="login-particle"
        className="absolute -z-10 right-[22%] top-[27%]"
      />
    </div>
  );
};
