using Scrabbux;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddSignalR();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

var serializationOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};

app.MapGet("/api/board-state/{gameId?}", (string? gameId) => {
    var board = BoardGenerator.GetEmptyBoard(); 
    return Results.Json(board, serializationOptions);
});
app.MapHub<BoardHub>("/live/boardhub");
app.MapGet("/post", (a) => a.RequestServices.GetRequiredService<IHubContext<BoardHub>>().Clients.All.SendAsync("ReceiveMessage", BoardGenerator.GetRandomMove()));

app.UseCors(p => p
    .WithOrigins("http://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials());
app.Run();


