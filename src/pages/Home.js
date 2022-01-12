import React from "react";
import Main from "../components/Main/Main";

function Home() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ background: "#FAFAF2" }}>
      <Main />
    </div>
  );
}

export default Home;
