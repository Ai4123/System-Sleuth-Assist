import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { mockSymptomCheck } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState<string>("");
  const [symptomsList, setSymptomsList] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Array<{ user: boolean; message: string }>>([
    { user: false, message: "Hello! I'm your symptom assistant. What symptoms are you experiencing today?" }
  ]);

  const handleAddSymptom = () => {
    if (currentSymptom.trim() === "") return;
    
    setSymptomsList([...symptomsList, currentSymptom.trim()]);
    setCurrentSymptom("");
  };

  const handleRemoveSymptom = (index: number) => {
    const newList = [...symptomsList];
    newList.splice(index, 1);
    setSymptomsList(newList);
  };

  const handleCheckSymptoms = async () => {
    if (symptomsList.length === 0) return;
    
    setLoading(true);
    // Simulate API call with delay
    setTimeout(() => {
      const response = mockSymptomCheck(symptomsList);
      setResults(response);
      setChatHistory([
        ...chatHistory, 
        { user: true, message: `I'm having these symptoms: ${symptomsList.join(', ')}` },
        { user: false, message: `Based on your symptoms, I've identified some possible conditions. These are not a diagnosis, and you should consult a healthcare professional.` }
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleClearSymptoms = () => {
    setSymptomsList([]);
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">AI Symptom Checker</CardTitle>
          <CardDescription>
            Enter your symptoms to get potential health insights. Remember, this is not a replacement for professional medical advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={currentSymptom}
                onChange={(e) => setCurrentSymptom(e.target.value)}
                placeholder="Enter a symptom (e.g., headache, fever)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddSymptom();
                }}
              />
              <Button onClick={handleAddSymptom}>Add</Button>
            </div>

            {symptomsList.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Your symptoms:</h3>
                <div className="flex flex-wrap gap-2">
                  {symptomsList.map((symptom, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {symptom}
                      <button
                        onClick={() => handleRemoveSymptom(index)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-2 pt-2">
              <Button 
                onClick={handleCheckSymptoms} 
                disabled={loading || symptomsList.length === 0}
                className="flex-1"
              >
                {loading ? "Analyzing..." : "Check Symptoms"}
              </Button>
              {symptomsList.length > 0 && (
                <Button variant="outline" onClick={handleClearSymptoms}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Analysis Results</CardTitle>
            <CardDescription>
              Based on the symptoms you provided, here are some possible conditions:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.possibleConditions.map((condition: any, index: number) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{condition.name}</h3>
                      <p className="text-gray-600 text-sm">{condition.description}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      condition.probability > 0.7 ? "text-red-500" : 
                      condition.probability > 0.4 ? "text-yellow-500" : "text-green-500"
                    }`}>
                      {Math.round(condition.probability * 100)}% match
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <h4 className="font-medium text-blue-800">Important Notice</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      This is not a diagnosis. Always consult with a healthcare professional for proper medical advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Chat with Symptom Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 h-64 overflow-y-auto p-2 border rounded-lg">
            {chatHistory.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${message.user 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex space-x-2 w-full">
            <Textarea 
              placeholder="Ask me anything about your symptoms..." 
              className="resize-none"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (symptoms.trim()) {
                    setChatHistory([
                      ...chatHistory,
                      { user: true, message: symptoms },
                      { user: false, message: "I recommend checking specific symptoms using the symptom checker above for a more accurate assessment." }
                    ]);
                    setSymptoms("");
                  }
                }
              }}
            />
            <Button 
              onClick={() => {
                if (symptoms.trim()) {
                  setChatHistory([
                    ...chatHistory,
                    { user: true, message: symptoms },
                    { user: false, message: "I recommend checking specific symptoms using the symptom checker above for a more accurate assessment." }
                  ]);
                  setSymptoms("");
                }
              }}
            >
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SymptomChecker;
