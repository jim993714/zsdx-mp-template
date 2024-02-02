export default function debounce(fn: Function, duration: number) {
    let timer: any;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(globalThis, ...args), duration);
    };
}
