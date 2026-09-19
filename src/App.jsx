import { useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [transactions, setTransactions] = useState(0);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);

  const startTransaction = () => {
    setTransactions((prev) => prev + 1);

    setScreen("processing");
    setProgress(0);
    setMessage("COIN DETECTED");

    setTimeout(() => {
      setProgress(20);
      setMessage("AUTHENTICATING...");
    }, 700);

    setTimeout(() => {
      setProgress(40);
      setMessage("VERIFYING ₹1...");
    }, 1500);

    setTimeout(() => {
      setProgress(60);
      setMessage("FINANCIAL ANALYSIS...");
    }, 2400);

    setTimeout(() => {
      setProgress(80);
      setMessage("PURPOSE DETECTION...");
    }, 3300);

    setTimeout(() => {
      setProgress(100);
      setMessage("FINAL VERIFICATION...");
    }, 4300);

    setTimeout(() => {
      setScreen("result");
    }, 5200);
  };

  const connectArduino = async () => {
    try {
      if (!("serial" in navigator)) {
        alert(
          "Web Serial is not supported. Please use Chrome or Edge on desktop."
        );
        return;
      }

      const port = await navigator.serial.requestPort();

      await port.open({
        baudRate: 9600,
      });

      setConnected(true);

      const reader = port.readable.getReader();
      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value);

        const lines = buffer.split("\n");

        buffer = lines.pop();

        for (const line of lines) {
          const command = line.trim();

          console.log("Arduino:", command);

          if (command === "START") {
            startTransaction();
          }
        }
      }

      reader.releaseLock();

    } catch (error) {
      console.error("Arduino connection failed:", error);
      alert("Could not connect to Arduino.");
    }
  };

  return (
    <div className="app">

      <div className="bank">

        {/* HEADER */}

        <header>

          <div className="logo">
            🏦 USELESS <span>BANK™</span>
          </div>

          <div className="status">
            ● SYSTEM ONLINE
          </div>

          <button
            className="connect-button"
            onClick={connectArduino}
          >
            {connected
              ? "🟢 ARDUINO CONNECTED"
              : "🔌 CONNECT ARDUINO"}
          </button>

        </header>


        {/* HOME */}

        {screen === "home" && (

          <main className="screen">

            <div className="icon">
              🏦
            </div>

            <h1>
              Welcome
            </h1>

            <p className="subtitle">
              The world's most unnecessarily complicated bank.
            </p>

            <div className="warning-box">
              ⚠️ WARNING
              <br />
              This machine serves absolutely no financial purpose.
            </div>

            <button onClick={startTransaction}>
              START TEST TRANSACTION
            </button>

            <p className="instruction">
              Or press the physical START button on the ATM.
            </p>

          </main>

        )}


        {/* PROCESSING */}

        {screen === "processing" && (

          <main className="screen">

            <div className="icon">
              💳
            </div>

            <h2>
              {message}
            </h2>

            <div className="money">
              ₹1.00
            </div>

            <p className="subtitle">
              Please wait while we perform extremely
              important calculations.
            </p>

            <div className="progress">

              <div
                className="bar"
                style={{
                  width: `${progress}%`
                }}
              />

            </div>

            <p>
              {progress}%
            </p>

            <div className="fake-terminal">
              &gt; PROCESSING TRANSACTION...
              <br />
              &gt; CALCULATING ABSOLUTELY NOTHING...
              <br />
              &gt; PURPOSE = NONE
            </div>

          </main>

        )}


        {/* RESULT */}

        {screen === "result" && (

          <main className="screen">

            <div className="icon">
              😂
            </div>

            <h2 className="success">
              TRANSACTION SUCCESSFUL
            </h2>

            <p className="subtitle">
              Your extremely important financial
              transaction is complete.
            </p>


            <div className="stats">

              <div className="card">
                <small>RECEIVED</small>
                <strong>₹1</strong>
              </div>

              <div className="card">
                <small>RETURNED</small>
                <strong>₹1</strong>
              </div>

              <div className="card">
                <small>PROFIT</small>
                <strong>₹0</strong>
              </div>

              <div className="card">
                <small>PURPOSE</small>
                <strong>NONE</strong>
              </div>

            </div>


            <div className="analytics">

              <h3>
                USELESSNESS ANALYTICS
              </h3>

              <div className="analytics-grid">

                <div>
                  <span>TRANSACTIONS</span>
                  <strong>{transactions}</strong>
                </div>

                <div>
                  <span>MONEY PROCESSED</span>
                  <strong>
                    ₹{transactions}
                  </strong>
                </div>

                <div>
                  <span>MONEY CREATED</span>
                  <strong>₹0</strong>
                </div>

                <div>
                  <span>MONEY LOST</span>
                  <strong>₹0</strong>
                </div>

                <div>
                  <span>TIME WASTED</span>
                  <strong>5.2s</strong>
                </div>

                <div>
                  <span>ACTUAL PURPOSE</span>
                  <strong>NONE</strong>
                </div>

              </div>

            </div>


            <p className="warning">
              ⚠ USELESSNESS SCORE: 99.99%
            </p>

            <button
              onClick={() => setScreen("home")}
            >
              DO IT AGAIN 🤦
            </button>

          </main>

        )}


        <footer>
          USELESS BANK™ • Securely processing absolutely nothing
        </footer>

      </div>

    </div>
  );
}

export default App;