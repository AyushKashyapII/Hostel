"use client";
interface MenuItemsProps {
  onClick: () => void;
  label: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
          px-4
          py-3
          hover:bg-neutral-100
          transition
          font-semibold
          w-250px 
          text-black
        "
    >
      {label}
    </div>
  );
};

export default MenuItems;
