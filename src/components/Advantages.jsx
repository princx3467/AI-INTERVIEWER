import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: "🎙️",
    title: "Voice AI Interviews",
    desc: "Practice with a real AI voice that asks follow-up questions just like a human interviewer.",
  },
  {
    icon: "⚡",
    title: "Instant Feedback",
    desc: "Get detailed scores and feedback immediately after every answer so you improve faster.",
  },
  {
    icon: "📄",
    title: "Resume Personalized",
    desc: "Upload your resume and get interview questions tailored specifically to your experience.",
  },
];

const Advantages = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "restart none none reset",
          },
        }
      );
    });
  }, []);

  return (
    <section className="advantages" id="advantages">
      <div className="container">

        <div className="section-header">
          <p className="section-label">Why MockAI</p>
          <h2 className="section-title">
            Everything You Need to <br />
            <span className="hero-gradient">Ace Your Interview</span>
          </h2>
        </div>

        <div className="advantages-grid">
          {advantages.map((item, i) => (
            <div
              className="advantage-card"
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className="advantage-icon">{item.icon}</div>
              <h3 className="advantage-title">{item.title}</h3>
              <p className="advantage-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Advantages;