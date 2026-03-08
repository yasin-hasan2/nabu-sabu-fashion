function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faf6f2]">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-pink-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-pink-500 rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            Nabu&Sabu Fashion...
          </p>
          <p className="text-sm text-pink-500 mt-1">❤️ Made with love & care</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
