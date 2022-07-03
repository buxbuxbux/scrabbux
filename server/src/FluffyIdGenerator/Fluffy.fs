namespace FluffyIdGenerator

open System
open type System.Security.Cryptography.RandomNumberGenerator

open Adjectives
open Animals
open Colors

type Fluf =
    | Adjective
    | Color
    | Animal
    | NumberLetter

module Fluffy =
    let private matchFluf fluf =
        match fluf with
        | Adjective -> adjectives[Seq.length adjectives |> GetInt32]
        | Color -> colors[Seq.length colors |> GetInt32]
        | Animal -> animals[Seq.length animals |> GetInt32]
        | NumberLetter -> GetInt32(1000, 10000) |> string

    let GetId ([<ParamArray>] flufs) =
        flufs |> Seq.map matchFluf |> String.concat "-"

    let GetDefaultId () =
        GetId [ Adjective
                Color
                Animal
                NumberLetter ]
