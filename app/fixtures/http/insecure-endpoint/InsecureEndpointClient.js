"use client";

import { useEffect } from "react";

export default function InsecureEndpointClient() {
  useEffect(() => {
    fetch("/fixtures/http/users");
  }, []);
  return null;
}
