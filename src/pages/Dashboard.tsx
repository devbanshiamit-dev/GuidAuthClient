
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
                            G
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                            GuidAuth
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-12">
                <div>
                    <p className="text-sm font-medium text-indigo-600">
                        OVERVIEW
                    </p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Welcome, {user?.name || "User"}!
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Your authentication dashboard is ready.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Account status
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full bg-green-500" />
                            <span className="text-xl font-bold text-slate-900">
                                Authenticated
                            </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-500">
                            You are successfully logged in.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            User information
                        </p>
                        <div className="mt-4 space-y-3">
                            <div>
                                <p className="text-xs text-slate-400">Name</p>
                                <p className="font-semibold text-slate-800">
                                    {user?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Email</p>
                                <p className="font-semibold text-slate-800">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
