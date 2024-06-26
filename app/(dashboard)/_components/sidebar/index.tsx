import { List } from "./list";
import { NewButton } from "./new-button";

export const Sidebar = () => {
    return (
        <div className="fixed z-[1] left-0 bg-slate-800 text-white h-full w-[60px] flex p-3 flex-col gap-y-4">
            <List />
            <NewButton />
        </div>
    );
};