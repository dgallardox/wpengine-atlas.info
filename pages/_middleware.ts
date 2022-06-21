import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // PRIMARY_DOMAIN should be a full URL including protocol, e.g. https://www.google.com
  const hasEnvVariable = !!process.env.PRIMARY_DOMAIN;
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!hasEnvVariable) {
    !isDevelopment &&
      console.error(
        "You must provide a PRIMARY_DOMAIN environment variable for the domain normalization middleware to work correctly"
      );
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  const normalizedHost = new URL(process.env.PRIMARY_DOMAIN);
  const host = req.headers.get("host");

  const isCorrectHostname = host.split(":")[0] === normalizedHost.hostname;

  if (!isCorrectHostname) {
    url.protocol = normalizedHost.protocol;
    url.host = normalizedHost.host;
    url.port = normalizedHost.port;
    return NextResponse.redirect(url);
  }
}
