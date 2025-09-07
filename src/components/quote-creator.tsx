"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

export function QuoteCreator() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createdQuote, setCreatedQuote] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    quote?: string;
    author?: string;
  }>({});

  const validateForm = () => {
    const errors: { quote?: string; author?: string } = {};

    if (quote.trim().length < 5) {
      errors.quote = "Quote must be at least 5 characters long";
    } else if (quote.trim().length > 500) {
      errors.quote = "Quote must be no more than 500 characters long";
    }

    if (author.trim().length < 5) {
      errors.author = "Author name must be at least 5 characters long";
    } else if (author.trim().length > 100) {
      errors.author = "Author name must be no more than 100 characters long";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createQuote = async () => {
    if (!validateForm()) return;

    setIsCreating(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/quotes/", {
        quote: quote.trim(),
        author: author.trim(),
      });

      const quoteData = response.data.data[0];
      const formattedQuote = `${quoteData.quote} - ${quoteData.author}`;
      setCreatedQuote(formattedQuote);
      setQuote("");
      setAuthor("");
      setValidationErrors({});
    } catch (err) {
      console.error("Error creating quote:", err);
      setError("Failed to create quote. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="bg-blue-600 rounded-xl p-8 text-white shadow-2xl"
        style={{ backgroundColor: "#2563eb" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Create Quote</h1>
          <p className="text-blue-50 text-lg">
            Share your wisdom and inspire others with your own quote.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="bg-white rounded-md p-6">
            <label
              htmlFor="quote"
              className="block text-gray-700 font-semibold mb-2"
            >
              Quote
            </label>
            <Textarea
              id="quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Enter your inspirational quote here..."
              className="w-full min-h-[100px] text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {validationErrors.quote && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.quote}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {quote.length}/500 characters
            </p>
          </div>

          <div className="bg-white rounded-md p-6">
            <label
              htmlFor="author"
              className="block text-gray-700 font-semibold mb-2"
            >
              Author
            </label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter the author's name..."
              className="w-full text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {validationErrors.author && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.author}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {author.length}/100 characters
            </p>
          </div>

          {error && (
            <div className="bg-white rounded-md p-6 text-red-600">
              <p>{error}</p>
            </div>
          )}

          {createdQuote && (
            <div className="bg-white rounded-md p-6 text-gray-800">
              <h3 className="font-semibold mb-2 text-green-600">
                Quote Created Successfully!
              </h3>
              <p className="text-lg leading-relaxed italic">
                &quot;{createdQuote.split(" - ")[0]}{" "}
                <span className="text-gray-500">
                  - {createdQuote.split(" - ")[1]}
                </span>
                &quot;
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button
            onClick={createQuote}
            disabled={isCreating || !quote.trim() || !author.trim()}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-sm text-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
          <p className="text-blue-50 text-sm mt-3">
            Fill in both fields to create your quote!
          </p>
        </div>
      </div>
    </div>
  );
}
