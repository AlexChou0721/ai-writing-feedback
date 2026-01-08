import { useState } from "react";

export default function App() {
  const [mode, setMode] = useState("Academic");
  const [essay, setEssay] = useState("");
  const [result, setResult] = useState(null);

  function handleDemo() {
    // 先用 Demo 数据模拟 AI 返回，后面再接后端
    setResult({
      issues: [
        {
          original: "I very like learning English.",
          problem: "‘very like’ is unnatural in English.",
          suggestion: "I really enjoy learning English."
        },
        {
          original: "With the development of society, people are more busy.",
          problem: "This opening is common but vague and not specific.",
          suggestion: "In recent years, many people have become busier due to longer working hours."
        }
      ],
      revised_paragraph:
        "I really enjoy learning English. In recent years, many people have become busier due to longer working hours, which makes it harder to find time for language practice.",
      teaching_notes: [
        "Use ‘really enjoy’ instead of ‘very like’.",
        "Avoid vague openings like ‘with the development of society’. Try to be specific.",
        "When revising, keep the original meaning but make the sentence more natural."
      ]
    });
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h1 style={{ marginBottom: 8 }}>AI Writing Feedback Assistant</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Teacher-oriented feedback: unnatural expressions, suggested revisions, and teaching notes.
      </p>

      <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
        Writing mode
      </label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", marginBottom: 16 }}
      >
        <option>Academic</option>
        <option>IELTS Task 2</option>
        <option>General</option>
      </select>

      <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
        Paste student writing
      </label>
      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        rows={10}
        placeholder="Paste an English paragraph here..."
        style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ccc" }}
      />

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button
          onClick={handleDemo}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", background: "#111", color: "#fff", cursor: "pointer" }}
        >
          Generate feedback (Demo)
        </button>

        <button
          onClick={() => { setEssay(""); setResult(null); }}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}
        >
          Clear
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
          <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 14 }}>
            <h2 style={{ marginTop: 0 }}>1) Unnatural expressions</h2>
            <ol>
              {result.issues.map((it, idx) => (
                <li key={idx} style={{ marginBottom: 10 }}>
                  <div><b>Original:</b> {it.original}</div>
                  <div><b>Problem:</b> {it.problem}</div>
                  <div><b>Suggestion:</b> {it.suggestion}</div>
                </li>
              ))}
            </ol>
          </section>

          <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 14 }}>
            <h2 style={{ marginTop: 0 }}>2) Improved version (example)</h2>
            <p style={{ marginBottom: 0 }}>{result.revised_paragraph}</p>
          </section>

          <section style={{ padding: 16, border: "1px solid #eee", borderRadius: 14 }}>
            <h2 style={{ marginTop: 0 }}>3) Teaching notes</h2>
            <ul>
              {result.teaching_notes.map((n, idx) => (
                <li key={idx}>{n}</li>
              ))}
            </ul>
          </section>

          <p style={{ color: "#666" }}>
            This tool is designed to support learning and reflection. It does not replace teachers or standardized assessment.
          </p>
        </div>
      )}
    </div>
  );
}
