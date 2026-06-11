type SplitTextOptions = {
    type?: string;
    charsClass?: string;
    wordsClass?: string;
};

/**
 * SplitText-compatible char splitter for GSAP timelines.
 * Chars animate individually; words stay unbroken on line wrap.
 * Whitespace stays visible so word gaps never collapse during reveal.
 */
export class SplitText {
    chars: HTMLSpanElement[] = [];
    words: HTMLSpanElement[] = [];

    private readonly element: HTMLElement;
    private readonly originalHTML: string;

    constructor(target: HTMLElement | string, options: SplitTextOptions = {}) {
        const element =
            typeof target === "string"
                ? document.querySelector<HTMLElement>(target)
                : target;

        if (!element) {
            throw new Error("SplitText: target element not found");
        }

        this.element = element;
        this.originalHTML = element.innerHTML;

        const types = (options.type ?? "chars").split(/,\s*/);
        if (types.includes("chars")) {
            this.splitChars(
                options.charsClass ?? "split-char",
                options.wordsClass ?? "split-word",
            );
        }
    }

    revert() {
        this.element.innerHTML = this.originalHTML;
        this.chars = [];
        this.words = [];
    }

    private splitChars(charsClass: string, wordsClass: string) {
        const textNodes: Text[] = [];
        const walker = document.createTreeWalker(this.element, NodeFilter.SHOW_TEXT);

        let node = walker.nextNode();
        while (node) {
            textNodes.push(node as Text);
            node = walker.nextNode();
        }

        textNodes.forEach((textNode) => {
            const text = textNode.textContent ?? "";
            if (!text) return;

            const parent = textNode.parentNode;
            if (!parent) return;

            const parts = text.split(/(\s+)/);
            const fragment = document.createDocumentFragment();

            parts.forEach((part) => {
                if (!part) return;

                if (/^\s+$/.test(part)) {
                    fragment.appendChild(document.createTextNode(part));
                    return;
                }

                const wordEl = document.createElement("span");
                wordEl.className = wordsClass;
                wordEl.style.display = "inline-block";
                wordEl.style.whiteSpace = "nowrap";

                [...part].forEach((char) => {
                    wordEl.appendChild(this.createCharSpan(char, charsClass));
                });

                fragment.appendChild(wordEl);
                this.words.push(wordEl);
            });

            parent.replaceChild(fragment, textNode);
        });
    }

    private createCharSpan(char: string, className: string) {
        const span = document.createElement("span");
        span.className = className;
        span.style.display = "inline-block";
        span.textContent = char;
        this.chars.push(span);
        return span;
    }
}
