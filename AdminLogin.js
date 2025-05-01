import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/dashboard", { replace: true });
  }, [navigate]);
  return null;
}
