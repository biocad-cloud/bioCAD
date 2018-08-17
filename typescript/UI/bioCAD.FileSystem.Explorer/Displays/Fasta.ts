namespace DisplayAdapters {

    export class Fasta extends IDisplay {

        public colors: Dictionary<string>;

        show(div: string, file: string): void {
            throw new Error("Method not implemented.");
        }

        private

        public static NuclFasta(): Fasta {
            return <Fasta>{
                colors: new Dictionary<string>({
                    "A": "rgb(0,255,0)",
                    "T": "rgb(0,0,255)",
                    "G": "rgb(255,0,0)",
                    "C": "rgb(255,0,255)",
                    "N": "rgb(255,255,0)"
                })
            }
        }

        public static ProtColors(): Fasta {
            return <Fasta>{
                colors: new Dictionary<string>({
                    "A": "rgb()",
                    "T": "rgb()",
                    "G": "rgb()",
                    "C": "rgb()",
                    "N": "rgb()"
                })
            }
        }
    }
}