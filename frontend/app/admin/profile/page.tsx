import AdminInfo from "./_components/AdminInfo";

export default function ProfilePage() {
  return (
    <main>
      <div className="relative mb-8 flex items-end justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Profile Information
          </h3>
          <p className="text-sm text-gray-600">
            Manage your account settings and personal information
          </p>
        </div>
      </div>
      <AdminInfo />
    </main>
  );
}
