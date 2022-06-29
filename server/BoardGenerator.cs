using Scrabbux.Model;

public static class BoardGenerator
{
    private const string Basic15x15Board =
@"TW,E,E,DL,E,E,E,TW,E,E,E,DL,E,E,TW
E,DW,E,E,E,TL,E,E,E,TL,E,E,E,DW,E
E,E,DW,E,E,E,DL,E,DL,E,E,E,DW,E,E
DL,E,E,DW,E,E,E,DL,E,E,E,DW,E,E,DL
E,E,E,E,DW,E,E,E,E,E,DW,E,E,E,E
E,TL,E,E,E,TL,E,E,E,TL,E,E,E,TL,E
E,E,DL,E,E,E,DL,E,DL,E,E,E,DL,E,E
TW,E,E,DL,E,E,E,C,E,E,E,DL,E,E,TW
E,E,DL,E,E,E,DL,E,DL,E,E,E,DL,E,E
E,TL,E,E,E,TL,E,E,E,TL,E,E,E,TL,E
E,E,E,E,DW,E,E,E,E,E,DW,E,E,E,E
DL,E,E,DW,E,E,E,DL,E,E,E,DW,E,E,DL
E,E,DW,E,E,E,DL,E,DL,E,E,E,DW,E,E
E,DW,E,E,E,TL,E,E,E,TL,E,E,E,DW,E
TW,E,E,DL,E,E,E,TW,E,E,E,DL,E,E,TW";

    public static BoardState GetBasicBoard() => Parse(Basic15x15Board);

    private static BoardState Parse(string input)
    {
        if (input is null) throw new ArgumentNullException(nameof(input));

        var squares = input
            .Split(Environment.NewLine)
            .Select(line => line
                .Split(',')
                .Select(ch => ch switch
                {
                    "TW" => (ISquare)new Premium(PremiumActions.Word, 3),
                    "DW" => new Premium(PremiumActions.Word, 2),
                    "TL" => new Premium(PremiumActions.Letter, 3),
                    "DL" => new Premium(PremiumActions.Letter, 2),
                    "C" => new Center(),
                    "E" => new None(),
                    _ => throw new InvalidOperationException("Bad board template")
                })
                .ToArray())
            .ToArray();

        return new BoardState(squares, new Letter[] { new("S", 2), new("A", 1), new("X", 10), new("O", 2), new("P", 1), new("H", 10), new("W", 2) });
    }

    public static Move GetRandomMove()
    => new Move(new Letter(RandomLetter, 3), RandomNumber, RandomNumber);

    public static Move[] Prdel() => new[] {
        new Move(new Letter("P", 2), 6, 6),
        new Move(new Letter("R", 3), 7, 6),
        new Move(new Letter("D", 2), 8, 6),
        new Move(new Letter("E", 2), 9, 6),
        new Move(new Letter("L", 3), 10, 6),
    };

    private static ISquare[] GetEmptyRow(int count)
    => new object[count]
     .Select((_, i) => new Letter(RandomLetter, 10))
    //  .Select((_, i) => new None())
     .ToArray();

    private static string RandomLetter => ((char)new Random().Next((char)'A', (char)'Z')).ToString();

    private static int RandomNumber => new Random().Next(0, 15);
}