import { createSignal, type Component, For } from "solid-js";
import { AiFillStar } from "solid-icons/ai";
import { IoCloseCircleOutline } from "solid-icons/io";
import { createScrollPosition } from "@solid-primitives/scroll";
import Arms from "./assets/arms.yaml";
import Item from "./components/Item";
import { compileYaml, decomposeItem, matchItem } from "./functions/data";
import { getStorage } from "./functions/storage";

const rawArms = compileYaml(Arms);

const App: Component = () => {
    const [query, setQuery] = createSignal("");
    const scroll = createScrollPosition();

    const onViewFavoriteClick = () => setQuery("is:favorite");
    const onResetClick = () => setQuery("");
    const filterItems = (item: string) => {
        switch (query()) {
            case "is:favorite":
                const { name } = decomposeItem(item);
                return Boolean(getStorage(name));
            default:
                return matchItem(item, query());
        }
    };
    const onCategoryClick = (category: string) => setQuery(category);

    return (
        <div id="content" class="w-full h-full max-w-[48rem] shadow-xl">
            <header
                class={`sticky top-0 bg-white px-14 pt-10 pb-5 transition-shadow ${
                    scroll.y > 8 ? "shadow-lg" : ""
                }`}
            >
                <h1 class="relative text-4xl font-bold mb-9 after:absolute after:left-0 after:top-14 after:w-full after:h-[0.2rem] after:bg-gray-100">
                    🔫 무기 파인더
                </h1>
                <div class="relative flex space-x-2">
                    <button
                        onClick={onViewFavoriteClick}
                        class="p-1 transition-transform hover:scale-110"
                    >
                        <AiFillStar size={32} class="text-amber-500" />
                    </button>
                    <input
                        value={query()}
                        onInput={(e) => setQuery(e.target.value)}
                        placeholder="검색어 입력"
                        class="bg-gray-100 placeholder-zinc-400 rounded-sm w-full h-10 px-3"
                    />
                    <button
                        onClick={onResetClick}
                        class="absolute top-1/2 -translate-y-1/2 right-2"
                    >
                        <IoCloseCircleOutline
                            size={18}
                            class="text-zinc-600 justify-center"
                        />
                    </button>
                </div>
            </header>

            <div class="w-full mt-2">
                <For
                    each={rawArms.filter(filterItems).sort((a, b) => {
                        const { name: aName } = decomposeItem(a);
                        const { name: bName } = decomposeItem(b);
                        return aName.localeCompare(bName);
                    })}
                    fallback={
                        <h3 class="text-lg text-center text-zinc-400">
                            {(() => {
                                switch (query()) {
                                    case "is:favorite":
                                        return "좋아하는 항목이 없어요.";
                                    default:
                                        return "항목을 찾을 수 없어요 :(";
                                }
                            })()}
                        </h3>
                    }
                >
                    {(item) => {
                        return (
                            <Item
                                {...decomposeItem(item)}
                                onCategoryClick={onCategoryClick}
                            />
                        );
                    }}
                </For>
            </div>
        </div>
    );
};

export default App;
