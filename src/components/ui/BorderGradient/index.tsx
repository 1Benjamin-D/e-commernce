const BorderGradient = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  // Fusion des classes supplémentaires avec la classe de base

  return (
    <div className="bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-[2px] rounded-[20px]">
      <div className={`bg-white flex items-center justify-between rounded-[18px] py-2 px-4 gap-2.5 h-full w-full` + className}>
        {children}
      </div>
    </div>
  )
}

export default BorderGradient;
