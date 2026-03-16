import type { GeoInfo } from "@/types";

export async function detectLocation(): Promise<GeoInfo | null> {
  // Try ipapi.co first (1000/day free, HTTPS)
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        return {
          city: data.city || "Unknown",
          country: data.country_name || "Unknown",
          countryCode: data.country_code || "XX",
          lat: data.latitude,
          lng: data.longitude,
          ip: data.ip || "",
        };
      }
    }
  } catch { /* fall through */ }

  // Fallback: ip-api.com (HTTP only, 45/min free non-commercial)
  try {
    const res = await fetch("http://ip-api.com/json/?fields=status,city,country,countryCode,lat,lon,query", { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        return {
          city: data.city || "Unknown",
          country: data.country || "Unknown",
          countryCode: data.countryCode || "XX",
          lat: data.lat,
          lng: data.lon,
          ip: data.query || "",
        };
      }
    }
  } catch { /* fall through */ }

  return null;
}
