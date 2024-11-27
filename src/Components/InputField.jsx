import { forwardRef, useId } from "react";

const InputField = forwardRef(function InputField(
    { lable, type = "text", className = "", ...props },
    ref
) {
    const inputId = useId();

    return (
        <div className="p-2 w-full">
            {lable && (
                <lable className="p-2 " htmlFor={inputId}>
                    {lable}
                </lable>
            )}
            <input
                id={inputId}
                ref={ref}
                type={type}
                className={`${className}`}
                {...props}
            />
        </div>
    );
});

export default InputField;
