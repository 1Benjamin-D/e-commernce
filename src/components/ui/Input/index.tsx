import BorderGradient from "../BorderGradient";

const Input = ({ children }: any) => {
  return (
    <BorderGradient>
      <input />
      {children && (
        <>
          {children}
        </>
      )}
    </BorderGradient>
  );
};

export default Input;
