import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
                        Join Promptier
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Discover and share your best prompts with the world.
                    </p>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none border border-gray-100 rounded-2xl p-6",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton: "rounded-xl border-gray-200 hover:bg-gray-50 transition-all",
                                formButtonPrimary: "bg-black hover:bg-gray-800 text-white rounded-xl py-2.5 transition-all text-sm font-bold uppercase tracking-widest",
                                formFieldInput: "rounded-xl border-gray-200",
                                footerActionLink: "text-black hover:text-gray-600 font-bold underline font-mono text-xs",
                            },
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
