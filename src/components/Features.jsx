import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mic, BarChart3, Calendar, FileText, Clock, Lock } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Mic size={32} color="#3B82F6" />,
    title: "Role Based Interviews",
    desc: "Choose Frontend, Backend, Fullstack, HR or Mixed interviews based on your target job.",
  },
  {
    icon: <BarChart3 size={32} color="#3B82F6" />,
    title: "Detailed Score Report",
    desc: "Get scores for DSA, React, System Design and more after every interview.",
  },
  {
    icon: <Calendar size={32} color="#3B82F6" />,
    title: "7 Day Improvement Plan",
    desc: "AI creates a personalized plan based on your weak areas to help you improve fast.",
  },
  {
    icon: <FileText size={32} color="#3B82F6" />,
    title: "Resume Upload",
    desc: "Upload your resume and get interview questions tailored to your exact experience.",
  },
  {
    icon: <Clock size={32} color="#3B82F6" />,
    title: "Interview History",
    desc: "Track all your past interviews and monitor your progress over time.",
  },
  {
    icon: <Lock size={32} color="#3B82F6" />,
    title: "Secure & Private",
    desc: "Your data is fully encrypted and completely private at all times.",
  },
];

const Features = () => {
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "restart none none reset",
        },
      }
    );

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: (i % 3) * 0.15,
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
    <section className="features" id="features">
      <div className="container">

        <div className="section-header" ref={headerRef}>
          <p className="section-label">Features</p>
          <h2 className="section-title">
            Everything MockAI <br />
            <span className="hero-gradient">Offers You</span>
          </h2>
        </div>

        <div className="features-grid">
          {features.map((item, i) => (
            <div
              className="feature-card"
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
               <div className="feature-icon-box">{item.icon}</div>
               <h3 className="feature-title">{item.title}</h3>
               <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
