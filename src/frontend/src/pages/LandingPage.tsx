import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, AlertCircle, Activity } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-sm font-medium">
              <Heart className="h-4 w-4 text-destructive" />
              <span>Protecting Lives, One Heartbeat at a Time</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Cardiac Sentinel
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A revolutionary wearable device that continuously monitors your heart and automatically alerts medical
              services during emergencies. Compact, portable, and designed to save lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/patient">Patient Dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link to="/control-room">Medical Control Room</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-transparent rounded-3xl blur-3xl" />
            <img
              src="/assets/generated/watch-illustration.dim_1200x800.png"
              alt="Cardiac Sentinel smartwatch"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Cardiac Sentinel Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced sensor technology combined with instant emergency response to protect heart patients 24/7
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle>Continuous Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Built-in sensors continuously track your heart's functions and detect abnormalities in real-time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle>Automatic Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  When abnormal cardiac activity is detected, alerts are automatically sent to medical services.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle>Manual SOS</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Activate emergency alerts manually with a single button press when you need immediate help.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle>Rapid Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Medical teams receive your location and emergency contacts instantly for faster treatment.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Emergency Response Process</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Detection</h3>
                <p className="text-muted-foreground">
                  The device's sensors detect abnormal cardiac activity or a heart attack, or you manually activate the
                  SOS button.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Alert Transmission</h3>
                <p className="text-muted-foreground">
                  Emergency information is immediately sent to the medical control room with your vital signs and
                  location.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Medical Dispatch</h3>
                <p className="text-muted-foreground">
                  The control room forwards your alert to the nearest hospital or primary health center for immediate
                  response.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Life-Saving Care</h3>
                <p className="text-muted-foreground">
                  Medical professionals rush to your location with full knowledge of your condition and emergency
                  contacts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-destructive/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Protect Your Heart?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of heart patients who trust Cardiac Sentinel for continuous monitoring and emergency
            protection.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link to="/patient">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
