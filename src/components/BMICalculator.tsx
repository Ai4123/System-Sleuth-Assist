import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BMICalculator = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    message: string;
  } | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", message: "You may need to gain some weight. Consult with a healthcare professional for advice." };
    if (bmi < 24.9) return { category: "Normal weight", message: "Your BMI is within a healthy range. Keep up the good work!" };
    if (bmi < 29.9) return { category: "Overweight", message: "You may benefit from losing some weight. Consider healthy diet and exercise." };
    return { category: "Obesity", message: "It's advisable to lose weight for health benefits. Please consult with a healthcare professional." };
  };

  const calculateBMI = () => {
    if (!height || !weight) return;

    let bmiValue: number;

    if (unit === "metric") {
      // Height in cm, weight in kg
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      // Height in inches, weight in lbs
      bmiValue = (parseFloat(weight) * 703) / (parseFloat(height) * parseFloat(height));
    }

    // Round to 1 decimal place
    bmiValue = Math.round(bmiValue * 10) / 10;

    const { category, message } = getBMICategory(bmiValue);
    setResult({ bmi: bmiValue, category, message });
  };

  const handleReset = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">BMI Calculator</CardTitle>
        <CardDescription>
          Calculate your Body Mass Index to assess your weight relative to your height.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={unit} onValueChange={(value) => setUnit(value as "metric" | "imperial")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metric">Metric</TabsTrigger>
            <TabsTrigger value="imperial">Imperial</TabsTrigger>
          </TabsList>

          <TabsContent value="metric" className="space-y-4">
            <div>
              <label htmlFor="height-metric" className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <Input
                id="height-metric"
                type="number"
                placeholder="e.g., 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="weight-metric" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <Input
                id="weight-metric"
                type="number"
                placeholder="e.g., 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="imperial" className="space-y-4">
            <div>
              <label htmlFor="height-imperial" className="block text-sm font-medium text-gray-700 mb-1">
                Height (inches)
              </label>
              <Input
                id="height-imperial"
                type="number"
                placeholder="e.g., 67"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="weight-imperial" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (lbs)
              </label>
              <Input
                id="weight-imperial"
                type="number"
                placeholder="e.g., 154"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-2 mt-6">
          <Button onClick={calculateBMI} className="flex-1">Calculate BMI</Button>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
        </div>
      </CardContent>

      {result && (
        <CardFooter className="flex flex-col border-t pt-6">
          <div className="w-full bg-gray-50 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold mb-1">Your BMI: {result.bmi}</h3>
            <div className={`text-lg font-bold mb-2 ${
              result.category === "Normal weight"
                ? "text-green-600"
                : result.category === "Underweight"
                ? "text-yellow-600"
                : "text-red-600"
            }`}>
              {result.category}
            </div>
            <p className="text-gray-700">{result.message}</p>
          </div>

          <div className="mt-4 w-full">
            <div className="h-2 bg-gray-200 rounded-full w-full relative">
              <div className="absolute inset-y-0 left-0 transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.min(result.bmi * 2.5, 100)}%`,
                  backgroundColor:
                    result.category === "Normal weight"
                      ? "#10B981"
                      : result.category === "Underweight"
                      ? "#F59E0B"
                      : "#EF4444",
                }}
              />
              <div
                className="w-3 h-3 bg-white border-2 rounded-full absolute top-1/2 transform -translate-y-1/2 transition-all duration-300"
                style={{
                  left: `${Math.min(result.bmi * 2.5, 100)}%`,
                  borderColor:
                    result.category === "Normal weight"
                      ? "#10B981"
                      : result.category === "Underweight"
                      ? "#F59E0B"
                      : "#EF4444",
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40</span>
            </div>
          </div>

          <div className="w-full mt-4 text-sm">
            <p className="text-gray-600 mb-1">BMI Categories:</p>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                <span>Underweight: &lt; 18.5</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Normal: 18.5 - 24.9</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                <span>Overweight: 25 - 29.9</span>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                <span>Obesity: &gt; 30</span>
              </li>
            </ul>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default BMICalculator;
