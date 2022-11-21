export default function colorCheck(ans, guess) {
    let g = {};
    guess.split("").map((letter, index) => { g[letter] ? g[letter].push(index) : g[letter] = [index] })
    let a = {};
    ans.split("").map((letter, index) => { a[letter] ? a[letter].push(index) : a[letter] = [index] })

    let colors = ["red", "red", "red", "red", "red"]


    Object.keys(a).forEach(item => {
        //red
        if (!g[item]) {
            return
        }
        a[item].forEach(
            i => {
                if (g[item].includes(i)) {
                    if (a[item].toString() === g[item].toString() || a[item].length < g[item].length) {
                        colors[i] = "green";
                    }
                    else {
                        colors[i] = "blue";
                    }
                }
                else if (g[item]) {
                    g[item].forEach(ind => {
                        if (colors[ind] !== "blue") {
                            colors[ind] = "yellow"
                        }
                    })
                }
            }
        )

    })

    return colors;
};