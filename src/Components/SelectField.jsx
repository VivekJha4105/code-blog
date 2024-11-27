import { forwardRef, useId } from "react";

const SelectField = forwardRef(function SelectField(
    { lable, options, className = "", ...props },
    ref
) {
    const selectId = useId();

    return (
        <div className="w-full">
            {lable && (
                <lable htmlFor={selectId} className="">
                    {lable}
                </lable>
            )}
            <select id={selectId} ref={ref} className={` ${className}`}>
                {options.length &&
                    options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
            </select>
        </div>
    );
});

export default SelectField;
