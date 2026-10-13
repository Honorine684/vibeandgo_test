"use client";

import { useEffect } from "react";

export default function CacheClient() {
  useEffect(() => {
    fetch("/fixtures/http/cache-public-personal");
    fetch("/fixtures/http/cache-public-generic");
  }, []);
  return null;
}
