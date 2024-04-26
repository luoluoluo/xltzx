import { Button } from "../ui/button";

export const BuyNumber = ({
  className,
  maxValue,
  value,
  onChange
}: {
  className?: string;
  maxValue?: number;
  value?: number;
  onChange?: (value?: number) => void;
}) => {
  const data = value || 1;
  return (
    <div className={`bg-gray-100 hover:bg-gray-100 flex-shrink-0 rounded ${className}`}>
      <div className="flex justify-between items-center w-full h-full overflow-hidden">
        <Button
          size="lg"
          variant="ghost"
          disabled={data <= 1}
          className="  text-black px-4 text-xl active:bg-gray-200 font-bold"
          onClick={() => {
            if (data <= 1) return;
            const newValue = data - 1;
            onChange && onChange(newValue);
          }}
        >
          -
        </Button>
        <input
          type="number"
          value={value}
          className="w-8 outline-none active:outline-none text-black bg-gray-100 text-center"
          onInput={e => {
            let inputValue = Number(e.currentTarget.value);
            if (inputValue < 1) {
              inputValue = 1;
            }
            if (maxValue && inputValue > maxValue) {
              inputValue = maxValue;
            }
            onChange && onChange(inputValue);
          }}
        />
        <Button
          size="lg"
          variant="ghost"
          disabled={maxValue && data >= maxValue ? true : false}
          className=" text-black px-4 text-xl active:bg-gray-200 font-bold"
          onClick={() => {
            if (maxValue && data >= maxValue) return;
            const newValue = data + 1;
            onChange && onChange(newValue);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};
