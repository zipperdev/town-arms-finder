import { createSignal, type Component, createMemo, For } from "solid-js";
import { createScrollPosition } from "@solid-primitives/scroll";
import Arms from "./assets/arms.yaml";
import Item from "./components/Item";

const compileYaml = (obj: Record<string, any>, slugs?: string) => {
    let items: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            // Items
            value.forEach((item: string) =>
                items.push(`${slugs ? `${slugs} ` : ""}${key} \\${item}`)
            );
        } else {
            // Group
            const childItems = compileYaml(
                value,
                `${slugs ? `${slugs} ` : ""}${key}`
            );
            items = items.concat(childItems);
        }
    }

    return items;
};
const matchItem = (item: string, query: string) => {
    const slugs = query.split(" ");

    let isMatch = false;
    for (const slug of slugs.values()) {
        if (item.toLowerCase().includes(slug)) {
            isMatch = true;
            break;
        }
    }

    return isMatch;
};

const App: Component = () => {
    const [query, setQuery] = createSignal("");
    const scroll = createScrollPosition();

    const arms = createMemo(() => compileYaml(Arms));

    const onCategoryClick = (category: string) => setQuery(category);

    return (
        <div class="w-full h-full">
            <header
                class={`sticky top-0 bg-white px-14 pt-10 pb-5 transition-shadow ${
                    scroll.y > 8 ? "shadow-lg" : ""
                }`}
            >
                <h1 class="relative text-4xl font-bold mb-9 after:absolute after:left-0 after:top-14 after:w-full after:h-[0.2rem] after:bg-gray-100">
                    🔫 무기 파인더
                </h1>
                <input
                    value={query()}
                    onInput={(e) => setQuery(e.target.value)}
                    placeholder="검색어 입력"
                    class="bg-gray-100 rounded-sm w-full h-10 px-3"
                />
            </header>

            <div class="w-full mt-2">
                <For each={arms().filter((item) => matchItem(item, query()))}>
                    {(item) => {
                        const [categories, name, desc] = item.split("\\");
                        return (
                            <Item
                                name={name.trim()}
                                desc={desc}
                                categories={categories.trim().split(" ")}
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
