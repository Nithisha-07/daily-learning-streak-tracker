"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [streak, setStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [lastDate, setLastDate] = useState("");
function calculateStreak(dates: string[]) {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let streak = 1;

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i]);
    const previous = new Date(sorted[i + 1]);

    const diff =
      (current.getTime() - previous.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("studyDates") || "[]");

    setTotalDays(data.length);
    setLastDate(data[data.length - 1] || "");

    setStreak(calculateStreak(data));
  }, []);

  const markStudy = () => {
    const today = new Date().toISOString().split("T")[0];

    let dates = JSON.parse(localStorage.getItem("studyDates") || "[]");

    if (dates.includes(today)) {
      alert("You already marked today!");
      return;
    }

    dates.push(today);

    localStorage.setItem("studyDates", JSON.stringify(dates));

    setTotalDays(dates.length);
    setLastDate(today);
    setStreak(calculateStreak(dates));
  };

  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Daily Learning Streak Tracker</h1>
      <p style={{ color: "gray", marginBottom: "20px" }}>
Track your daily learning progress
</p>

      <h2>Current Streak: {streak} days</h2>
      <h3>Total Study Days: {totalDays}</h3>
      <h4>Last Studied: {lastDate || "No study yet"}</h4>

    <button
  onClick={markStudy}
  style={{
    padding: "12px 25px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    marginTop: "20px",
    cursor: "pointer"
  }}
>
  I Studied Today
</button>
      <a href="/history">
  <button
    style={{
      padding: "10px 20px",
      marginTop: "15px",
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "15px",
      cursor: "pointer"
    }}
  >
    View Study History
  </button>
</a>
    </main>
  );
}