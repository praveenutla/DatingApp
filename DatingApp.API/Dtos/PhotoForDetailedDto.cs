using System;

namespace DatingApp.API.Dtos
{
    public class PhotoForDetailedDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string description { get; set; }
        public DateTime DateAdded { get; set; }
    }
}