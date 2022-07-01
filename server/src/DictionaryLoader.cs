using Scrabbux.Model;
using Scrabbux.Serialization;
using System.Reflection;
using System.Text.Json;
using System.Security.Cryptography;

public static class Extensions
{
    public static Stack<T> ToShuffledStack<T>(this IList<T> list)
    {
        var n = list.Count;

        while (n > 1)
        {
            n--;
            int k = RandomNumberGenerator.GetInt32(n + 1);
            T value = list[k];
            list[k] = list[n];
            list[n] = value;
        }

        return new Stack<T>(list);
    }
}

public sealed class LetterStack
{
    private Stack<Letter> ShuffledLetters { get; }

    public LetterStack(string language)
    {
        ShuffledLetters = GetLetters(language).ToList().ToShuffledStack();
    }

    public IEnumerable<Letter> GetLetters(int maxCount)
    {
        for (var i = 0; i < maxCount && ShuffledLetters.Count > 0; i++)
            yield return ShuffledLetters.Pop();
    }

    private IEnumerable<Letter> GetLetters(string language)
    {
        foreach (var (Display, Value, Count) in DictionaryLoader.GetLetters(language))
            for (int i = 0; i < Count; i++)
                yield return new(Display, Value);
    }
}

public static class DictionaryLoader
{
    private static readonly Dictionary<string, string[]> words;
    private static readonly Dictionary<string, Letter[]> letters;

    static DictionaryLoader()
    {
        words = GetFromDictionary<Dictionary>("dictionary")
            .ToDictionary(k => k.Value.Name, v => v.Value.Values);
        letters = GetFromDictionary<Dictionary<string, ValueCount>>("letters")
            .ToDictionary(k => k.Key, v => v.Value.Select(d =>
                new Letter(d.Key, d.Value.Value, d.Value.Count)).ToArray());

        Console.WriteLine("adsf");
        Console.WriteLine(string.Join("", letters.Keys.Select(k => k)));
    }

    public static string[] GetWords(string language) => words[language];

    public static Letter[] GetLetters(string language) => letters[language];

    public static Dictionary<string, T> GetFromDictionary<T>(string fileName)
        => new Dictionary<string, T>(
            from dir in Directory.GetDirectories($"{DirectoryName}/dictionaries")
            let bytes = File.ReadAllBytes($"{dir}/{fileName}.json")
            let result = JsonSerializer.Deserialize<T>(bytes, Serialization.Options)!
            select new KeyValuePair<string, T>(new DirectoryInfo(dir).Name, result));

    private static string DirectoryName { get; }
        = Path.GetDirectoryName(Assembly.GetEntryAssembly()!.Location)!;

    record Dictionary(string Name, string[] Values);
    record ValueCount(int Value, int Count);
    public record Letter(string Display, int Value, int Count);
}
