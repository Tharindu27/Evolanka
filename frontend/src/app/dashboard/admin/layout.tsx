import AdminShell from "@/components/admin-dashboard/AdminShell";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
