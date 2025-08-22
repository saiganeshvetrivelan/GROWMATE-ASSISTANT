import Image from 'next/image';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function FieldMapping() {
  return (
    <div className="flex flex-col w-full">
      <Header title="Field Mapping" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Fields</CardTitle>
            <CardDescription>
              Draw and manage the boundaries of your fields.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src="https://placehold.co/1200x675.png"
                alt="Map of fields"
                data-ai-hint="farm map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <p className="text-lg font-semibold text-foreground">
                  Interactive Map Coming Soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
