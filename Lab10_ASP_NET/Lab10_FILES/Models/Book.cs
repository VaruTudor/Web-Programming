using System;
using System.ComponentModel.DataAnnotations;

namespace Lab10_FILES.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Author { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Comment { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}