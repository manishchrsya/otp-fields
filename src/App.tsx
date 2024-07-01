import { Fragment, useState } from "react";

import { Password } from "./components";

import "./App.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSubmit = (otp: string) => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <div className="mobile-wrapper">
        {!isLoggedIn ? (
          <Fragment>
            <h1>Login with Phone</h1>
            <h3>Enter Otp here</h3>
            <Password length={4} handleSubmit={handleSubmit} />
          </Fragment>
        ) : (
          <Fragment>
            <h1>Logged In Successfully</h1>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default App;
