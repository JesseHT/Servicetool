using System;
using System.Collections.Generic;

class Vraag
{
    public string VraagTekst { get; set; }
    public string Antwoord { get; set; }
    public List<string> Trefwoorden { get; set; }
    public string Categorie { get; set; }

    public List<string> Gerelateerde { get; set; }
    public List<string> bijlageLink { get; set; }
    public int klikCount { get; set; }
    
}