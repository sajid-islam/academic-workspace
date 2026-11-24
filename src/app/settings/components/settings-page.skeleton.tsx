export default function SettingPageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-pulse">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-5 space-y-2">
        <div className="h-7 w-52 rounded-md bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-80 max-w-full rounded-md bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* 1. Account Information */}
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-card space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200/80 dark:border-gray-800/80">
          <div className="size-5 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-56 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="h-3.5 w-20 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 w-20 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-2.5 w-32 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <div className="h-8 w-36 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      {/* 2. Appearance & Theme */}
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200/80 dark:border-gray-800/80">
          <div className="size-5 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-64 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3"
            >
              <div className="size-5 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Security & Password */}
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-gray-200/80 dark:border-gray-800/80">
          <div className="size-5 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-60 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="h-3.5 w-24 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-9 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3.5 w-32 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-9 w-full rounded-md bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <div className="h-8 w-32 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
