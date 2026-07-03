import { useEffect } from "react";
import gsap from "gsap";

const Hero = () => {
  useEffect(() => {
    gsap.set(".hero-video", { opacity: 0 });
    gsap.set(".hero-overlay", { opacity: 0 });
    gsap.set(".hero-badge", { opacity: 0, y: 30 });
    gsap.set(".hero-title-line1", { opacity: 0, y: 40 });
    gsap.set(".hero-title-line2", { opacity: 0, y: 40 });
    gsap.set(".hero-subtext", { opacity: 0, y: 30 });
    gsap.set(".hero-buttons", { opacity: 0, y: 30 });

    gsap.to(".hero-video", {
      opacity: 1,
      duration: 1.2,
      delay: 0.5,
    });
    gsap.to(".hero-overlay", {
      opacity: 1,
      duration: 0.8,
      delay: 0.5,
    });
    gsap.to(".hero-badge",
      { opacity: 1, y: 0, duration: 0.8, delay: 1.5 }
    );
    gsap.to(".hero-title-line1",
      { opacity: 1, y: 0, duration: 0.8, delay: 2.5 }
    );
    gsap.to(".hero-title-line2",
      { opacity: 1, y: 0, duration: 0.8, delay: 3.5 }
    );
    gsap.to(".hero-subtext",
      { opacity: 1, y: 0, duration: 0.8, delay: 4.5 }
    );
    gsap.to(".hero-buttons",
      { opacity: 1, y: 0, duration: 0.8, delay: 5.5 }
    );
  }, []);

  return (
    <section className="hero">

      {/* Background Video */}
      <video
        className="hero-video"
        src="/video1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="container hero-content">

        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI Powered Voice Interviews
        </div>

        <h1 className="hero-title">
  <span className="glitch hero-title-line1" data-text="Practice Interviews.">
    Practice Interviews.
  </span>
  <br />
  <span className="glitch hero-title-line2" data-text="Get Hired Faster.">
    <span className="hero-gradient">Get Hired Faster.</span>
  </span>
</h1>

        <p className="hero-subtext">
          MockAI gives you real voice interview experience <br />
          with instant AI feedback and personalized coaching.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">Try Now Free →</button>
          <button className="btn-secondary">See How It Works</button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
