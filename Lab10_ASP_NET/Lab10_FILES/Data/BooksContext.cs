using Microsoft.EntityFrameworkCore;

namespace Lab10_FILES.Data
{
    public class BooksContext: DbContext
    {
        private readonly string _username = System.Environment.GetEnvironmentVariable("USERNAME");
        private readonly string _password = System.Environment.GetEnvironmentVariable("PASSWORD");
        
        public BooksContext(DbContextOptions<BooksContext> options): base(options){}
        public DbSet<Models.Book> Books { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=GuestBooks;Username=postgres;Password=Pestele1");
            // => optionsBuilder.UseNpgsql("Host=localhost;Database=GuestBooks;Username=" + _username + ";Password=" + _password);
    }
}