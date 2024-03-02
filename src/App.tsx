import { createSignal, type Component, For } from "solid-js";
import { AiFillStar } from "solid-icons/ai";
import { IoCloseCircleOutline, IoExpand } from "solid-icons/io";
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
    const onCategoryClick = (category: string) => setQuery(category);

    const getFallback = () => {
        switch (query()) {
            case "is:favorite":
                return "좋아하는 항목이 없어요.";
            default:
                return "항목을 찾을 수 없어요 :(";
        }
    };
    const filterItems = (item: string) => {
        switch (query()) {
            case "is:favorite": {
                const { name } = decomposeItem(item);
                return Boolean(getStorage(name));
            }
            default:
                return matchItem(item, query());
        }
    };

    return (
        <>
            <div class="justify-centers flex items-center min-[260px]:hidden">
                <IoExpand size={32} class="text-amber-500" />
            </div>
            <div
                id="content"
                class="hidden min-h-full w-full max-w-[48rem] shadow-xl min-[260px]:block">
                <header
                    class={`sticky top-0 bg-white bg-opacity-80 px-6 pb-5 pt-10 backdrop-blur-lg transition-shadow min-[420px]:px-14 ${
                        scroll.y > 10 ? "shadow-lg" : ""
                    }`}>
                    <div class="mb-5 border-b-2 border-gray-100 pb-4">
                        <h1 class="relative text-4xl font-bold">
                            🔫 무기 파인더
                        </h1>
                    </div>
                    <div class="relative flex space-x-2">
                        <button
                            onClick={onViewFavoriteClick}
                            class="p-1 transition-transform hover:scale-110">
                            <AiFillStar size={32} class="text-amber-500" />
                        </button>
                        <input
                            value={query()}
                            onInput={e => setQuery(e.target.value)}
                            placeholder="검색어 입력"
                            class="h-10 w-full rounded-sm bg-gray-100 pl-3 pr-8 placeholder-zinc-400"
                        />
                        <button
                            onClick={onResetClick}
                            class="absolute right-1 top-1/2 -translate-y-1/2 p-1">
                            <IoCloseCircleOutline
                                size={18}
                                class="justify-center text-zinc-600"
                            />
                        </button>
                    </div>
                </header>

                <div class="mt-2 w-full">
                    <For
                        each={rawArms.filter(filterItems).sort((a, b) => {
                            const { name: aName } = decomposeItem(a);
                            const { name: bName } = decomposeItem(b);
                            return aName.localeCompare(bName);
                        })}
                        fallback={
                            <h3 class="text-center text-lg text-zinc-400">
                                {getFallback()}
                            </h3>
                        }>
                        {item => {
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
        </>
    );
};

export default App;
