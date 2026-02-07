import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Droplets,
  Thermometer,
  Gauge,
  AlertTriangle,
  Zap,
  Leaf,
  Flower,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';
import { SensorCard } from '@/components/dashboard/sensor-card';
import { getThingSpeakData } from '@/lib/thingspeak';
import { getDashboardInsights } from '@/lib/dashboard-insights';
import { AiRecommendationsCard } from '@/components/dashboard/ai-recommendations-card';
import { ActiveAlertsCard } from '@/components/dashboard/active-alerts-card';

export default async function Dashboard() {
  const sensorData = await getThingSpeakData();
  const insights = await getDashboardInsights();

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
        <div className="lg:col-span-3 xl:col-span-4">
          <h1 className="text-3xl font-semibold text-foreground">
            Welcome to GrowMate
          </h1>
          <p className="text-muted-foreground mt-1">
            Here is an overview of your farm's current status.
          </p>
        </div>

        <SensorCard
          title="Temperature"
          value={`${sensorData.temperature}°C`}
          icon={<Thermometer className="size-6 text-primary" />}
          description="Ideal for crop growth"
        />
        <SensorCard
          title="Humidity"
          value={`${sensorData.humidity}%`}
          icon={<Gauge className="size-6 text-primary" />}
          description="Optimal humidity level"
        />
        <SensorCard
          title="Soil Moisture"
          value={`${sensorData.soil_moisture}%`}
          icon={<Droplets className="size-6 text-primary" />}
          description="Optimal moisture level"
        />
        <SensorCard
          title="Nitrogen (N)"
          value={`${sensorData.nitrogen} ppm`}
          icon={<Leaf className="size-6 text-primary" />}
          description="Healthy nitrogen levels"
        />
        <SensorCard
          title="Phosphorus (P)"
          value={`${sensorData.phosphorus} ppm`}
          icon={<Flower className="size-6 text-primary" />}
          description="Good for root development"
        />
        <SensorCard
          title="Potassium (K)"
          value={`${sensorData.potassium} ppm`}
          icon={<ShieldCheck className="size-6 text-primary" />}
          description="Supports overall plant health"
        />

        <div className="lg:col-span-3 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AiRecommendationsCard recommendations={insights.recommendations} />
            <ActiveAlertsCard alerts={insights.alerts} />
        </div>
      </main>
    </div>
  );
}
