using System.Text.Json.Serialization;
using Scrabbux.Serialization;

namespace Scrabbux.Model;

[JsonConverter(typeof(PolymorphicJsonWriter<ISquare>))]
public interface ISquare
{
    public string Type { get; }
}

public sealed record Letter(string Display, int Value) : ISquare
{
    public string Type => "Letter";
}

public sealed record Premium(PremiumActions Actions, int Multiplier) : ISquare
{
    public string Type => "Premium";
}

public sealed record None : ISquare
{
    public string Type => "None";
}

public sealed record Center : ISquare
{
    public string Type => "Center";
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum PremiumActions
{
    Letter,
    Word
}