using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Lab10_FILES.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Lab10_FILES.Pages_Books
{
    public class IndexModel : PageModel
    {
        private readonly Lab10_FILES.Data.BooksContext _context;

        public IndexModel(Lab10_FILES.Data.BooksContext context)
        {
            _context = context;
        }

        public IList<Book> Book { get;set; }

        public async Task OnGetAsync()
        {
            if (HttpContext.Session.GetString(Configurator.USERNAME) != null)
            {
                Book = await _context.Books.ToListAsync();
            }
            else
            {
                Book = new List<Book>();
            }
        }
    }
}
