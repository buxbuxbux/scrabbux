using System.Text.Json;

namespace Scrabbux.Serialization;

public static class Serialization
{
    public static JsonSerializerOptions Options { get; } = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
}