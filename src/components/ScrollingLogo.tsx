export function ScrollingLogo() {
  return (
    <div
      className="scrolling-logo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // or a fixed height if needed
      }}
    >
      <img
        src="/Fact_Logo.png"
        alt="FACT - Forensic Analysis Club & Triage"
        style={{ width: "10%", height: "10%", objectFit: "contain" }}
      />
    </div>
  );
}