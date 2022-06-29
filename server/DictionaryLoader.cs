using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using Scrabbux.Model;

public static class DictionaryLoader
{
    private static readonly Dictionary<string, string[]> _values;

    static DictionaryLoader()
    {
        _values = Directory
            .GetDirectories($"{Path.GetDirectoryName(Assembly.GetEntryAssembly()!.Location)}/dictionaries")
            .Select(name => File.ReadAllBytes($"{name}/dictionary.json"))
            .Select(bytes => JsonSerializer.Deserialize<Dictionary>(bytes, new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase})!)
            .ToDictionary(k => k.Name, v => v.Values);
    }

    public static string[] GetWords(string language) => _values[language];

    record Dictionary(string Name, string[] Values);
}
