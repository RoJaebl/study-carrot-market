import React from "react";

export default function TabsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <React.Fragment>
      {children}
      {modal}
    </React.Fragment>
  );
}
