/// <reference path="../../javascript/linq.d.ts" />

/**
 * The fasta sequence parser and data model
*/
class FastaSeq {

    public headers: string[];
    public sequence: string;

    public static ParseFile(stream: string): FastaSeq[] {
        var seq: FastaSeq[] = [];
        // 使用正则表达式进行切割并去除空白行
        var lines: string[] = From(stream.split(/\n/))
            .Where(l => !StringEmpty(l, true))
            .ToArray();
        var header: string;
        var seqBuffer: string = "";
        var isnull: () => boolean = () => StringEmpty(header) && StringEmpty(seqBuffer);

        for (var i: number = 0; i < lines.length; i++) {
            var line: string = lines[i];

            if (line.charAt(0) == ">") {
                // 是新的序列起始
                if (!isnull()) {
                    seq.push(<FastaSeq>{
                        headers: header.split("|"),
                        sequence: seqBuffer
                    });
                }

                header = line.substr(1);
                seqBuffer = "";
            } else {
                seqBuffer = seqBuffer + line;
            }
        }

        if (!isnull()) {
            seq.push(<FastaSeq>{
                headers: header.split("|"),
                sequence: seqBuffer
            });
        }

        return seq;
    }
}