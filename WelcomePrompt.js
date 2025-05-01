import React, { useEffect, useRef, useState } from "react";

// Sparkle particle component
function Sparkle({ x, y, size, duration, delay }) {
  const style = {
    position: "absolute",
    left: `${x}%`,
    top: `${y}%`,
    width: size,
    height: size,
    background: "radial-gradient(circle, #fff 60%, #ff69b4 100%)",
    borderRadius: "50%",
    opacity: 0.95,
    pointerEvents: "none",
    boxShadow: "0 0 16px 8px #ff69b4, 0 0 32px 16px #fff, 0 0 8px 4px #fff5",
    filter: "blur(0.5px)",
    animation: `sparkle-fall ${duration}ms linear ${delay}ms forwards, sparkle-twinkle 1.2s infinite alternate`,
    zIndex: 9999
  };
  return <div style={style} />;
}

// Main welcome prompt component
export default function WelcomePrompt({ onFinish }) {
  const [show, setShow] = useState(true);
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    // Remove after 7 seconds
    const timeout = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, 7000);
    // Generate sparkles every 100ms
    let sparkleInterval = setInterval(() => {
      setSparkles(sparkles => [
        ...sparkles,
        {
          x: Math.random() * 90 + 5,
          y: -5,
          size: `${Math.random() * 14 + 16}px`, // bigger sparkles
          duration: Math.random() * 1200 + 1600,
          delay: 0,
          key: Math.random().toString(36).slice(2)
        }
      ]);
    }, 100);
    // Remove sparkles after they fall
    let cleanup = setInterval(() => {
      setSparkles(sparkles => sparkles.filter(s => s.y < 100));
    }, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(sparkleInterval);
      clearInterval(cleanup);
    };
  }, [onFinish]);

  // Animate sparkles falling
  useEffect(() => {
    if (!show) return;
    const anim = setInterval(() => {
      setSparkles(sparkles =>
        sparkles.map(s => ({ ...s, y: s.y + Math.random() * 3 + 1 }))
      );
    }, 40);
    return () => clearInterval(anim);
  }, [show]);

  if (!show) return null;

  return (
    <div ref={containerRef} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(255,255,255,0.85)",
      zIndex: 9998,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      pointerEvents: "none"
    }}>
      <div style={{
        marginTop: 64,
        fontSize: "2.2rem",
        fontWeight: 700,
        color: "#e11d48",
        textShadow: "2px 2px 10px #fff, 0 4px 24px #eab1c8",
        letterSpacing: 2,
        textAlign: "center",
        pointerEvents: "auto",
        padding: "24px 16px 12px 16px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.97)",
        boxShadow: "0 6px 32px #eab1c8a6"
      }}>
        ASSALAMOALAIKUM IN HIJABEZEHRA STORE<br />
        <span style={{ fontSize: "1.2rem", fontWeight: 500, color: "#e11d48" }}>
          MAY ALLAH PAK PROTECT YOU AMEEN
        </span>
      </div>
      {sparkles.map(({ key, ...rest }) => (
        <Sparkle key={key} {...rest} />
      ))}
      <style>{`
        @keyframes sparkle-fall {
          0% { opacity: 0.95; }
          80% { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
        @keyframes sparkle-twinkle {
          0% { filter: brightness(1.1) drop-shadow(0 0 8px #fff); opacity: 0.9; }
          50% { filter: brightness(2.5) drop-shadow(0 0 24px #fff); opacity: 1; }
          100% { filter: brightness(1.1) drop-shadow(0 0 8px #fff); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}
