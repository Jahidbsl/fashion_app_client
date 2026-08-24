export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600 dark:border-zinc-800 dark:border-t-blue-500" />
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Loading, please wait...
        </p>
      </div>
    </div>
  )
}