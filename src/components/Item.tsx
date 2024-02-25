import { For, type Component, Setter } from "solid-js";

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
    return (
        <div class="px-14 py-3 odd:bg-white even:bg-zinc-50">
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
    );
};

export default Item;
