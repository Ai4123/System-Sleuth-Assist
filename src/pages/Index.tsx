
import { useState } from "react";
import SymptomChecker from "@/components/SymptomChecker";
import BMICalculator from "@/components/BMICalculator";
import HealthArticles from "@/components/HealthArticles";
import Navigation from "@/components/Navigation";
import HealthTipsCard from "@/components/HealthTipsCard";
import Header from "@/components/Header";

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("symptom-checker");

  const renderContent = () => {
    switch (activeTab) {
      case "symptom-checker":
        return <SymptomChecker />;
      case "bmi-calculator":
        return <BMICalculator />;
      case "health-articles":
        return <HealthArticles />;
      default:
        return <SymptomChecker />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            <HealthTipsCard />
          </div>
          <div className="lg:col-span-9">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
