"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("studyDates") || "[]");
    setDates(data.reverse());
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Study History</h1>

      {dates.length === 0 && <p>No study records yet</p>}

      {dates.map((date, index) => (
        <p key={index}>{date}</p>
      ))}
    </main>
  );
}