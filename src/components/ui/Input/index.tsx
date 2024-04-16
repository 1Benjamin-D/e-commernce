import BorderGradient from "../BorderGradient";

const Input = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className="flex justify-center">
      <BorderGradient className=" w-[230px] h-[65px] lg:w-[410px] lg:h-[40px]">
        <input type="text" name="" className={`w-full text-center outline-none p-3 text-2xl lg:text-sm lg:p-0 ` + className} />
        {children && (
          <>
            {children}
          </>
        )}
      </BorderGradient>
    </div>
  );
};

export default Input;
