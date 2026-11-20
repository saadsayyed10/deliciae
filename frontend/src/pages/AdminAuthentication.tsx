import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, UserPlus, LogIn, Sparkles } from "lucide-react";

const AdminAuthentication = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-neutral-50/50 flex-col gap-y-8 text-neutral-800 font-jetbrains p-4 selection:bg-neutral-900 selection:text-white uppercase">
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Deliciae
        </h1>
        <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">
          Authorized Personnel Only
        </p>
      </motion.div>

      {/* Fluid Toggle Switch Container */}
      <div className="relative flex items-center bg-neutral-200/60 p-1.5 border border-neutral-300/40 shadow-inner w-85 max-w-full">
        {/* Sliding Background Pill */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white shadow-sm border border-black/50"
          animate={{ left: isSignUp ? "6px" : "calc(50% + 0px)" }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />

        {/* Option 1: Sign Up */}
        <button
          onClick={() => setIsSignUp(true)}
          className={`relative z-10 flex-1 text-center py-2.5 uppercase text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            isSignUp
              ? "text-neutral-900"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Sign Up</span>
        </button>

        {/* Option 2: Sign In */}
        <button
          onClick={() => setIsSignUp(false)}
          className={`relative z-10 flex-1 text-center py-2.5 uppercase text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 ${
            !isSignUp
              ? "text-neutral-900"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </button>
      </div>

      {/* Fluid Form Card Container */}
      <div className="w-full max-w-md bg-white border border-black/80 shadow-xl shadow-neutral-100 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {isSignUp ? (
            /* Sign Up Form */
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onSubmit={(e) => e.preventDefault()}
              className="p-8 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">
                    Create Account
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Join Deliciae as an Author
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Saad"
                    className="w-full bg-neutral-50 border border-black px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sayyed"
                    className="w-full bg-neutral-50 border border-black px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                  Email
                </label>
                <input
                  placeholder="saadsyed950@gmail.com"
                  className="w-full bg-neutral-50 border border-black px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                  Password
                </label>
                <input
                  placeholder="***************"
                  className="w-full bg-neutral-50 border border-black px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="mt-2 w-full bg-neutral-900 text-white py-3 text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer shadow-md shadow-neutral-900/10"
              >
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          ) : (
            /* Sign In Form */
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onSubmit={(e) => e.preventDefault()}
              className="p-8 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">
                    Welcome Back
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Sign in to manage the application
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
                  <LogIn className="w-4 h-4" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                  Email
                </label>
                <input
                  placeholder="saadsyed950@gmail.com"
                  className="w-full bg-neutral-50 border border-black px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                  Password
                </label>
                <input
                  placeholder="***************"
                  className="w-full bg-neutral-50 border border-black px-3.5 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="mt-2 w-full bg-neutral-900 text-white py-3 text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer shadow-md shadow-neutral-900/10"
              >
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminAuthentication;
