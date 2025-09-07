"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState<
    string | { quote: string; author: string }
  >("Let's generate some quotes...");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateQuote = async () => {
    setIsGenerating(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:3001/quotes/random");
      const quoteData = response.data.data;
      setCurrentQuote({ quote: quoteData.quote, author: quoteData.author });
    } catch (err) {
      console.error("Error fetching quote:", err);
      setError("Failed to generate quote. Please try again.");
      setCurrentQuote("Let's generate some quotes...");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="rounded-xl p-8 text-white shadow-2xl"
        style={{ backgroundColor: "#2563eb" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Quote Generator
          </h1>
          <p className="text-blue-50 text-lg">
            We hope we generate a quote that would make your day better.
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-md p-6 text-gray-800 min-h-[120px] flex items-center">
            <p className="text-lg leading-relaxed w-full">
              {isGenerating ? (
                <span className="text-gray-500 animate-pulse">
                  Generating a new quote...
                </span>
              ) : error ? (
                <span className="text-red-500">{error}</span>
              ) : typeof currentQuote === "string" ? (
                currentQuote
              ) : (
                <>
                  <span className="text-gray-800">{currentQuote.quote}</span>
                  <span className="text-gray-500">
                    {" "}
                    - {currentQuote.author}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={generateQuote}
            disabled={isGenerating}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-sm text-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
          <p className="text-blue-50 text-sm mt-3">
            Click this button to generate a new quote!
          </p>
        </div>
      </div>
    </div>
  );
}
