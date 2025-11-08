"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
        <div
          className="h-full bg-primary"
          style={{
            animation: "progress 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "spin 1s linear infinite",
          }}
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="3"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="126"
            strokeDashoffset="95"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
