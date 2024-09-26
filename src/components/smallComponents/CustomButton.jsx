
const CustomButton = ({btnName}) => {
    return (
        <div>
            <button className="bg-[#f7a582] w-full text-white px-14 py-3 rounded-lg font-semibold text-sm hover:bg-[#f7b782]">{btnName}</button>
        </div>
    );
};

export default CustomButton;