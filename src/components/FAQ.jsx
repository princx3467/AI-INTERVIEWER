import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What is MockAI?",
    a: "MockAI is an AI powered voice interview platform that helps students and developers practice real interviews and get instant feedback.",
  },
  {
    q: "How does the voice interview work?",
    a: "MockAI uses advanced voice AI to ask you interview questions out loud. You answer by speaking and the AI evaluates your response instantly.",
  },
  {
    q: "Can I upload my resume?",
    a: "Yes! Upload your resume and MockAI will generate personalized interview questions based on your exact experience and skills.",
  },
  {
    q: "What roles can I practice for?",
    a: "You can practice for Frontend, Backend, Fullstack, System Design, DSA and HR interviews at Easy, Medium or Hard difficulty.",
  },
  {
    q: "Is my data safe and private?",
    a: "Absolutely. Your data is fully encrypted and completely private. We never share your information with anyone.",
  },
  {
    q: "Is MockAI free to use?",
    a: "Yes! MockAI is free to use. Sign up and start practicing your interviews right away with no credit card required.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "restart none none reset",
          },
        }
      );
    });
  }, []);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">

        <div className="section-header" ref={headerRef}>
          <p className="section-label">FAQ</p>
          <h2 className="section-title">
            Frequently Asked <br />
            <span className="hero-gradient">Questions</span>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => (
            <div
              className={`faq-card ${openIndex === i ? "faq-card-open" : ""}`}
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={() => toggle(i)}
            >
              <div className="faq-question">
                <span>{item.q}</span>
                <span className="faq-icon">
                  {openIndex === i ? "−" : "+"}
                </span>
              </div>
              {openIndex === i && (
                <p className="faq-answer">{item.a}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;