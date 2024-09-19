import heroImg from "../assets/images/hero-img.png";

export const Hero = () => {
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto">
        <img src={heroImg} alt="heroImg" className="w-full" />
      </div>
    </section>
  );
};
