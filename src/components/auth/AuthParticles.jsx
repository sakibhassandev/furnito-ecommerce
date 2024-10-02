import authParticle1 from "../../assets/images/auth-particles/auth-particle1.webp";
import authParticle2 from "../../assets/images/auth-particles/auth-particle2.webp";
import authParticle3 from "../../assets/images/auth-particles/auth-particle3.webp";
import authParticle4 from "../../assets/images/auth-particles/auth-particle4.webp";
import authParticle5 from "../../assets/images/auth-particles/auth-particle5.webp";
import authParticle6 from "../../assets/images/auth-particles/auth-particle6.webp";

export const AuthParticles = () => {
  return (
    <div className="login-particles">
      <img
        src={authParticle1}
        alt="login-particle"
        className="absolute -z-10 right-[14%] bottom-[32%]"
      />
      <img
        src={authParticle2}
        alt="login-particle"
        className="absolute -z-10 -right-[1%] bottom-[14%]"
      />
      <img
        src={authParticle3}
        alt="login-particle"
        className="absolute -z-10 top-[35%] left-[3%]"
      />
      <img
        src={authParticle4}
        alt="login-particle"
        className="absolute -z-10 left-[18%] bottom-[10%]"
      />
      <img
        src={authParticle5}
        alt="login-particle"
        className="absolute -z-10 right-[20%] top-[43%]"
      />
      <img
        src={authParticle6}
        alt="login-particle"
        className="absolute -z-10 right-[22%] top-[27%]"
      />
    </div>
  );
};
