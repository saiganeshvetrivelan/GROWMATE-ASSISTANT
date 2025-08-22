import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Droplets,
  Thermometer,
  Gauge,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import { SensorCard } from '@/components/dashboard/sensor-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IrrigationCard } from '@/components/dashboard/irrigation-card';

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      <Header title="Dashboard" />
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
          title="Soil Moisture"
          value="45%"
          icon={<Droplets className="size-6 text-primary" />}
          description="Optimal moisture level"
        />
        <SensorCard
          title="Temperature"
          value="24°C"
          icon={<Thermometer className="size-6 text-primary" />}
          description="Ideal for crop growth"
        />
        <SensorCard
          title="Humidity"
          value="68%"
          icon={<Gauge className="size-6 text-primary" />}
          description="Slightly high, monitor for fungus"
        />

        <IrrigationCard fieldId="field-001" />

        <Card className="lg:col-span-3 xl:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" />
              Anomaly Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <Zap className="h-4 w-4" />
              <AlertTitle>High Severity: Low Moisture Detected</AlertTitle>
              <AlertDescription>
                Field B2 soil moisture dropped to 20% at 08:15 AM. Immediate
                action required.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Medium Severity: Unexpected Temperature Drop</AlertTitle>
              <AlertDescription>
                Greenhouse 3 temperature dropped by 5°C at 02:30 AM. Check
                heating system.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
