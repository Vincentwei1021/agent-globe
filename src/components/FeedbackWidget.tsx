"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, CheckCircle } from "lucide-react";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), email: email.trim() || undefined, url: window.location.href, timestamp: new Date().toISOString() }),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => { setOpen(false); setStatus("idle"); setMessage(""); setEmail(""); }, 2000);
      } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-label="Send feedback"
        size="icon"
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full shadow-lg"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>

      {open && (
        <Card className="fixed bottom-20 right-5 z-50 w-80 animate-fade-up border-border/50 bg-card/95 shadow-2xl backdrop-blur-xl">
          {status === "success" ? (
            <CardContent className="py-8 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <p className="font-semibold">Thanks!</p>
              <p className="text-sm text-muted-foreground">We&apos;ll review your feedback.</p>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Send Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={3}
                  required
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email (optional, for replies)"
                />
                {status === "error" && (
                  <p className="text-xs text-destructive">Something went wrong. Try again.</p>
                )}
                <Button type="submit" className="w-full" size="sm" disabled={status === "loading" || !message.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  {status === "loading" ? "Sending..." : "Send Feedback"}
                </Button>
              </CardContent>
            </form>
          )}
        </Card>
      )}
    </>
  );
}
