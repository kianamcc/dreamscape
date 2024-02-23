import "./styles.scss";

const Benefits = () => {
  return (
    <section id="benefits">
      <div className="benefits-container">
        <h1 className="benefits-title">Why Dreamscape?</h1>
        <div className="benefits-items-container">
          <div className="benefit">
            <h3 className="benefit-title">Self-Exploration and Insight</h3>
            <p className="benefit-description">
              Gain greater self-awareness and understand your thoughts,
              emotions, and experiences through Dreamscape.
            </p>
          </div>
          <div className="benefit">
            <h3 className="benefit-title">Lucid Dreaming</h3>
            <p className="benefit-description">
              Supports the practice of lucid dreaming.
            </p>
          </div>
          <div className="benefit">
            <h3 className="benefit-title">Therapeutic Tool</h3>
            <p className="benefit-description">
              Provides a safe space to process emotions and experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
