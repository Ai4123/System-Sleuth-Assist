import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { mockArticles } from "@/lib/mockData";

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  readTime: string;
}

const HealthArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    setArticles(mockArticles);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(articles.map(article => article.category)))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Health Articles</CardTitle>
          <CardDescription>
            Expert-reviewed articles on various health topics to help you stay informed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setSearchTerm("")}
                disabled={!searchTerm}
              >
                Clear
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {activeArticle ? (
        <Card>
          <div className="relative">
            {activeArticle.imageUrl && (
              <div className="h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 left-4"
              onClick={() => setActiveArticle(null)}
            >
              ← Back
            </Button>
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-blue-600 uppercase font-semibold">{activeArticle.category}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-500">{activeArticle.readTime}</span>
              </div>
              <span className="text-sm text-gray-500">{activeArticle.date}</span>
            </div>
            <CardTitle className="text-2xl">{activeArticle.title}</CardTitle>
            <p className="text-gray-500">By {activeArticle.author}</p>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-lg font-medium text-gray-700 mb-4">{activeArticle.summary}</p>
              <div dangerouslySetInnerHTML={{ __html: activeArticle.content }} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" 
                onClick={() => setActiveArticle(article)}
              >
                {article.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 uppercase font-semibold">{article.category}</span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{article.summary}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">By {article.author}</span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No articles found for your search criteria.</p>
              <Button variant="link" onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthArticles;
