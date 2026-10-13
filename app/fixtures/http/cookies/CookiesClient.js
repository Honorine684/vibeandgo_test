"use client";

import { useEffect } from "react";

export default function CookiesClient() {
  useEffect(() => {
    fetch("/fixtures/http/set-session-cookie");
    fetch("/fixtures/http/set-analytics-cookie");
  }, []);
  return null;
}
