import { links } from "@/lib/config";

export default function Contact() {
  return (
    <section id="advertise" className="advertise-section">
      <div className="advertise-panel">
        <div>
          <span>Advertise</span>
          <h2>Advertise with WebRiseHub</h2>
          <p>
            Put your brand inside interactive experiences people actually enjoy.
            Sponsor a game, launch a branded challenge, or build a custom playable campaign.
          </p>
        </div>

        <a
          href={links.bookCall}
          className="advertise-cta"
          target="_blank"
          rel="noreferrer"
        >
          Book a Brand Call
        </a>
      </div>
    </section>
  );
}
