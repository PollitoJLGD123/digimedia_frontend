"use client"

import RolePermissionManager from "./components/RolePermissionManager"
import { Toaster } from "@/components/ui/toaster"

export default function RolePermissionPage() {
  return (
    <div className="flex-1 overflow-auto bg-white dark:bg-gray-900">
      <div className="container py-6">
        <RolePermissionManager />
        <Toaster />
      </div>
    </div>
  )
}
