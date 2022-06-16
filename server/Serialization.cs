using System.Text.Json;
using System.Text.Json.Serialization;

namespace Scrabbux;

public sealed class SquareJsonWriter : JsonConverter<ISquare>
{
    public override bool CanConvert(Type type)
    {
        return typeof(ISquare).IsAssignableFrom(type);
    }

    public override ISquare Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
        => throw new InvalidOperationException();

    public override void Write(
        Utf8JsonWriter writer,
        ISquare value,
        JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, (object)value, options);
    }
}