'use client';
import ReCaptcha from 'react-google-recaptcha';
import * as React from 'react';

const recapcha_key = process.env.NEXT_PUBLIC_RECAPCHA_KEY || '';

function ContactForm() {
  const recaptcha = React.useRef<any | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const id = React.useId();
  const [status, setStatus] = React.useState<string>('idle');
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>('something went wrong, try again later');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const recaptchaValue = recaptcha?.current?.getValue();
    if (!recaptchaValue) {
      setStatus('error');
      setErrorMessage('Please verify the recaptcha');
      window.setTimeout(() => {
        setStatus('idle');
      }, 3000);
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      setStatus('loading');
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        const message = await response.text();
        console.log(message);
      }
    } catch (e) {
      setStatus('error');
    }
  }

  return (
    <div id={'contact'} className="form-container">
      <form
        onChange={() => {
          setShowCaptcha(formRef.current?.checkValidity() || false);
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="form-2col">
          <div className="form-input">
            <label htmlFor={`first-name-${id}`}>First Name</label>
            <input
              name="firstName"
              minLength={2}
              maxLength={30}
              pattern="[A-Za-z]+"
              required
              id={`first-name-${id}`}
              placeholder="John"
            />
          </div>
          <div className="form-input">
            <label htmlFor={`last-name-${id}`}>Last Name</label>
            <input
              name="lastName"
              minLength={2}
              maxLength={30}
              pattern="^(?!\s*$)[A-Za-z ]+$"
              required
              id={`last-name-${id}`}
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="form-input">
          <label htmlFor={`email-${id}`}>Email</label>
          <input
            name="email"
            maxLength={100}
            type="email"
            required
            id={`email-${id}`}
            placeholder="John1996@gmail.com"
          />
        </div>
        <div className="form-input">
          <label htmlFor={`message-${id}`}>Message</label>
          <textarea
            style={{ resize: 'none', minHeight: 117 }}
            name="message"
            placeholder="Your message here..."
            minLength={2}
            maxLength={500}
            required
            id={`email-${id}`}
          />
        </div>
        <button className="button-primary" type="submit">
          {status == 'idle' ? (
            'SEND MESSAGE'
          ) : status == 'loading' ? (
            <Spinner />
          ) : status == 'success' ? (
            'Sent !'
          ) : (
            errorMessage
          )}
        </button>
        <ReCaptcha style={{ display: showCaptcha ? 'block' : 'none' }} ref={recaptcha} sitekey={recapcha_key} />
      </form>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      style={{ color: 'var(--font-color)', margin: '0 auto' }}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <circle cx="4" cy="12" r="3" fill="currentColor">
        <animate
          id="svgSpinners3DotsBounce0"
          attributeName="cy"
          begin="0;svgSpinners3DotsBounce1.end+0.25s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="currentColor">
        <animate
          attributeName="cy"
          begin="svgSpinners3DotsBounce0.begin+0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="20" cy="12" r="3" fill="currentColor">
        <animate
          id="svgSpinners3DotsBounce1"
          attributeName="cy"
          begin="svgSpinners3DotsBounce0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
    </svg>
  );
}

export default ContactForm;
