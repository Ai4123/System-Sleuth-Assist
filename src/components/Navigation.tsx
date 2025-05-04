import { Home, Activity, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    {
      id: "symptom-checker",
      label: "Symptom Checker",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      id: "bmi-calculator",
      label: "BMI Calculator",
      icon: <Activity className="mr-2 h-4 w-4" />,
    },
    {
      id: "health-articles",
      label: "Health Articles",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-lg font-medium mb-4 text-gray-800">Navigation</h2>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTabChange(item.id)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
