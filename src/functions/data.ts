type YamlObject = { [key: string]: string[] | YamlObject };

export const compileYaml = (obj: YamlObject, slugs?: string) => {
    let items: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            // Items
            value.forEach((item: string) =>
                items.push(`${slugs ? `${slugs} ` : ""}${key} \\${item}`),
            );
        } else {
            // Group
            const childItems = compileYaml(
                value,
                `${slugs ? `${slugs} ` : ""}${key}`,
            );
            items = items.concat(childItems);
        }
    }

    return items;
};

export const decomposeItem = (item: string) => {
    const [categories, name, desc] = item.split("\\");
    return {
        name: name.trim(),
        desc,
        categories: categories.trim().split(" "),
    };
};

export const matchItem = (item: string, query: string) => {
    const slugs = query.split(" ");

    let isMatch = true;
    for (const slug of slugs.values()) {
        if (!item.toLowerCase().includes(slug.toLowerCase())) {
            isMatch = false;
            break;
        }
    }

    return isMatch;
};
