namespace Scrabbux.Model;

public sealed record BoardState(
    ISquare[][] Board,
    Letter[] PlayLetters
);

public sealed record Move(Letter Letter, int XAxis, int YAxis);