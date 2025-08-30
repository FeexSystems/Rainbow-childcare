import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": any;
    }
  }
}

export default function ElevenLabsWidget() {
  useEffect(() => {
    if (!document.querySelector('script[data-elevenlabs-convai]')) {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      s.async = true;
      s.type = "text/javascript";
      s.setAttribute("data-elevenlabs-convai", "1");
      document.body.appendChild(s);
    }
  }, []);

  return (
    // This renders the floating widget (bottom-right by default)
    // as specified in the embed code provided.
    // eslint-disable-next-line react/no-unknown-property
    <elevenlabs-convai agent-id="agent_01k04qrrj8f9sar6j3q1rjmsbb"></elevenlabs-convai>
  );
}
