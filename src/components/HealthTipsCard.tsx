import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { healthTips, motivationalQuotes } from "@/lib/mockData";

const HealthTipsCard = () => {
  const [currentItem, setCurrentItem] = useState<{ text: string; source?: string }>(healthTips[0]);
  const [showingTip, setShowingTip] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (showingTip) {
        // Get random quote
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setCurrentItem(randomQuote);
      } else {
        // Get random tip
        const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
        setCurrentItem(randomTip);
      }
      setShowingTip(!showingTip);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [showingTip]);

  const getNewItem = () => {
    if (showingTip) {
      // Get random tip
      const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
      setCurrentItem(randomTip);
    } else {
      // Get random quote
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setCurrentItem(randomQuote);
    }
    setShowingTip(!showingTip);
  };

  return (
    <Card className="border-blue-100 bg-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{showingTip ? "Health Tip" : "Daily Motivation"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700 italic">{currentItem.text}</p>
          {currentItem.source && (
            <p className="text-right text-sm text-gray-500">— {currentItem.source}</p>
          )}
          <Button
            variant="outline"
            size="sm" 
            className="w-full"
            onClick={getNewItem}
          >
            {showingTip ? "Show Motivation Quote" : "Show Health Tip"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTipsCard;
