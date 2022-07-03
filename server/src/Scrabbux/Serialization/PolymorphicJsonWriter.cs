using System.Text.Json;
using System.Text.Json.Serialization;

namespace Scrabbux.Serialization;

public sealed class PolymorphicJsonWriter<T> : JsonConverter<T>
{
    public override bool CanConvert(Type type)
    {
        return typeof(T).IsAssignableFrom(type);
    }

    public override T Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
        => throw new InvalidOperationException();

    public override void Write(
        Utf8JsonWriter writer,
        T value,
        JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, (object)value!, options);
    }
}