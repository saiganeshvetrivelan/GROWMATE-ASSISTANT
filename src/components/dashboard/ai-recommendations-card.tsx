import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { Lightbulb } from 'lucide-react';
  
  export function AiRecommendationsCard({
    recommendations,
  }: {
    recommendations: string[];
  }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="size-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No recommendations available at the moment.
            </p>
          )}
        </CardContent>
      </Card>
    );
  }
  