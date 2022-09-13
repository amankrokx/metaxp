class LoaderUtils {
    #loader = {
        s: true,
        h: () => {},
    }

    setLoader(loading, setLoading) {
        this.#loader.s = loading
        this.#loader.h = setLoading
    }

    open() {
        return this.#loader.h(false)
    }
    close() {
        return this.#loader.h(true)
    }
    toggle() {
        return this.#loader.h(!this.#loader.s)
    }
}

export default new LoaderUtils()
