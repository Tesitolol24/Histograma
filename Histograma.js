class DefaultMap extends Map{

    constructor(defaultValue){
        super();
        this.defaultValue = defaultValue;
    }

    get(key){
        if(this.has(key)){
            return super.get(key);
        } else{
            return this.defaultValue;
        }
    }
}

class Histograma{
    constructor(){
        this.letterCounts = new DefaultMap(0);
        this.totalLetters = 0;
    }

    add(text){
        text = text.replace(/\s/g, "").toUpperCase();

        for(let character of text){
            let count = this.letterCounts.get(character);
            this.letterCounts.set(character, count+1);
            this.totalLetters++;
        }
    }

    toString(){
        let entries = [...this.letterCounts];
        console.log(entries);

        entries.sort((a,b) => {
            if(a[0]<b[0]) {
                return a[0] < b[0] ? -1 : 1;
            }else{
                return b[1] - a[1];
            }
        });

        for(let entry of entries){
            estry[1] =  entry[1] / this.totalLetters*100;
        }

        entries = entries.filter(entry => entry[1] >= 1);

        let lines = entries.map(
            ([l,n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        );

        return lines.join("\n");
    }
}

async function histogramaFromStdin() {
    process.stdin.setEncoding("utf-8");
    let histograma = new Histograma();
    for await (let chunk of process.stdin) {
        histograma.add(chunk);
    }
    return histograma;
}

histogramaFromStdin().then(
    histograma => { 
      console.log(histograma.toString()); 
    }
);