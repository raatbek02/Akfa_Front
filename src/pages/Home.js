import React from "react";
import Main from "../components/Main/Main";

function Home() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Main />
    </div>
  );
}

export default Home;
