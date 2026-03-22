"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, RotateCcw, MapPin } from "lucide-react";
import type { GeoInfo } from "@/types";
import { detectLocation } from "@/lib/geolocation";
import { addAgent } from "@/lib/storage";

interface RegisterFormProps {
  onRegistered: (agentId: string) => void;
}

export default function RegisterForm({ onRegistered }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [detecting, setDetecting] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    detectLocation().then((geo: GeoInfo | null) => {
      if (geo) {
        setCity(geo.city);
        setCountry(geo.country);
        setCountryCode(geo.countryCode);
        setLat(geo.lat);
        setLng(geo.lng);
      }
      setDetecting(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Agent name is required"); return; }
    if (name.trim().length < 2) { setError("Name must be at least 2 characters"); return; }
    if (!city.trim()) { setError("City is required"); return; }
    if (!country.trim()) { setError("Country is required"); return; }

    setSubmitting(true);
    try {
      const agent = addAgent({
        name: name.trim(),
        description: description.trim(),
        city: city.trim(),
        country: country.trim(),
        countryCode: countryCode || "XX",
        lat: lat || 0,
        lng: lng || 0,
      });
      setSuccess(true);
      onRegistered(agent.id);
    } catch {
      setError("Failed to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="card-glow animate-fade-up border-border/50 bg-card/60 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-primary">Agent Registered!</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            <strong className="text-foreground">{name}</strong> is now glowing on the globe from {city}, {country}.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => { setSuccess(false); setName(""); setDescription(""); }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Register Another Agent
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glow animate-fade-up border-border/50 bg-card/60 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-primary" />
          Register Your Agent
        </CardTitle>
        <CardDescription>Light up your spot on the globe</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent Name *</Label>
            <Input
              id="agent-name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. GPT-4 Navigator"
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-desc">
              Description <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="agent-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What does your agent do?"
              maxLength={120}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="agent-city">City *</Label>
              <Input
                id="agent-city"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder={detecting ? "Detecting..." : "City"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-country">Country *</Label>
              <Input
                id="agent-country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder={detecting ? "Detecting..." : "Country"}
              />
            </div>
          </div>

          {detecting && (
            <p className="flex items-center gap-1.5 text-xs text-primary animate-pulse">
              <MapPin className="h-3 w-3" />
              Detecting your location via IP...
            </p>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            <Sparkles className="mr-2 h-4 w-4" />
            {submitting ? "Registering..." : "Light Up the Globe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
