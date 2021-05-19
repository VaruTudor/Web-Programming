using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Lab10_FILES.Models;
using Microsoft.AspNetCore.Http;

namespace Lab10_FILES.Pages_Books
{
    public class DeleteModel : PageModel
    {
        private readonly Lab10_FILES.Data.BooksContext _context;

        public DeleteModel(Lab10_FILES.Data.BooksContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Book Book { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (HttpContext.Session.GetString(Configurator.USERNAME) == null)
            {
                ModelState.AddModelError("NotLoggedIn", "You must log in to see the books");
            }
            else
            {
                if (HttpContext.Session.GetInt32(Configurator.IS_ADMIN) == 1)
                {
                    if (id == null)
                    {
                        return NotFound();
                    }

                    Book = await _context.Books.FirstOrDefaultAsync(m => m.Id == id);

                    if (Book == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    ModelState.AddModelError("NotAdmin", "Only Admins can Delete!");
                    return Page();
                }
            }

            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (HttpContext.Session.GetString(Configurator.USERNAME) == null)
            {
                ModelState.AddModelError("NotLoggedIn", "You must log in to see the books");
                return Page();
            }
            else
            {
                if (HttpContext.Session.GetInt32(Configurator.IS_ADMIN) == 1)
                {
                    if (id == null)
                    {
                        return NotFound();
                    }

                    Book = await _context.Books.FindAsync(id);

                    if (Book != null)
                    {
                        _context.Books.Remove(Book);
                        await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    ModelState.AddModelError("NotAdmin", "Only Admins can Delete!");
                    return Page();
                }
                
            }
            

            return RedirectToPage("./Index");
        }
    }
}
