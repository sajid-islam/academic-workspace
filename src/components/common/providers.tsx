"use client";
import { WorkspaceProvider } from "@/context/workspace-context";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <WorkspaceProvider>{children}</WorkspaceProvider>
    </ReduxProvider>
  );
};

export default Providers;
