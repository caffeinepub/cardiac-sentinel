import { useGetHeartRateReadings } from '../../hooks/usePatientReadings';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity } from 'lucide-react';
import { ReadingStatus } from '../../backend';

function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleString();
}

function getStatusVariant(status: ReadingStatus): 'default' | 'secondary' | 'destructive' {
  switch (status) {
    case ReadingStatus.normal:
      return 'secondary';
    case ReadingStatus.warning:
      return 'default';
    case ReadingStatus.critical:
      return 'destructive';
  }
}

function getStatusLabel(status: ReadingStatus): string {
  switch (status) {
    case ReadingStatus.normal:
      return 'Normal';
    case ReadingStatus.warning:
      return 'Warning';
    case ReadingStatus.critical:
      return 'Critical';
  }
}

export default function ReadingsList() {
  const { identity } = useInternetIdentity();
  const { data: readings = [], isLoading } = useGetHeartRateReadings(identity?.getPrincipal());

  const sortedReadings = [...readings].sort((a, b) => Number(b.timestamp - a.timestamp)).slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Readings
        </CardTitle>
        <CardDescription>Last 10 heart rate measurements</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Loading readings...</p>
        ) : sortedReadings.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No readings yet. Start monitoring to generate readings.
          </p>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {sortedReadings.map((reading, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-lg">{reading.value.toString()} BPM</span>
                      <Badge variant={getStatusVariant(reading.status)}>{getStatusLabel(reading.status)}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatTimestamp(reading.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
