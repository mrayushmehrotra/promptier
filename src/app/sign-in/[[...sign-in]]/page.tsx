import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-black">
                        Welcome back
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Continue your prompt journey with Promptier.
                    </p>
                </div>

                <div className="flex justify-center flex-col items-center">
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none border border-gray-100 rounded-2xl p-6",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton: "rounded-xl border-gray-200 hover:bg-gray-50 transition-all",
                                formButtonPrimary: "bg-black hover:bg-gray-800 text-white rounded-xl py-2.5 transition-all text-sm font-bold uppercase tracking-widest",
                                formFieldInput: "rounded-xl border-gray-200 focus:ring-0 focus:border-black transition-all",
                                footerActionLink: "text-black hover:text-gray-600 font-bold",
                                identityPreviewEditButtonIcon: "text-black",
                                formResendCodeLink: "text-black font-bold",
                                otpCodeFieldInput: "rounded-xl border-gray-200",
                            },
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
