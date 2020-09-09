class Test {
    constructor () {
        this.a = 10
        this.b = {f: () => {
            return this.a
        }}
    }
}
const t = new Test()
console.log(t.b.f())