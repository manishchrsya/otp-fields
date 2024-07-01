import { FC, useEffect, useRef, useState } from "react";

interface IPassword {
  length: number;
  handleSubmit: (otp: string) => void;
}

export const Password: FC<IPassword> = ({
  handleSubmit = () => ({}),
  length = 4,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const otpRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (otpRef.current?.[0]) {
      otpRef.current[0].focus();
    }
  }, []);

  const handleChange = (event: any, index: number) => {
    const value = event.target.value;
    console.log("value", value);
    if (isNaN(value)) {
      return;
    }
    const otpValue = value?.[value.length - 1];
    console.log("otpValue", otpValue);
    const newOtp = [...otp];
    newOtp[index] = otpValue;
    setOtp(newOtp);

    const combinedOtp = [...newOtp].join("");

    if (combinedOtp.length === length) {
      handleSubmit(combinedOtp);
    }
    if (value && index < length - 1 && otpRef.current[index + 1]) {
      otpRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event: any, index: number) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      otpRef.current[index - 1]
    ) {
      otpRef.current[index - 1].focus();
    }
  };

  const handleClick = (index: number) => {
    if (otpRef.current[index]) {
      otpRef.current[index].setSelectionRange(1, 1);
    }
  };

  return (
    <div className="password-wrapper">
      {otp.map((value, index) => {
        return (
          <input
            ref={(inputRef) =>
              (otpRef.current[index] = inputRef as HTMLInputElement)
            }
            style={{}}
            className="password-field"
            key={index}
            type="text"
            value={value}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};
