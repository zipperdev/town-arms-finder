import { For, type Component, createSignal } from "solid-js";
import { AiFillStar, AiOutlineStar } from "solid-icons/ai";
import { delStorage, getStorage, setStorage } from "../functions/storage";

interface Props {
    name: string;
    desc: string;
    categories: string[];
    onCategoryClick: (category: string) => void;
}

const Item: Component<Props> = ({
    name,
    desc,
    categories,
    onCategoryClick,
}) => {
    const [favorite, setFavorite] = createSignal(
        getStorage(name) ? true : false
    );

    const onFavoriteClick = () => {
        if (favorite()) {
            delStorage(name);
        } else {
            setStorage(name, "1");
        }
        setFavorite((prev) => !prev);
    };

    return (
        <div class="flex px-14 py-3 odd:bg-white even:bg-zinc-50 justify-between items-center">
            <div>
                <h3 class="text-2xl font-semibold">{name}</h3>
                <p class="text-lg">{desc}</p>
                <div class="flex space-x-2 my-1">
                    <For each={categories}>
                        {(category) => (
                            <p
                                class="bg-sky-200 px-2 py-1 rounded cursor-pointer text-zinc-900 hover:ring-1"
                                onClick={() => onCategoryClick(category)}
                            >
                                {category}
                            </p>
                        )}
                    </For>
                </div>
            </div>
            <button
                onClick={onFavoriteClick}
                class="p-2 text-amber-500 transition-transform hover:scale-110"
            >
                {favorite() ? (
                    <AiFillStar size={24} />
                ) : (
                    <AiOutlineStar size={24} />
                )}
            </button>
        </div>
    );
};

export default Item;
