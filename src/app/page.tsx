'use client';

export default function Home() {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(to right, #0b2f22, #0a7d52);
          color: white;
          width: 100%;
          height: 100%;
        }

        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          text-align: center;
          background: linear-gradient(to right, #0b2f22, #0a7d52);
        }

        .landing-box {
          max-width: 900px;
          width: 100%;
        }

        .quote {
          font-family: "Courier New", monospace;
          font-size: 20px;
          letter-spacing: 2px;
          color: #00ff7f;
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        .welcome {
          font-size: 22px;
          letter-spacing: 5px;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .landing-img {
          width: 280px;
          max-width: 80%;
          margin: 15px auto;
          display: block;
          border-radius: 15px;
          box-shadow: 0px 0px 20px rgba(0, 255, 120, 0.4);
        }

        .title {
          font-size: 80px;
          font-weight: bold;
          margin: 25px 0px 10px;
          color: white;
          text-transform: uppercase;
        }

        .tagline {
          font-size: 20px;
          margin-bottom: 15px;
          opacity: 0.9;
        }

        .quote2 {
          font-family: "Courier New", monospace;
          font-size: 18px;
          color: #00ff7f;
          margin-bottom: 35px;
        }

        .btn-box {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 15px 35px;
          font-size: 18px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: #00c853;
          color: white;
          box-shadow: 0px 0px 15px rgba(0, 255, 120, 0.4);
        }

        .btn-primary:hover {
          background: #00ff7f;
          transform: scale(1.05);
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid #00ff7f;
          color: #00ff7f;
        }

        .btn-secondary:hover {
          background: #00ff7f;
          color: black;
          transform: scale(1.05);
        }

        .footer-text {
          margin-top: 40px;
          font-size: 14px;
          opacity: 0.7;
          letter-spacing: 2px;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 48px;
          }
          .quote {
            font-size: 16px;
          }
          .btn {
            padding: 12px 25px;
            font-size: 16px;
          }
        }
      `}</style>

      <div className="container">
        <div className="landing-box">
          <div className="quote">THE GREATEST TREASURES ARE THOSE INVISIBLE TO THE EYE BUT FOUND BY THE HEART.</div>
          <div className="welcome">WELCOME TO</div>
          <div className="title">SOFTREASURE</div>
          <div className="tagline">We build smart software solutions for the future.</div>
          <div className="quote2">"The greatest treasures are those invisible to the eye but found by the heart."</div>
          <div className="btn-box">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Contact Us</button>
          </div>
          <div className="footer-text">INNOVATE • BUILD • INSPIRE</div>
        </div>
      </div>
    </>
  );
}