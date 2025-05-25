import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleQuestions = [
    "How has the labor shortage impacted Alberta between 2020 and 2024?",
    "What are the main barriers to recruitment?",
    "How many businesses reported hiring challenges?"
  ];

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("https://alberta11.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Your voice for <span className="text-blue-600">business growth</span></h1>
      <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
        AI-powered insights that shape Alberta's business policies and help remove barriers to growth
      </p>

      <div className="flex justify-center gap-2 max-w-xl mx-auto">
        <Input
          className="flex-1"
          placeholder="Ask me anything about Alberta's business landscape..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handleAsk} disabled={loading}>{loading ? "Asking..." : "Ask"}</Button>
      </div>

      <div className="mt-4 flex justify-center flex-wrap gap-2">
        {exampleQuestions.map((q, i) => (
          <Button
            key={i}
            variant="outline"
            onClick={() => setQuestion(q)}
          >{q}</Button>
        ))}
      </div>

      {answer && (
        <Card className="mt-8 max-w-xl mx-auto text-left">
          <CardContent className="p-4">
            <p className="whitespace-pre-line text-gray-800">{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
