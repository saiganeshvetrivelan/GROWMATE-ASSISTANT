import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';
  import { Badge } from '@/components/ui/badge';
  
  type Alert = {
    severity: string;
    message: string;
  };
  
  const severityIcon: { [key: string]: React.ReactNode } = {
    High: <ShieldAlert className="size-4 text-destructive" />,
    Medium: <AlertTriangle className="size-4 text-yellow-500" />,
    Low: <Info className="size-4 text-blue-500" />,
  };
  
  const severityVariant: { [key: string]: 'destructive' | 'secondary' | 'outline' } = {
    High: 'destructive',
    Medium: 'secondary',
    Low: 'outline',
  };
  
  export function ActiveAlertsCard({ alerts }: { alerts: Alert[] }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active alerts.</p>
          ) : (
            <ul className="space-y-3">
              {alerts.map((alert, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1">
                    {severityIcon[alert.severity] || <Info className="size-4" />}
                  </div>
                  <div className='flex-1'>
                    <p className="font-medium leading-tight">{alert.message}</p>
                    <Badge variant={severityVariant[alert.severity] || 'default'} className='mt-1'>
                      {alert.severity}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    );
  }
  