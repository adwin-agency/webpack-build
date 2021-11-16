function create (){
    let counter = 0
    let isDestroyed = false

    const listener = () => counter++

    $(document).on('click');

    document.addEventListener('click', listener)

    return {
        destroy() {
            document.removeEventListener('click', listener)
            isDestroyed = true
        },
        geClick() {
            if (isDestroyed){
                return `destroy total = ${counter}`
            }
            return counter
        }
    }
}

window.analitycs = create()