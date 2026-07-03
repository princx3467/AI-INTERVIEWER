const logos = [
  { name: "Google", src: "google.svg" },
  { name: "Apple", src: "apple_dark.svg" },
  { name: "Microsoft", src: "microsoft.svg" },
  { name: "Netflix", src: "netflix-icon.svg" },
];

const TrustedBy = () => {
  return (
    <section className="trusted-by">
      <div className="container">

        <p className="trusted-label">
          Students got hired at
        </p>

        <div className="trusted-logos">
          {logos.map((logo) => (
            <div className="logo-item" key={logo.name}>
              <img src={logo.src} alt={logo.name} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustedBy;