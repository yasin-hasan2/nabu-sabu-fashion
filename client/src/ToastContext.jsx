import { createContext, useContext, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ message, type = "success", duration = 3000 }) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    if (type !== "loading") {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateToast = (id, newData) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...newData } : t)),
    );

    // auto remove after update
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast, updateToast }}>
      {children}

      {/* Toast UI */}
      <div className="fixed top-5 right-5 space-y-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white
              ${toast.type === "success" && "bg-green-500"}
              ${toast.type === "error" && "bg-red-500"}
              ${toast.type === "loading" && "bg-gray-800"}
            `}
          >
            {toast.type === "success" && <CheckCircle />}
            {toast.type === "error" && <XCircle />}
            {toast.type === "loading" && <Loader2 className="animate-spin" />}

            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
