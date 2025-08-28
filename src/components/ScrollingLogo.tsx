export function ScrollingLogo() {
  return (
    <div
      className="scrolling-logo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100%",
        marginTop: "-2rem"
      }}
    >
      <img
        src="/new_home_logo.png"
        alt="FACT - Forensic Analysis Club & Triage Home Logo"
        style={{ width: "50%", height: "50%", objectFit: "contain" }}
      />
    </div>
  );
}