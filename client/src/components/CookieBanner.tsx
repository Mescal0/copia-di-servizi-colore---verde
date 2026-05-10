import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "cookiebanner_accepted";

export default function CookieBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const el = bannerRef.current;
    if (!el) return;

    let pos = 0;
    let timerId: ReturnType<typeof setTimeout>;

    function animate() {
      const h = el!.offsetHeight;
      el!.style.bottom = pos - h + "px";
      pos += 4;
      if (pos < h) {
        timerId = setTimeout(animate, 1);
      } else {
        pos = 0;
        el!.style.bottom = "0px";
      }
    }

    timerId = setTimeout(animate, 50);
    return () => clearTimeout(timerId);
  }, [show]);

  function hideBanner() {
    const el = bannerRef.current;
    if (el) el.style.display = "none";
    localStorage.setItem(STORAGE_KEY, "true");
  }

  if (!show) return null;

  return (
    <div id="cookiebanner" ref={bannerRef}>
      <div id="c-left">
        <p className="c-header">Utilizziamo i cookie</p>
        <p className="c-message">
          Questo sito utilizza cookie per migliorare la tua esperienza di navigazione e per finalità statistiche anonime. Continuando a navigare acconsenti all'uso dei cookie.{" "}
          <a href="/privacy-policy">Scopri di più</a>
        </p>
      </div>
      <div id="c-right">
        <a
          href="#"
          className="c-button"
          onClick={(e) => {
            e.preventDefault();
            hideBanner();
          }}
        >
          Accetta
        </a>
      </div>
    </div>
  );
}
