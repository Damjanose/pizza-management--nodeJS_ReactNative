import React from "react";
import WaiterRoutes from "./WaiterRoutes";
import CookRoutes from "./CookRoutes";
import useAuth from "../../providers/hooks/useAuth";

export default function SignedInRoutes() {
  const { role } = useAuth();

  if (role === "waiter") return <WaiterRoutes />;
  if (role === "cook") return <CookRoutes />;

  return null;
}
