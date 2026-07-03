import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTABanner = () => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "restart none none reset",
        },
      }
    );
  }, []);

  return (
    <section className="cta" id="cta">
      <div className="container">

        {/* ✅ OPTION 1 — Glowing Purple Box */}
        {/* <div className="cta-box" ref={ref}>
          <p className="section-label">Get Started</p>
          <h2 className="cta-title">
            Ready to Ace Your <br />
            <span className="hero-gradient">Next Interview?</span>
          </h2>
          <p className="cta-subtext">
            Start practicing with MockAI today — completely free.
          </p>
          <button className="btn-primary">
            Start Free Interview →
          </button>
        </div> */}

        {/* ✅ OPTION 2 — Full Width Gradient Banner */}
{/*         
        <div className="cta-gradient" ref={ref}>
          <p className="section-label">Get Started</p>
          <h2 className="cta-title">
            Ready to Ace Your <br />
            Next Interview?
          </h2>
          <p className="cta-subtext">
            Start practicing with MockAI today — completely free.
          </p>
          <button className="btn-primary">
            Start Free Interview →
          </button>
        </div> 
        */}

        {/* ✅ OPTION 3 — Apple Style Minimal */}
        
        <div className="cta-minimal" ref={ref}>
          <h2 className="cta-title">
            Ready to Ace Your <br />
            <span className="hero-gradient">Next Interview?</span>
          </h2>
          <p className="cta-subtext">
            Start practicing with MockAI today — completely free.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Start Free Interview →</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div> 
       

      </div>
    </section>
  );
};

export default CTABanner;