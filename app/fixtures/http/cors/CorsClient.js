"use client";

import { useEffect } from "react";

export default function CorsClient() {
  useEffect(() => {
    fetch("/fixtures/http/cors-bad");
    fetch("/fixtures/http/cors-ok");
  }, []);
  return null;
}
