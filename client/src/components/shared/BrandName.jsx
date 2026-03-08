function BrandName() {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <h1 className="text-4xl md:text-5xl font-serif font-semibold bg-gradient-to-r from-pink-400 via-pink-500 to-rose-400 bg-clip-text text-transparent animate-fadeFloat tracking-wide">
        <span>Nabu</span>
        <span className="mx-1 text-pink-500"> & </span>
        <span>Sabu</span>
      </h1>

      <div className="w-24 h-[2px] mt-2 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse"></div>

      <p className="text-sm text-gray-500 mt-2 italic tracking-wide">
        Made with love & care ❤️
      </p>
    </div>
  );
}

export default BrandName;
