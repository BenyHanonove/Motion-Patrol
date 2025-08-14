import type { ReactNode } from "react";

interface SidebarItemModel {
  title: string;
  icon?: ReactNode;
  path: string;
  onClick?: () => void;
  disabled?: boolean;
}

export type { SidebarItemModel };
