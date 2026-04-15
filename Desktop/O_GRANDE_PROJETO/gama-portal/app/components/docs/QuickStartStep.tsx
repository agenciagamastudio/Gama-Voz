interface QuickStartStepProps {
  step: number
  title: string
  description: string
  command?: string
}

export default function QuickStartStep({
  step,
  title,
  description,
  command,
}: QuickStartStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex min-w-max items-center rounded-full bg-[#88CE11] px-4 py-2 font-black text-black">
        {step}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="mt-1 text-gray-300">{description}</p>
        {command && (
          <div className="mt-3 rounded-lg bg-black/50 px-4 py-2 font-mono text-sm text-gray-100">
            {command}
          </div>
        )}
      </div>
    </div>
  )
}
