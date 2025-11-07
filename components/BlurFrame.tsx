export default function BlurFrame({ blurAmount = "2xl", children }) {
  const blurMap = {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "32px",
  };

  return (
    <div
      className={`pointer-events-none absolute z-10 inset-0 overflow-hidden`}
    >
      {children}
      <div
        className="size-full"
        style={{
          boxShadow: `inset 0 0 ${blurMap[blurAmount]} ${blurMap[blurAmount]} rgba(0,0,0,1)`,
        }}
      />
    </div>
  );
}
