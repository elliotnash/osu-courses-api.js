import { DOMParser, HTMLDocument } from "jsr:@b-fuze/deno-dom";

function getOptionsForID(document: HTMLDocument, id: string) {
    const element = document.querySelector(`#${id}`)
    if (element == null) {
        throw new MissingElementError(id)
    }
    const options: Record<string, string> = {}
    for (const option of element.children) {
        options[option.getAttribute("value")!] = option.innerText
    }
    return options
}

export class MissingElementError extends Error {
    constructor(id: string) {
        super(`classes.oregonstate.edu has no element with id="${id}". This is likely due to an OSU server update.`);
    }
}

export interface OSUSearchFilters {
    terms: Record<string, string>,
    subjects: Record<string, string>,
    courseTypes: Record<string, string>,
    campuses: Record<string, string>
}

export async function getSearchFilters() {
    const resp = await fetch("https://classes.oregonstate.edu/")
    const document = new DOMParser().parseFromString(await resp.text(), "text/html")

    return {
        terms: getOptionsForID(document, "crit-srcdb"),
        subjects: getOptionsForID(document, "crit-subject"),
        courseTypes: getOptionsForID(document, "crit-coursetype"),
        campuses: getOptionsForID(document, "crit-camp"),
        costs: getOptionsForID(document, "crit-books_type")
    }
}