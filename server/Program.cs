using Microsoft.AspNetCore.SignalR;
using Scrabbux;
using Scrabbux.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddSignalR();

var app = builder.Build();

app.MapGet("/api/board-state/{gameId?}", (string? gameId) =>
{
    var board = BoardGenerator.GetBasicBoard();
    return Results.Json(board, Serialization.Options);
});
app.MapHub<BoardHub>("/live/boardhub");
app.MapGet("/post", (a) => a.RequestServices.GetRequiredService<IHubContext<BoardHub>>().Clients.All.SendAsync("ReceiveMessage", BoardGenerator.GetRandomMove()));

app.MapGet("/prdel", async (a) =>
{
    var hub = a.RequestServices.GetRequiredService<IHubContext<BoardHub>>();
    foreach (var item in BoardGenerator.Prdel())
    {
        await hub.Clients.All.SendAsync("ReceiveMessage", item);
    }
});

app.MapGet("/dict/{lang}", (string lang) => DictionaryLoader.GetWords(lang));

app.UseCors(p => p
    .WithOrigins("http://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials());
app.Run();