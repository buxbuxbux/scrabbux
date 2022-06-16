using Microsoft.AspNetCore.SignalR;

namespace Scrabbux;

public sealed class BoardHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}