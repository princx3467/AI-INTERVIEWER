import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Shantanu Dey",
    role: "Frontend Developer @ Amazon",
    text: "MockAI helped me crack my Frontend interview at Amazon. The voice AI felt exactly like a real interviewer!",
    stars: 5,
  },
  {
    name: "Prakash Roy",
    role: "Backend Developer @ Microsoft",
    text: "The 7 day improvement plan was a game changer. I went from failing to clearing interviews in just 2 weeks.",
    stars: 5,
  },
  {
    name: "Akshat Shaw",
    role: "Fullstack Developer @ Google",
    text: "Resume based questions were spot on. Got hired at Google after just 5 mock interviews on MockAI!",
    stars: 5,
  },
  {
    name: "Shantanu Dey",
    role: "Frontend Developer @ Amazon",
    text: "MockAI helped me crack my Frontend interview at Amazon. The voice AI felt exactly like a real interviewer!",
    stars: 5,
  },
  {
    name: "Prakash Roy",
    role: "Backend Developer @ Microsoft",
    text: "The 7 day improvement plan was a game changer. I went from failing to clearing interviews in just 2 weeks.",
    stars: 5,
  },
  {
    name: "Akshat Shaw",
    role: "Fullstack Developer @ Google",
    text: "Resume based questions were spot on. Got hired at Google after just 5 mock interviews on MockAI!",
    stars: 5,
  },
];

const Testimonials = () => {
  const marqueeRef = useRef(null);
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

    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 20,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">
            What Our Users <br />
            <span className="hero-gradient">Say About MockAI</span>
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track" ref={marqueeRef}>
          {testimonials.map((item, i) => (
            <div className="testimonial-card" key={i}>
              {/* Stars */}
              <div className="stars">
                {"⭐".repeat(item.stars)}
              </div>

              {/* Text */}
              <p className="testimonial-text">"{item.text}"</p>

              {/* User */}
              <div className="testimonial-user">
                <div className="user-avatar">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="user-name">{item.name}</p>
                  <p className="user-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;