using System.Text.Json.Serialization;

namespace Scrabbux;

public sealed record Letter(string Display, int Value) : ISquare
{
    public string Type => "Letter";
}
public sealed record Premium(PremiumActions Actions, int Multiplier) : ISquare
{
    public string Type => "Premium";
}
public enum PremiumActions
{
    Letter,
    Word
}
public sealed record None : ISquare
{
    public string Type => "None";
}

[JsonConverter(typeof(SquareJsonWriter))]
public interface ISquare
{
    public string Type { get; }
}

public sealed record BoardState(ISquare[][] Board);

public sealed record Move(Letter Letter, int XAxis, int YAxis);

public static class BoardGenerator
{

    public static BoardState GetEmptyBoard()
    {
        return new BoardState(Enumerable.Repeat(GetEmptyRow(15), 15).ToArray());
    }

    public static Move GetRandomMove()
    => new Move(new Letter(RandomLetter, 1), new Random().Next(0, 15), new Random().Next(0, 15));

    private static ISquare[] GetEmptyRow(int count)
    => new object[count]
    // .Select((_, i) => new Letter(RandomLetter, 10))
    .Select((_, i) => new None())
    .ToArray();

    private static string RandomLetter => ((char)new Random().Next((char)'A', (char)'Z')).ToString();
}